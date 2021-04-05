const jwt = require('jsonwebtoken');
const { findOne } = require('../models/destinationModel');

const registration = require('../models/registration_model');

//for admin model

const Admin = require('../models/adminModel');

module.exports.verifyToken = function (req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const data = jwt.verify(token, 'secretkey')
        //we have id only

        registration.findOne({ _id: data.userId }).then(function (result) {
            //console.log(result)
            req.userInfo = result;//all information of user
            next();
        }).catch(function (e) {
            res.status(401).json({ error: e })
        });//

    } catch (e) {
        try {
            const token = req.headers.authorization.split(" ")[1];
            const data = jwt.verify(token, 'admin-secret-key');
            Admin.findOne({ _id: data.userId }).then(function (result) {
                req.userInfo = result;
                // next();
            }).catch(function (e) {
                res.status(401).json({ error: e })
            })
        }
        catch (e) {
            res.status(401).json({ error: e })
        }
    }
}


//admin guard
module.exports.verifyAdmin = function (req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const data = jwt.verify(token, 'admin-secret-key');
        Admin.findOne({ _id: data.userId }).then(function (result) {
            req.userInfo = result;
            next();
        }).catch(function (e) {
            res.status(401).json({ error: e })
        })

    } catch (e) {
        res.status(401).json({ error: e })
    }
}


//customer ---guard

module.exports.verifyCustomer = function (req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const data = jwt.verify(token, 'secretkey')
        //we have id only

        registration.findById({ _id: data.cId }).then(function (result) {
            //console.log(result)
            req.userInfo = result;//all information of user
            next();
        }).catch(function (e) {
            res.status(401).json({ error: e })
        });//
    }
    catch (e) {
        res.status(401).json({ error: e })
    }
}


// //main ---guard


// module.exports.verifydriver=function(req,res,next){
//   try{
//   const token= req.headers.authorization.split(" ")[1];
//   const data=jwt.verify(token,'secretkey')
//   //we have id only
//   console.log(data.userId);
//   User.findOne({_id:data.userId})
//   .then(function(result){
//       //console.log(result)
//      req.driverInfo=result;//all information of user
//       next();
//   })
//   .catch(function(e){
//       res.status(401).json({error:e})
//   });//

//   //console.log(data);
//   //console.log(token);
//   //console.log(data.userId)
//   next();
//   }
//   catch(e){
//       res.status(401).json({error:e})
//   }

// //Case 1: Single table for multiple usertype.
// /// main.......... guard(single table)

// module.exports.verifyUser = function(req,res,next){

//   try{

//   const token = req.headers.authorization.split(" ")[1]; //token

//   const data = jwt.verify(token,'secretkey');
//   //we have id only

//   registration.findOne({_id :data.cId})

//   .then(function(result){

//     req.registrationInfo = result; //All information about the user(username, password, usertype).
//      next();

//   })

//   .catch(function(e){

//     res.status(401).json({error :e})

//   })
//   }

//   catch(e){

//     res.status(401).json({error:e})
//   }

// }

// // Second Case Admin ....

// module.exports.VerifyAdmin = function(req,res,next){

// if(!req.registrationInfo){

//    return res.status(401).json({message: "Invalid User !"});

// }

// else if(req.registrationInfo.userType!=='Admin'){

//   return res.status(401).json({message:"Unauthoraized"});
// }

// next();

// }

// // Third Gaurd for Customer

// module.exports.verifyCustomer = function(req, res, next){

//   if(!req.registrationInfo){

//     return res.status(401).json({message: "Invalid User !"});

//  }

//  else if(req.registrationInfo.userType!=='Customer'){

//    return req.status(401).json({message:"UNauthoraized"});
//  }
// next();

// }





