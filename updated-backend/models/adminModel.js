const mongoose = require('mongoose');

const Admin = mongoose.model('Admin', {

    full_name: { type: String },
    address: { type: String },
    email: { type: String, required: true, unique: true },
    password: {
        type: String,
        required: true
    }


})

module.exports = Admin;