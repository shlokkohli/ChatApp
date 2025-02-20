import axios from "axios";
import { useState } from "react"
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const useLogout = () => {

    const [loading, setLoading] = useState(false);

    const{ setAuthUser } = useAuthContext();

    const logout = async () => {

        setLoading(true);

        try {

            const response = await axios.post('/api/auth/logout', {}, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            localStorage.removeItem('chat-user')

            // remove the user data from the authUser context api
            setAuthUser(null);
            toast.success(response.data.message);

        } catch (error) {

            console.log("useLogout hook error ", error);
            
        } finally {
            setLoading(false);
        }

    }

    return {loading, logout};

}

export default useLogout;