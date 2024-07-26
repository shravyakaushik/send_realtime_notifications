const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

// Get notifications for a user
router.get('/notifications/user/:userId', notificationController.getNotifications);

// Add a new notification
router.post('/notifications/add', notificationController.addNotification);

module.exports = router;
