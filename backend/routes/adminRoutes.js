const express = require("express");
const { getAllUsers, getAllAppointments, getAllReviewsAdmin, deleteUser } = require("../controllers/adminController");



const router = express.Router();

router.get("/get-saare-users" , getAllUsers);
router.get("/get-saare-appointments" , getAllAppointments);
router.get("/get-saare-reviews" , getAllReviewsAdmin);
router.delete("/delete-aik-user/:id" , deleteUser);

module.exports = router;
