const express = require('express');
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");


const router = require('./router')

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users.js')

const app = express()
const httpServer = createServer(app);
const io = new Server(httpServer,{ 
    cors: { 
        origin: '*',
        methods: ["GET", "POST"],
        credentials: true
     }
 });

app.use(router)

io.on("connection", (socket) => {
    //...
    console.log("we have a new connection :))")

    socket.on('join', ({name, room}, callback) => {
        const { error, user } = addUser({id: socket.id, name, room});
        
        if(error) return callback(error);

        socket.emit('emit', {user: 'admin', text: `{$user.name}, wellcome to room ${user.room}`}); //tell user he joins the room
        socket.broadcast.to(user.room).emit('message', {user: "admin", text: `${user.name} has joined, stay calm`}); //tell everyone in the room someone joined

        socket.join(user.room);

        callback();
    });

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);

        io.to(user.room).emit('message', {user: user.name, text: message});

        callback(); 
    })

    socket.on('disconnect', () => {
        console.log("User left :((")
    })
});

const PORT = process.env.PORT || 3000;

httpServer.listen(PORT, () => console.log(`app listening at http://localhost:${PORT}`));
