import axios from "axios";
import { useState } from "react"
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useLogin = () => {

    const [loading, setLoading] = useState(false);

    const {authUser, setAuthUser} = useAuthContext();

    const login = async ( {username, password} ) => {

        const success = handleInputErrors({username, password});
        if(!success) return;

        setLoading(true);

        try {

            // first we need to make a post request to the login backend
            const response = await axios.post('http://localhost:3000/api/auth/login', {
                username,
                password
            },
            {withCredentials: true}
            )

            // then we need to save the user details to local storage
            localStorage.setItem('chat-user', JSON.stringify(response.data.user));

            // send the details to authContext also so that user details such as name and profile photo can be accesses
            setAuthUser(response.data.user)

            toast.success(response.data.message)

        } catch (error) {
            toast.error("Invalid credentials");
        } finally {
            setLoading(false);
        }

    }

    return {loading, login};

}

export default useLogin;

const handleInputErrors = ({username, password}) => {

    if(!username || !password){
        toast.error('Please fill in all the fields')
        return false;
    }

    return true;

}