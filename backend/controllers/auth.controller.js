import { User } from '../models/user.model.js'
import bcrypt from 'bcryptjs'

export const generateTokens = async (userId) => {

    try {

        const user = await User.findOne(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        user.save( {validateBeforeSave: false });

        return { accessToken, refreshToken }

    } catch (error) {
        return res.stauts(500).json({
            success: false,
            message: "Something went wrong while generating access and refresh token",
        })
    }

}

export const signupUser = async (req, res) => {

    try {

        const { fullName, username, password, confirmPassword, gender } = req.body;

        if (!fullName || !username || !password || !confirmPassword || !gender){
            return res.json({
                success: false,
                message: "All fields are required",
            })
            .status(400)
        }
    
        if(password != confirmPassword){
            return res.json({
                success: false,
                message: "Passwords do not match",
            })
            .status(400)
        }
    
        // check if the username already exists in the database
        const existingUsername = await User.findOne({username});

        // if the same username already exists in the database, throw an error
        if(existingUsername){
            return res.json({
                success: false,
                message: "Username already exists",
            })
            .status(400)
        }

        // Hash the user password
        const hashedPassword = await bcrypt.hash(password, 12);

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const user = new User({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic
        })

        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken;

        const savedUser = await user.save({validateBeforeSave: false})
        
        // save the access and refresh token in the cookies
        const options = {
            httpOnly: true,
            secure: true
        }

        return res
            .status(201)
            .cookie("refreshToken", refreshToken, options)
            .cookie("accessToken", accessToken, options)
            .json({
                success: true,
                message: "User registered successfully",
                user: {
                    _id: savedUser._id,
                    fullName: savedUser.fullName,
                    username: savedUser.username,
                    profilePic: savedUser.profilePic
                }
            });

    } catch (error) {

        console.log("Error while user signup: ", error)
        return res.json({
            success: false,
            message: "Internal server error"
        }).status(500)

    }


}

export const loginUser = async (req, res) => {

    try {

        const { username, password } = req.body;

        // the fields should not be empty
        if(!username || !password){
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            })
        }

        // check if the user exists in the database or not
        const user = await User.findOne({username})

        // if the user is not found in the database
        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found",
            })
        }

        // if the user is found in the database, check the password
        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if(!isPasswordCorrect){
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
            })
        }

        // if we have found the user in the database and auth is also validated, we need to generate tokens for the user
        const { accessToken, refreshToken } = await generateTokens(user._id);

        const options = {
            httpOnly: true,
            secure: true
        }

        // user login is done, just return the response now
        return res
        .status(200)
        .cookie("refreshToken", refreshToken, options)
        .cookie("accessToken", accessToken, options)
        .json({
            success: true,
            message: "User login successful",
            user: {
                _id: user._id,
                username: user.username,
                fullName: user.fullName,
                profilePic: user.profilePic
            }
        })

        
    } catch (error) {

        console.log("Error while user login: ", error)
        return res.json({
            success: false,
            message: "Internal server error"
        }).status(500)

    }

}

export const logoutUser = async (req, res) => {

    try {
        
        // using the authMiddleware, we have find the user, now we just want to take that user and remove its access token
        await User.findOneAndUpdate(
            {_id: req.user._id},
            {refreshToken: undefined},
            {new: true}
        )

        const options = {
            httpOnly: true,
            secure: true,
        }

        return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json({
            success: true,
            message: "User logged out successfully"
        })

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized: Invalid token",
        });
    }
    
}