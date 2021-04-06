const express = require('express');
const router = express.Router();
const Booking = require('../models/bookingModel');
const auth = require('../middleware/auth');

//Make a booking
router.post('/booking/add', auth.verifyCustomer, function (req, res) {

    const customerId = req.body.customerId;
    const destinationId = req.body.destinationId;
    const adult = req.body.adult;
    const children = req.body.children;
    const package = req.body.package;
    const bookDate = req.body.bookDate;
    const cost = req.body.cost;

    bdata = new Booking({ customerId: customerId, destinationId: destinationId, adult: adult, children:children, package: package, bookDate: bookDate, cost:cost })

    bdata.save().then(function (result) {
        res.status(201).json({ success: true, data: result })
    }).catch(function (e) {
        res.status(500).json({ error: e })
    })
})

//Customer updates booking

router.put('/booking/cancel/:id', auth.verifyToken, function (req, res) {

    const id = req.params.id;

    Booking.updateOne({ _id: id }, { status : 'cancelled' })

        .then(function (result) {
            res.status(200).json({ success: true })
        }).catch(function (e) {
            res.status(500).json({ error: e })
        })
})

//Admin updates booking status
router.put('/booking/admin-update-status/:id', auth.verifyAdmin, function (req, res) {

    const status = req.body.status;

    Booking.updateOne({ _id: id }, { status: status }).then(function (result) {
        res.status(200).json({ success: true })
    }).catch(function (e) {
        res.status(500).json({ error: e })
    })
})


//for delete

router.delete('/booking/delete/:id', auth.verifyToken, function (req, res) {
    const id = req.params.id;
    Booking.deleteOne({ _id: id }).then(function () {
        res.status(200).json({ message: "Sucessfully deleted" })
    }).catch(function (e) {
        res.status(500).json({ error: e })
    })
});

//Admin finds all bookings

router.get("/booking/all", auth.verifyAdmin, function (req, res) {

    Booking.find()
        .then(function (result) {
            res.status(200).json({ success: true, data: result })
        })
        .catch(function (e) {
            res.status(500).json({ error: e })
        })
})

//Customer finds all his/her bookings

router.get("/customer-booking/all", auth.verifyCustomer, function (req, res) {

    Booking.find({ customerId: req.userInfo._id })
        .then(function (result) {
            res.status(200).json({ success: true, data: result })
        })
        .catch(function (e) {
            res.status(500).json({ error: e })
        })
})


//Get single booking information
router.get("/booking/get-booked/:_id", auth.verifyToken, function (req, res) {
    Booking.findById(req.params._id).then(function (result) {
        res.status(200).json({ success: true, data: result })
    }).catch(function (e) {
        res.status(500).json({ error: e })
    })
});

module.exports = router;