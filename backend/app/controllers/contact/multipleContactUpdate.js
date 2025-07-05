const { Op } = require("sequelize");
const Contact = require("../../../sequelize/models/contact");

const multipleContactUpdate = async (req, res) => {
    try {
        const { id, standardComment, ownershipId } = req.body;
        let updatedFilde = {}

        if (standardComment && ownershipId == "") {
            updatedFilde = {
                ...updatedFilde,
                standardComment
            }
        }
        if (standardComment == "" && ownershipId) {
            updatedFilde = {
                ...updatedFilde,
                ownershipId
            }
        }
        if (standardComment && ownershipId) {
            updatedFilde = {
                ...updatedFilde,
                standardComment,
                ownershipId
            }
        }
        await Contact.update(
            updatedFilde,
            {
                where: {
                    id: { [Op.in]: id, }
                },
            }
        ).then((data) => {
            return res.status(200).send({
                success: true,
                message: "StandardComment and Ownership Data Updated Successfully",
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


module.exports = { multipleContactUpdate }