const User = require("../../../sequelize/models/user");

const updateUser = (req, res) => {
  try {
    const { firstName, lastName, email, phone, password, role, id: userId, } = req.body;

    let updateQuery = { firstName, lastName, email, phone, role, token: "" }

    if (password) {
      updateQuery = { firstName, lastName, email, phone, password, role, token: "" }
    }

    User.update(updateQuery,
      {
        where: {
          id: userId,
        },
      }
    ).then((data) => {
      return res.status(200).send({
        success: true,
        message: "User updated successfully",
        data,
      });
    }).catch((error) => {
      return res.status(200).send({
        success: false,
        message: "User not created",
        error,
      });
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal server error, while creating a user",
    });
  }
};

module.exports = updateUser;
