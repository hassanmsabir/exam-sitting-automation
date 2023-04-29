import React, { useEffect, useState } from 'react'
import AdminDashboardView from '../components/AdminView/AdminDashboardView'
import TeacherDashboardView from '../components/TeacherView/TeacherDashboardView'

const Dashboard = () => {
  const [loggedRole, setLoggedRole] = useState(null)
  useEffect(()=>{
    if(localStorage.getItem("userToken")){
      let role = JSON.parse(localStorage.getItem("userToken"))?.role
      if(role){
        setLoggedRole(role)
      }
    }
  },[])
  return (
    loggedRole ?
    loggedRole === "admin" ? 
      <AdminDashboardView /> : 
      <TeacherDashboardView />
      : <></>
  )
}

export default Dashboard