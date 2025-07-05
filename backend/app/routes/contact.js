const express = require("express");
const router = express.Router();

const { createContact, updateContact, multipleDeleteContact, allInOneContactSearch, contactBulkOwnershipUpdate, contactBulkOwnershipDelete, getContactManagerList, importContact, multipleContactUpdate, trimInput, getReportingManager } = require("../controllers/contact");
const bodyErrorSender = require("../middlewares/bodyErrorSender");
const { verifyCommonJwtToken, verifyAdminJwtToken } = require("../middlewares/authMiddleware");
const { createContactValidations, updateContactValidations, allInOneContactSearchValidations } = require("../../services/validations/contactValidations");

router.post("/add-contact", verifyCommonJwtToken, createContactValidations, trimInput, bodyErrorSender, createContact);
router.put("/update-contact", verifyCommonJwtToken, updateContactValidations, trimInput, bodyErrorSender, updateContact);
router.post("/multiple-delete-contact", verifyAdminJwtToken, multipleDeleteContact);
router.put("/contact-bulk-ownership-update", verifyAdminJwtToken, contactBulkOwnershipUpdate);
router.put("/contact-bulk-ownership-delete", verifyAdminJwtToken, contactBulkOwnershipDelete);
router.post("/all-in-one-contact-search", verifyCommonJwtToken, allInOneContactSearchValidations, bodyErrorSender, allInOneContactSearch);
router.get("/contact-manager-list/:clientId", verifyCommonJwtToken, getContactManagerList);
router.post("/import-contact", verifyAdminJwtToken, trimInput, importContact);
router.put("/multiple-contact-update", verifyAdminJwtToken, trimInput, multipleContactUpdate);
router.get("/get-reporting-manager/:id", verifyAdminJwtToken,  getReportingManager);

module.exports = router;