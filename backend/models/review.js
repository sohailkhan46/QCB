const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    rating : {type: Number , required: true} ,
    description : {type: String , required: true}  ,
    creator : {type: mongoose.Types.ObjectId , ref: "user" , required: true}
});

module.exports = mongoose.model("review" , reviewSchema);