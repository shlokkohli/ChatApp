import User from "../models/user.model.js";

export const getUsersForSidebar = async(req, res) => {
    try {
        const loggedInUserId = req.user._id;
        // $ne means not equal to
        const filteredUsers = await User.find({_id : {$ne : loggedInUserId}}).select("-password");

        return res.status(200).json(filteredUsers);
    } catch (error) {
        console.error("Error in getUsersForSidebar", error.message);
        return res.status(500).json({
            error : "Internal server error in getUsersForSidebar"
        })
    }
}