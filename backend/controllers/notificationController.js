// controllers/notificationController.js

const Notification = require('../models/Notification');
const { QueryTypes } = require('sequelize');
const sequelize = require('../config/connection');
const { getIo } = require('../config/socket');

exports.getNotifications = async (req, res) => {
    try {
        const userId = req.params.userId;
        const notifications = await Notification.findAll({
            where: { 
                cust_id: userId, 
                is_deleted: false 
            },
            attributes: ['noti_id', 'noti_message', 'updated_date', 'noti_status_id']
        });
        res.json(notifications);
    } catch (err) {
        console.error('Error fetching notifications:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.addNotification = async (req, res) => {
    try {
        const { cust_id, noti_type_id, noti_message, updated_date, noti_status_id, is_deleted } = req.body;

        // Call the stored procedure to add a new notification
        await sequelize.query('CALL CreateNotification(:cust_id, :noti_type_id, :noti_message, :updated_date, :noti_status_id, :is_deleted)', {
            replacements: { cust_id, noti_type_id, noti_message, updated_date, noti_status_id, is_deleted },
            type: QueryTypes.RAW
        });

        // Notify the user via WebSocket
        const io = getIo(); // Get the Socket.IO instance
        io.to(`user_${cust_id}`).emit('newNotification', {
            cust_id,
            noti_type_id,
            noti_message,
            updated_date,
            noti_status_id,
            is_deleted
        });

        res.status(201).json({ message: 'Notification added successfully' });
    } catch (err) {
        console.error('Error adding notification:', err);
        res.status(500).json({ message: 'Server error' });
    }
};
