const { check } = require("express-validator");
const Contact = require("../../sequelize/models/contact");
const { Op } = require("sequelize");


const createContactValidations = [
  check("clientId", "Invalid Client Name").not().notEmpty(),
  check("firstName", "Invalid First Name").not().notEmpty(),
  check("ownershipId", "Invalid Ownership").not().notEmpty(),
  check("email", "Invalid Email").not().notEmpty().isEmail().custom((value, { req }) => {
    if (!value) return false;
    return new Promise((resolve, reject) => {
      Contact.findOne({
        where: {
          email: req.body.email,
          isDeleted: false
        },
      }).then((result) => {
        if (result) {
          return reject(new Error("E-mail already in use"));
        } else {
          return resolve(true);
        }
      }).catch(() => {
        return reject(new Error("Internal server error"));
      });
    });
  }),
  check("phone1", "Invalid Phone Number").not().notEmpty().isLength({ min: 10, max: 14 }).custom((value, { req }) => {
    if (!value) return false;

    return new Promise((resolve, reject) => {
      Contact.findOne({
        where: {
          phone1: req.body.phone1,
          isDeleted: false
        },
      }).then((result) => {
        if (result) {
          return reject(new Error("Phone number already in use"));
        } else {
          return resolve(true);
        }
      }).catch(() => {
        return reject(new Error("Internal server error"));
      });
    });
  }),
  check("noteSource", "Note Source Required").custom((value, { req }) => {
    if (req.body?.note != "" && req.body?.noteSource == "") {
      return false
    } else {
      return true
    }
  }),
];
const updateContactValidations = [
  check("id", "Invalid id").not().notEmpty(),
  check("clientId", "Invalid Client Name").not().notEmpty(),
  check("firstName", "Invalid First Name").not().notEmpty(),
  check("ownershipId", "Invalid Ownership").not().notEmpty(),
  check("email", "Invalid Email").not().notEmpty().isEmail().custom((value, { req }) => {
    if (!value) return false;
    return new Promise((resolve, reject) => {
      Contact.findOne({
        where: {
          email: req.body.email,
          isDeleted: false,
          id: {
            [Op.ne]: req.body.id,
          },
        },
      }).then((result) => {
        if (result) {
          return reject(new Error("E-mail already in use"));
        } else {
          return resolve(true);
        }
      }).catch(() => {
        return reject(new Error("Internal server error"));
      });
    });
  }),
  check("phone1", "Invalid Phone Number").not().notEmpty().isLength({ min: 10, max: 14 }).custom((value, { req }) => {
    if (!value) return false;

    return new Promise((resolve, reject) => {
      Contact.findOne({
        where: {
          phone1: req.body.phone1,
          isDeleted: false,
          id: {
            [Op.ne]: req.body.id,
          },
        },
      }).then((result) => {
        if (result) {
          return reject(new Error("Phone number already in use"));
        } else {
          return resolve(true);
        }
      }).catch(() => {
        return reject(new Error("Internal server error"));
      });
    });
  }),
];


const allInOneContactSearchValidations = [
  check("id", "IDs must be Array").isArray(),
  check("searchBy", "Id must be Numeric").custom((val, { req }) => {
    return new Promise((resolve, reject) => {
      if (req?.body?.searchField == "id" && !Number(req?.body?.searchBy)) {
        console.log("req?.body >>>", req?.body?.searchField);
        return reject(new Error("Id must be Numeric"))
      } else {
        return resolve(true)
      }
    })
  }),
];

module.exports = {
  createContactValidations,
  updateContactValidations,
  allInOneContactSearchValidations
};
