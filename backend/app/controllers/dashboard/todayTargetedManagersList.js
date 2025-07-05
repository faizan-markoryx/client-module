const { Op, literal } = require("sequelize");
const sequelize = require("../../../sequelize/config/sequelize");
const ContactNote = require("../../../sequelize/models/contactNote");
const User = require("../../../sequelize/models/user");
const moment = require("moment-timezone");

const todayTargetedManagersList = async (req, res) => {
    try {
        const today = moment().tz('America/Chicago').startOf('day').format('YYYY-MM-DD HH:mm:ss');
        const startAt = moment.tz(today, 'America/Chicago').startOf('day').format('YYYY-MM-DD HH:mm:ss');
        const endAt = moment.tz(today, 'America/Chicago').endOf('day').format('YYYY-MM-DD HH:mm:ss');

        await ContactNote.count({
            where: {
                isDeleted: false,
                [Op.and]: [
                    sequelize.literal(`convert_TZ(ContactNote.updatedAt, '+00:00', '-05:00') >= '${startAt}'`),
                    sequelize.literal(`convert_TZ(ContactNote.updatedAt, '+00:00', '-05:00') <= '${endAt}'`)
                ]
            },
            attributes: {
                include: [
                    "*",
                    [sequelize.fn("concat", sequelize.col("updatedByData.firstName"), ' ', sequelize.col("updatedByData.lastName")), "userName"],

                    [literal(`convert_TZ(createdAt, '+00:00', '-05:00')`), 'converted_created_at'], // convert the createdAt column to the desired timezone
                    [literal(`convert_TZ(updatedAt, '+00:00', '-05:00')`), 'converted_updated_at'], // convert the updatedAt column to the desired timezone
                ]
            },
            include: [
                {
                    model: User,
                    attributes: [],
                    as: "updatedByData"
                },
            ],
            group: ["updatedByData.id", "updatedByData.firstName", "updatedByData.lastName"],
            order: [[sequelize.literal('count(*)'), 'DESC']], // Order by count DESC
            raw: true,
        }).then((data) => {
            const modifiedData = data?.map((ele) => {
                const { firstName = "", lastName = "" } = ele;
                delete ele?.firstName;
                delete ele?.lastName;
                return {
                    ...ele,
                    fullName: firstName + " " + lastName
                };
            });
            modifiedData.sort((a, b) => b.count - a.count);
            return res.status(200).send({
                success: true,
                message: "Today Targeted Managers List retrieved successfully.",
                data: modifiedData
            });
        }).catch((error) => {
            return res.status(200).send({
                success: false,
                message: "Failed to retrieve Today Targeted Managers List.",
                error
            });
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Internal Server Error while getting Today Targeted Managers List.",
        });
    }
};

module.exports = { todayTargetedManagersList };













