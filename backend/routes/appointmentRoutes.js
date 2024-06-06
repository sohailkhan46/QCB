const express = require("express");
const { createNewAppointment, getMyAppointments } = require("../controllers/appointmentController");
const { authMW } = require("../middlewares/auth-mw");
const { appointmentValidation } = require("../utils/fieldsValidation");


const router = express.Router();

router.post("/create" , authMW,appointmentValidation() , createNewAppointment);
router.get("/my" , authMW , getMyAppointments);

module.exports = router;
