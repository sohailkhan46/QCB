const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  first_name: { type: String  , required: true },
  last_name: { type: String  , required: true },
  phone_no : { type: String , required: true },
  email: { type: String , required:true },
  password: { type: String , required: true},
  profile_pic : {type:String , default:"none" } ,
});

module.exports = mongoose.model("user", userSchema);
