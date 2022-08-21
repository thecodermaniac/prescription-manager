const express = require('express');
const { validationResult } = require('express-validator');
const router = express.Router()
var fetchuser = require('../middleware/fetchuser');
const multer = require('multer');
const PresImage = require('../models/PrescriptionImages');

const filestorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "../client/public/uploads")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const upload = multer({ storage: filestorage })

router.post('/addimage', fetchuser, upload.single('image'), async (req, res) => {


    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        console.log(req.file)
        res.send("upload done")
        const presImg = new PresImage({
            pres_image: req.file.filename, patient: req.user.id
        })
        const savedImg = await presImg.save()

        res.json(savedImg)

    } catch (error) {
        console.error(error.message);
    }
})


module.exports = router


