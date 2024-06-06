const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  otpCode: { type: String, required: true } ,
  email : {type:String , required: function (){
    return !this.phone
  }} ,
  phone : {type:String , required:  function (){
    return !this.email
  }} 
});

module.exports = mongoose.model("otp", otpSchema);
