const path= require('path');
const express = require('express');
const http = require('http');
const socketIO= require('socket.io');
const {generateMessage, generateLocationMessage}= require( './utils/message')

var publicPath= path.join(__dirname, '../public');
console.log(publicPath);

const PORT=process.env.PORT|| 3000;

const app = express();
var server= http.createServer(app);
var io= socketIO(server);

io.on('connection',(socket)=>{
    console.log('New user was connected');

    socket.emit('newMessage',generateMessage('Admin','Welcome to the chat app'));

    socket.broadcast.emit('newMessage',generateMessage('Admin','New user joined'));

    socket.on('createMessage',(message,callback)=>{
        console.log('createMessage',message);
        io.emit('newMessage',generateMessage(message.from, message.text));
        callback();
    });



    socket.on('createLocationMessage',(coords)=>{
    io.emit('newLocationMessage',generateLocationMessage('Admin',coords.latitude,coords.longitude));
    });
    socket.on('disconnect',()=>{
    console.log('User was disconnected');
    });
});

app.use(express.static(publicPath))

server.listen(PORT, () =>{ 
    console.log(`Server is up on port ${PORT}`);
});