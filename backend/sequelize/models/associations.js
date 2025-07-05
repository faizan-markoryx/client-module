const Client = require("./client");
const Contact = require("./contact");
const ContactNote = require("./contactNote");
const User = require("./user");
const ClientNote = require('./clientNote');
const ContactNoteLabel = require("./contactNoteLabel");
const ContactLabel = require("./contactLabel");
const ContactNoteRead = require("./contactNoteRead");

ContactNote.belongsTo(User, { foreignKey: "createdBy", as: "createdByData" });
ContactNote.belongsTo(User, { foreignKey: "updatedBy", as: "updatedByData" });
Client.belongsTo(User, { foreignKey: "createdBy", as: "createdByData" });
Client.belongsTo(User, { foreignKey: "updatedBy", as: "updatedByData" });
Client.belongsTo(User, { foreignKey: "ownership", as: "ownershipByData" });
Contact.belongsTo(User, { foreignKey: 'createdBy', targetKey: "id" });

Contact.belongsTo(Contact, { foreignKey: "reportingManagerId", as: "reportingManagerContact" });
Contact.belongsTo(User, { foreignKey: "createdBy", as: "contactCreatedByData" });
Contact.belongsTo(User, { foreignKey: "updatedBy", as: "contactUpdatedByData" });
Contact.belongsTo(User, { foreignKey: "ownershipId", as: "ownershipByData" });

ContactNote.belongsTo(User, { foreignKey: "createdBy", as: "contactNoteCreatedByData" });
ContactNote.belongsTo(User, { foreignKey: "updatedBy", as: "contactNoteUpdatedByData" });
Contact.belongsTo(Client, { foreignKey: "clientId", targetKey: "id", as: 'getClientName' });


Contact.hasMany(ContactNote, { foreignKey: "contactId", targetKey: "id", as: 'contactNoteFollowUpDate' });
// ContactNote.belongsTo(Contact, {  foreignKey: "contactId", targetKey: "id", as: 'contactNoteFollowUpDate' });

Contact.hasMany(ContactNote, { as: 'contactNote', foreignKey: "contactId", targetKey: "id" });
ClientNote.belongsTo(Client, { foreignKey: 'clientId', as: 'clientNameData' });
ClientNote.belongsTo(User, { foreignKey: 'createdBy', as: 'createdByData' });
ClientNote.belongsTo(User, { foreignKey: 'updatedBy', as: 'updatedByData' });


// ContactNote.hasMany(ContactNoteLabel);
// ContactNoteLabel.belongsTo(ContactLabel, { foreignKey: "contactLabelId" });


ContactNote.hasMany(ContactNoteLabel, { as: "contactNoteLabels" });
ContactNoteLabel.belongsTo(ContactLabel, { foreignKey: "contactLabelId" });

Client.hasMany(ClientNote, { foreignKey: 'clientId', as: "clientNotesData" });
ContactNote.belongsTo(Contact, { foreignKey: 'contactId', as: "contactNotesData" });
ContactNote.hasOne(ContactNoteRead, { foreignKey: 'contactNoteId', as: "ContactNoteReadByData" });




ContactNoteLabel.belongsTo(ContactNote, {
    foreignKey: 'ContactNoteId',
});