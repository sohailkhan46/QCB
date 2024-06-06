const express = require('express');
const { signUpValidation, loginValidation } = require('../utils/fieldsValidation');
const { signup, login } = require('../controllers/userController');

const router =express.Router();

router.post("/signup", signUpValidation(), signup);
   
router.post("/login", loginValidation(), login);




module.exports = router;