import mongoose from "mongoose";

const connectDb = async () =>{
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URI);
        console.log(connection.connection.name, "Db connected successfully");
    } catch (error) {
        console.error("Error connecting Db", error.message);
    }
}

export default connectDb;