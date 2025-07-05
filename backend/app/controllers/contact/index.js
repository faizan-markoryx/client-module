const deleteContactNote = require("../contactNote/deleteContactNotes");
const { createContact } = require("./createContact");
const { getContact } = require("./getContact");
const { multipleDeleteContact } = require("./multipleDeleteContact");
const { allInOneContactSearch } = require("./allInOneContactSearch");
const { updateContact } = require("./updateContact");
const { contactBulkOwnershipUpdate } = require("./contactBulkOwnershipUpdate");
const { contactBulkOwnershipDelete } = require("./contactBulkOwnershipDelete");
const { getContactManagerList } = require("./getContactManagerList");
const { contactSuppressionImport } = require("./contactSuppressionImport");
const { importContact } = require("./importContact");
const { multipleContactUpdate } = require("./multipleContactUpdate");
const { trimInput } = require("./trimInput");
const { getReportingManager } = require("./getReportingManager");





module.exports = {
    createContact,
    updateContact,
    multipleDeleteContact,
    getContact,
    allInOneContactSearch,
    deleteContactNote,
    contactBulkOwnershipUpdate,
    contactBulkOwnershipDelete,
    getContactManagerList,
    contactSuppressionImport,
    importContact,
    multipleContactUpdate,
    trimInput,
    getReportingManager
}