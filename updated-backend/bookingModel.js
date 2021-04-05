const mongoose = require('mongoose');

const Booking = mongoose.model("Booking",{

    customerId : {
        type: String
    },
    destinationId :{
        type: String
    },
    package : {
        type: String
    },
    cost :{
        type: String
    },
    bookDate:{
        type: String
    },
    created_at:{
        type: Date,
        default:Date.now
    },
    bookStatus:{
        type: Boolean,
        default: false
    }
}) 

module.exports = Booking;