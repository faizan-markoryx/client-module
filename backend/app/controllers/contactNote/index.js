const addContactNote = require("./addContactNote");
const getContactNote = require("./getContactNotes");
const updateContactNote = require("./updateContactNote");
const nextFollowUpdateNotification = require('./getNextFollowUpdateNotification')
const contactNoteRead = require('./contactNoteRead');
const { trimInput } = require("../contact/trimInput");


module.exports = {
    addContactNote,
    updateContactNote,
    getContactNote,
    nextFollowUpdateNotification,
    contactNoteRead,
    trimInput
}