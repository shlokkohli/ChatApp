import axios from "axios";
import { useState } from "react";
import toast from 'react-hot-toast'
import { useAuthContext } from "../context/AuthContext";

const useSignup = () => {

    const [loading, setLoading] = useState(false);

    const{authUser, setAuthUser} = useAuthContext();

    const signup = async ({fullName, username, password, confirmPassword, gender}) => {
        const success = handleInputErrors({fullName, username, password, confirmPassword, gender})
        if(!success) return;

        setLoading(true);

        try {

            const response = await axios.post('/api/auth/signup', {
                fullName,
                username,
                password,
                confirmPassword,
                gender
            },
            {withCredentials: true}
            )

            
            const data = response.data;
            const user = data.user;

            // then we need to save the user details to te local storage
            localStorage.setItem('chat-user', JSON.stringify(user));

            // after saving in the local storage, we need to send it to context provider
            setAuthUser(user)

            toast.success(data.message);

        } catch (error) {
            console.log("useSignup hook error: ", error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }

    }

    return {loading, signup};

}

export default useSignup;

function handleInputErrors({fullName, username, password, confirmPassword, gender}) {

    if(!fullName || !username || !password || !confirmPassword || !gender){
        toast.error('Please fill in all the field')
        return false;
    }

    if(password != confirmPassword){
        toast.error('Passwords do not match')
        return false;
    }

    if(password.length < 6){
        toast.error('Password must be atleast 6 characters')
        return false;
    }

    return true;

}