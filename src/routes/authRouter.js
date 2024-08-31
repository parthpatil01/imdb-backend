const express = require('express');
const router = express.Router();

const { signupValidation, loginValidation } = require('../middleware/validation');
const { signup } = require('../controllers/authController');
const { login } = require('../controllers/authController');


router.post('/signup', signupValidation, signup);

router.post('/login', loginValidation, login)

module.exports = router;