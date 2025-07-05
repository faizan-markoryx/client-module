
const sequelize = require("../../../sequelize/config/sequelize");
const Contact = require("../../../sequelize/models/contact");

const getContactManagerList = async (req, res) => {
    try {
        const { clientId } = req.params
        await Contact.findAll(
            {
                where: { clientId, isDeleted: false },
                attributes: [
                    "id", "email",
                    [sequelize.literal(`CONCAT(firstName, ' ', lastName)`), 'fullName']
                ],
            },
        ).then((data) => {
            return res.status(200).send({
                success: true,
                message: "Contact Manager List Loaded",
                data,
            });
        }).catch((error) => {
            return res.status(200).send({
                success: false,
                message: "Contact Manager List Not Loaded",
                error,
            });
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Internal server error, while getting Contact Manager List",
        });
    }

}

module.exports = { getContactManagerList }