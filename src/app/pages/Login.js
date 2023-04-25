import { Input } from 'antd'
import React, { useState } from 'react'

const Login = () => {
    const [username, setUsername] = useState("")
    const [usernameErrMsg, setUsernameErrMsg] = useState("")
    const [passwordErrMsg, setPasswordErrMsg] = useState("")
    const [password, setPassword] = useState("")

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

    }
  return (
    <>
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