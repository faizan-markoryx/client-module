const { Op } = require("sequelize");
const Contact = require("../../../sequelize/models/contact");

const contactBulkOwnershipDelete = async (req, res) => {
    try {
        const { email } = req.body;

        Contact.update(
            {
                isDeleted: true,
            },
            {
                where: {
                    email: {
                        [Op.in]: email,
                    },
                },
            }
        ).then((data) => {
            return res.status(200).send({
                success: true,
                message: "Data Deleted Successfully",
                data
            });
        }).catch((error) => {
            return res.status(500).send({
                success: false,
                message: "Internal Server Error",
                error,
            });
        });

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Internal Server Error"
        });
    }
};


module.exports = { contactBulkOwnershipDelete }