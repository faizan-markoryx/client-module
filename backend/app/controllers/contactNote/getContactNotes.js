const sequelize = require("../../../sequelize/config/sequelize");
const ContactLabel = require("../../../sequelize/models/contactLabel");
const ContactNote = require("../../../sequelize/models/contactNote");
const ContactNoteLabel = require("../../../sequelize/models/contactNoteLabel");
const User = require("../../../sequelize/models/user");
const { pagination } = require("../../../services/pagination/pagination");

const getContactNote = (req, res) => {
    try {

        const { contactId } = req.params;
        const page = req.body?.page ? parseInt(req.body.page) : 1;
        const perPage = req.body?.perPage ? parseInt(req.body.perPage) : 10;

        ContactNote.findAndCountAll({
            where: { contactId, isDeleted: false },
            attributes: {
                include: [
                    "*",
                    ["createdBy", "createdById"],
                    ["updatedBy", "updatedById"],
                    [sequelize.fn("concat", sequelize.col("createdByData.firstName"), ' ', sequelize.col("createdByData.lastName")), "createdBy"],
                    [sequelize.fn("concat", sequelize.col("updatedByData.firstName"), ' ', sequelize.col("updatedByData.lastName")), "updatedBy"]
                ]
            },
            include: [
                {
                    model: User,
                    attributes: [],
                    as: "createdByData"
                },
                {
                    model: User,
                    attributes: [],
                    as: "updatedByData"
                },
                {
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

            ],
            // raw: true,
            // nest: true
        }).then(({ rows, count }) => {

            const modifiedRows = JSON.parse(JSON.stringify(rows))?.map((row) => {
                const singleLabels = row?.contactNoteLabels?.map((label) => {
                    return label?.ContactLabel?.labelName
                })
                return {
                    ...row,
                    contactNoteLabels: singleLabels || []
                }
            })
            // const data = pagination({
            //     data: modifiedRows,
            //     count,
            //     page,
            //     perPage,
            // });
            return res.status(200).send({
                success: true,
                message: "Contact Notes Loaded",
                data: modifiedRows,
            });
        }).catch((error) => {
            return res.status(200).send({
                success: false,
                message: "Contact Note Not Created.",
                error
            })
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal Server Error, While Creating a Note",
        })
    }
}

module.exports = getContactNote