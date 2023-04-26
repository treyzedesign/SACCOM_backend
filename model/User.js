const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    id: {
        type: String
    },
    firstName :{
        type:String,
        required : [true, 'cannot be blank']
    },
    lastName :{
        type:String,
        required : [true, 'cannot be blank']
    },
    email:{
        type: String,
        required : [true, 'cannot be blank'],
        unique : true,
    },
    phone :{
        type: String,
        required : [true, 'cannot be blank']
    },
    password: {
        type: String,
        minLength: 8,
        required : [true, 'cannot be blank']
    },
    isVerify : {
        type: Boolean,
        default: false 
    }
},{
    timestamps: true
}
)

const User = mongoose.model('User', userSchema)
module.exports = User