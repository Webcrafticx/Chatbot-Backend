const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middlewares/auth');
const upload = require('../middlewares/upload');
const chatbotController = require('../controllers/chatbotController');

router.get('/:slug', chatbotController.getBySlug);
router.patch('/:id', authMiddleware, upload.single('logo'), chatbotController.updateChatbot);

module.exports = router;
