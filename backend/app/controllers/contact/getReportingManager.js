const Contact = require("../../../sequelize/models/contact");

const getReportingManager = async (req, res) => {
    try {


        await Contact.findOne({
            where: { id: req.params.id, }
        }).then((data) => {
            return res.status(200).send({
                success: true,
                message: "Reporting Manager List Loaded",
                data,
            });
        }).catch((error) => {
            return res.status(200).send({
                success: false,
                message: "Reporting Manager List Not Loaded",
                error,
            });
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Internal server error, while getting Contact Manager List",
            error
        });
    }
}


module.exports = { getReportingManager }