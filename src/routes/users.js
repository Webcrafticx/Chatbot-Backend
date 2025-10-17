const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middlewares/auth');
const upload = require('../middlewares/upload');
const userController = require('../controllers/userController');

router.use(authMiddleware);

router.post('/chatbots', upload.single('logo'), userController.createChatbot);
router.get('/chatbots', userController.listChatbots);

router.post('/qa', userController.addQA);
router.put('/qa/:id', userController.updateQA);
router.delete('/qa/:id', userController.deleteQA);

module.exports = router;
