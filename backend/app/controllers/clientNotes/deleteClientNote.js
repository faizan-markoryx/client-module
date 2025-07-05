const ClientNote = require('../../../sequelize/models/clientNote')

const deleteClientNote = async (req, res) => {
    try {
        const clientNoteId = parseInt(req.params.clientNoteId)
        if (Number.isNaN(clientNoteId)) return res.status(400).end()

        const findByID = await ClientNote.findOne({ where: {id:clientNoteId} })
        if (!findByID) {
            return res.status(400).send({ success: false, message: "Client Note Not Found" })
        }

        ClientNote.update({ isDeleted: 1 }, { where: { id:clientNoteId } }).then((result) => {
            return res.status(200).
                send({
                    success: true,
                    message: "Client Note Deleted Successfully",
                    result
                })
        }).catch((err) => {
            return res.status(200).
                send({
                    success: false,
                    message: "Client Notes Not Deleted",
                    err
                })
        })

    } catch (error) {
        return res.status(500).
            send({
                success: false,
                message: "Internal Server Error",
                error: error
            })
    }
}

module.exports = deleteClientNote;