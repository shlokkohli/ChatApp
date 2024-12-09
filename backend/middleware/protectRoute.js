import jwt from "jsonwebtoken"
import User from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if(!token){
            return res.status(401).json({
                error : "Unauthorized - No token provided",
            })
        }

        // jwt.verify method returns the token in decoded form 
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

        if(!decodedToken){
            return res.status(401).json({
                error : "Unauthorized - Invalid token"
            })
        }

        const user = await User.findById(decodedToken.userId).select("-password");
        req.user = user;
        next();

    } catch (error) {
        console.error("error in protect route middleware", error.message);
        return res.status(500).json({
            error: "Internal server error in protect route middleware"
        })
    }
}

export default protectRoute;