const User = require("../../../sequelize/models/user");

const changeUserActivationStatus = (req, res) => {
  try {
    const { id: userId, status } = req.body;

    User.update(
      { isActive: status },
      {
        where: {
          id: userId,
        },
      }
    )
      .then((data) => {
        return res.status(200).send({
          success: true,
          message: `User ${status ? "activated" : "deactivated"} successfully`,
          data,
        });
      })
      .catch((error) => {
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

module.exports = changeUserActivationStatus;
