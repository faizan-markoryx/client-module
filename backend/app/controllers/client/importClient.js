const Client = require('../../../sequelize/models/client')
const User = require('../../../sequelize/models/user')

const importClient = async (req, res) => {
    try {
        const errors = [];
        const body = req.body;
        const userId = req.user.id;
        const Allkeys = ["clientName", "websiteUrl", "ownership"];
        let keyErrors = [];
        let bodyKeys = [];
      
        for (const element of body) {
          Object.keys(element).forEach((key) => {
            bodyKeys.push(key);
          });
        }
      
        const arrayDiff = Allkeys.filter((x) => !bodyKeys.includes(x));
      
        if (arrayDiff.length > 0) {
          arrayDiff.forEach((ele) => {
            keyErrors.push(`${ele} field is missing`);
          });
        }
      
        if (keyErrors.length > 0) {
          return res.send({ success: false, message: "Invalid value", error: keyErrors });
        }
      
        for (const element of body) {
          const clientName = element.clientName || null;
          const websiteUrl = element.websiteUrl || null;
          const ownership = element.ownership || null;
      
          if (!clientName || !websiteUrl || !ownership) {
            if (!clientName) {
              errors.push("Please Enter Client Name");
            }
            if (!websiteUrl) {
              errors.push("Please Enter Website URL.");
            }
            if (!ownership) {
              errors.push("Please Enter Ownership.");
            }
          } else {
            const clientFound = await Client.findOne({
              where: {
                clientName: clientName
              },
              raw: true,
            });
      
            const [firstName, lastName] = ownership.toString().split(" ");
            let userFound = false;
      
            if (firstName && lastName) {
              userFound = await User.findOne({
                where: {
                  firstName,
                  lastName
                },
                raw: true,
              });
            }
      
            if (clientFound || !userFound) {
              if (clientFound) {
                errors.push(`${clientFound.clientName} Client Name Already Exists`);
              }
              if (!userFound) {
                errors.push(`${ownership} Ownership User Not Found.`);
              }
            } else {
              await Client.create({
                createdBy: userId,
                updatedBy: userId,
                clientName: clientName,
                websiteUrl: websiteUrl,
                ownership: userFound.id,
                city: element.city,
                state: element.state,
                country: element.country,
                industry: element.industry,
                paymentTerm: element.paymentTerm,
                category: element.category,
                clientStatus: element.clientStatus
              });
            }
          }
        }
        const success = errors.length === 0;
        const message = success ? "Data Imported Successfully" : "Some Data Are Not Imported";
        return res.status(200).send({
            success: success,
            message: message,
            error: errors,
        });
      } catch (error) {
        return res.status(500).send({ success: false, message: "Internal server error" });
      }
      
}

module.exports = importClient;