const express = require('express')
const router = express.Router();
const Avmet = require('../models/avmet');
const { isLoggedIn } = require('../middleware');

router.get('/:mcl', isLoggedIn, async (req, res) => {
    const { mcl } = req.params;
    const foundAvmet = await Avmet.find({ mcl })
    res.json(foundAvmet[0])
})

router.put('/:mcl', isLoggedIn, async (req, res) => {
    const { mcl } = req.params;
    const avmet = await Avmet.find({ mcl })
    const id = avmet[0].id
    const { tailNo, location, user, status, bookIO, sqn } = req.body.avmet
    await Avmet.findByIdAndUpdate(id, { mcl, tailNo, location, user, status, bookIO, sqn })
})

module.exports = router;