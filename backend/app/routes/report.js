const express = require('express');
const router = express.Router();
const { allReport } = require('../controllers/report')
const  { verifyAdminJwtToken } = require("../middlewares/authMiddleware");

router.post('/all-report', verifyAdminJwtToken, allReport)

module.exports = router;
