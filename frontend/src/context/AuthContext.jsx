import { createContext, useContext, useState } from "react";

// first we need to create the context (with no default value)
export const AuthContext = createContext();

// create a short way to use that context later in the code
export const useAuthContext = () => {
    return useContext(AuthContext);
}

// then we need to create a context provider
export const AuthContextProvider = ({children}) => {

    const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem('chat-user')) || null);

    return(
        <AuthContext.Provider value={ {authUser, setAuthUser} }>
            {children}
        </AuthContext.Provider>
    )
}