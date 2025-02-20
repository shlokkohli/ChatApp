import { Conversation } from "../models/conversation.model.js";
import { Message } from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {

    try {

        const { message } = req.body; // message content
        const { id: receiverId } = req.params // receiver id

        const senderId = req.user._id; // received the currently logged in user's id from authMiddleware

        // first check if there is any conversation between User-A and User-B
        let conversation = await Conversation.findOne(
            {
                participants: { $all: [senderId, receiverId]}
            }
        )

        // if there is no conversation, create one
        if(!conversation){
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            })
        }

        // create the message and save it in the db
        const newMessage = await Message.create({
            senderId: senderId,
            receiverId: receiverId,
            message: message
        })

        if(newMessage){
            // when the new message is successfully created we need to insert and save this message in the conversations array
            conversation.messages.push(newMessage._id);
            await conversation.save();
        }

        // SOCKET ID functionality here
        
        // first we need to get the receiver socket id
        const receiverSocketId = getReceiverSocketId(receiverId)
        if(receiverSocketId){
            // this method is used to send message to a specific user
            io.to(receiverSocketId).emit("newMessage", newMessage)
        }

        // return success with the message to the frontend
        return res
        .status(201)
        .json({
            success: true,
            message: "Message sent successfully.",
            data: {
                newMessage
            }
        })

    } catch (error) {

        console.log("Error in sendMessage controller ", error)
        return res.status(500).json({
            success: false,
            message: "Failed to send message. Please try again later.",
        })

    }

}

export const getMessages = async (req, res) => {

    try {

        // first we need to get the id of the id of the user, whose chat we want to open
        const { id: openedChatUser } = req.params;

        // get the id of the currently logged in user
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, openedChatUser] }
        }).populate("messages")

        // if there is no conversation, return an empty array
        if(!conversation){
            return res.status(200).json({
                success: true,
                message: [],
            })
        }

        // return the chats between 2 users to the frontend
        return res.status(200).json({
            success: true,
            message: "Messages fetched successfully",
            converstaions: conversation.messages,
        })
        
    } catch (error) {

        console.log("Error in getMessages controller ", error)
        return res.status(500).json({
            success: false,
            message: "Failed to retrieve messages. Please try again later.",
        })
        
    }

}