const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const { authMiddleware } = require('../middlewares/auth');


router.get('/:slug/display', chatController.getDisplay);
router.post('/:slug/message', chatController.createMessage);
router.post('/:slug/query', chatController.visitorQuery);
router.get('/:slug/visitorslist', authMiddleware,chatController.visitorList);
router.delete('/:slug/visitors/:id', authMiddleware,chatController.deleteVisitor);

module.exports = router;
