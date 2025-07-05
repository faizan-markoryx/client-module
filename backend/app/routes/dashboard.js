const express = require("express");
const router = express.Router();
const { verifyAdminJwtToken, verifyCommonJwtToken } = require("../middlewares/authMiddleware");
const { todayTargetedManagersList, totalManagersConnectedToday, allContactNoteList } = require("../controllers/dashboard");
const { getAllContactNoteValidations } = require("../../services/validations/contactNoteValidations");
const bodyErrorSender = require("../middlewares/bodyErrorSender");





router.get("/today-targeted-managers-list", verifyCommonJwtToken, todayTargetedManagersList);
router.get("/total-managers-connected-today", verifyCommonJwtToken, totalManagersConnectedToday);
router.post("/all-contact-note-list", verifyCommonJwtToken, getAllContactNoteValidations, bodyErrorSender, allContactNoteList);

module.exports = router;