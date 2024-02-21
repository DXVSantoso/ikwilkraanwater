const jwt = require( 'jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require( 'express-async-handler')
const User = require('../models/userModel')
require('dotenv').config


// @desc Register new user
// @route POST /api/users
// @access Public
const registerUser =  asyncHandler(async(req, res) => {
    const{name, email, password} = req.body

    if(!name || !email  || !password)  {
        res.status(400)
        throw new Error('Incomplete info')
    }

    const userExists = await User.findOne({email})

    if (userExists) {
        res.status(400)
        throw new Error('User already registered')
    }

    //hash the pw
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if(user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error( 'invalid user data')
    }
})

// @desc authenticate a user
// @route POST /api/users/login
// @access Public
const loginUser =  asyncHandler(async(req, res) => {
    console.log('login attempted 0')
    const {email, password} = req.body
    console.log('login attempted 1')
    //check email
    const user = await User.findOne({email})
    console.log('login attempted 2')

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid details')
    }
    console.log('login attempted 3')
})

// @desc get user data
// @route GET /api/users/me
// @access Private
const getMe = asyncHandler(async(req, res) => {
    const {_id, name, email} = await User.findById(req.user.id)

    res.status(200).json({
        id: _id,
        name,
        email
    })
})

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '2d',
    })
}

module.exports = {
    registerUser, loginUser, getMe
}

