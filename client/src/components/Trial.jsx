import React, { useEffect } from 'react'
import {useAuth} from '../Contexts/AuthContext'
import { useNavigate } from 'react-router-dom';

const Trial = () => {
    const {user,loggedIn,setUser,setLoggedIn} = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        console.log("Trial",user)
    },[])
    return (
        <div>{user.name}</div>
    )
}

export default Trial