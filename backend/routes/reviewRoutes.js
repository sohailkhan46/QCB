const express = require("express");


const { giveReview, getAllReviews } = require("../controllers/reviewController");
const { authMW } = require("../middlewares/auth-mw");


const router = express.Router();


router.post("/add" , authMW , giveReview );
router.get("/all" , getAllReviews);
module.exports = router;
