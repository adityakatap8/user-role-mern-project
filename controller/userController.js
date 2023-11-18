const User = require('../models/User');
const Note = require('../models/Note');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');


// @desc Get All Users
// @route GET/users
// @access Private

const getAllUsers = asyncHandler(async (req, res) => {
   const users = await User.find().select('-password')
})

// @desc Create New User
// @route POST/users
// @access Private

const createNewUsers = asyncHandler(async (req, res) => {

})


// @desc Update User
// @route PUT/users
// @access Private

const updateUser = asyncHandler(async (req, res) => {

})

// @desc Delete User
// @route DELETE/users
// @access Private

const deleteUser = asyncHandler(async (req, res) => {

})

module.exports = {
    getAllUsers,
    createNewUsers,
    updateUser,
    deleteUser
}