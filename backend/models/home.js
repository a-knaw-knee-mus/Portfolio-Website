const mongoose = require("mongoose")

const homeSchema = new mongoose.Schema({
    intro: String,
    profilePic: String,
    resume: String
})

module.exports = mongoose.model('Home', homeSchema)