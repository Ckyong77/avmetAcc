if(process.env.NODE_ENV !== "production"){
    require('dotenv').config()
}

const mongoose = require('mongoose')
const Avmet = require('../models/avmet')
const location = require('./location')
const users = require('./users')

//initialising mongoose
const dbURL = process.env.DB_URL || 'mongodb://localhost:27017/avmet'
async function main() {
    await mongoose.connect(dbURL)
}
main()
    .then(() => {
        console.log('database is connected!',dbURL)
    })
    .catch((err) => {
        console.log('failed connection')
        console.log(err)
    })

const status = ['Live', 'Det']
const sqn = [808, 805]
const IOstatus = ['In', 'Out']

const seedDB = async () => {
    // await Avmet.deleteMany({})
    for (let i = 0; i < 21; i++) {
        randomMCL = Math.floor(100000 + Math.random() * 900000)
        random12 = Math.floor(Math.random() * 12)
        randomTail = Math.floor(Math.random() * 97)
        randomstat = Math.floor(Math.random() * 2)
        const bookIO = IOstatus[randomstat]
        const avmetDB = new Avmet({
            mcl: `N${randomMCL}`,
            tailNo: `K${randomTail}`,
            location: location[random12],
            status: status[randomstat],
            bookIO: bookIO,
            user: bookIO === "In" ? "Nil" : users[random12],
            sqn: sqn[randomstat]
        })
        await avmetDB.save()
        console.log("seeds saved!")
    }
}

seedDB()
    .then(() => {
        mongoose.connection.close()
        console.log('updated and closed database')
    })