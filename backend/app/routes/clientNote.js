const express = require("express");
const router = express.Router();
const { addClientNote, getClientNote, updateClientNote, deleteClientNote, trimInput} = require('../controllers/clientNotes')
const { verifyAdminJwtToken,verifyCommonJwtToken } = require("../middlewares/authMiddleware");
const { addClientNoteValidation,updateClientNoteValidation } =  require('../../services/validations/clientNoteValidation')
const bodyErrorSender = require('../middlewares/bodyErrorSender')

router.post('/add-client-note',verifyAdminJwtToken,addClientNoteValidation,trimInput,bodyErrorSender,addClientNote);
router.put('/update-client-note', verifyAdminJwtToken, updateClientNoteValidation,trimInput,bodyErrorSender,updateClientNote);
router.get('/get-client-notes/:clientId', verifyCommonJwtToken, getClientNote);
router.delete('/delete-client-note/:clientNoteId', verifyAdminJwtToken, deleteClientNote);

module.exports = router;