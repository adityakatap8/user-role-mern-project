const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

router.route('/')
.get(userController.getAllUsers)
.post(userController.createNewUsers)
.patch(userController.updateUser)
.delete(userController.deleteUser)


module.exports = router