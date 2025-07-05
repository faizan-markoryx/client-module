const { Op } = require("sequelize");
const Contact = require("../../../sequelize/models/contact");
const ContactLabel = require("../../../sequelize/models/contactLabel");
const ContactNote = require("../../../sequelize/models/contactNote");
const ContactNoteLabel = require("../../../sequelize/models/contactNoteLabel");

const updateContactNote = (req, res) => {
    try {

        const { id: contactNoteId, note, noteSource, nextFollowUpDateTime, changeStandardComment, labels = [], timezone } = req.body;

        const { id: userId } = req.user;

        ContactNote.update({ note, noteSource, nextFollowUpDateTime, timezone, updatedBy: userId }, {
            where: {
                id: contactNoteId
            },
            returning: true
        }).then(async ([_, updatedNote]) => {

            const allContactLabels = await ContactNote.findOne({
                where: {
                    id: contactNoteId
                },
                include: {
                    model: ContactNoteLabel,
                    as: "contactNoteLabels",
                    attributes: ["id"],
                    include: [
                        {
                            model: ContactLabel,
                            // attributes: [],
                            // as: "ContactLabelData"
                        }
                    ],
                },
            })

            const { contactId } = JSON.parse(JSON.stringify(allContactLabels))

            const alreadyHasLabels = allContactLabels?.contactNoteLabels?.map((label) => {
                return label?.ContactLabel?.labelName
            })

            const deletedLabels = alreadyHasLabels?.filter((label) => !labels.includes(label))

            if (deletedLabels?.length > 0) {
                let idsForDelete = await ContactLabel.findAll({
                    where: {
                        labelName: {
                            [Op.in]: deletedLabels
                        }
                    },
                    attributes: ["id"],
                    raw: true
                })

                idsForDelete = idsForDelete?.map((ele) => ele?.id)

                if (idsForDelete?.length > 0) {
                    await ContactNoteLabel.destroy({
                        where: {
                            contactLabelId: idsForDelete,
                            contactNoteId
                        }
                    })
                }
            }

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
                    }
                })
            }

            return res.status(200).send({
                success: true,
                message: "Contact Note Updated Successfully.",
                data: updatedNote
            })
        }).catch((error) => {
            return res.status(200).send({
                success: false,
                message: "Contact Note Not Updated.",
                error
            })
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal Server Error, While Updating a Note",
        })
    }
}

module.exports = updateContactNote