import io from 'socket.io-client';

const socket = io('http://localhost:3000'); // Ensure this matches your server's address

socket.on('connect', () => {
    console.log('Connected to Socket.io server');
});

socket.on('disconnect', () => {
    console.log('Disconnected from Socket.io server');
});

socket.on('error', (error) => {
    console.error('Socket.io error:', error);
});

export default socket;
