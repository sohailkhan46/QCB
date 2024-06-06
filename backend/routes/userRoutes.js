const express = require("express");
const { check } = require("express-validator");
const {authMW} = require("../middlewares/auth-mw");



const { updateInfo,  setNewPasswordAfterReset, uploadPFP, updatePassword, getUserDetails, getAllAppDoctors } = require("../controllers/userController");
const {
  signUpValidation,
  loginValidation,
  editUserValidation,
  resetPasswordValidation,
  updatePasswordValidation,
  askHelpValidation,
} = require("../utils/fieldsValidation");
const { uploadImage } = require("../uploader/imageUploader");
const router = express.Router();



router.patch("/edit/:userid", editUserValidation(), authMW, updateInfo);
router.post("/upload/pfp" , authMW , uploadImage, uploadPFP);
router.patch("/password/update" ,  updatePasswordValidation(), authMW,  updatePassword);
router.get("/details/get" , authMW , getUserDetails );
router.get("/saare-doctors" , getAllAppDoctors);

module.exports = router;
