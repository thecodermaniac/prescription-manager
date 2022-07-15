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

module.exports = router