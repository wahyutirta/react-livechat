const express = require('express');
const { createServer } = require("http");
const { Server } = require("socket.io");

const router = require('./router')

const app = express()
const httpServer = createServer(app);
const io = new Server(httpServer,{});

app.use(router)

io.on("connection", (socket) => {
    //...
    console.log("we have a new connection :))")

    socket.on('disconnect', () => {
        console.log("User left :((")
    })
});

const PORT = process.env.PORT || 3000;

httpServer.listen(PORT, () => console.log(`app listening at http://localhost:${PORT}`));
