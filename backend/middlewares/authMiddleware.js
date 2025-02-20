import dotenv from 'dotenv'
import { User } from '../models/user.model.js';
import jwt from 'jsonwebtoken';

dotenv.config({
    path: '../../.env' 
})

export const authMiddleware = async (req, res, next) => {

    // first search for the user's token inside the cookies
    const token = req.cookies.jwt || req.cookies.accessToken || req.header("Authorization")?.replace("Bearer ", "");

    if(!token){
        return res.status(401).json({
            success: false,
            message: "Unauthorized: No token provided",
        })
    }

    // if the tokens are found, verify them with the secret that we have in the env
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // this decode token is going to contain the payload, the data that I had set inside the payload of the access token
    // example const payload = { _id: 123 }

    // from that decode token, find the user
    const user = await User.findById(decodedToken?._id).select("-password -refreshToken");

    if(!user){
        return res.status(401).json({
            success: false,
            message: "User not found",
        })
    }

    // if we have successfully found the user, save the user in req.user
    req.user = user;

    next();

}