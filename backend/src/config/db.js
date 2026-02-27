const mongoose = require('mongoose')
require('dotenv').config()

const connectToDb = async() => {
    await mongoose.connect(`${process.env.MONGO_URI}/moodify`)
    .then(() => {
        console.log("Connected to MongoDB");
    })
}

module.exports = connectToDb