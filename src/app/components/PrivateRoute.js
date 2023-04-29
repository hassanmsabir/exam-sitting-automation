import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const PrivateRoute = () => {
  const isLogged = (localStorage.getItem("userToken"))
  const location = useLocation()
  return (
    isLogged ? 
    <Outlet />: <Navigate to={"/login"} state={{from: location}} replace/>
  )
}

export default PrivateRoute