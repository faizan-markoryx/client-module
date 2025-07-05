const Contact = require("../../../sequelize/models/contact");
const User = require('../../../sequelize/models/user')
const sequelize = require('sequelize')
const contactOwnershipChangeEmail = require('../../../services/emailServices/contactOwnershipChangeEmail')

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

const updateContact = async (req, res) => {
    try {
        const { id, clientId, firstName, lastName, title, reportingManagerId, contactTimeZone, phone1, phone2, phone3, email, alternateEmail, city, state, country, unit, endClient, skillsSupported, standardComment, leadSource, linkedInProfile, ownershipId } = req.body
        const userId = req.user.id;
        const newOwnership = req.body.ownershipId;
        const oldOwnership = await Contact.findByPk(id, {
            where: {
                ownership: id
            }
        })
        if (oldOwnership?.ownershipId != newOwnership) {
            const getUsersData = await User.findAll({
                where: {
                    isActive: true,
                    role: ["0", "1"]
                },
                raw: true,
            })
            getUsersData.forEach(async (userData) => {
                const oldOwnershipName = await User.findOne({
                    where: {
                        id: oldOwnership.ownershipId
                    },
                    attributes: {
                        include: [
                            [sequelize.literal('CONCAT(firstName, " ", lastName)'), 'fullName']
                        ]
                    },
                });
                const newOwnershipName = await User.findOne({
                    where: {
                        id: newOwnership
                    },
                    attributes: {
                        include: [
                            [sequelize.literal('CONCAT(firstName, " ", lastName)'), "fullName"]
                        ]
                    }
                });
                const currentUserName = await User.findOne({
                    where: {
                        id: userId
                    },
                    attributes: {
                        include: [
                            [sequelize.literal('CONCAT(firstName, " ", lastName)'), "fullName"]
                        ]
                    }
                })
                const currentUsersName = currentUserName.fullName
                const oldOwnershipsName = oldOwnershipName.fullName
                const newOwnershipsName = newOwnershipName.fullName
                if (userData.role == 1) {
                    contactOwnershipChangeEmail(userData.email, currentUsersName, oldOwnershipsName, newOwnershipsName)
                }
            })
        }

        let leadStatus = "New Lead"

        if (standardComment) {
            if (arr1.includes(standardComment)) {
                leadStatus = "Working"
            } else if (arr2.includes(standardComment)) {
                leadStatus = "Not Working"
            }
        }

        Contact.update({
            clientId, firstName, lastName, title, reportingManagerId, contactTimeZone, phone1, phone2, phone3, email, alternateEmail, city, state, country, unit, endClient, skillsSupported, standardComment, leadStatus, leadSource, linkedInProfile, ownershipId, updatedBy: userId
        }, { where: { id } }).then((data) => {
            return res.status(200).send({
                success: true,
                message: "Contact update successfully",
                data,
            });
        }).catch((error) => {
            return res.status(200).send({
                success: false,
                message: "Contact not update",
                error,
            });
        });
    } catch (error) {
        console.log("error", error);
        return res.status(500).send({
            success: false,
            message: "Internal server error, while creating a Contact update",
        });
    }
};

module.exports = { updateContact };









