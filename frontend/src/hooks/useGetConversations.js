import axios from "axios";
import { useEffect, useState } from "react"

const useGetConversations = () => {

    const [loading, setLoading] = useState(false);
    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        const getConversations = async () => {

            setLoading(true)
            try {

                const response = await axios.get('/api/users',
                    {withCredentials: true,
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                )
                
                const users = response?.data?.users;
                setConversations(users);
                
            } catch (error) {
                console.log("useGetConversations hook error: ", error);

            } finally {
                setLoading(false);
            }
        }

        getConversations();
    }, [])

    return {loading, conversations};

}

export default useGetConversations;