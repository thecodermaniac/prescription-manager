const express = require('express');
const { validationResult } = require('express-validator');
const router = express.Router()
const PresImage = require('../models/PrescriptionImages')
var fetchuser = require('../middleware/fetchuser')
const multer = require('multer');
var fs = require('fs')

const filestorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "../client/public/uploads")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const upload = multer({ storage: filestorage })

router.get('/fetchallpresc', fetchuser, async (req, res) => {
    try {
        const presimg = await PresImage.find({ patient: req.user.id });
        res.json(presimg)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

router.delete('/deletepresc/:id', fetchuser, async (req, res) => {
    try {
        let presimg = await PresImage.findById(req.params.id);
        if (!presimg) { return res.status(404).send("Not Found") }

        if (presimg.patient.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        let note = await PresImage.findByIdAndDelete(req.params.id)
        let path="../public/uploads/"+note.pres_image
        fs.unlinkSync(path)
        res.json({ "succes": "note deleted", "note": note })


    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
    // Find the note to be deleted and delete it


})

router.put('/updateimg/:id',fetchuser,upload.single('upimage') ,async(req,res)=>{

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let id= req.params.id
        const newpresimg={}
        if(req.file.filename){newpresimg.pres_image=req.file.filename}
                
        // console.log(req.file)
        // res.send("update done")
        let image = await PresImage.findById(req.params.id);
        if (!image) { return res.status(404).send("Not Found") }
        console.log(image);
        console.log(req.user.id);

        if (image.patient.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        let path="../client/public/uploads/"+image.pres_image
        fs.unlinkSync(path)
        image = await PresImage.findByIdAndUpdate(req.params.id, { $set: newpresimg }, { new: true })
    res.json({ image });

    } catch (error) {
        console.error(error.message);
    }
})

module.exports = router