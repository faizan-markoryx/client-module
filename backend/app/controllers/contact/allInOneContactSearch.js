const { Op } = require("sequelize");
const Contact = require("../../../sequelize/models/contact");
const { pagination } = require("../../../services/pagination/pagination");
const ContactNote = require("../../../sequelize/models/contactNote");
const User = require("../../../sequelize/models/user");
const sequelize = require("../../../sequelize/config/sequelize");
const moment = require("moment/moment");
const Client = require("../../../sequelize/models/client");

const allInOneContactSearch = async (req, res) => {
  try {

    let { searchBy, searchField = "", sortType, sortColumn, isExport = false, isAllData = false, } = req.body;

    if (sortColumn == "fullName") sortColumn = "firstName"

    if (isExport && req.user?.role != "0") {
      return res.status(401).send({
        success: false,
        message: "Unauthorised Token, Must need Admin Token For Export Data",
        data: [],
      });
    }

    const userId = req.user.id;
    const page = req.body?.page ? parseInt(req.body.page) : 1;
    const perPage = req.body?.perPage ? parseInt(req.body.perPage) : 10;
    var contactArrParams = {};
    let searchColumns = Object.keys(Contact.rawAttributes);
    searchColumns = [...searchColumns, "clientName", "fullName", "ownership", "reportingManager",];
    // All fields of the Model/Table

    if (searchBy && searchField) {
      const fullNames = searchBy?.replace("\t", " ").split(" ");
      let where = [];
      if (searchField != "createdBy" && searchField != "updatedBy" && searchField != "ownership" && searchField != "clientName" && searchField != "fullName") {
        where = {
          [Op.or]: {
            ...where,
            [searchField]: {
              [Op.like]: `%${searchBy}%`,
            },
          },
        };
      } else if (searchField == "createdBy") {
        where = [
          ...where,
          ...fullNames?.map((name) => {
            return {
              [Op.or]: {
                "$contactCreatedByData.firstName$": {
                  [Op.like]: `%${name}%`,
                },
                "$contactCreatedByData.lastName$": {
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
                "$contactUpdatedByData.firstName$": {
                  [Op.like]: `%${name}%`,
                },
                "$contactUpdatedByData.lastName$": {
                  [Op.like]: `%${name}%`,
                },
              },
            };
          }),
        ];
      } else if (searchField == "clientName") {
        where = [
          ...where,
          {
            [`$getClientName.clientName$`]: {
              [Op.like]: `%${searchBy}%`,
            },
          },
        ];
      } else if (searchField == "ownership") {
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
      } else if (searchField == "fullName") {
        const fullNames = searchBy?.replace("\t", " ").split(" ");
        where = [
          ...where,
          ...fullNames?.map((name) => {
            return {
              [Op.or]: {
                firstName: {
                  [Op.like]: `%${name}%`,
                },
                lastName: {
                  [Op.like]: `%${name}%`,
                },
              },
            };
          }),
        ];
      } else {
        where = searchColumns.map((column) => {
          if (column == "ownership" || column == "reportingManager") return;
          return {
            [column]: {
              [Op.like]: `%${searchBy}%`,
            },
          };
        });
        where = [
          ...where,
          {
            [Op.or]: {
              "$contactCreatedByData.firstName$": {
                [Op.like]: `%${searchBy}%`,
              },
              "$contactUpdatedByData.firstName$": {
                [Op.like]: `%${searchBy}%`,
              },
            },
          },
        ];
      }
      contactArrParams = {
        ...contactArrParams,
        [Op.or]: where,
      };
    } else if (searchBy) {
      const where = searchColumns.map((column) => {
        if (column == "clientName") {
          return {
            "$getClientName.clientName$": {
              [Op.like]: `%${searchBy}%`,
            },
          };
        } else if (column == "fullName") {
          const fullNames = searchBy?.replace("\t", " ").split(" ");

          return fullNames?.map((name) => {
            return {
              [Op.or]: {
                firstName: {
                  [Op.like]: `%${name}%`,
                },
                lastName: {
                  [Op.like]: `%${name}%`,
                },
              },
            };
          });
        } else if (column == "createdBy") {
          const fullNames = searchBy?.replace("\t", " ").split(" ");

          return fullNames?.map((name) => {
            return {
              [Op.or]: {
                "$contactCreatedByData.firstName$": {
                  [Op.like]: `%${name}%`,
                },
                "$contactCreatedByData.lastName$": {
                  [Op.like]: `%${name}%`,
                },
              },
            };
          });
        } else if (column == "ownership") {
          const fullNames = searchBy?.replace("\t", " ").split(" ");

          return fullNames?.map((name) => {
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
          });
        } else {
          if (column == "reportingManager") return;

          return {
            [column]: {
              [Op.like]: `%${searchBy}%`,
            },
          };
        }
      });
      contactArrParams = {
        ...contactArrParams,
        [Op.or]: where,
      };
    }

    // For Multiple Search
    searchColumns.forEach(async (column) => {
      if (req?.body[column]?.length > 0) {
        if (column == "createdBy") {
          contactArrParams = {
            ...contactArrParams,
            "$contactCreatedByData.id$": {
              [Op.in]: req.body[column],
            },
          };
        } else if (column == "updatedBy") {
          contactArrParams = {
            ...contactArrParams,
            "$contactUpdatedByData.id$": {
              [Op.in]: req.body[column],
            },
          };
        } else if (column == "ownership") {
          contactArrParams = {
            ...contactArrParams,
            "$ownershipByData.id$": {
              [Op.in]: req.body[column],
            },
          };
        } else if (column == "fullName") {
          const fullNames = req.body[column];

          contactArrParams = {
            ...contactArrParams,
            [Op.or]: {
              firstName: {
                [Op.or]:
                  fullNames?.map((name) => {
                    const nameSlipt = name.split(" ")
                    const subQuery = nameSlipt?.map((ele) => {
                      return {
                        [Op.like]: `%${ele}%`,
                      }
                    })

                    return {
                      [Op.or]: subQuery
                    }
                  })
              },
              lastName: {
                [Op.or]:
                  fullNames?.map((name) => {
                    const nameSlipt = name.split(" ")
                    const subQuery = nameSlipt?.map((ele) => {
                      return {
                        [Op.like]: `%${ele}%`,
                      }
                    })
                    return {
                      [Op.or]: subQuery
                    }
                  })
              },
            }
          }
        } else if (column == "reportingManager") {
          contactArrParams = {
            ...contactArrParams,
            "$reportingManagerContact.id$": {
              [Op.in]: req.body[column],
            },
          };
        } else {
          contactArrParams = {
            ...contactArrParams,
            [column]: {
              [Op.in]: req.body[column],
            },
          };
        }
      }
    });
    const { createdAt = {}, updatedAt = {}, nextFollowUpDateTime = {}, lastFollowUpDate = {}, } = req?.body;

    // Getting Next Follow Up Date form Notes
    if (nextFollowUpDateTime?.startDate && nextFollowUpDateTime?.endDate) {
      const { startDate, endDate } = req.body.nextFollowUpDateTime;

      const startAt = moment(startDate).startOf('day').format('YYYY-MM-DD HH:mm:ss');
      const endAt = moment(endDate).endOf('day').format('YYYY-MM-DD HH:mm:ss');


      const nextFollowUpDateTimeNotes = await ContactNote.findAll({
        where: {
          [Op.and]: [
            {
              nextFollowUpDateTime: {
                [Op.gte]: startAt,
                [Op.lte]: endAt
              }
            }
          ],
          isDeleted: false
        },
        attributes: ['contactId'],
        raw: true
      })

      if (nextFollowUpDateTimeNotes?.length > 0) {
        const nextFollowUpDateTimeNotesIds = nextFollowUpDateTimeNotes?.map((ele) => ele?.contactId)
        contactArrParams = {
          ...contactArrParams,
          id: {
            [Op.in]: nextFollowUpDateTimeNotesIds,
          },
        };
      }
    }

    // Getting Last Follow Up Date Notes by Updated At
    if (lastFollowUpDate?.startDate && lastFollowUpDate?.endDate) {
      const { startDate, endDate } = req.body.lastFollowUpDate;

      // MUST BE CST
      const startAt = moment.tz(startDate, "America/Chicago").startOf("day").format("YYYY-MM-DD HH:mm:ss");
      const endAt = moment.tz(endDate, "America/Chicago").endOf("day").format("YYYY-MM-DD HH:mm:ss");

      const lastFollowUpDateNotes = await ContactNote.findAll({
        where: {
          [Op.and]: [
            sequelize.literal(
              `convert_TZ(ContactNote.updatedAt, '+00:00', '-05:00') >= '${startAt}'`
            ),
            sequelize.literal(
              `convert_TZ(ContactNote.updatedAt, '+00:00', '-05:00') <= '${endAt}'`
            ),
          ],
          isDeleted: false,
        },
        include: [{
          model: Contact,
          as: 'contactNotesData',
          attributes: [] // Exclude other attributes from the Contact model if not needed
        }],
        attributes: [
          'contactId',
          [sequelize.fn('MAX', sequelize.col('ContactNote.updatedAt')), 'maxUpdatedAt']
        ],
        raw: true,
        order: [[sequelize.fn('MAX', sequelize.col('ContactNote.updatedAt')), 'DESC']],
        group: ['contactId']
      });

      if (lastFollowUpDateNotes?.length > 0) {
        const lastFollowUpDateNotesIds = lastFollowUpDateNotes.map(note => note.contactId);
        contactArrParams = {
          ...contactArrParams,
          id: {
            [Op.in]: lastFollowUpDateNotesIds,
          },
        };
      }
    }

    if (createdAt?.startDate && createdAt?.endDate) {
      const { startDate, endDate } = req.body.createdAt;

      // MUST BE CST
      const startAt = moment.tz(startDate, "America/Chicago").startOf("day").format("YYYY-MM-DD HH:mm:ss");
      const endAt = moment.tz(endDate, "America/Chicago").endOf("day").format("YYYY-MM-DD HH:mm:ss");
      contactArrParams = {
        ...contactArrParams,
        [Op.and]: [
          sequelize.literal(
            `convert_TZ(Contact.createdAt, '+00:00', '-05:00') >= '${startAt}'`
          ),
          sequelize.literal(
            `convert_TZ(Contact.createdAt, '+00:00', '-05:00') <= '${endAt}'`
          ),
        ],
      };
    }

    if (updatedAt?.startDate && updatedAt?.endDate) {
      const { startDate, endDate } = req.body.updatedAt;

      // MUST BE CST
      const startAt = moment.tz(startDate, "America/Chicago").startOf("day").format("YYYY-MM-DD HH:mm:ss");
      const endAt = moment.tz(endDate, "America/Chicago").endOf("day").format("YYYY-MM-DD HH:mm:ss");
      contactArrParams = {
        ...contactArrParams,
        [Op.and]: [
          sequelize.literal(
            `convert_TZ(Contact.updatedAt, '+00:00', '-05:00') >= '${startAt}'`
          ),
          sequelize.literal(
            `convert_TZ(Contact.updatedAt, '+00:00', '-05:00') <= '${endAt}'`
          ),
        ],
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
      contactArrParams = {
        ...contactArrParams,
        ownershipId: userId,
      };
    }

    const fullName = sequelize.fn("CONCAT", sequelize.col("Contact.firstName"), sequelize.fn("COALESCE", sequelize.fn("CONCAT", " ", sequelize.col("Contact.lastName")), ""));

    const mainQuery = {
      where: {
        ...contactArrParams,
        isDeleted: false,
      },
      attributes: {
        include: [
          "*",
          ["createdBy", "createdId"],
          ["updatedBy", "updatedId"],
          // ["createdAt", "createdAtUTC"],
          // ["updatedAt", "updatedAtUTC"],          
          [fullName, "fullName"],
          [sequelize.fn("concat", sequelize.col("contactCreatedByData.firstName"), " ", sequelize.col("contactCreatedByData.lastName")), "createdBy",],
          [sequelize.fn("concat", sequelize.col("contactUpdatedByData.firstName"), " ", sequelize.col("contactUpdatedByData.lastName")), "updatedBy",],
          [sequelize.fn("concat", sequelize.col("ownershipByData.firstName"), " ", sequelize.col("ownershipByData.lastName")), "ownership",],
          [sequelize.fn("concat", sequelize.col("reportingManagerContact.firstName"), " ", sequelize.col("reportingManagerContact.lastName")), "reportingManager",],
          [sequelize.col("getClientName.clientName", "clientName"), "clientName"],
          // [sequelize.col("contactNote.nextFollowUpDateTime", "nextFollowUpDateTime"), 'nextFollowUpDateTime'],
          // [sequelize.literal(`convert_TZ(Contact.createdAt, '+00:00', '-05:00')`), 'createdAt'],
          // [sequelize.literal(`convert_TZ(Contact.updatedAt, '+00:00', '-05:00')`), 'updatedAt'],
          // [literal(`convert_TZ(Contact.createdAt, '+00:00', '-05:00')`), 'createdAt'], // convert the createdAt column to the desired timezone
          // [literal(`convert_TZ(Contact.updatedAt, '+00:00', '-05:00')`), 'updatedAt'], // convert the updatedAt column to the desired timezone
          // [sequelize.literal(`convert_TZ(updatedAt, '+00:00', '-05:00')`), 'updatedAt']
        ],
      },
      include: [
        {
          model: User,
          as: "contactCreatedByData",
          attributes: [],
        },
        {
          model: Contact,
          as: "reportingManagerContact",
          attributes: [],
        },
        {
          model: User,
          as: "ownershipByData",
          attributes: [],
        },
        {
          model: User,
          as: "contactUpdatedByData",
          attributes: [],
        },
        {
          model: Client,
          as: "getClientName",
          attributes: [],
        },
        {
          model: ContactNote,
          limit: 1,
          where: {
            isDeleted: false,
          },
          as: "contactNote",
          order: [["updatedAt", "DESC"]],
        },
      ],
      order: [[sortColumn || "createdAt", sortType || "DESC"]],
    }

    if (!isExport) {
      await Contact.findAndCountAll({
        ...mainQuery,
        ...paginationQuery,
        raw: false,
        nest: true,
      })
        .then(({ rows, count }) => {
          const modifiedRows = JSON.parse(JSON.stringify(rows))?.map((row) => {
            return {
              ...row,
              contactNote: row?.contactNote[0]?.note || "",
              lastFollowUpDate: row?.contactNote[0]?.updatedAt || "",
              nextFollowUpDateTime: row?.contactNote[0]?.nextFollowUpDateTime || "",
              nextFollowUpDateTimeTimezone: row?.contactNote[0]?.timezone || "",
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
            message: "Contact data get successfully",
            data,
          });
        })
        .catch((error) => {
          return res.status(200).send({
            success: false,
            message: "Contact data not found",
            error,
          });
        });
    } else {

      const totalCount = await Contact.count(mainQuery);
      let exportedData = [];

      const perPage = 500; // Adjust the number of records per page as per your requirements
      const totalPages = Math.ceil(totalCount / perPage);

      for (let currentPage = 1; currentPage <= totalPages; currentPage++) {
        const rows = await Contact.findAll({
          ...mainQuery,
          offset: (currentPage - 1) * perPage,
          limit: perPage,
          raw: false,
          nest: true,
        });

        const modifiedRows = JSON.parse(JSON.stringify(rows))?.map((row) => {
          return {
            ...row,
            contactNote: row?.contactNote[0]?.note || "",
            lastFollowUpDate: row?.contactNote[0]?.updatedAt || "",
            nextFollowUpDateTime: row?.contactNote[0]?.nextFollowUpDateTime || "",
          };
        });

        exportedData = exportedData.concat(modifiedRows);
      }

      const paginatedData = pagination({
        data: exportedData,
        count: totalCount,
        page,
        perPage,
      });

      return res.status(200).send({
        success: true,
        message: "Contact data exported successfully",
        data: paginatedData,
      });

    }

  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal server error, while get a Contact",
    });
  }
};

module.exports = { allInOneContactSearch };