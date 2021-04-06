const express = require('express');
const registration = require('../models/registration_model');
const app = express();
const router = express.Router();
const auth = require('../middleware/auth');

// for validation our registrartion data

const { check, validationResult } = require('express-validator')

// for password encryption

const bcryptjs = require('bcryptjs')

const jwt = require("jsonwebtoken");
const { token } = require('morgan');


router.post('/registration/insert', [

    check('email', 'email is required 11').not().isEmpty(),
    check('mobile', 'mobile is required 11').not().isEmpty(),
    check('password', 'password is required 11').not().isEmpty(),
    // check('userType','usertype is required').not().isEmpty()

], function (req, res) {

    const RegistrationErr = validationResult(req);

    if (RegistrationErr.isEmpty()) {
        // valid
        const fname = req.body.fname;
        const lname = req.body.lname;
        const address = req.body.address;
        const email = req.body.email;
        const mobile = req.body.mobile;
        const password = req.body.password;

        bcryptjs.hash(password, 10, function (hasherror, hash_password) {

            const data = new registration({

                fname: fname,
                lname: lname,
                email: email,
                mobile: mobile,
                address: address,
                password: hash_password,
            })

            data.save()

                .then(function (result) {

                    const token = jwt.sign({ cId: result._id }, 'secretkey')
                    res.status(200).json({ success: true, token: token })
                })
                .catch(function (someerror) {
                    res.status(500).json({ message: someerror })
                })
        })

    }

    else {

        // invalid

        res.status(400).json(RegistrationErr.array())
    }

})


router.post('/registration/login', function (req, res) {

    const email = req.body.email;
    const password = req.body.password;
    registration.findOne({ email: email }).then(function (registrationData) {
        if (registrationData === null) {
            //no email found
            return res.status(403).json({ mes: "invalid login information!!" })
        }
        //Email found
        bcryptjs.compare(password, registrationData.password, function (error, result) {
            if (result === false) {
                return res.status(403).json({ mes: "invalid login information!1!" })
            }

            // email and password valid
            // token generate
            const token = jwt.sign({ cId: registrationData._id }, 'secretkey')
            res.status(200).json({
                token: token,
                success: true
            })
        })
    }).catch(function (error) {
            res.status(500).json({ error: Error });
        })
});


router.get("/customer/profile", auth.verifyCustomer, function (req, res) {
    registration.findById(req.userInfo._id).then(function (customer) {
        res.status(200).json({ success: true, data: customer })
    }).catch(function (e) {
        res.status(500).json({ error: e })
    })
});


module.exports = router;