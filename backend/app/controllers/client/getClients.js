const Client = require('../../../sequelize/models/client')

const getClients = async (req, res) => {
    try {
        Client.findAll({
            where: {
                // isContact:true,
                isDeleted: false
            },
            attributes: ['id', 'clientName'],
            order: [['id', 'DESC']]
        }).then((result) => {
            return res.status(200)
                .send({
                    success: true,
                    message: "Client Get Successfully",
                    data: result
                })
        }).catch(() => {
            return res.status(200)
                .send({
                    success: false,
                    message: "Client Data Failed",
                    data: []
                })
        })
    } catch (error) {
        return res.status(500)
            .send({
                success: false,
                message: "Internal Server Error",
                error: error
            })
    }
}

module.exports = getClients;