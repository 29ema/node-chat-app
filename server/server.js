const path= require('path');
const express = require('express');
const http = require('http');
const socketIO= require('socket.io');

var publicPath= path.join(__dirname, '../public');
console.log(publicPath);

const PORT=process.env.PORT|| 3000;

const app = express();
var server= http.createServer(app);
var io= socketIO(server);

io.on('connection',(socket)=>{
    console.log('New user was connected');
    socket.emit('newMessage',{
        from:'Admin',
        text:'Welcome to the chat app'
    });
    socket.broadcast.emit('newMessage',{
        from:'Admin',
        text:'New user joined',
        createdAt: new Date().getTime()
    });

    socket.on('createMessage',(message)=>{
        console.log('createMessage',message);
        socket.broadcast.emit('newMessage',{
            from:message.from,
            text:message.text,
            createdAt: new Date().getTime()
        });
        });

    socket.on('disconnect',()=>{
    console.log('User was disconnected');
    });
});
app.use(express.static(publicPath))

server.listen(PORT, () =>{ 
    console.log(`Server is up on port ${PORT}`);
});