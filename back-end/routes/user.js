const express = require('express')
const router = express.Router();
const User = require('../models/user')
const passport = require('passport');
const { isLoggedIn } = require('../middleware');


router.post('/login', passport.authenticate('local', { keepSessionInfo: true }), async (req, res) => {
    res.json({
        authenticated: req.isAuthenticated(),
        session: req.sessionID,
        currUser: req.user
    })
})

router.get('/register', isLoggedIn, (req, res) => {
    if (res.statusCode !== 200) {
        res.send('/login')
    } else {
        res.send(true)
    }
})

router.post("/register", isLoggedIn, async (req, res) => {
    try {
        const { username, password, email, admin} = req.body.user;
        const newUser = await new User({ email, username, admin})
        const registerUser = await User.register(newUser, password)
        req.login(registerUser, (err) => {
            if (err) {
                return next(err)
            }
            res.redirect('/')
        })
    } catch (e) {
        res.send(e)
    }
})

router.get('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) { return next(err); }
    });
    res.send('logged out')
});

module.exports = router;