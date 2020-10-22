let jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
    try {
        let token = req.get('token') || req.query.token;

        if (!token) {
            res.status(401).json({ "message": "unAuthorized user" })
        } else {
            let decode = jwt.verify(token, process.env.secretKey);
            if (!decode) {
                res.status(401).json({ "message": "invalid token" })
            }
            else {
                req.user = decode.user;
                next();
            }
        }
    } catch (error) {
        res.status(400).json({ "message": "unAuthorized user" })
    }
}
