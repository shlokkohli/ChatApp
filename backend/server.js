import { server } from './socket/socket.js'
import { connectDB } from './database/index.js';
import dotenv from 'dotenv'
import { app } from './app.js';
import path from "path";
import express from 'express';

dotenv.config({})

const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

connectDB()
.then(() => {
    server.listen(process.env.PORT || 3000, () => {
        console.log(`Server is listening on port ${process.env.PORT}`)
    })
})
.catch((error) => {
    console.log("MONGODB connection failed !!", error);
})