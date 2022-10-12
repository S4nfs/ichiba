const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/signup', (req, res) => {
    User.findOne({ email: req.body.email }).exec((error, data) => {
        if (data) {
            return res.status(400).json({
                message: "User already registered"
            });
        }
        const { firstName, lastName, email, password } = req.body;
        const user = new User({ firstName, lastName, email, password, username: Math.random().toString() });
        user.save((error, data) => {
            if (error) {
                return res.status(400).json({
                    message: "Something went wrong !:("
                });
            }
            if (data) {
                return res.status(201).json({
                    message: "User Created"
                })
            }
        })
    })
})

// router.post('/signin', (req, res) => {

// })

module.exports = router;