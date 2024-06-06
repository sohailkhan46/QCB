const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
    date : {type: Date , required: true} ,
    day : {type: String , required: true},
    date_millis : {type: Number , required: true},
    creator : {type: mongoose.Types.ObjectId , ref: "user" , required: true},
    doctor : {type: String, required: true}
});

module.exports = mongoose.model("appointment" , appointmentSchema);