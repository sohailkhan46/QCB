const { text } = require("express");
const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEmail = async (email, subject , doctor_name , doctor_speci) => {
    try {
        const transporter = nodemailer.createTransport({
           host: process.env.MAILER_HOST,
           port: process.env.MAILER_PORT,
         service : process.env.MAILER_SERVICE,
            auth: {
              // TODO: replace `user` and `pass` values from <https://forwardemail.net>
              user:process.env.MAILER_EMAIL,
              pass: process.env.MAILER_PASSWORD,
            },
            from : process.env.MAILER_EMAIL
            
          });

        await transporter.sendMail({
            from: process.env.MAILER_EMAIL,
            to: email,
            subject: subject,
            text: text,
            html : `
            <h2>Your appointment is due today : </h2>
            <h3><b>Doctor name : ${doctor_name}</b></h3>
            <h3><b>Doctor's specialization : ${doctor_speci}</b></h3>
            `
        });
         const response = {message :"email sent sucessfully" , status:201};
        return response;
    } catch (error) {
        const response = {message :`${error}, "email not sent"`, status:500};
        return response;
        
    }
};

module.exports = {sendEmail};