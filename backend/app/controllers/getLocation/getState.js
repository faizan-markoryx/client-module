const { QueryTypes } = require('sequelize');
const sequelize = require('../../../sequelize/config/sequelize');

const getState = async(req, res)=>{
    try {
        const stateQuery = await sequelize.query(
            'SELECT * FROM states WHERE country_id = "' + req.body.countryId + '"',
            { type: QueryTypes.SELECT}
        );
        return res.json({
            success:true,
            message:"State By Country Get Successfully",
            states:stateQuery
        })
    } catch (error) {
        return res.status(500)
        .send({ 
            success:false,
            message:"Internal Server Error",
            error:error
        })
    }
}

module.exports = getState;