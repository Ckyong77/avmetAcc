const mongoose = require('mongoose')

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        res.status(400)
    }
    next();
}