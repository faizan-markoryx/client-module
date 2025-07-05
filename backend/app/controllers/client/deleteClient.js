const Client = require('../../../sequelize/models/client')

const deleteClient = async(req, res)=>{
    try {
        const id = parseInt(req.params.id);
        if(Number.isNaN(id)) return res.status(400).end();

        const findByID = await Client.findOne({ where:id})
        if(!findByID){
            return res.status(400).send({ success:false, message:"Client Not Found"})
        }
        Client.update({ isDeleted:1},{where:{id:id}}).then((result)=>{
            return res.status(200).
            send({ 
                success:true, 
                message:"Client Deleted Successfully", 
                data:result
            })
        }).catch(()=>{
            return res.status(200).
            send({ 
                success:false, 
                message:"Client Not Deleted"
            })
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({ success:false, message:"Internal Server Error", error:error})
    }    
}

module.exports = deleteClient;