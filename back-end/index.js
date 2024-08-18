if(process.env.NODE_ENV !== "production"){
    require('dotenv').config()
}
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

//models
const Avmet = require('./models/avmet')

//initialise express
const app = express()


//initialise mongoose
const dbURL = process.env.DB_URL || 'mongodb://localhost:27017/avmet'
async function main() {
    await mongoose.connect(dbURL)
}

main()
    .then(() => {
        console.log('database is connected!')
    })
    .catch((err) => {
        console.log('failed connection')
        console.log(err)
    })

//definiting  uses
app.use(express.json())
app.use(cors())

app.get('/', async (req, res) => {
    const avmet = await Avmet.find({})
    res.json(avmet)
})

app.get('/:mcl', async (req, res) => {
    const { mcl } = req.params;
    const foundAvmet = await Avmet.find({ mcl })
    res.json(foundAvmet[0])
})

app.put('/:mcl', async (req, res) => {
    const { mcl } = req.params;
    const avmet = await Avmet.find({ mcl })
    const id = avmet[0].id
    const { tailNo, location, user, status, bookIO, sqn } = req.body.avmet
    await Avmet.findByIdAndUpdate(id, { mcl, tailNo, location, user, status, bookIO, sqn })
})

app.listen(3000, () => {
    console.log('running on port 3000')
})