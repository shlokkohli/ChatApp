import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import { io } from 'socket.io-client'

// first we need to create context (with no default value)
export const SocketContext = createContext();

// a short way to use that context directly later in the code
export const useSocketContext = () => {
    return useContext(SocketContext);
}

// create a context provider
export const SocketContextProvider = ({children}) => {

    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const { authUser } = useAuthContext();

    useEffect(() => {
        // if there is an authenticated user, create a socket connection
        if(authUser){
            const newSocket = io('http://localhost:3000/', {
                query: {
                    userId: authUser._id
                }
            })

            setSocket(newSocket)

            newSocket.on("getOnlineUsers", (users) => {
                setOnlineUsers(users);
            })

            return () => newSocket.close()

        } else {
            if(socket){
                socket.close();
                setSocket(null);
            }
        }

    }, [authUser])

    return(
        <SocketContext.Provider value={ {socket, onlineUsers} }>
            {children}
        </SocketContext.Provider>
    )
}