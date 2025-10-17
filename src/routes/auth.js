const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const {adminOnly, authMiddleware} = require('../middlewares/auth');
const {registerUserValidator, loginUserValidator} = require('../utils/validators');
const validate = require('../middlewares/validate');

router.post('/register',authMiddleware, adminOnly,validate( registerUserValidator), authController.register )
router.post('/login',validate(loginUserValidator), authController.login )
router.post('/admin/register',validate(registerUserValidator), authController.adminRegister )

module.exports = router