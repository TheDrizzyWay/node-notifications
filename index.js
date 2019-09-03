const express = require('express');
const path = require('path');
const router = require('./routes');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(express.json());
app.use(express.static(path.join(__dirname, 'client')));
app.use('/api/v1', router);

io.on('connection', (socket) => {
    console.log('A user connected');
    socket.send('Sent a message after connection!');
    setTimeout(() => {
        socket.emit('test', { description: 'A custom event named test!'});
     }, 3000);
     socket.on('clientEvent', (data) => console.log(data));
 
    socket.on('disconnect', () => {
       console.log('A user disconnected');
    });
 });

server.listen(3000, () => console.info('server running on port 3000'));
