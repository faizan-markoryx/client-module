const User = require("../../../sequelize/models/user");
const jwt = require("jsonwebtoken");

const userLogin = async (req, res) => {
  try {
    const { email } = req.body;

    const userData = await User.findOne({
      where: {
        email,
        isActive: true
      },
      attributes: {
        exclude: ["password", "token"],
      },
      raw: true,
    });

    const token = jwt.sign(userData, process.env.JWT_SECRET_KEY, {
      expiresIn: "24h",
    });

    console.log("token>>>>>",token)

    User.update(
      {
        token,
      },
      {
        where: {
          email,
        },
      }
    )
      .then(() => {
        return res.status(200).send({
          success: true,
          message: "User logged in successfully",
          data: {
            ...userData,
            token,
          },
        });
      })
      .catch(() => {
        return res.status(200).send({
          success: false,
          message: "User not logged in",
        });
      });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal server error, while trying to login",
    });
  }
};

module.exports = userLogin;
