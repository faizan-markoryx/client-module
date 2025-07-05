const express = require("express")
const router = express.Router();
const { getCountries, getState, getCities } = require('../controllers/getLocation')
const { verifyCommonJwtToken } = require('../middlewares/authMiddleware')

router.get('/get-countries', verifyCommonJwtToken, getCountries)
router.post('/get-states', verifyCommonJwtToken, getState)
router.post('/get-cities', verifyCommonJwtToken, getCities)


module.exports = router;