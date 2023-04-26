const jwt = require('jsonwebtoken')
require('dotenv').config()
// const User = require("../model/User")
const nodemailer = require("nodemailer")

const sendmail = (obj)=>{

     const transporter = nodemailer.createTransport({
        service : "gmail",
        port: 587,
        secure: false,
        host: "smtp.gmail.com",
        tls: {
            rejectUnauthorized: false,
            minVersion: "TLSv1.2"
        },
        auth: {
            user: process.env.USER,
            pass: process.env.PASS
        }
    })

    const emailToken = jwt.sign({email:obj.email, firstName:obj.firstName}, process.env.ETOKEN_SECRET, {
        expiresIn: '1h'
    })
    const url = process.env.BASE_URL
    let sender = transporter.sendMail({
        from : process.env.USER,
        to: obj.email,
        subject : "hello" + " " + "(" + obj.firstName + ")" + " " + "Please Verify your email",
        html: `<p>Please verify your email address to complete the signup process into your account</p>
                <p>Click the link<b>(expires in 15 minutes)</b> : <a href=${url + "user/verify/" + obj.email + "/" + emailToken}> press Here</a> to proceed</p>`
    })
    if(sender){
        return true
    }
    

}
module.exports = {sendmail}