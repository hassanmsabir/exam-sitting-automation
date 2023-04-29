import { Input, notification } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { actionAPI, useSharedDispatcher, useSharedSelector } from '../shared'

const Context = React.createContext({
    name: 'Default',
  });

const Login = () => {
    const [username, setUsername] = useState("")
    const [usernameErrMsg, setUsernameErrMsg] = useState("")
    const [passwordErrMsg, setPasswordErrMsg] = useState("")
    const [password, setPassword] = useState("")

    const {LoginUserData, LoginUserDataLoading, LoginUserDataSuccess, LoginUserDataFailed, LoginUserDataErrorMessage} = useSharedSelector(state=> state.LoginUserData)

    const navigate = useNavigate()
    const apiDispatcher = useSharedDispatcher()


    const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement, type, message="", description="") => {
    api[type]({
      message: message,
      description: description,
      placement,
    });
  };

    const validateLoginFields = ()=>{
        let errCaught = false
        if(username === ""){
            setUsernameErrMsg("Username cannot be Empty")
            errCaught = true
        }
        if(password === ""){
            setPasswordErrMsg("Password cannot be empty")
            errCaught = true
        }
        return errCaught
    }
    const handleLoginClick = ()=>{
        if(validateLoginFields()){
            return
        }
        apiDispatcher(actionAPI.loginUserAPI({username, password}))
    }

    useEffect(()=>{
        if(LoginUserDataSuccess){
            localStorage.setItem("userToken", JSON.stringify(LoginUserData))
            navigate("/dashboard")
        }
        else if(LoginUserDataFailed){
            openNotification("topRight", "error", "Login Failed", LoginUserDataErrorMessage)
        }
    },[LoginUserDataLoading])
  return (
    <>
    {contextHolder}
    <div className='login-page'>
    <div className='login-overlay'>
    <div className='login-box'>

        <span className=''>Username</span>
        <Input type='text' value={username} onChange={(e)=>{setUsername(e.target.value); setUsernameErrMsg("")}} placeholder='Username' />

        <p className='text-danger username-err-msg'>{usernameErrMsg}</p>

        <span className=''>Password</span>
        <Input type='password' value={password} onChange={(e)=>{setPassword(e.target.value); setPasswordErrMsg("")}} placeholder='Password' />
        <p className='text-danger password-err-msg'>{passwordErrMsg}</p>
        
        <div className='d-flex justify-content-center'>
            <div className='btn btn-primary' onClick={handleLoginClick}>
                Login
            </div>
        </div>
    </div>
    </div>
    </div>

    </>
  )
}

export default Login