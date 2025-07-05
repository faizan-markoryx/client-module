const { check } = require('express-validator')

const addClientNoteValidation = [
    check("clientId", "Client Id Required").not().notEmpty(),
    check("note", "Notes are required").not().notEmpty().isLength({min:3})
]

const updateClientNoteValidation = [
    check("clientId", "Client Id Required").not().notEmpty(),
    check("note", "Notes are required").not().notEmpty().isLength({min:3}),
]
module.exports = { addClientNoteValidation, updateClientNoteValidation }