import React, { useState, useEffect } from 'react';
import axios from 'axios';
import socket from './socket';
import { FaBell } from 'react-icons/fa';
import './App.css';

const App = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [unreadCount, setUnreadCount] = useState(0);
    const userId = 1; 

    useEffect(() => {
        console.log(`Setting up socket connection for user: ${userId}`);

        socket.emit('subscribeToNotifications', userId);
        console.log(`Subscribed to notifications for user: ${userId}`);

        socket.on('newNotification', (notification) => {
            console.log('Received notification:', notification);
            setNotifications(prevNotifications => [notification, ...prevNotifications]);
            setUnreadCount(prevUnreadCount => prevUnreadCount + 1);
        });

        // Fetch existing notifications
        if (userId) {
            console.log(`Fetching existing notifications for user: ${userId}`);
            axios.get(`http://localhost:3000/api/notifications/user/${userId}`)
                .then(response => {
                    console.log('Fetched notifications:', response.data);
                    setNotifications(response.data);
                    setUnreadCount(response.data.filter(notification => !notification.is_read).length);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching notifications:', error);
                    setLoading(false);
                });
        }

        return () => {
            console.log(`Cleaning up socket listener for user: ${userId}`);
            socket.off('newNotification');
        };
    }, [userId]);

    const handleNotificationClick = () => {
        setUnreadCount(0);
    };

    return (
        <div>
            <h1>Notifications</h1>
            <div className="notification-icon" onClick={handleNotificationClick}>
                <FaBell size={24} />
                {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
            </div>
            {loading ? (
                <p>Loading notifications...</p>
            ) : (
                <ul>
                    {notifications.map(notification => (
                        <li key={notification.noti_id}>
                            {notification.noti_message}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default App;
