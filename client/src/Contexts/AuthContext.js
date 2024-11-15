import React , { useState, useEffect, useContext } from "react";

const AuthContext = React.createContext();

export function useAuth(){
    return useContext(AuthContext);
}

export function AuthProvider(props){
    const [user, setUser] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);

    const value = {user,loggedIn,setUser,setLoggedIn};

    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    )
}