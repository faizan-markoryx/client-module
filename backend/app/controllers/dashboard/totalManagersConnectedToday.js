const { Op } = require("sequelize");
const ContactNote = require("../../../sequelize/models/contactNote");
const moment = require("moment/moment");
const sequelize = require("../../../sequelize/config/sequelize");

const totalManagersConnectedToday = async (req, res) => {
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
        }).then((data) => {
            return res.status(200).send({
                success: true,
                message: "Total Managers Connected Today get data Successfully.",
                data: data || []
            })
        }).catch((error) => {
            return res.status(200).send({
                success: false,
                message: "Total Managers Connected Today not get data.",
                error
            })
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Internal Server Error, While Gating a Today Targeted Managers List",
        })
    }
}

module.exports = { totalManagersConnectedToday }