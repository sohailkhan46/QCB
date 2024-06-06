const USER = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
require("dotenv").config();
const fs = require("fs");
const { Doctors } = require("../utils/doctors");

const signup = async (req, res, next) => {
  const { first_name , last_name, phone_no, email, password } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error(errors.array()[0].msg);
    error.code = 400;
    return next(error);
  }


  let alreadyExists;
  try {
    alreadyExists = await USER.findOne({ email: email.toLowerCase() });
  } catch (err) {
    const error = new Error("Error connecting to server");
    error.code = 500;
    return next(error);
  }

  if (alreadyExists?.email) {
      const error = new Error("Email already exists");
      error.code = 409;
      return next(error);

  }

  try {
    const alreadyExExistsPhone = await USER.findOne({phone_no : phone_no});

    if(alreadyExExistsPhone){
      const error = new Error("Phone number already exists");
      error.code = 409;
      return next(error);
    }

  } catch (err) {
    const error = new Error(err);
    error.code = 500;
    return next(error);
  }


  const hashedPassword = await bcrypt.hash(password, 5);

  let newUser;
  try {
    newUser = new USER({
      email: email.toLowerCase(),
      first_name: first_name,
      last_name: last_name,
      phone_no : phone_no,
      password: hashedPassword,
      profile_pic: "none"
    });
    await newUser.save();
  } catch (err) {
    const error = new Error(err);
    error.code = 500;
    return next(error);
  }

  let token;


  res.status(200);
  res.json({
    message: "User created , you can log in to continue",
  });
};

const login = async (req, res, next) => {
  const { email, password} = req.body;
  console.log("email : " +  email);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error(errors.array()[0].msg);
    console.log(errors.array()[0].msg);
    error.code = 400;
    return next(error);
  }


  let userExists;
  try {
    userExists = await USER.findOne({ email: email.toLowerCase() });
  } catch (err) {
    const error = new Error("Something went wrong");
    error.code = 500;
    return next(error);
  }

  if (!userExists) {
    const error = new Error("No such user exists with this email address");
    error.code = 400;
    return next(error);
  }



  let comparePassword;
  try {
    comparePassword = await bcrypt.compare(password, userExists.password);
  } catch (err) {
    const error = new Error("Something went wrong");
    error.code = 500;
    return next(error);
  }

  if (comparePassword !== true) {
    const error = new Error("Password is wrong");
    error.code = 400;
    return next(error);
  }


  let token;

  try {
    token = jwt.sign(
      {
        userId: userExists.id,
        email: userExists.email,
      },
      process.env.JWT_KEY,
      {}
    );
  } catch (err) {
    const error = new Error(err);
    error.code = 500;
    return next(error);
  }

  res.status(200);
  res.json({
    token: token,
    first_name: userExists.first_name,
    last_name: userExists.last_name,
    phone_no: userExists.phone_no,
    userId: userExists.id,
    email: userExists.email,
    profile_pic: userExists.profile_pic,
    message: "LOGIN SUCCESS , WELCOME !",
  });
};

const updateInfo = async (req, res, next) => {
  const { first_name , last_name , phone_no , email} = req.body;
  const paramsUserId = req.params.userid;
  const userId = req.extractedUserId;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error(errors.array()[0].msg);
    error.code = 400;
    return next(error);
  }

  try {

  let user;
    user = await USER.findById(userId);

  if (!user?.email) {
    const error = new Error("No such user exists");
    error.code = 400;
    return next(error);
  }

  if(userId!==paramsUserId)
  {
    const error = new Error("Unauthorized user access");
    error.code = 403;
    return next(error);
  }

  const emailExists = await USER.findOne({ email: email.toLowerCase() });
  if(emailExists && emailExists._id.toString()!== userId){
    return res.status(409).json({message : "This Email already exists with other account!"})
  }

  const phoneExists = await USER.findOne({ phone_no: phone_no });
  if(phoneExists && phoneExists._id.toString()!== userId){
    return res.status(409).json({message : "This phone number already exists with other account!"})
  }


    user.email = email.toLowerCase();
    user.first_name = first_name;
     user.last_name = last_name;
     user.phone_no = phone_no;
      await user.save();


  res.status(201).json({code:201, message: "Successfully updated your info" , user: user });
  }
  catch(err){
    return res.status(500).json({message: err.message});
  }

};



const updatePassword = async (req, res, next) => {
  const userId = req.extractedUserId;
  const { new_password, previous_password } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error(errors.array()[0].msg);
    error.code = 400;
    return next(error);
  }



  try {
    let user;
      user = await USER.findById(userId);


    if (!user) {
      const error = new Error("No such user exists");
      error.code = 400;
      return next(error);
    }


    let passIsCorrect = await bcrypt.compare(
      previous_password,
      user?.password.toString()
    );

    if (passIsCorrect === false) {
      const error = new Error("previous password is wrong");
      error.code = 400;
      return next(error);
    }

      const hashedPassword = await bcrypt.hash(new_password, 12);
      user.password = hashedPassword;
      await user.save();


    res.status(201).json({ message: "Password changed successfully!" });
  } catch (err) {
    const error = new Error(err);
    error.code = 500;
    return next(error);
  }
};

const uploadPFP=async(req ,res , next)=>{
  const imageUrl = req.file;
  
  let user;
  try {
           user = await USER.findById(req.extractedUserId);


  if(!user)
  {
      const error = new Error("No such user exists");
      error.code = 403;
      return next(error);
  }
  
  try {
       user.profile_pic = imageUrl;
       await user.save();
  } catch  {
   const error = new Error("Something went wrong");
   error.code = 500;
   return next(error);
  }

  res.status(201).json({imageUrl : imageUrl});

}

catch(Err){
  return res.status(500).json({message: Err.message});
}
};

const getUserDetails=async(req , res)=>{
  const userId = req.extractedUserId;
    try {
          const user = await USER.findById(userId);
          if(!user){
            return res.status(400).json({message : "No such user exists"});
          }

          res.status(200).json({first_name: user.first_name , last_name: user.last_name , email : user.email , phone_no : user.phone_no , profile_pic : user.profile_pic });
    } catch (error) {
        return res.status(500).json({message : error.message});
    }
};

const getAllAppDoctors=async(req ,res)=>{
    try {
            return res.status(200).json({allDoctors : Doctors})
    } catch (error) {
        return res.status(500).json({message : error.message});
    }
}

exports.signup = signup;
exports.login = login;
exports.updateInfo = updateInfo;
exports.updatePassword = updatePassword;
exports.uploadPFP = uploadPFP;
exports.getUserDetails = getUserDetails;
exports.getAllAppDoctors = getAllAppDoctors;
