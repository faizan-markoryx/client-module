const { Op } = require("sequelize");
const sequelize = require("../../../sequelize/config/sequelize");
const ContactNote = require("../../../sequelize/models/contactNote");
const User = require("../../../sequelize/models/user");
const moment = require("moment-timezone");
const { pagination } = require("../../../services/pagination/pagination");
const ContactNoteLabel = require("../../../sequelize/models/contactNoteLabel");
const ContactLabel = require("../../../sequelize/models/contactLabel");
const Contact = require("../../../sequelize/models/contact");
const ContactNoteRead = require("../../../sequelize/models/contactNoteRead");

const allContactNoteList = async (req, res) => {
    try {

        const { createdBy, isExport = false } = req.body
        const { startDate = "", endDate = "" } = req.body?.updatedAt
        const page = req.body?.page ? parseInt(req.body.page) : 1;
        const perPage = req.body?.perPage ? parseInt(req.body.perPage) : 10;
        const startAt = moment.tz(startDate, 'America/Chicago').startOf('day').format('YYYY-MM-DD HH:mm:ss');
        const endAt = moment.tz(endDate, 'America/Chicago').endOf('day').format('YYYY-MM-DD HH:mm:ss');

        let noteSearchQuery = {
            isDeleted: false,
        }
        if (createdBy?.length > 0 && startDate && endDate) {
            noteSearchQuery = {
                ...noteSearchQuery,
                createdBy: { [Op.in]: createdBy },
                [Op.and]: [
                    sequelize.literal(`convert_TZ(ContactNote.updatedAt, '+00:00', '-05:00') >= '${startAt}'`),
                    sequelize.literal(`convert_TZ(ContactNote.updatedAt, '+00:00', '-05:00') <= '${endAt}'`)
                ],
            }
        } else if (createdBy?.length > 0 && !startDate && !endDate) {
            noteSearchQuery = {
                ...noteSearchQuery,
                createdBy: { [Op.in]: createdBy },
            }
        } else if (createdBy?.length == 0 && startDate != "" && endDate != "") {
            noteSearchQuery = {
                ...noteSearchQuery,
                [Op.and]: [
                    sequelize.literal(`convert_TZ(ContactNote.updatedAt, '+00:00', '-05:00') >= '${startAt}'`),
                    sequelize.literal(`convert_TZ(ContactNote.updatedAt, '+00:00', '-05:00') <= '${endAt}'`)
                ]
            }
        }

        if (!isExport) {
            const normalMainQuery = {
                where: noteSearchQuery,
                attributes: {
                    include: [
                        // "*",
                        // [sequelize.fn("concat", sequelize.col("createdByData.firstName"), '', sequelize.col("createdByData.lastName")), "fullName"],
                        // [sequelize.literal("createdByData.firstName", "firstName"), "firstName"],
                        // [sequelize.literal("createdByData.lastName", "lastName"), "lastName"],
                        [sequelize.literal(`convert_TZ(ContactNote.createdAt, '+00:00', '-05:00')`), 'CST_createdAt'],//                    convert the createdAt column to the desired timezone
                        [sequelize.literal(`convert_TZ(ContactNote.updatedAt, '+00:00', '-05:00')`), 'CST_updatedAt'],//                    convert the updatedAt column to the desired timezone

                    ]
                },
                include: [
                    {
                        model: User,
                        attributes: ["firstName", "lastName"],
                        as: "createdByData",
                        // required: false
                    },
                    {
                        model: User,
                        attributes: ["firstName", "lastName"],
                        as: "updatedByData",
                        // required: false
                    },
                    {
                        model: Contact,
                        attributes: [
                            "firstName",
                            "lastName",
                        ],
                        as: "contactNotesData",

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
                ],
                order: [['updatedAt', 'DESC']]
            };

            await ContactNote.findAndCountAll({
                ...normalMainQuery,
                offset: (page - 1) * perPage,
                limit: perPage,
                distinct: true,
                // raw: true,
                // nest: true
            }).then(({ count, rows }) => {
                const modifiedRows = JSON.parse(JSON.stringify(rows))?.map((row) => {
                    const userNames = {
                        firstName: "",
                        lastName: ""
                    }
                    const { firstName = "", lastName = "" } = row?.createdByData || userNames;
                    const { firstName: updatedFirstName = "", lastName: updatedLastName = "" } = row?.updatedByData || userNames;
                    const { firstName: contactFirstName = "", lastName: contactLastName = "" } = row?.contactNotesData || userNames;
                    delete row?.createdByData
                    delete row?.updatedByData
                    delete row?.contactNotesData
                    delete row?.createdBy
                    const singleLabels = row?.contactNoteLabels?.map((label) => {
                        return label?.ContactLabel?.labelName
                    })
                    return {
                        ...row,
                        createdBy: firstName ? `${firstName || ""} ${lastName || ""}` : "",
                        updatedBy: updatedFirstName ? `${updatedFirstName || ""} ${updatedLastName || ""}` : "",
                        contactName: contactFirstName ? `${contactFirstName || ""} ${contactLastName || ""}` : "",
                        contactNoteLabels: singleLabels || []
                    }
                })
                const data = pagination({
                    data: modifiedRows,
                    count,
                    page,
                    perPage,
                });
                return res.status(200).send({
                    success: true,
                    message: "Today Targeted Managers List retrieved successfully.",
                    data
                });
            })
        } else {

            const exportMainQuery = {
                where: noteSearchQuery,
                attributes: {
                    include: [
                        ['updatedAt', 'lastFollowUpDateTime'],
                        // "*",
                        // [sequelize.fn("concat", sequelize.col("createdByData.firstName"), '', sequelize.col("createdByData.lastName")), "fullName"],
                        // [sequelize.literal("createdByData.firstName", "firstName"), "firstName"],
                        // [sequelize.literal("createdByData.lastName", "lastName"), "lastName"],
                        [sequelize.literal(`convert_TZ(ContactNote.createdAt, '+00:00', '-05:00')`), 'CST_createdAt'],//                    convert the createdAt column to the desired timezone
                        [sequelize.literal(`convert_TZ(ContactNote.updatedAt, '+00:00', '-05:00')`), 'CST_updatedAt'],//                    convert the updatedAt column to the desired timezone

                    ]
                },
                include: [
                    {
                        model: User,
                        attributes: ["firstName", "lastName"],
                        as: "createdByData",
                        // required: false
                    },
                    {
                        model: User,
                        attributes: ["firstName", "lastName"],
                        as: "updatedByData",
                        // required: false
                    },
                    {
                        model: Contact,
                        attributes: [
                            "firstName",
                            "lastName",
                            "email",
                            "phone1",
                            "country",
                            "ownershipId",
                            "standardComment"
                        ],
                        as: "contactNotesData",
                        include: [
                            {
                                model: User,
                                attributes: ['firstName', 'lastName'],
                                as: "ownershipByData",
                            },
                        ]

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
                    {
                        model: ContactNoteRead,
                        attributes: ["isDone"],
                        as: "ContactNoteReadByData",
                    },

                ],
                order: [['updatedAt', 'DESC']]
            };


            const totalCount = await ContactNote.count(exportMainQuery);
            let exportedData = [];

            const perPage = 500; // Adjust the number of records per page as per your requirements
            const totalPages = Math.ceil(totalCount / perPage);

            for (let currentPage = 1; currentPage <= totalPages; currentPage++) {
                const rows = await ContactNote.findAll({
                    ...exportMainQuery,
                    offset: (currentPage - 1) * perPage,
                    limit: perPage,
                    raw: false,
                    nest: true,
                });

                const modifiedRows = JSON.parse(JSON.stringify(rows))?.map((row) => {
                    const userNames = {
                        firstName: "",
                        lastName: ""
                    };
                    const { firstName = "", lastName = "" } = row?.createdByData || userNames;
                    const { firstName: updatedFirstName = "", lastName: updatedLastName = "" } = row?.updatedByData || userNames;
                    const { firstName: contactFirstName = "", lastName: contactLastName = "" } = row?.contactNotesData || userNames;
                    const { firstName: ownershipFirstName = "", lastName: ownershipLastName = "" } = row?.contactNotesData?.ownershipByData || userNames;
                    delete row?.createdByData;
                    delete row?.updatedByData;
                    delete row?.createdBy;
                    const singleLabels = row?.contactNoteLabels?.map((label) => {
                        return label?.ContactLabel?.labelName;
                    });
                    return {
                        ...row,
                        createdBy: firstName ? `${firstName || ""} ${lastName || ""}` : "",
                        updatedBy: updatedFirstName ? `${updatedFirstName || ""} ${updatedLastName || ""}` : "",
                        contactName: contactFirstName ? `${contactFirstName || ""} ${contactLastName || ""}` : "",
                        ownership: ownershipFirstName ? `${ownershipFirstName || ""} ${ownershipLastName || ""}` : "",
                        contactNoteLabels: singleLabels || [],
                        email: row?.contactNotesData?.email || "",
                        phone1: row?.contactNotesData?.phone1 || "",
                        country: row?.contactNotesData?.country || "",
                        standardComment: row?.contactNotesData?.standardComment || "",
                        read: row?.ContactNoteReadByData?.isDone || false,
                    };
                });

                exportedData = exportedData.concat(modifiedRows);
            }
            if (exportedData == 0) {
                return res.status(200).send({
                    success: false,
                    message: "Contact data not found"
                });
            }
            const paginatedData = pagination({
                data: exportedData,
                count: totalCount,
                page,
                perPage,
            });
            return res.status(200).send({
                success: true,
                message: "Contact data exported successfully",
                data: paginatedData,
            });
        }
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Internal Server Error while getting contact notes List.",
            error
        });
    }
};

module.exports = { allContactNoteList };