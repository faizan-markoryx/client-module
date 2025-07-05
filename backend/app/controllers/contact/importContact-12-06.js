const User = require('../../../sequelize/models/user');
const Contact = require('../../../sequelize/models/contact');
const Client = require('../../../sequelize/models/client');

const importContact = async (req, res) => {
    try {
        const errors = [];
        const body = req.body;
        const userId = req.user.id;

        const validationPromises = [];

        for (const element of body) {
            const clientName = element.clientName || null;
            const firstName = element.firstName || null;
            const ownership = element.ownership || null;
            const phone1 = element.phone1 || null;
            const email = element.email || null;

            if (!clientName || !firstName || !ownership || !phone1 || !email) {
                if (!clientName) {
                    errors.push("Please Enter Client Name");
                }
                if (!firstName) {
                    errors.push("Please Enter First Name.");
                }
                if (!ownership) {
                    errors.push("Please Enter Ownership.");
                }
                if (!phone1) {
                    errors.push("Please Enter phone1.");
                }
                if (!email) {
                    errors.push("Please Enter email.");
                }
            }
            const promise = (async () => {
                const [firstName, lastName] = ownership.toString().split(" ");
                let userFound = false;

                if (firstName && lastName) {
                    userFound = await User.findOne({
                        where: {
                            firstName,
                            lastName
                        },
                        attributes: ['id'],
                        raw: true,
                    });
                }

                const getClientData = await Client.findOne({
                    where: {
                        clientName: element?.clientName,
                    },
                    attributes: ["id"],
                    raw: true,
                });

                const getContactData = await Contact.findOne({
                    where: {
                        email: element?.email,
                    },
                    attributes: ["email"],
                    raw: true,
                });

                if (getContactData) {
                    errors.push({
                        param: "email",
                        msg: `${element?.email} Email Already Exists`,
                    });
                }

                if (!getClientData) {
                    errors.push({
                        param: "clientName",
                        msg: `Client Note Exists ${element?.clientName}`,
                    });
                }
                if (!userFound) {
                    errors.push({
                        param: "ownership",
                        msg: `${ownership} Ownership User Not Found.`,
                    });
                }
            })();

            validationPromises.push(promise);
        }

        await Promise.all(validationPromises);

        if (errors.length > 0) {
            return res.status(200).send({
                success: false,
                message: "Please solve data errors in the Excel file",
                errors,
            });
        }

        // Final Query

        const contactCreationPromises = [];
        let userFound; // Declare the userFound variable outside the loop

        for (const element of body) {
            const getClientNameById = await Client.findOne({
                where: {
                    clientName: element?.clientName,
                },
                attributes: ["id"],
                raw: true,
            });

            userFound = await User.findOne({
                where: {
                    firstName: element.ownership.split(" ")[0],
                    lastName: element.ownership.split(" ")[1],
                },
                attributes: ["id"],
                raw: true,
            });

            const promise = (async () => {
                const [contact, created] = await Contact.findOrCreate({
                    where: {
                        email: element?.email,
                        phone1: element?.phone1,
                    },
                    defaults: {
                        clientId: getClientNameById.id,
                        firstName: element?.firstName,
                        lastName: element?.lastName,
                        title: element?.title,
                        reportingManagerId: element?.reportingManagerId,
                        contactTimeZone: element?.contactTimeZone,
                        phone1: element?.phone1,
                        phone2: element?.phone2,
                        phone3: element?.phone3,
                        email: element?.email,
                        alternateEmail: element?.alternateEmail,
                        city: element?.city,
                        state: element?.state,
                        country: element?.country,
                        unit: element?.unit,
                        endClient: element?.endClient,
                        skillsSupported: element?.skillsSupported,
                        standardComment: element?.standardComment,
                        leadStatus: element?.leadStatus,
                        leadSource: element?.leadSource,
                        linkedInProfile: element?.linkedInProfile,
                        ownershipId: userFound.id,
                        createdBy: userId,
                        updatedBy: userId,
                    },
                });

                if (created) {
                    // New contact record was created
                    console.log('New contact created:', contact.toJSON());
                } else {
                    // Existing contact record was found
                    console.log('Existing contact found:', contact.toJSON());
                }
            })();

            contactCreationPromises.push(promise);
        }

        await Promise.all(contactCreationPromises);

        return res.status(200).send({
            success: true,
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Internal Server Error",
            error: error,
        });
    }
};

module.exports = { importContact };





// // const { Sequelize } = require('sequelize');
// // const User = require('../../../sequelize/models/user');
// // const Contact = require('../../../sequelize/models/contact');
// // const Client = require('../../../sequelize/models/client');

// // const importContact = async (req, res) => {
// //     try {
// //         const errors = [];
// //         const body = req.body;
// //         const userId = req.user.id;

// //         const validationPromises = [];

// //         for (const element of body) {
// //             const promise = (async () => {
// //                 const getClientData = await Client.findOne({
// //                     where: {
// //                         clientName: element?.clientName,
// //                     },
// //                     attributes: ["id"],
// //                     raw: true,
// //                 });

// //                 const getContactData = await Contact.findOne({
// //                     where: {
// //                         email: element?.email,
// //                     },
// //                     attributes: ["email"],
// //                     raw: true,
// //                 });

// //                 const getOwnershipData = await User.findOne({
// //                     where: {
// //                         id: element?.ownershipId
// //                     },
// //                     attributes: ["id"],
// //                 });

// //                 if (getContactData) {
// //                     errors.push({
// //                         param: "email",
// //                         msg: `${element?.email} Email Already Exists`,
// //                     });
// //                 }

// //                 if (!getOwnershipData) {
// //                     errors.push({
// //                         param: "ownership",
// //                         msg: `${element?.ownershipId} User Id Not Found`,
// //                     });
// //                 }

// //                 if (!getClientData) {
// //                     errors.push({
// //                         param: "clientName",
// //                         msg: `Client Note Exits ${element?.clientName}`,
// //                     });
// //                 }

// //             })();

// //             validationPromises.push(promise);
// //         }

// //         await Promise.all(validationPromises);

// //         if (errors.length > 0) {
// //             return res.status(200).send({
// //                 success: false,
// //                 message: "Please solve data errors in the Excel file",
// //                 errors,
// //             });
// //         }


// //         // Final Query

// //         const contactCreationPromises = [];

// //         for (const element of body) {
// //             const getClientNameByid = await Client.findOne({
// //                 where: {
// //                     clientName: element?.clientName,
// //                 },
// //                 attributes: ["id"],
// //                 raw: true,
// //             });
// //             const promise = (async () => {
// //                 const [contact, created] = await Contact.findOrCreate(
// //                     {
// //                         where: {
// //                             email: element?.email,
// //                             phone1: element?.phone1,
// //                         },
// //                         defaults: {
// //                             // clientId:1,
// //                             clientId: getClientNameByid.id,
// //                             firstName: element?.firstName,
// //                             lastName: element?.lastName,
// //                             title: element?.title,
// //                             reportingManagerId: element?.reportingManagerId,
// //                             contactTimeZone: element?.contactTimeZone,
// //                             phone1: element?.phone1,
// //                             phone2: element?.phone2,
// //                             phone3: element?.phone3,
// //                             email: element?.email,
// //                             alternateEmail: element?.alternateEmail,
// //                             city: element?.city,
// //                             state: element?.state,
// //                             country: element?.country,
// //                             unit: element?.unit,
// //                             endClient: element?.endClient,
// //                             skillsSupported: element?.skillsSupported,
// //                             standardComment: element?.standardComment,
// //                             leadStatus: element?.leadStatus,
// //                             leadSource: element?.leadSource,
// //                             linkedInProfile: element?.linkedInProfile,
// //                             ownershipId: element?.ownershipId,
// //                             createdBy: userId,
// //                             updatedBy: userId
// //                         }
// //                     }
// //                 )
// //                 if (created) {
// //                     // New contact record was created
// //                     console.log('New contact created:', contact.toJSON());
// //                 } else {
// //                     // Existing contact record was found
// //                     console.log('Existing contact found:', contact.toJSON());
// //                 }
// //             })();

// //             contactCreationPromises.push(promise);
// //         }

// //         await Promise.all(contactCreationPromises);

// //         return res.status(200).send({
// //             success: true,
// //         });
// //     } catch (error) {
// //         console.log(error);
// //         return res.status(500).send({
// //             success: false,
// //             message: "Internal Server Error",
// //             error: error,
// //         });
// //     }
// // };

// // module.exports = { importContact };
