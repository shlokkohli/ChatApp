import express from 'express'
import authRouter from './routes/auth.routes.js'
import messageRoutes from './routes/message.routes.js'
import userRoutes from './routes/user.routes.js'
import cookieParser from 'cookie-parser';
import cors from 'cors'

const app = express();


app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: "http://localhost:5173", credentials: true}));

// routes declaration
app.use('/api/auth', authRouter)
app.use('/api/messages', messageRoutes)
app.use('/api/users', userRoutes)

export { app };