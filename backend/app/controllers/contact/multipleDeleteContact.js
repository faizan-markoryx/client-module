const Contact = require("../../../sequelize/models/contact");

const multipleDeleteContact = async (req, res) => {

    try {
        const { id } = req.body;
        await Contact.update({
            isDeleted: true
        }, {
            where: {
                id,
                isDeleted: false
            }
        }).then((data) => {
            return res.status(200).send({
                success: true,
                message: "Contact Delete successfully",
                data,
            });
        })
            .catch((error) => {
                return res.status(200).send({
                    success: false,
                    message: "Contact not Delete",
                    error,
                });
            });
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Internal server error, while creating a Contact Delete",
        });
    }

}
module.exports = { multipleDeleteContact }




