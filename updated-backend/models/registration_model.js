const mongoose = require('mongoose');

// const router = require('../routes/registration_route');

const registration = mongoose.model('registration',{

    fname:{type:String},
    lname:{type:String},
    address:{type:String,required:true},
    mobile:{ type:String,required:true },
    email:{type:String,required:true,unique:true},
    password:{
        type:String,
        required:true
    }
 
   
})

module.exports=registration;