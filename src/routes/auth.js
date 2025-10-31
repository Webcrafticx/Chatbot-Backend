const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const {adminOnly, authMiddleware} = require('../middlewares/auth');
const {registerUserValidator, loginUserValidator} = require('../utils/validators');
const validate = require('../middlewares/validate');

router.post('/register',authMiddleware,validate( registerUserValidator), authController.register )
router.post('/login',validate(loginUserValidator), authController.login )
router.post('/admin/register',validate(registerUserValidator), authController.adminRegister )
router.post('/renew',authMiddleware, authController.renewSubscription )
router.post('/admin/renew', authMiddleware, adminOnly, authController.renewSubscription);


module.exports = router