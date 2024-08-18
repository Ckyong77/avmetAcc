const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const avmetSchema = new Schema ({
    mcl: String,
    tailNo: String, 
    location: String, 
    user: String,
    status: String, 
    bookIO:String,
    sqn: Number
})

module.exports = mongoose.model('Avmet', avmetSchema)