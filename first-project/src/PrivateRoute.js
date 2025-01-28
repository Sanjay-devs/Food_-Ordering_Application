import React from "react"
import { Navigate } from "react-router-dom"
import { useAuth } from "./AuthContext"

const PrivateRoute = ({children, isProtected=true}) => {
    const {isAuthenticated} = useAuth();

    if(isProtected && !isAuthenticated){
        return <Navigate to="/Login"/>
    }
    
    if(!isProtected && isAuthenticated){
        return <Navigate to="/dashboard" />
    }



    return children;
}

export default PrivateRoute;
