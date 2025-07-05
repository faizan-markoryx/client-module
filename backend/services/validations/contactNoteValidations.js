const { check } = require("express-validator");

const createContactNoteValidations = [
  check("contactId", "Contact Id Required").not().notEmpty(),
  check("note", "Note Required").not().notEmpty(),
  check("noteSource", "NoteSource Required").not().notEmpty().custom((val, { req }) => {
    return new Promise((resolve, reject) => {
      const noteSource = req?.body?.noteSource;
      if (noteSource != 0 && noteSource != 1) {
        return reject(new Error("NoteSource Must be Incomming or Outgoing"))
      } else {
        return resolve(true)
      }
    })
  }),
];

const updateContactNoteValidations = [
  check("note", "Note Required").not().notEmpty(),
  check("noteSource", "NoteSource Required").not().notEmpty().custom((val, { req }) => {
    return new Promise((resolve, reject) => {
      const noteSource = req?.body?.noteSource;
      if (noteSource != 0 && noteSource != 1) {
        return reject(new Error("NoteSource Must be Incomming or Outgoing"))
      } else {
        return resolve(true)
      }
    })
  }),
];
const getAllContactNoteValidations = [
  check("createdBy", "createdBy Array Required ").isArray(),
];

module.exports = {
  createContactNoteValidations,
  updateContactNoteValidations,
  getAllContactNoteValidations
};
