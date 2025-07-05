const ContactNoteRead = require('../../../sequelize/models/contactNoteRead')

const contactNoteRead = async(req, res)=>{
    try {
        const userId = req.user.id
        const { contactNoteId, isDone } = req.body;
        ContactNoteRead.update({updatedBy:userId,isDone},{where:{contactNoteId}}).then((result)=>{
            return res.status(200)
            .send({
                success:true,
                message: "Contact Note Read Successfully",
                data:result
            })
        }).catch(()=>{
            return res.status(200)
            .send({
                success:false,
                message:"Contact Note Not Read"
            })
        })
    } catch (error) {
        return res.status(500)
        .send({
            success: false,
            message: "Internal Server Error"
        })
    }
}

module.exports = contactNoteRead;