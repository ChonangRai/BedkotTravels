const express = require('express');
const router = express.Router();
const Destination = require('../models/destinationModel');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const fs = require('fs');

router.post('/destination/insert', auth.verifyAdmin, upload.single('dimage'), function (req, res) {
   // router.post('/destination/insert', auth.verifyCustomer, auth.verifyAdmin, function (req, res) {

   // if (req.file == undefined) {
   //    return res.status(400).json({
   //       message: "Jpeg and Png only allowed "
   //    })
   // }

   const dtitle = req.body.dtitle;
   const ddescription = req.body.ddescription;
   const dcost = req.body.dcost;
   const dimage = req.file ? req.file.path : null;

   ddata = new Destination({ dtitle: dtitle, dimage: dimage, ddescription: ddescription, dcost: dcost });

   ddata.save()
      .then(function (result) {
         res.status(201).json({ success: true, data: result })
      })

      .catch(function (e) {

         res.status(500).json({ error: e })
      })
})
//Use put for update

router.post('/destination/insert/:dest/photo', auth.verifyAdmin, upload.single('dimage'), function(request,response){
   if(request.file === undefined) {
		return response.status(500).json({message : "Upload an image"})
	}
	
	Destination.findByIdAndUpdate(request.params.dest, {
		dimage : request.file.path
	}, function(err, destination) {
		if(err) {
			return response.status(500).json({message : err.message})
		}
		response.json({success : true, message : request.file.filename})
	})
})


router.put('/destination/update/:id', upload.single('dimage'), auth.verifyAdmin, function (req, res) {
   var dimage = req.body.dimage;
   if(req.file != undefined){
      dimage = req.file.path
   }
   const dtitle = req.body.dtitle;
   const ddescription = req.body.ddescription;
   const dcost = req.body.dcost;
   const id = req.params.id;

   Destination.updateOne({ _id: id }, { dtitle: dtitle, dimage: dimage, ddescription: ddescription, dcost: dcost })

      .then(function (result) {

         res.status(200).json({ success: true })
      })

      .catch(function (e) {

         res.status(500).json({ error: e })

      })

})

//for delete

router.delete('/destination/delete/:id', auth.verifyAdmin, function (req, res) {

   const id = req.params.id;

   Destination.deleteOne({ _id: id })

      .then(function (result) {

         res.status(200).json({ success:true, message: "Sucessfully deleted" })
      })
      .catch(function (e) {

         res.status(500).json({ error: e })
      })
})

//To find all destination

router.get("/destination/all", function (req, res) {

   Destination.find()
      .then(function (result) {
         res.status(200).json({ success: true, data: result })
      })
      .catch(function (e) {
         res.status(500).json({ error: e })
      })
})

//Load photo

router.get("/destination/photo/:id", async function (req, res) {
   const destination = await Destination.findById(req.params.id)
   const filePath = process.cwd() + '/' + destination.dimage;
   if (fs.existsSync(filePath)) {
      return res.sendFile(filePath)
   }
   res.status(404).json({ message: "File not found" })
})

router.get("/destination/get-destination/:_id", function (req, res) {
   Destination.findById(req.params._id).then(function (destination) {
      res.status(200).json({ success: true, data: destination })
   }).catch(function (e) {
      res.status(500).json({ error: e })
   })
});

module.exports = router;

