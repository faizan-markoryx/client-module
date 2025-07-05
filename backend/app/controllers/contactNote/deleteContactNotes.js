const ContactNote = require("../../../sequelize/models/contactNote");

const deleteContactNote = (req, res) => {
    try {

        const { noteId } = req.params;
        const { id: userId } = req.user;

        ContactNote.update({ isDeleted: true, updatedBy: userId }, {
            where: { id: noteId, isDeleted: false },
        }).then((data) => {
            return res.status(200).send({
                success: true,
                message: "Contact Note Deleted Successfully",
                data,
            });
        }).catch((error) => {
            return res.status(200).send({
                success: false,
                message: "Contact Note Not Deleted",
                error
            })
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal Server Error, While Deleting a Note",
        })
    }
}

module.exports = deleteContactNote