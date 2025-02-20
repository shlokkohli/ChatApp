import { server } from './socket/socket.js'
import { connectDB } from './database/index.js';
import dotenv from 'dotenv'

dotenv.config({
    path: './.env'
})

connectDB()
.then(() => {
    server.listen(process.env.PORT || 3000, () => {
        console.log(`Server is listening on port ${process.env.PORT}`)
    })
})
.catch((error) => {
    console.log("MONGODB connection failed !!", error);
})