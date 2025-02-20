import { User } from '../models/user.model.js'

export const getUsersForSideBar = async (req, res) => {

    try {

        const loggedInUserId = req.user._id;

        // get all the users in the database except the current logged in user
        const allUsers = await User.find( {_id: { $ne: loggedInUserId } } ).select("-refreshToken -password");

        return res.status(200).json({
            success: true,
            message: "Users fetched successfully",
            users: allUsers,
        })
        
    } catch (error) {

        console.log("Error in getUsersForSideBar controller ", error)
        return res.status(500).json({
            success: false,
            message: "Failed to load users for sidebar. Please try again later."
        })

    }

}