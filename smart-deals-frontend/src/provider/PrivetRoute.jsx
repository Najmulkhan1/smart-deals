import React, { use } from 'react'
import { Navigate, useLocation } from 'react-router'
import { AuthContext } from './AuthContext'

const PrivetRoute = ({children}) => {
    const { user, loading} = use(AuthContext)
    const location = useLocation()
    console.log(location);
    
    if(loading){
        return <p>loading....</p>
    }
    

    if(user && user?.email) {
        return children
    }
  return <Navigate to={"/login"} state={location.pathname}></Navigate>
  
}

export default PrivetRoute