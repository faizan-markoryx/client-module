const express = require("express");
const router = express.Router();
const { createUser, userLogin, searchUser, updateUser, changeUserActivationStatus, getUserList, trimInput, } = require("../controllers/user");
const { userSignUpValidation, userLoginValidation, userUpdateValidation, userActivationStatusValidation } = require("../../services/validations/userValidations");
const { verifyCommonJwtToken, verifyAdminJwtToken } = require("../middlewares/authMiddleware");
const bodyErrorSender = require("../middlewares/bodyErrorSender");

router.post("/add-user", userSignUpValidation, trimInput, bodyErrorSender, createUser);
router.put("/update-user", verifyAdminJwtToken, userUpdateValidation, trimInput, bodyErrorSender, updateUser);
router.post("/change-activation-status", verifyAdminJwtToken, userActivationStatusValidation, bodyErrorSender, changeUserActivationStatus);

router.post("/search", verifyAdminJwtToken, searchUser);

router.post("/login", userLoginValidation, bodyErrorSender, userLogin);
router.get("/get-user-list", verifyCommonJwtToken, getUserList);

router.get("/test-jwt", verifyCommonJwtToken, (req, res) => {
  return res.status(200).send({
    success: true,
    message: "Test Success",
  });
});

module.exports = router;
