const sequelize = require('sequelize')
const ClientNote = require('../../../sequelize/models/clientNote')
const Client = require('../../../sequelize/models/client')
const User = require('../../../sequelize/models/user')

const getClientNote = async(req, res)=>{
    try {
        const {clientId} = req.params
        ClientNote.findAll({
            where:{
                isDeleted:false,
                clientId
            },
            attributes:{
                include:[
                    "*",
                    ["createdBy","createdById"],
                    ["updatedBy","updatedById"],
                    [sequelize.fn("concat", sequelize.col("createdByData.firstName"), ' ', sequelize.col("createdByData.lastName")), "createdBy"],
                    [sequelize.fn("concat", sequelize.col("updatedByData.firstName"), ' ', sequelize.col("updatedByData.lastName")), "updatedBy"],
                    [sequelize.col("clientNameData.clientName"), "clientName"],
                ]
            },
            include:[
                {
                    model:Client,
                    as:"clientNameData",
                    attributes:[]
                },
                {
                    model:User,
                    as:"createdByData",
                    attributes:[]
                },
                {
                    model:User,
                    as:"updatedByData",
                    attributes:[]
                }
            ]
        }).then((result)=>{
            return res.status(200)
            .send({
                success:true,
                message:"Get Client Notes",
                data:result
            })
        }).catch(()=>{
            return res.status(200)
            .send({
                success:false,
                message:"Client Notes Failed"
            })
        })
    } catch (error) {
        return res.status(500).
        send({
            success:false,
            message:"Internal Server Error",
            error:error
        })
    }   
}

module.exports = getClientNote;