const userModel = require("../models/user.model");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const blacklistModel = require("../models/blacklist.model");

const registerUser = async(req, res) => {
    const {username, email, password} = req.body

    const isAlreadyExists = await userModel.findOne({
        $or: [
            {email},
            {username}
        ]
    })

    if(isAlreadyExists){
        return res.status(409).json({
            message: "User already exists"
        })
    }

    const hash = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        username,
        email,
        password: hash
    })

    const token = jwt.sign(
        {
            id: user._id,
            username: user.username
        },
        process.env.JWT_SECRET,
        {expiresIn: '3d'}
    )

    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 3 * 24 * 60 * 60 * 1000 // 3 days in milliseconds
    })

    return res.status(201).json({
        message: "User created successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}

const loginUser = async(req, res) => {
    const {username, email, password} = req.body

    const user = await userModel.findOne({
        $or: [
            {email},
            {username}
        ]
    }).select('+password')

    if(!user){
        return res.status(400).json({
            message: "Invalid credentials"
        })  
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password)

    if(!isPasswordCorrect){
        return res.status(400).json({
            message: "Invalid credentials"
        })  
    }

    const token = jwt.sign(
        {
            id: user._id,
            username: user.username
        },
        process.env.JWT_SECRET,
        {expiresIn: '3d'}
    )

    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 3 * 24 * 60 * 60 * 1000 // 3 days in milliseconds
    })

    res.status(200).json({
        message: "Login successful",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}

const getMe = async(req, res) => {
    const user = await userModel.findById(req.user.id)

    if(!user){
        return res.status(404).json({
            message: "User not found"
        })  
    }

    res.status(200).json({
        message: "User fetched successfully",
        user: {
            id: user._id,       
            username: user.username,
            email: user.email
        }
    })
}

const logoutUser = async(req, res) => {
    const token = req.cookie.token

    res.clearCookie('token')

    await blacklistModel.create({
        message: "Token blacklisted",
        token
    })

    res.status(200).json({
        message: "Logout successful"
    })
}
 
module.exports = {
    registerUser,
    loginUser,
    getMe,
    logoutUser
}