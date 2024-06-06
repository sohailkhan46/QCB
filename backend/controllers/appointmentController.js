const user_model = require("../models/user");
const appointment_model = require("../models/appointment");
const { Doctors } = require("../utils/doctors");
const { sendEmailForApi } = require("../utils/sendEmailForApi");

const createNewAppointment = async (req, res) => {
    try {
        const userId = req.extractedUserId;
        const {date: dateYaar , doctorId } = req.body;
        const user = await user_model.findById(userId);
        if(!user){
            return res.status(400).json({message : "No such user exists"});
        }
      
        const exists = isIdExists(doctorId);
        if(!exists){
            return res.status(400).json({message : "No such doctor exists"});
        }
        

        const selectedDate = new Date(dateYaar);

         const millis = selectedDate.getTime() + 300000;

         const dayNumber = selectedDate.getDay();

         var daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

         const selectedDay = daysOfWeek[dayNumber]; 
        const newAppointment = new appointment_model({
            creator: userId,
            date: dateYaar,
            day : selectedDay,
            doctor : doctorId, 
            date_millis : millis
            
        });

        await newAppointment.save();

        const doc = Doctors.find((dc)=>dc.id === doctorId);

        await sendEmailForApi(user.email , "Appointment Booked" , doc.name , doc.specialization , selectedDate.toDateString() );

        return res.status(201).json({message : "Appointment added successfully"});
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

const getMyAppointments = async (req, res) => {
   try {
       const userId = req.extractedUserId;
       const user = await user_model.findById(userId);
       if(!user){
           return res.status(400).json({message : "No such user exists"});
       }

       let appointments = await appointment_model.find({creator: userId});

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
       return res.status(200).json({myAppointments : modified});
   } catch (error) {
       return res.status(500).json({message: error.message});
   }
};

function isIdExists( id) {
    return Doctors.some(item => item.id === id);
  }


module.exports = {
  createNewAppointment,
  getMyAppointments,
};