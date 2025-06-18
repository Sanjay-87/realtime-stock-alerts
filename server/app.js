import express from 'express';
import http from 'http';
import cors from 'cors';
import socketIo from 'socket.io';


const app = express();
app.use(cors());

const server = http.createServer(app);

const io = socketIo(Server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    }
})

io.on("connection", (socket) => {
    console.log("New client connected");

    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
})

// Expose the socket to consumer.js
module.exports = io;

server.listen(4000, () => {
    console.log("Server is running on port 4000");
})
