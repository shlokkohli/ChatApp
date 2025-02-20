import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config({
    path: '../../.env' 
});

export const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`);
        console.log(`\nMongoDB conneted !! DB Host`, connectionInstance.connection.host)
    } catch (error) {
        console.log("MONGODB connection failed", error);
        process.exit(1);  
    }
}