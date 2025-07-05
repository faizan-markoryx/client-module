const Contact = require("../../../sequelize/models/contact");
const ContactLabel = require("../../../sequelize/models/contactLabel");
const ContactNote = require("../../../sequelize/models/contactNote");
const ContactNoteLabel = require("../../../sequelize/models/contactNoteLabel");
const ContactNoteRead = require('../../../sequelize/models/contactNoteRead')

const addContactNote = async (req, res) => {
    try {
        const { contactId, note, noteSource, labels = [], nextFollowUpDateTime, changeStandardComment = "", timezone } = req.body;
        const { id: userId } = req.user;

        ContactNote.create({
            contactId,
            note,
            noteSource,
            nextFollowUpDateTime,
            timezone,
            createdBy: userId,
            updatedBy: userId,
        }).then(async (data) => {
            const contactNoteId = data?.id
            console.log(contactNoteId);
            const createdLabels = await Promise.all(
                labels.map(async (labelName) => {
                    const [existingLabel, created] = await ContactLabel.findOrCreate({
                        where: { labelName },
                        defaults: { labelName },
                    });
                    return existingLabel.id;
                })
            );

            if (createdLabels) {
                await Promise.all(
                    createdLabels.map(async (contactLabelId) => {
                        const existingNoteLabel = await ContactNoteLabel.findOne({
                            where: { contactNoteId, contactLabelId },
                        });
                        if (!existingNoteLabel) {
                            await ContactNoteLabel.create({
                                contactNoteId,
                                contactLabelId,
                            });
                        }
                    })
                );
            }

            if (changeStandardComment) {
                await Contact.update({
                    standardComment: changeStandardComment
                }, {
                    where: {
                        id: contactId
                    },
                })
            }

            ContactNoteRead.create({
                createdBy:userId,
                updatedBy:userId,
                contactNoteId:contactNoteId,
            });
            return res.status(200).send({
                success: true,
                message: "Contact Note Created Successfully.",
                data,
            });
        }).catch((error) => {
            return res.status(200).send({
                success: false,
                message: "Contact Note Not Created.",
                error,
            });
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal Server Error, While Creating a Note",
        });
    }
};

module.exports = addContactNote;
