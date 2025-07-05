const { check } = require("express-validator");
const User = require("../../sequelize/models/user");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");

const userSignUpValidation = [
  check("firstName", "Invalid First Name").not().notEmpty(),
  check("lastName", "Invalid Last Name").not().notEmpty().isLength({ min: 2 }),
  check("email", "Invalid Email").not().notEmpty().isEmail().custom((value, { req }) => {
    if (!value) return false;
    return new Promise((resolve, reject) => {
      User.findOne({
        where: {
          email: req.body.email,
        },
      })
        .then((result) => {
          if (result) {
            return reject(new Error("E-mail already in use"));
          } else {
            return resolve(true);
          }
        })
        .catch(() => {
          reject(new Error("Internal server error"));
        });
    });
  }),
  check("phone", "Invalid Phone Number").not().notEmpty().isLength({ min: 10, max: 14 }).custom((value, { req }) => {
    if (!value) return false;

    return new Promise((resolve, reject) => {
      User.findOne({
        where: {
          phone: req.body.phone,
        },
      })
        .then((result) => {
          if (result) {
            return reject(new Error("Phone number already in use"));
          } else {
            return resolve(true);
          }
        })
        .catch(() => {
          return reject(new Error("Internal server error"));
        });
    });
  }),
  check("password", "Invalid Password").not().notEmpty().isLength({ min: 4, max: 10 }),
];

const userUpdateValidation = [
  check("firstName", "Invalid First Name").not().notEmpty(),
  check("lastName", "Invalid Last Name").not().notEmpty().isLength({ min: 2 }),
  check("email", "Invalid Email").not().notEmpty().isEmail().custom((value, { req }) => {
    if (!value) return false;
    return new Promise((resolve, reject) => {
      User.findOne({
        where: {
          id: {
            [Op.ne]: req.body.id,
          },
          email: req.body.email,
        },
      })
        .then((result) => {
          if (result) {
            return reject(new Error("E-mail already in use"));
          } else {
            return resolve(true);
          }
        })
        .catch(() => {
          return reject(new Error("Internal server error"));
        });
    });
  }),
  check("phone", "Invalid Phone Number").not().notEmpty().isLength({ min: 10, max: 14 }).custom((value, { req }) => {
    if (!value) return false;

    return new Promise((resolve, reject) => {
      User.findOne({
        where: {
          id: {
            [Op.ne]: req.body.id,
          },
          phone: req.body.phone,
        },
      })
        .then((result) => {
          if (result) {
            return reject(new Error("Phone number already in use"));
          } else {
            return resolve(true);
          }
        })
        .catch(() => {
          return reject(new Error("Internal server error"));
        });
    });
  }),
  check("role", "Invalid Role").not().notEmpty(),
  check("password", "Password required minimum 4 or maximum 10 Characters").custom((value, { req }) => {
    if (req.body?.password && req.body?.password?.length < 4 || req.body?.password?.length > 10) {
      return false;
    } else {
      return true;
    }
  }),
];

const userLoginValidation = [
  check("email", "Invalid Email").not().notEmpty().isEmail().custom((value, { req }) => {
    if (!value) return false;

    return new Promise((resolve, reject) => {
      User.findOne({
        where: {
          email: req.body.email,
          isActive: true
        },
      }).then((result) => {
        if (!result) {
          return reject(new Error("E-mail not found"));
        } else {
          return resolve(true);
        }
      }).catch(() => {
        return reject(new Error("Internal server error"));
      });
    });
  }),
  check("password", "Invalid Password").not().notEmpty().isLength({ min: 4, max: 10 }).custom((value, { req }) => {
    if (!value) return false;

    return new Promise(async (resolve, reject) => {
      const userPassword = await User.findOne({
        where: {
          email: req.body.email,
        },
        attributes: ["password"],
        raw: true,
      });

      if (!userPassword) {
        return reject(false);
      }

      const isPasswordOk = await bcrypt.compare(
        req.body.password,
        userPassword.password
      );

      if (isPasswordOk) {
        return resolve(true);
      } else {
        return reject(new Error("Invalid password"));
      }
    });
  }),
];

const userActivationStatusValidation = [
  check("id", "Invalid id").not().notEmpty().custom((value, { req }) => {
    if (!value) return false;

    return new Promise((resolve, reject) => {
      User.findOne({
        where: {
          id: req.body.id,
        },
      }).then((result) => {
        if (!result) {
          return reject(new Error("ID not found"));
        } else {
          return resolve(true);
        }
      }).catch(() => {
        return reject(new Error("Internal server error"));
      });
    });
  }),
  check("status", "Invalid status").not().notEmpty().isBoolean(),
];

module.exports = {
  userSignUpValidation,
  userUpdateValidation,
  userActivationStatusValidation,
  userLoginValidation,
};
