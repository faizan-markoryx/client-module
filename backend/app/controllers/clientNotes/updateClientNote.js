const ClientNote = require('../../../sequelize/models/clientNote')

const updateClientNote = async (req, res) => {
    try {
        const id = req.body.id
        const userId = req.user.id
        const { clientId, note } = req.body;
        ClientNote.update({ clientId, createdBy: userId, updatedBy: userId, note }, { where: { id: id } }).then((result) => {
            return res.status(200).
                send({
                    success: true,
                    message: "Client Notes Updated Successfully",
                    data: result
                })
        }).catch((err) => {
            return res.status(200).
                send({
                    success: false,
                    message: "Client Notes Not Updated.",
                    err: err
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

module.exports = updateClientNote;