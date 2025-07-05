
const Contact = require("../../../sequelize/models/contact");
const { pagination } = require("../../../services/pagination/pagination");


const getContact = async (req, res) => {
    try {
        const page = req.body?.page ? parseInt(req.body.page) : 1;
        const perPage = req.body?.perPage ? parseInt(req.body.perPage) : 10;
        await Contact.findAndCountAll(
            {
                offset: (page - 1) * perPage,
                limit: perPage,
                distinct: true,
            },
            {
                where: { isDeleted: false }
            }
        ).then(({ rows, count }) => {
            const data = pagination({
                data: rows,
                count,
                page,
                perPage,
            });
            return res.status(200).send({
                success: true,
                message: "Contact data get successfully",
                data,
            });
        }).catch((error) => {
            return res.status(200).send({
                success: false,
                message: "Contact data not found",
                error,
            });
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Internal server error, while get a Contact",
        });
    }

}

module.exports = { getContact }