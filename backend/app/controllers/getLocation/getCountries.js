const { QueryTypes } = require('sequelize');
const sequelize = require('../../../sequelize/config/sequelize');

const getCountries = async (req, res) => {
    try {
        const countriesQuery = await sequelize.query(
            "SELECT * FROM countries ORDER BY id desc",
            { type: QueryTypes.SELECT }
        );
        return res.status(200).send({
            success: true,
            message: "Country Get Successfully",
            data: countriesQuery
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

module.exports = getCountries;