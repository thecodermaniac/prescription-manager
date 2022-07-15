const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router()
const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')
const User = require('../models/User')

const JWT_SECRET = 'Aritra@lol'

// Create a User using: POST "/api/auth/createuser".No login required

router.post('/createuser', [body('name').isLength({ min: 4 }),
body('email').isEmail(),
body('password').isLength({ min: 3 })], async (req, res) => {
    let success = null
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        success = false
        return res.status(400).json({ errors: errors.array(), valid: success });
    }

    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            success = false
            return res.status(400).json({ error: "Sorry a user with this email already exists", valid: success })
        }

        const salt = await bcrypt.genSalt(10)
        const secrectPass = await bcrypt.hash(req.body.password, salt)
        // Create a new user
        user = await User.create({
            name: req.body.name,
            password: secrectPass,
            email: req.body.email,
        })
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);


        // res.json(user)
        success = true
        res.json({ authtoken, valid: success })
    } catch (error) {
        console.log('part called')
        console.error(error.message)
        res.status(500).send("Internal Server Error")

    }



})

router.get('/test', (req, res) => {
    res.json("hello working")
})

module.exports = router