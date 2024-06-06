
const review_model= require("../models/review");
const user_model = require("../models/user");
const appointment_model = require("../models/appointment");
const { Doctors } = require("../utils/doctors");

const getAllUsers =async(req , res)=>{
    try {
             const users = await user_model.find({});
             return res.status(200).json({users});
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

const getAllAppointments =async(req , res)=>{
     try {
           const appointments = await appointment_model.find({}).populate([{path: "creator" , select : "id first_name last_name profile_pic"}]);
           let modified=[];
           if(appointments.length>0){
              modified =  appointments.map((appointment)=>{
                  const doc = Doctors.find((doc)=>doc.id==appointment.doctor.toString());
  
                  return {
                      ...appointment.toObject({getters:true}) ,
                      doctor : doc
                  }
              });
           }
           return res.status(200).json({appointments : modified});
     } catch (error) {
        return res.status(500).json({message: error.message});
     }
};

const deleteUser =async(req , res)=>{
   
    try {
        const id = req.params.id;
        const user = await user_model.findByIdAndDelete(id);
        return res.status(200).json({message : "User deleted successfully"});
    } catch (error) {
        return res.status(500).json({message: error.message});
    }

};

const getAllReviewsAdmin=async(req ,res)=>{
    try {
        const reviews = await review_model.find({});
        return res.status(200).json({reviews});
  } catch (error) {
      return res.status(500).json({message: error.message});
  }
}

module.exports = {deleteUser , getAllUsers , getAllAppointments , getAllReviewsAdmin };