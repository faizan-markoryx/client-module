const { Op } = require("sequelize");
const User = require("../../../sequelize/models/user");
const { pagination } = require("../../../services/pagination/pagination");


const searchUser = (req, res) => {
  try {
    const { searchBy = "" } = req.body;
    const page = req.body?.page ? parseInt(req.body.page) : 1;
    const perPage = req.body?.perPage ? parseInt(req.body.perPage) : 10;

    let searchQuery = {};

    // If Search has value then build a query
    if (searchBy) {
      const columnNames = Object.keys(User.rawAttributes);

      columnNames?.forEach((cName) => {
        if (cName != "password" && cName != "token") {
          searchQuery = {
            ...searchQuery,
            [cName]: {
              [Op.like]: `%${searchBy}%`,
            },
          };
        }
      });

      searchQuery = {
        [Op.or]: searchQuery,
      };
    }

    User.findAndCountAll({
      where: searchQuery,
      offset: (page - 1) * perPage,
      limit: perPage,
      distinct: true,
    }).then(({ rows, count }) => {
      const data = pagination({
        data: rows,
        count,
        page,
        perPage,
      });
      return res.status(200).send({
        success: true,
        message: "User List Loaded",
        data,
      });
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal server error, while searching user",
    });
  }
};

module.exports = searchUser;
