const {Router} = require('express')
const userRouter = Router()
const User = require('../model/User')
const bcryptJs = require('bcryptjs')
const uuid = require('uuid')
const {sendmail} = require('../utils/sendMail')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const generateToken = (id , email)=>{
  let token = jwt.sign({id:id, email:email}, process.env.LOGIN_TOKEN_SECRET)
  return token
}

// REGISTER A USER

userRouter.post("/register", async(req,res)=>{
    const {firstName, lastName, phone, email, password} = req.body  
    try {
        if(req.body == null || req.body == undefined){
            res.status(400).json({
                message: 'Bad request'
            })
        }
        const query = await User.findOne({email: email})
        if(query){
            res.status(400).json({
                message: "user already Exists"
            })
        }else{
            const hashedPassword = await bcryptJs.hash(password, 10)
            const obj = {
                id : uuid.v4(),
                firstName: firstName,
                lastName: lastName,
                email: email,
                phone: phone,
                password: hashedPassword
            }
               
            const mailer = sendmail(obj)
            if (mailer == true){
                await User.create(obj).then(()=>{
                    res.status(200).json({
                        message: "Account Created, Email has been sent to your mailbox",
                        data: obj
                    })
                })
               
            }  
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})

// LOGIN A USER

userRouter.post('/login', async(req,res)=>{
    const {email, password} = req.body
    try {
        if(req.body == null || req.body == undefined){
            res.status(400).json({
                message: 'Bad request'
            })
        }

        const feedback = await User.findOne({email:email})
        if (feedback) {
            const comparePassword = await bcryptJs.compare(password, feedback.password)
            const accessToken = generateToken(feedback.id, feedback.email)
            if(comparePassword){
                const isVerified = feedback.isVerify
                if(isVerified == false){
                    res.status(403).json({
                        message: 'User has not been verified'
                    })
                }else{
                    res.cookie('userToken', accessToken, {
                        maxAge: 1000 * 60 * 60 * 6,
                        secure: false,
                        sameSite: true
                      })
                    res.status(200).json({
                        message: "user Login successful",
                        data: accessToken
                    })
                }
            }else{
                res.status(404).json({
                    message: 'Invalid credentials'
                })
            }
        }else{
            res.status(404).json({
                message: 'Invalid credentials'
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})

// RESEND MAIL AGAIN

userRouter.post('/resendEmail', async(req,res)=>{
    const {email, firstName} = req.body
    try {
        if(req.body == null || req.body == undefined){
            res.status(400).json({
                message: 'Bad request'
            })
        }
        const obj = {
            firstName: firstName,
            email:email
        }
        const mailer = sendmail(obj)
        if (mailer == true){
                res.status(200).json({
                    message: "Email has been sent to your mailbox"
            })
           
        }  
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }

})
// Verify a user

userRouter.post('/verifyEmail', async(req,res)=>{
    const {email, Token} = req.body
    try {
        if(req.body == null || req.body == undefined){
            res.status(400).json({
                message: 'Bad request'
            })
        }
        const feedback = await User.findOne({email: email})
        if(feedback){
            jwt.verify(Token, process.env.ETOKEN_SECRET, async(err,decode)=>{
                if(err){
                    res.status(400).json({
                        massage: err.message
                    })
                }
                await User.updateOne({email},{
                    $set: {
                        isVerify: true
                    }
                }).then(()=>{
                    res.status(200).json({
                        message: "user has been Verified"
                    })
                })
            })
        }else{
            res.status(400).json({
                message: "Bad request"
            })
        }
    } catch (error) {
         res.status(500).json({
            message: error.message
        })
    }
})

module.exports = userRouter