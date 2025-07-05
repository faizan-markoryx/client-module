const Client = require('../../../sequelize/models/client');
const User = require('../../../sequelize/models/user');
// const sequelize = require('sequelize')
// const clientOwnershipChangeEmail = require('../../../services/emailServices/contactOwnershipChangeEmail')

const updateClient = async (req, res) => {
    try {
        const userId = req.user.id
        const id = req.body.id

        // const newOwnership = req.body.ownership;
        // const oldOwnership = await Client.findByPk(id,{
        //     where: {
        //         ownershipId: id
        //     }
        // })
        // if (oldOwnership.ownership !== newOwnership) {
        //     const getUsersData = await User.findAll({
        //         where: {
        //             isActive: true,
        //             role: ["0", "1"]
        //         },
        //         raw: true,
        //     })
        //     getUsersData.forEach(async (userData) => {
        //         const oldOwner = await User.findByPk(oldOwnership.ownership);
        //         const newOwner = await User.findByPk(newOwnership);
        //         const currentUser = await User.findByPk(userId);
        //         const oldOwnershipName = await User.findOne({
        //             where: {
        //                 id: oldOwner.id
        //             },
        //             attributes:{ 
        //                 include:[
        //                     [sequelize.literal('CONCAT(firstName, " ", lastName)'), 'fullName']
        //                 ]
        //             },
        //         });
        //         const newOwnershipName = await User.findOne({
        //             where:{
        //                 id: newOwner.id
        //             },
        //             attributes:{
        //                 include:[
        //                     [sequelize.literal('CONCAT(firstName, " ", lastName)'), "fullName"]
        //                 ]
        //             }
        //         });
        //         const currentUserName = await User.findOne({
        //             where:{
        //                 id: currentUser.id
        //             },
        //             attributes:{
        //                 include:[
        //                     [sequelize.literal('CONCAT(firstName, " ", lastName)'), "fullName"]
        //                 ]
        //             }
        //         })
        //         const currentUsersName = currentUserName.fullName
        //         const oldOwnershipsName = oldOwnershipName.fullName
        //         const newOwnershipsName = newOwnershipName.fullName
        //         clientOwnershipChangeEmail(userData.email,currentUsersName, oldOwnershipsName, newOwnershipsName);
        //     })
        // }
        const {
            clientName,
            websiteUrl,
            ownership,
            city,
            state,
            country,
            industry,
            paymentTerm,
            category,
            clientStatus,
        } = req.body;
        Client.update({
            updatedBy: userId, clientName, websiteUrl, ownership, city,
            state, country, industry, paymentTerm, category, clientStatus
        }, { where: { id: id } }).then((result) => {
            return res.status(200)
                .send({
                    success: true,
                    message: "Client Updated Successfully",
                    data: result
                })
        }).catch((err) => {
            return res.status(400)
                .send({
                    success: false,
                    message: "Client Not Updated",
                    error: err
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

module.exports = updateClient;