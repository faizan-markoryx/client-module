const Client = require("../../../sequelize/models/client");
const ClientNote = require('../../../sequelize/models/clientNote')

const createClient = async (req, res) => {
  try {
    const userId = req.user.id;
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
      note
    } = req.body;
    Client.create({
      createdBy: userId,
      updatedBy: userId,
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
      document: req?.file?.originalname ? `${Date.now()} ${req.file.originalname}` : ""
    })
      .then((result) => {
        const { id } = result
        if (note) {
          ClientNote.create({
            clientId: id,
            createdBy: userId,
            updatedBy: userId,
            note
          })
        }
        return res
          .status(200)
          .send({
            success: true,
            message: "Client Added Successfully",
            data: result,
          });
      })
      .catch((err) => {
        console.log(err);
        return res
          .status(500)
          .send({ success: false, message: "Please try again", error: err });
      });
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, message: "Internal Server Error", error: error });
  }
};

module.exports = createClient;
