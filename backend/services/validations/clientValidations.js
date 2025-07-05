const { check } = require('express-validator')
const Client = require('../../sequelize/models/client')
const {Op} = require("sequelize")

const addClientValidation = [
    check('websiteUrl', 'Websiter url is required').not().isEmpty(),
    check('ownership', 'Ownership is required').not().isEmpty(),
    check('clientName', 'Please Enter Your Client Name').not().notEmpty().custom((value, { req }) => {
        if (!value) return false;
        return new Promise((resolve, reject) => {
            Client.findOne({
                where: {
                    clientName: req.body.clientName,
                }
            }).then((result) => {
                if (result) {
                    return reject(new Error("Client Name Alredy Exists"))
                } else {
                    return resolve(true)
                }
            }).catch(() => {
                reject(new Error("Internal Server Error"))
            })
        })
    }),
]

const updateClientValidation = [
    check('websiteUrl', 'Websiter url is required').not().isEmpty(),
    check('ownership', 'Ownership is required').not().isEmpty(),
    check("clientName", "Please Enter Your Client Name").not().notEmpty().isLength({min:3}).custom((value, {req})=>{
        if(!value) return false;
        return new Promise((resolve, reject)=>{
            Client.findOne({
                where:{
                    id:{
                        [Op.ne]:req.body.id
                    },
                    clientName:req.body.clientName
                }
            }).then((result)=>{
                if(result){
                    return reject(new Error("Client Name Alredy Exists"))
                }else{
                    resolve(true)
                }
            }).catch(()=>{
                return reject(new Error("Internal Server Error"))
            })
        })
    })
]
module.exports = { addClientValidation,updateClientValidation }