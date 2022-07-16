const express = require('express');
const { validationResult } = require('express-validator');
const router = express.Router()
const PresImage = require('../models/PrescriptionImages')
var fetchuser = require('../middleware/fetchuser')

router.get('/fetchallpresc', fetchuser, async (req, res) => {
    try {
        const presimg = await PresImage.find({ user: req.user.id });
        res.json(presimg)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

router.delete('/deletepresc/:id', fetchuser, async (req, res) => {
    try {
        let presimg = await PresImage.findById(req.params.id);
        console.log(presimg)
        console.log(req.user.id);
        if (!presimg) { return res.status(404).send("Not Found") }

        if (presimg.patient.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await PresImage.findByIdAndDelete(req.params.id)
        res.json({ "succes": "note deleted", "note": note })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
    // Find the note to be deleted and delete it


})

module.exports = router