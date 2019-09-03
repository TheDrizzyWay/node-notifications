const socket = io();
socket.on('message', (data) => document.write(data));
socket.on('test', (data) => document.write(data.description));
setTimeout(() => socket.emit('clientEvent', 'Sent an event from the client!'), 6000);