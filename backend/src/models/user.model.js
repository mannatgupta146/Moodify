const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: [true, "Email is required"]
    },

    password: {
        type: String,
        required: [true, "Password is required"]
    },

    username: {
        type: String,
        unique: true,
        required: [true, "Username is required"]
    }
})

const userModel = mongoose.model('users', userSchema)

module.exports = userModel