const mongoose = require("mongoose");

const familyMemberSchema = new mongoose.Schema({
     member_name : {type: String, required: true} ,
     member_age : {type: Number, required: true} ,
     member_gender : {type: String, required: true , enum : ["male" , "female"]} ,
     member_phone : {type: String, required: true},
     creator : {type: mongoose.Types.ObjectId , ref: "user" , required: true}
});

module.exports = mongoose.model("family-member" , familyMemberSchema);