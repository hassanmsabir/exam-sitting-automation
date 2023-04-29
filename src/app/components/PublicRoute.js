import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const PublicRoute = () => {
  const isLogged = (localStorage.getItem("userToken"))
  const location = useLocation()
  return (
    isLogged ? <Navigate to={"/dashboard"} state={{from: location}} replace/> :
    <Outlet />
  )
}

export default PublicRoute