const moment = require('moment');
const ContactNote = require('../../../sequelize/models/contactNote');
const { Op } = require('sequelize');
const sequelize = require('../../../sequelize/config/sequelize');
const User = require('../../../sequelize/models/user');
const Contact = require('../../../sequelize/models/contact');
const ContactNoteRead = require('../../../sequelize/models/contactNoteRead');
const ContactNoteLabel = require('../../../sequelize/models/contactNoteLabel');
const ContactLabel = require('../../../sequelize/models/contactLabel');

const nextFollowUpdateNotification = async (req, res) => {
    try {
        const today = moment().tz('America/Chicago').startOf('day').format('YYYY-MM-DD HH:mm:ss');
        const startAt = moment.tz(today, 'America/Chicago').startOf('day').format('YYYY-MM-DD HH:mm:ss');
        const endAt = moment.tz(today, 'America/Chicago').endOf('day').format('YYYY-MM-DD HH:mm:ss');
        const role = req.user.role
        const userId = req.user.id
        const userIds = req.body.userIds

        let userSearchWhere = {};
        if (userIds.length > 0 && role == 0) {
            userSearchWhere = {
                createdBy: {
                    [Op.in]: userIds
                }
            }
        }

        if (role == 1) {
            userSearchWhere = {
                ...userSearchWhere,
                createdBy: userId
            }
        }

        if (role == 0) {
            userSearchWhere = {
                ...userSearchWhere
            }
        }

        ContactNote.findAndCountAll({
            where: {
                ...userSearchWhere,
                isDeleted: false,
                "$ContactNoteReadByData.isDone$": false,
                nextFollowUpDateTime: {
                    [Op.gte]: startAt,
                    [Op.lte]: endAt,
                },
            },
            order: [["updatedAt", 'DESC']],
            attributes: {
                include: [
                    "*",
                    ["createdBy", "createdById"],
                    ["updatedBy", "updatedById"],
                    [sequelize.fn('CONCAT', sequelize.col("createdByData.firstName"), ' ', sequelize.col("createdByData.lastName")), "createdBy"],
                    [sequelize.fn("CONCAT", sequelize.col("updatedByData.firstName"), ' ', sequelize.col("updatedByData.lastName")), "updatedBy"],
                    [sequelize.fn("CONCAT", sequelize.col("contactNotesData.firstName"), ' ', sequelize.col("contactNotesData.lastName")), "contactName"]
                ]
            },
            include: [
                {
                    model: User,
                    as: "createdByData",
                    attributes: []
                },
                {
                    model: User,
                    as: "updatedByData",
                    attributes: []
                },
                {
                    model: Contact,
                    as: "contactNotesData",
                    attributes: []
                },
                {
                    model: ContactNoteRead,
                    as: "ContactNoteReadByData",
                    attributes: []
                },
                {
                    model: ContactNoteLabel,
                    as: "contactNoteLabels",
                    attributes: ["id"],
                    include: [
                        {
                            model: ContactLabel,
                        }
                    ],
                },
            ]
        }).then(({ count, rows }) => {
            const modifiedRows = JSON.parse(JSON.stringify(rows))?.map((row) => {
                const singleLabels = row?.contactNoteLabels?.map((label) => {
                    return label?.ContactLabel?.labelName
                })
                return {
                    ...row,
                    contactNoteLabels: singleLabels || []
                }
            })
            return res.status(200)
                .send({
                    success: true,
                    message: "Notification Loaded",
                    data: modifiedRows
                })
        }).catch(() => {
            return res.status(200)
                .send({
                    success: true,
                    message: "Notification Not Found",
                    data: []
                })
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Internal Server Error",
            error: error,
        });
    }
}

module.exports = nextFollowUpdateNotification;  