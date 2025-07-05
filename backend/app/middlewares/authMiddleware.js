const jwt = require("jsonwebtoken");
const User = require("../../sequelize/models/user");

const verifyCommonJwtToken = async (req, res, next) => {
  const token = req.headers.authorization;

  if (token == null) return res.sendStatus(401);

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const isUserExists = await User.findOne({
      where: {
        id: verified?.id,
        token,
        isActive: true
      }
    })

    if (verified && isUserExists) {
      req.user = verified;
      next();
    } else {
      return res.status(401).send({
        success: false,
        message: "Invalid token",
      });
    }
  } catch (error) {
    return res.status(401).send({
      success: false,
      message: "Invalid token",
    });
  }
};

const verifyAdminJwtToken = async (req, res, next) => {
  const token = req.headers.authorization;

  if (token == null) return res.sendStatus(401);

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const isUserExists = await User.findOne({
      where: {
        id: verified?.id,
        token,
        isActive: true
      }
    })

    if (verified && isUserExists) {
      if (verified?.role != "0") {
        return res.status(401).send({
          success: false,
          message: "Unauthorized token",
        });
      } else {
        req.user = verified;
        next();
      }
    } else {
      return res.status(401).send({
        success: false,
        message: "Invalid token",
      });
    }
  } catch (error) {
    return res.status(401).send({
      success: false,
      message: "Invalid token",
    });
  }
};

module.exports = { verifyCommonJwtToken, verifyAdminJwtToken };
