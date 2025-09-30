const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name : {
        type: String,
        minlength: 3,
        maxlength:20,
        require:  true,
    },
    age : {
        type: Number,
        validate(value){
            if(value <18){
                throw new Error(`Age can't be less then 18`);
            }
        }
    },
    email : {
        type: String,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error(`Email is not valid`);
            }
        }
    },
    password : String,
})
const User = mongoose.model('User',userSchema);

module.exports = User;


