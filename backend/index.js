const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();
const mongoConnect = require("./utils/mongoConnection");
const RouteNotFound = require("./utils/NoRouteFoundMW");
const app = express();
const appointment_model = require("./models/appointment");
const cron = require("node-cron");


app.use(express.json());
app.use(morgan("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(cors());

const userRoute = require("./routes/userRoutes");
const reviewRoute = require("./routes/reviewRoutes");
const authRoute = require("./routes/authRoutes");
const familyRoute = require("./routes/familyRoutes");
const adminRoute = require("./routes/adminRoutes");
const appointmentRoute = require("./routes/appointmentRoutes");
const errorHandler = require("./utils/errorHandlerMW");
const helperAPI = require("./utils/helperApi");
const { sendEmail } = require("./utils/sendEmail");
const { Doctors } = require("./utils/doctors");


app.use("/helper", helperAPI);
app.use("/api/auth" , authRoute);
app.use("/api/users", userRoute);
app.use("/api/reviews", reviewRoute);
app.use("/api/family-members", familyRoute);
app.use("/api/admins", adminRoute);
app.use("/api/appointments", appointmentRoute);

 cron.schedule('0 0 * * *', async() => {
  // This function will be executed every day at midnight


  var currentDate = new Date();

// Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
var currentDay = currentDate.getDay();

// You can also get the day name if needed
var daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var currentDayName = daysOfWeek[currentDay];
      
    const allAppointments = await appointment_model.find({date_millis : {$gte : Date.now()} , day : currentDayName}).populate([{
      path : "creator" , select : "email"
    }]);

    if(allAppointments.length > 0){
       for (let i = 0; i < allAppointments.length; i++){

       const doc = Doctors.find((doc)=>doc.id === allAppointments[i].doctor);
        
        await sendEmail(allAppointments[i].creator.email , "Appointment due" , doc.name , doc.specialization );
       }
    }

});


RouteNotFound(app);
errorHandler(app);

try {
  mongoConnect();
  // initializeFirebase();


  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server  is on ${PORT}`));
} catch (error) {
  console.log(error);
}
