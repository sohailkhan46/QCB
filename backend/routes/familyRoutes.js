const express = require('express');
const { addFamilymember, getFamilyMembers } = require('../controllers/familyController');
const { authMW } = require('../middlewares/auth-mw');

const router =express.Router();

router.post("/add" , authMW, addFamilymember);
   
router.get("/get",authMW, getFamilyMembers);




module.exports = router;