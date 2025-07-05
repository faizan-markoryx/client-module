const express = require("express");
const router = express.Router();
const { verifyCommonJwtToken } = require("../middlewares/authMiddleware");
const bodyErrorSender = require("../middlewares/bodyErrorSender");
const { addContactNote, getContactNote, updateContactNote, nextFollowUpdateNotification, contactNoteRead, trimInput } = require("../controllers/contactNote");
const { createContactNoteValidations, updateContactNoteValidations } = require("../../services/validations/contactNoteValidations");
const { deleteContactNote } = require("../controllers/contact");

router.post("/add-contact-note", verifyCommonJwtToken, createContactNoteValidations, trimInput, bodyErrorSender, addContactNote);
router.put("/update-contact-note", verifyCommonJwtToken, updateContactNoteValidations, trimInput, bodyErrorSender, updateContactNote);
router.get("/get-contact-notes/:contactId", verifyCommonJwtToken, bodyErrorSender, getContactNote);
router.delete("/delete-contact-note/:noteId", verifyCommonJwtToken, bodyErrorSender, deleteContactNote);
router.post("/get-next-follow-update-notification", verifyCommonJwtToken, nextFollowUpdateNotification);
router.put("/contact-note-read", verifyCommonJwtToken, contactNoteRead);

module.exports = router;