const ClientNote = require('../../../sequelize/models/clientNote')

const addClientNote = async(req, res)=>{
    try {
        const userId = req.user.id
        const { clientId, note} = req.body;
        ClientNote.create({ clientId,createdBy:userId, updatedBy:userId, note }).then((result)=>{
            return res.status(200).
            send({ 
                success:true, 
                message:"Client Notes Added Successfully", 
                data:result
            })
        }).catch((err)=>{
            return res.status(200).
            send({ 
                success:true, 
                message:"Client Notes Failed", 
                err:err
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

module.exports = addClientNote;