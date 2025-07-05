const { QueryTypes } = require('sequelize');
const sequelize = require('../../../sequelize/config/sequelize');

const getCities = async(req, res)=>{
    try {
        const citiesQuery = await sequelize.query(
            'SELECT * FROM cities WHERE state_id ="' + req.body.stateId + '"',
            { type: QueryTypes.SELECT }
        );
        return res.json({
            success:true,
            message:"Cities Get Successfully",
            cities:citiesQuery
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

module.exports = getCities;