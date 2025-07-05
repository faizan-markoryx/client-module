const Client = require("../../../sequelize/models/client");
const Contact = require("../../../sequelize/models/contact");
const ContactNote = require("../../../sequelize/models/contactNote");
const ContactNoteRead = require('../../../sequelize/models/contactNoteRead')

const arr1 = [
    "Follow-up",
    "Follow-up on a specific Date/Time",
    "Hung-up",
    "Manager with Active Requirements",
    "Connected Manager",
    "Handles Offshore Requirements",
    "Call Later",
];
const arr2 = [
    "DND",
    "Number not in service",
    "Wants to stick with standard Channel",
    "Wrong Number",
    "No number given",
    "Not involved in hiring",
    "Call is not going through",
    "No Longer with company",
];


const createContact = (req, res) => {
    try {
        const { clientId, firstName, lastName, title, reportingManagerId, contactTimeZone, phone1, phone2, phone3, email, alternateEmail, city, state, country, unit, endClient, skillsSupported, standardComment, leadSource, linkedInProfile, ownershipId, note, nextFollowUpDateTime, timezone, noteSource } = req.body
        const userId = req.user.id;

        let leadStatus = "New Lead"

        if (standardComment) {
            if (arr1.includes(standardComment)) {
                leadStatus = "Working"
            } else if (arr2.includes(standardComment)) {
                leadStatus = "Not Working"
            }
        }

        Contact.create({
            clientId, firstName, lastName, title, reportingManagerId, contactTimeZone, phone1, phone2, phone3, email, alternateEmail, city, state, country, unit, endClient, skillsSupported, standardComment, leadSource, leadStatus, linkedInProfile, ownershipId, createdBy: userId, updatedBy: userId
        }, {
            raw: true
        }).then(async (result) => {
            await Client.update({ isContact: 1 }, { where: { id: clientId } })
            const { id } = result;

            if (note && noteSource) {
                await ContactNote.create({
                    contactId: id,
                    note,
                    nextFollowUpDateTime,
                    timezone,
                    noteSource,
                    createdBy: userId,
                    updatedBy: userId
                })
            }

            // if(note && noteSource){
            //     ContactNoteRead.create({
            //         createdBy:userId,
            //         updatedBy:userId,
            //         contactNoteId:id
            //     })
            // }
            return res.status(200).send({
                success: true,
                message: "Contact created successfully",
                data: result,
            });
        }).catch((error) => {
            return res.status(200).send({
                success: false,
                message: "Contact not created",
                error,
            });
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Internal server error, while creating a Contact",
        });
    }
};

module.exports = { createContact };





