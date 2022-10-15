const jwt = require('jsonwebtoken');

exports.isAuthenticatedByJWT = (req, res, next) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
    } else {
        return res.status(500).json({ message: 'Authorization required to access route' })
    }
    next()

}

exports.userMiddleware = (req, res, next) => {

}

exports.adminMiddleware = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(400).json({ message: "User Access Denied" })
    }
    next();
}