const socketIo = require('socket.io');
const { QueryTypes } = require('sequelize');
const sequelize = require('./connection'); // Adjust path as needed

let io;

const initSocketIo = (server) => {
    io = socketIo(server, {
        cors: {
            origin: 'http://localhost:3001', // Adjust to your frontend URL
            methods: ['GET', 'POST'],
            allowedHeaders: ['Content-Type']
        }
    });

    io.on('connection', (socket) => {
        console.log('New client connected');

        socket.on('subscribeToNotifications', (cust_id) => {
            console.log(`User ${cust_id} subscribed to notifications`);
            socket.join(`user_${cust_id}`);
            console.log(`User ${cust_id} joined room user_${cust_id}`);
        });

        socket.on('sendNotification', async (notification) => {
            try {
                console.log('Received sendNotification event');
                console.log('Sending notification:', notification);

                const result = await sequelize.query('CALL CreateNotification(:cust_id, :noti_type_id, :noti_message, :updated_date, :noti_status_id, :is_deleted)', {
                    replacements: notification,
                    type: QueryTypes.RAW
                });
                console.log('Database result:', result);

                console.log(`Emitting newNotification to user_${notification.cust_id}`);
                io.to(`user_${notification.cust_id}`).emit('newNotification', notification);
                console.log('New notification sent');
            } catch (err) {
                console.error('Error handling notification:', err);
            }
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });
};

const getIo = () => {
    if (!io) {
        throw new Error('Socket.IO not initialized!');
    }
    return io;
};

module.exports = { initSocketIo, getIo };
