import Conversation from "../models/conversation.model.js"
import Message from "../models/message.model.js"
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
    try {
        const {message} = req.body;
        const {id : receiverId} = req.params;
        const senderId = req.user._id;
    
        let conversation = await Conversation.findOne({
            participants : {$all: [senderId, receiverId]}
        });
        if(!conversation){
            conversation = await Conversation.create({
                participants : [senderId, receiverId],
            })
        }
        const newMessage = new Message({
            senderId,
            receiverId,
            message
        })
        if(newMessage){
            conversation.messages.push(newMessage._id);
        }
    
        
        // await conversation.save();
        // await newMessage.save();
        
        // this will run in parallel
        await Promise.all([conversation.save(), newMessage.save()]);
        
        // SOCKET IO FUNCTIONALITY HERE
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
			// io.to(<socket_id>).emit() used to send events to specific client
			io.to(receiverSocketId).emit("newMessage", newMessage);
		}
        return res.status(201).json(newMessage)
    } catch (error) {
        console.error("Error sending messages", error.message);
        return res.status(500).json({
            error : "Internal server error in message sending"
        })
    }
}

export const getMessages = async (req, res) => {
    try {
        // renaming id to userToChatId 
        const {id: userToChatId} = req.params;
        const senderId = req.user._id;

        // populate("messages"): The populate method in Mongoose is used to replace the field messages (which is likely an array of message IDs) with the actual message documents from the Messages collection. This is a way of "joining" related documents and retrieving the complete messages instead of just their IDs.
        const conversation = await Conversation.findOne({
            participants : {$all : [senderId, userToChatId]}
        }).populate("messages"); // NOT REFERENCE BUT ACTUAL MESSAGES

        if(!conversation){
            return res.status(200).json([]);
        }
        const messages = conversation.messages;
        if(messages){
            return res.status(200).json(messages);
        }
        
    } catch (error) {
        console.error("Error sending messages", error.message);
        return res.status(500).json({
            error : error.message
        })
    }
    
}