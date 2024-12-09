import { Server } from "socket.io";
import http from "http"
import express from "express"

const app = express();

//wrapping express server in socket io server
const server = http.createServer(app);
const io = new Server(server, {
    cors : {
        origin : ["http://localhost:3000"],
        methods : ["GET", "POST"]
    }
});

const userSocketMap = {}; // {userId : socketId}

export const getReceiverSocketId = (receiverId) => {
	return userSocketMap[receiverId];
};


// socket will be a user 
io.on('connection', (socket) => {
    console.log("User connected", socket.id);

    // from front end, pushing userId into query in frontend
    const userId = socket.handshake.query.userId;
    if(userId != undefined){
        userSocketMap[userId] = socket.id;
    }

    // io.emit() is used to send events to all the connected clients
	io.emit("getOnlineUsers", Object.keys(userSocketMap));

    // socket.on is used to listen events. Can be used on both server and client sides
    socket.on('disconnect', () => {
        console.log("User disconnected", socket.id)
        delete userSocketMap[userId];
		io.emit("getOnlineUsers", Object.keys(userSocketMap));
    })
})


export {app, io, server}