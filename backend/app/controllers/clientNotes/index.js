const  addClientNote  = require('./addClientNote')
const getClientNote = require('./getClientNote')
const updateClientNote = require('./updateClientNote')
const deleteClientNote = require('./deleteClientNote')
const { trimInput } = require('../contact/trimInput')


module.exports = { 
    addClientNote,
    getClientNote, 
    updateClientNote, 
    deleteClientNote,
    trimInput
};