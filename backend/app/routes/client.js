const express = require("express");
const router = express.Router();
const { createClient, updateClient, deleteClient, allInOneClientSearch, getClients, upload, importClient, trimInput } = require("../controllers/client");
const { verifyAdminJwtToken, verifyCommonJwtToken } = require("../middlewares/authMiddleware");
const { addClientValidation, updateClientValidation } = require("../../services/validations/clientValidations");

const bodyErrorSender = require("../middlewares/bodyErrorSender");

router.post("/add-client", verifyCommonJwtToken, upload, addClientValidation, trimInput, bodyErrorSender, createClient);
router.get("/get-clients", verifyCommonJwtToken, getClients);
router.post("/all-in-one-client-search", verifyCommonJwtToken, allInOneClientSearch);
router.put("/update-client", verifyCommonJwtToken, updateClientValidation, trimInput, bodyErrorSender, updateClient);
router.delete("/delete-client/:id", verifyAdminJwtToken, deleteClient);
router.post("/import-client", verifyAdminJwtToken, importClient);

module.exports = router;