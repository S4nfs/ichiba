const User = require('../../models/user');
const jwt = require('jsonwebtoken');

exports.signup = (req, res) => {
    User.findOne({ email: req.body.email }).exec((error, data) => {
        if (data) {
            return res.status(400).json({
                message: "Admin already registered"
            });
        }
        const { firstName, lastName, email, password } = req.body;
        const user = new User({ firstName, lastName, email, password, username: Math.random().toString(), role: 'admin' });
        user.save((error, data) => {
            if (error) {
                return res.status(400).json({
                    message: "Something went wrong !:("
                });
            }
            if (data) {
                return res.status(201).json({
                    message: "Admin Created"
                })
            }
        })
    })
}

exports.signin = (req, res) => {
    User.findOne({ email: req.body.email }).exec((error, user) => {
        if (error) return res.status(400).json({ error });
        if (user) {
            if (user.authenticate(req.body.password) && user.role === 'admin') {
                const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '20d' });
                const { _id, firstName, lastName, email, role, fullName } = user;
                res.cookie('token', token, { expiresIn: '20d' }) //set cookie on server
                res.status(200).json({
                    token: token,
                    user: { _id, firstName, lastName, email, role, fullName }
                });
            } else {
                return res.status(400).json({
                    message: "Invalid password"
                });
            }
        } else {
            return res.status(400).json({ message: 'Something went wrong' })
        }
    });
}

exports.signout = (req, res) => {
    res.clearCookie('token');   //clear cookie on server
    res.status(200).json({
        message: "Signout Successfully"
    })
}