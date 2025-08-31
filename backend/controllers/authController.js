const User = require('../models/User')
const bcrypt = require('bcrypt') // Import bcrypt for password hashing, and decryption comparison
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

// @desc Login
// @route POST /auth
// @access Public
const login = asyncHandler(async (req, res) => {})


//@desc Refresh getting new access token
//@route GET /api/auth/refresh
//@access Public - because access token has expired
const refresh = (req, res) => {}

//@desc Logout
//@route POST /api/auth/logout
//@access Public - just to clear cookie if exists
const logout = (req, res) => {}

module.exports = {
    login,
    refresh,
    logout
}