const User = require('../../../sequelize/models/user');
const Contact = require('../../../sequelize/models/contact');
const Client = require('../../../sequelize/models/client');

const importContact = async (req, res) => {
    try {
        const contacts = req.body;
        const importErrors = [];

        const { id: currentUserId } = req.user;

        let successfulImportCount = 0;

        for (const contactData of contacts) {

            let contactHasError = false;

            // Check if required fields are present

            let {
                clientName = "", // required
                firstName = "", // required
                lastName = "",
                title = "",
                reportingManagerId = null,
                contactTimeZone = "",
                phone1 = "", // required
                phone2 = "",
                phone3 = "",
                email = "", // required
                alternateEmail = "",
                city = "",
                state = "",
                country = "",
                unit = "",
                endClient = "",
                skillsSupported = "",
                standardComment = "",
                leadSource = "",
                ownership = "", // required
                linkedInProfile = ""
            } = contactData || {};

            let leadStatus = "New Lead"

            if (standardComment) {
                if (arr1.includes(standardComment)) {
                    leadStatus = "Working"
                } else if (arr2.includes(standardComment)) {
                    leadStatus = "Not Working"
                }
            }


            if (!email || !phone1) {
                importErrors.push({
                    error: 'Email and Phone1 are required fields.',
                    contact: contactData,
                });
                contactHasError = true
            }

            if (!firstName) {
                importErrors.push({
                    error: 'First name missing.',
                    contact: contactData,
                });
                contactHasError = true
            }

            if (!clientName) {
                importErrors.push({
                    error: 'Client name missing.',
                    contact: contactData,
                });
                contactHasError = true
            }

            if (!ownership) {
                importErrors.push({
                    error: 'Ownership missing.',
                    contact: contactData,
                });
                contactHasError = true
            }

            let clientId = ""

            if (clientName) {
                // Check if the client exists
                const { id: localClientId = "" } = await Client.findOne({
                    where: {
                        clientName,
                    },
                    attributes: ["id"],
                    raw: true
                }) || { id: "" };

                if (!localClientId) {
                    importErrors.push({
                        error: `Client "${clientName}" does not exist.`,
                        contact: contactData,
                    });
                    contactHasError = true
                } else {
                    clientId = localClientId;
                }
            }

            const nameParts = ownership?.split(' ') || [];

            let ownershipId = ""
            if (nameParts?.length > 0) {
                // Check if the ownership (user) exists
                const { id: localOwnershipId = "" } = await User.findOne({
                    where: {
                        firstName: nameParts[0],
                        lastName: nameParts[1] || ""
                    },
                    attributes: ["id"],
                    raw: true
                }) || { id: "" };

                if (!localOwnershipId) {
                    importErrors.push({
                        error: `User "${ownership}" does not exist in Ownership.`,
                        contact: contactData,
                    });
                    contactHasError = true
                } else {
                    ownershipId = localOwnershipId
                }
            }


            if (reportingManagerId != null) {
                // Check if the reporting manager exists in the Contact table
                const reportingManager = await Contact.findOne({
                    where: {
                        id: reportingManagerId,
                    },
                });

                if (reportingManagerId && !reportingManager) {
                    importErrors.push({
                        error: `Reporting manager with ID "${reportingManagerId}" does not exist.`,
                        contact: contactData,
                    });
                    contactHasError = true
                }
            }


            if (email) {
                // Check if the Contact email exists in the Contact table
                const { email: isEmailExist = "" } = await Contact.findOne({
                    where: {
                        email,
                        isDeleted: false
                    },
                    attributes: ["email"],
                    raw: true
                }) || { email: "" };

                if (isEmailExist) {
                    importErrors.push({
                        error: `"${isEmailExist}" already exist.`,
                        contact: contactData,
                    });
                    contactHasError = true
                }
            }

            // Check if the LinkedIn profile URL is valid
            if (linkedInProfile && !isValidLinkedInUrl(linkedInProfile)) {
                importErrors.push({
                    error: `Invalid LinkedIn profile URL: "${linkedInProfile}".`,
                    contact: contactData,
                });
                contactHasError = true
            }

            console.log("reportingManagerId>>>>>>",reportingManagerId)

            if (!contactHasError) {
                // Insert the contact into the database
                await Contact.create({
                    clientId,
                    firstName,
                    lastName,
                    title,
                    reportingManagerId,
                    contactTimeZone,
                    phone1,
                    phone2,
                    phone3,
                    email,
                    alternateEmail,
                    city,
                    state,
                    country,
                    unit,
                    endClient,
                    skillsSupported,
                    standardComment,
                    leadStatus,
                    leadSource,
                    ownershipId,
                    linkedInProfile,
                    createdBy: currentUserId,
                    updatedBy: currentUserId,
                }).then(() => successfulImportCount++);
            }

        }

        if (importErrors.length > 0) {
            const notImportedCount = contacts?.length - successfulImportCount;

            let message = `${notImportedCount} Contact Not Imported${successfulImportCount > 0 ? ` ,and ${successfulImportCount} Imported Successfully.` : ''}`;

            message = successfulImportCount == 0 ? "No Any Record Imported, Please solve issues in Import File" : message;

            return res.status(200).send({
                success: false,
                message,
                errors: importErrors,
            });
        }

        return res.status(200).send({
            success: true,
            message: `${successfulImportCount} Contacts Imported Successfully.`,
        });
    } catch (error) {
        console.error('Error importing contacts:', error);
        return res.status(500).send({
            success: false,
            message: 'An error occurred while importing contacts.',
        });
    }
};

const isValidLinkedInUrl = (url) => {
    // Implement your validation logic here
    // You can use regular expressions or other methods to validate the LinkedIn profile URL
    // For simplicity, let's assume any URL starting with "https://www.linkedin.com/" is valid
    return url.startsWith('https://www.linkedin.com/');
};

module.exports = { importContact };

const arr1 = [
    "Follow-up",
    "Follow-up on a specific Date/Time",
    "Hung-up",
    "Manager with Active Requirements",
    "Connected Manager",
    "Handles Offshore Requirements",
    "Call Later",
];
const arr2 = [
    "DND",
    "Number not in service",
    "Wants to stick with standard Channel",
    "Wrong Number",
    "No number given",
    "Not involved in hiring",
    "Call is not going through",
    "No Longer with company",
];