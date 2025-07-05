const User = require("../../../sequelize/models/user");

const createUser = (req, res) => {
  try {
    const { firstName, lastName, email, phone, password, role } = req.body;

    User.create({ firstName, lastName, email, phone, password, role, isActive: true })
      .then((data) => {
        return res.status(200).send({
          success: true,
          message: "User created successfully",
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
      error,
    });
  }
};

module.exports = createUser;
