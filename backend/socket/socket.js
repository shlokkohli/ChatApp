import { Server } from 'socket.io'
import { createServer } from 'http'
import express from 'express'
import { app } from '../app.js'

const server = createServer(app)
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        credentials: true
    }
})

// mapping for userId -> socketId
const userSocketMap = {};

export const getReceiverSocketId = (receiverUserId) => {
    return userSocketMap[receiverUserId];
}

io.on("connection", (socket) => {

    console.log("a new socket user connected: ", socket.id);

    const userId = socket.handshake.query.userId;

    // this creates a mapping of userId -> socketId, telling us which user have what socketId
    if(userId != undefined) userSocketMap[userId] = socket.id

    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
        console.log("socket user disconnect: ", socket.id)
        delete userSocketMap[userId]
        io.emit("getOnlineUsers", Object.keys(userSocketMap))
    })
})

export { server, io };