import React from "react";
import { Navigate } from "react-router-dom"; // React Router v6
import { useAuth } from "../Contexts/AuthContext"; // Custom hook to get authentication context

function PrivateRoute({ children }) {
    const { user,loggedIn,setUser,setLoggedIn } = useAuth(); // Check if user is logged in

    // If not logged in, redirect to login
    if (!user) {
        return <Navigate to="/login" />;
    }

    // If logged in, render the child components
    return children;
}

export default PrivateRoute;
