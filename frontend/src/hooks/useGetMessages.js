import { useEffect, useState } from "react"
import useConversation from "../zustand/useConversation";
import axios from "axios";

const useGetMessages = () => {

    const [loading, setLoading] = useState(false);
    const { messages = [], setMessages, selectedConversation } = useConversation();

    useEffect(() => {
        const getMessages = async () => {

            setLoading(true);

            try {

                const response = await axios.get(`http://localhost:3000/api/messages/${selectedConversation?._id}`,
                    {
                        withCredentials: true,
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                )

                const data = response.data.converstaions;
                setMessages(data)
                
            } catch (error) {

                console.log("Error in useGetMessages hook ", error)
                
            } finally {
                setLoading(false);
            }

        }

        if(selectedConversation?._id) getMessages();

    }, [selectedConversation?._id])

    return {loading, messages}

}

export default useGetMessages;