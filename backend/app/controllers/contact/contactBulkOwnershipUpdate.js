const { Op } = require("sequelize");
const Contact = require("../../../sequelize/models/contact");

const contactBulkOwnershipUpdate = async (req, res) => {
    try {
        const { email, ownershipId } = req.body;

        Contact.update(
            {
                ownershipId,
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
                message: "Ownership Data Updated Successfully",
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


module.exports = { contactBulkOwnershipUpdate }