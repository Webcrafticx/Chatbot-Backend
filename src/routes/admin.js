const express = require('express');
const router = express.Router();
const { authMiddleware, adminOnly } = require('../middlewares/auth');
const adminController = require('../controllers/adminController');

router.use(authMiddleware);
router.get('/users', adminOnly, adminController.listUsers);

module.exports = router;
