import axios from "axios";
import { useState } from "react"
import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation";

const useSendMessage = () => {

    const [loading, setLoading] = useState(false);

    const {messages, setMessages, selectedConversation} = useConversation();
    console.log(messages)

    const sendMessage = async ( {message} ) => {

        setLoading(true);

        try {

            const response = await axios.post(`/api/messages/send/${selectedConversation?._id}`,
                { message },
                {withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                    }
                }
            )

            const newMessage = response.data.data.newMessage;
            // Ensure messages is an array before spreading
            const updatedMessages = Array.isArray(messages) ? [...messages, newMessage] : [newMessage];
            setMessages(updatedMessages);
            
        } catch (error) {

            console.log("useSendMessage hook error: ", error);
            toast.error('Failed to send message');

        } finally {
            setLoading(false);
        }

    }

    return {loading, sendMessage}

}

export default useSendMessage;