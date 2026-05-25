// routes/userRoutes.js
const express = require('express');
const { registerUser, loginUser, changePassword } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const { validateRegister, validateLogin, sanitizeInput } = require('../middleware/validationMiddleware');
const router = express.Router();

router.post('/signup', sanitizeInput, validateRegister, registerUser);
router.post('/login', sanitizeInput, validateLogin, loginUser);
router.post('/change-password', authMiddleware, sanitizeInput, changePassword);

module.exports = router;
