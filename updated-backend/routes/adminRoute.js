const express = require('express');
const Admin = require('../models/adminModel');
const app = express();
const router = express.Router();

// for validation our admin data

const { check, validationResult } = require('express-validator')

// for password encryption

const bcryptjs = require('bcryptjs')

const jwt = require("jsonwebtoken")


router.post('/admin/insert', [


    check('email', 'email is required !!').not().isEmpty(),

    check('password', 'password is required !!').not().isEmpty(),


]
    , function (req, res) {

        const AdminErr = validationResult(req);

        if (AdminErr.isEmpty()) {
            // valid
            const full_name = req.body.fname;
            const address = req.body.address;
            const email = req.body.email;
            const password = req.body.password;

            bcryptjs.hash(password, 10, function (hasherror, hash_password) {


                const data = new Admin({

                    full_name: full_name,
                    address: address,
                    email: email,
                    password: hash_password,

                })

                data.save()

                    .then(function (result) {

                        res.status(200).json({ success: true })
                    })
                    .catch(function (someerror) {

                        res.status(500).json({ message: someerror })
                    })
            })

        }

        else {

            // invalid

            res.status(400).json(AdminErr.array())
        }

    })


router.post('/admin/login'
    , function (req, res) {

        const email = req.body.email;
        const password = req.body.password;

        Admin.findOne({ email: email })

            .then(function (AdminData) {
                if (AdminData === null) {

                    //no email found
                    return res.status(403).json({ mes: "invalid login information!!" })
                }

                //Email found

                bcryptjs.compare(password, AdminData.password, function (error, result) {

                    if (result === false) {

                        return res.status(403).json({ mes: "invalid login information!1!" })
                    }

                    // email and password valid
                    // token generate

                    const token = jwt.sign({ cId: AdminData._id }, 'admin-secret-key')

                    res.status(200).json({
                        token: token,
                        success: true

                    })

                })
            })
            .catch(function (error) {

                res.status(500).json({ error: Error });
            })

    })

module.exports = router;
