const jwt = require('jsonwebtoken');
const User = require('../model/user.model');

exports.verifyToken = async (req ,res , next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.redirect('/api/users/login');
        }
        jwt.verify(token, process.env.LOGIN_SECRETKEY, (err, payload) => {
            if (err) {
                return res.redirect('/api/users/login');
            }
            req.userId = payload.userId;
            next();
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({message : "Internal Server Error"})
    }
}