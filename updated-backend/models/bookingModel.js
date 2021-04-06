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
    adult:{
        type: String
    },
    children :{
        type: String
    },
    bookDate:{
        type: String
    },
    created_at:{
        type: Date,
        default:Date.now
    },
    status:{
        type: String,
        default: 'active'
    },
    cost:{
        type: String
    }
}) 

module.exports = Booking;