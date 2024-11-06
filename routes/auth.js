//import
const express = require('express')
const { registerUser, loginUser,authenticateUser } = require('../controllers/authController')
const router = express.Router();


//user registration
router.post('/register', registerUser,authenticateUser);

//user login 
router.post('/login', loginUser,authenticateUser);

module.exports = router;