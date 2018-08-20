const path= require('path');
const express = require('express');
const http = require('http');
const socketIO= require('socket.io');
const {isRealString}= require('./utils/validation');
const {Users}=require('./utils/users');
const {generateMessage, generateLocationMessage}= require( './utils/message');

var publicPath= path.join(__dirname, '../public');
console.log(publicPath);

const PORT=process.env.PORT|| 3000;

const app = express();
var server= http.createServer(app);
var io= socketIO(server);
var users=new Users();

io.on('connection',(socket)=>{
    console.log('New user was connected');
   
    socket.on('join',(params,callback)=>{

        if(!isRealString(params.name)|| !isRealString(params.room)){
            return callback('Name and room are required');
        }
        socket.join(params.room);
        users.removeUser(socket.id); //e fshi kte user nga room te tjera qe te mund te rregj diku tj
        users.addUser(socket.id,params.name,params.room);

        io.to(params.room).emit('updateUserList',users.getUserList(params.room));

        socket.emit('newMessage',generateMessage('Admin','Welcome to the chat app'));
        socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin',`${params.name} has joined.`));
    
        callback();

    });
    socket.on('createMessage',(message,callback)=>{
        var user=users.getUser(socket.id);
        if(user && isRealString(message.text)){
            io.to(user.room).emit('newMessage',generateMessage(user.name, message.text));
        }
        
        callback();
    });

    socket.on('createLocationMessage',(coords)=>{
        var user=users.getUser(socket.id);

        if(user){
            io.to(user.room).emit('newLocationMessage',generateLocationMessage(user.name,coords.latitude,coords.longitude));
        }
    });
    socket.on('disconnect',()=>{
       
        var user= users.removeUser(socket.id); 
        if(user){
            io.to(user.room).emit('updateUserList',users.getUserList(user.room));
            io.to(user.room).emit('newMessage',generateMessage('Admin',`${user.name} has left.`));

        }

    });
});
app.use(express.static(publicPath))

server.listen(PORT, () =>{ 
    console.log(`Server is up on port ${PORT}`);
});