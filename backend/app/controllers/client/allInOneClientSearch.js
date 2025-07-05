const sequelize = require("../../../sequelize/config/sequelize");
const Client = require("../../../sequelize/models/client");
const User = require("../../../sequelize/models/user");
const { pagination } = require("../../../services/pagination/pagination");
const { Op } = require("sequelize");
const moment = require("moment");
const ClientNote = require("../../../sequelize/models/clientNote");

const allInOneClientSearch = async (req, res) => {
  try {
    const {
      searchBy,
      searchField,
      sortType,
      sortColumn,
      isAllData = false,
      isExport = false,
    } = req.body;
    const page = req.body?.page ? parseInt(req.body.page) : 1;
    const perPage = req.body?.perPage ? parseInt(req.body.perPage) : 10;
    const userId = req.user.id;
    let clientSearchParams = {};

    let searchColumns = Object.keys(Client.rawAttributes);
    searchColumns = [...searchColumns, "fullName", "ownership"];
    //Preparing for Multi Search Query
    searchColumns.forEach((column) => {
      const { createdAt = {}, updatedAt = {} } = req?.body;
      if (req?.body[column]?.length > 0) {
        if (column == "createdBy") {
          clientSearchParams = {
            ...clientSearchParams,
            "$createdByData.id$": {
              [Op.in]: req.body[column],
            },
          };
        } else if (column == "updatedBy") {
          clientSearchParams = {
            ...clientSearchParams,
            "$updatedByData.id$": {
              [Op.in]: req.body[column],
            },
          };
        } else {
          clientSearchParams = {
            ...clientSearchParams,
            [column]: {
              [Op.in]: req.body[column],
            },
          };
        }
      }

      if (createdAt?.startDate && createdAt?.endDate) {
        const { startDate, endDate } = req.body?.createdAt;
        const startAt = moment.tz(startDate, "America/Chicago").startOf("day").format("YYYY-MM-DD HH:mm:ss");
        const endAt = moment.tz(endDate, "America/Chicago").endOf("day").format("YYYY-MM-DD HH:mm:ss");
        clientSearchParams = {
          ...clientSearchParams,
          [Op.and]: [
            sequelize.literal(
              `convert_TZ(Client.createdAt, '+00:00', '-05:00') >= '${startAt}'`
            ),
            sequelize.literal(
              `convert_TZ(Client.createdAt, '+00:00', '-05:00') <= '${endAt}'`
            ),
          ],
          // createdAt: {
          //   [Op.gte]: startAt,
          //   [Op.lte]: endAt,
          // },
        };
      }

      if (updatedAt?.startDate && updatedAt?.endDate) {
        const { startDate, endDate } = req.body?.updatedAt;
        const startAt = moment.tz(startDate, "America/Chicago").startOf("day").format("YYYY-MM-DD HH:mm:ss");
        const endAt = moment.tz(endDate, "America/Chicago").endOf("day").format("YYYY-MM-DD HH:mm:ss");
        clientSearchParams = {
          ...clientSearchParams,
          [Op.and]: [
            sequelize.literal(
              `convert_TZ(Client.updatedAt, '+00:00', '-05:00') >= '${startAt}'`
            ),
            sequelize.literal(
              `convert_TZ(Client.updatedAt, '+00:00', '-05:00') <= '${endAt}'`
            ),
          ],
          // updatedAt: {
          //   [Op.gte]: startAt,
          //   [Op.lte]: endAt,
          // },
        };
      }
    });

    //Preparing for Search Any Query
    if (searchBy && searchField) {
      let where = [];
      const fullNames = searchBy?.replace("\t", " ").split(" ");
      if (
        searchField &&
        searchField != "createdBy" &&
        searchField != "updatedBy" &&
        searchField != "ownership"
      ) {
        where = {
          [Op.or]: {
            ...where,
            [searchField]: {
              [Op.like]: `%${searchBy}`,
            },
          },
        };
      } else if (searchField == "createdBy") {
        where = [
          ...where,
          ...fullNames?.map((name) => {
            return {
              [Op.or]: {
                "$createdByData.firstName$": {
                  [Op.like]: `%${name}%`,
                },
                "$createdByData.lastName$": {
                  [Op.like]: `%${name}%`,
                },
              },
            };
          }),
        ];
      } else if (searchField == "updatedBy") {
        where = [
          ...where,
          ...fullNames?.map((name) => {
            return {
              [Op.or]: {
                "$updatedByData.firstName$": {
                  [Op.like]: `%${name}%`,
                },
                "$updatedByData.lastName$": {
                  [Op.like]: `%${name}%`,
                },
              },
            };
          }),
        ];
      }
      else if (searchField == "ownership") {
        where = [
          ...where,
          ...fullNames?.map((name) => {
            return {
              [Op.or]: {
                "$ownershipByData.firstName$": {
                  [Op.like]: `%${name}%`,
                },
                "$ownershipByData.lastName$": {
                  [Op.like]: `%${name}%`,
                },
              },
            };
          }),
        ];
      } else {
        where = searchColumns.map((column) => ({
          [column]: {
            [Op.like]: `%${searchBy}%`,
          },
        }));
        where = [
          ...where,
          {
            [Op.or]: {
              "$createdByData.firstName$": {
                [Op.like]: `%${searchBy}%`,
              },
              "$updatedByData.firstName$": {
                [Op.like]: `%${searchBy}%`,
              },
              "$ownershipByData.firstName$": {
                [Op.like]: `%${searchBy}%`,
              },
            },
          },
        ];
      }
      clientSearchParams = {
        [Op.or]: where,
      };
    }

    let paginationQuery = {};

    if (!isExport) {
      paginationQuery = {
        offset: (page - 1) * perPage,
        limit: perPage,
        distinct: true,
      };
    }

    if (!isAllData) {
      clientSearchParams = {
        ...clientSearchParams,
        ownership: userId,
      };
    }

    Client.findAndCountAll({
      where: {
        ...clientSearchParams,
        isContact: true,
        isDeleted: false,
      },
      order: [[sortColumn || "createdAt", sortType || "DESC"]],
      ...paginationQuery,
      attributes: {
        include: [
          "*",
          ["createdBy", "createdId"],
          ["updatedBy", "updatedId"],
          ["ownership", "ownershipId"],
          [
            sequelize.fn(
              "concat",
              sequelize.col("createdByData.firstName"),
              " ",
              sequelize.col("createdByData.lastName")
            ),
            "createdBy",
          ],
          [
            sequelize.fn(
              "concat",
              sequelize.col("updatedByData.firstName"),
              " ",
              sequelize.col("updatedByData.lastName")
            ),
            "updatedBy",
          ],
          [
            sequelize.fn(
              "concat",
              sequelize.col("ownershipByData.firstName"),
              " ",
              sequelize.col("ownershipByData.lastName")
            ),
            "ownership",
          ],
        ],
      },
      include: [
        {
          model: User,
          as: "createdByData",
          attributes: [],
        },
        {
          model: User,
          as: "updatedByData",
          attributes: [],
        },
        {
          model: User,
          as: "ownershipByData",
          attributes: [],
        },
        {
          model: ClientNote,
          as: "clientNotesData",
          limit: 1,
          order: [["updatedAt", "DESC"]],
          where: {
            isDeleted: false,
          },
        },
      ],
    })
      .then(({ rows, count }) => {
        const modifiedRows = JSON.parse(JSON.stringify(rows))?.map((row) => {
          return {
            ...row,
            clientNotesData: row?.clientNotesData[0]?.note || "",
          };
        });
        const data = pagination({
          data: modifiedRows,
          count,
          page,
          perPage,
        });
        return res.status(200).send({
          success: true,
          message: "Client Data Get Successfully",
          data,
        });
      })
      .catch((err) => {
        return res.status(200).send({
          success: false,
          message: "Client Data Failed",
          err: err,
        });
      });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: error,
    });
  }
};

module.exports = allInOneClientSearch;
