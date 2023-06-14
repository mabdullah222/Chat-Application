import React,{useState,useEffect} from 'react'

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../style/login.css"

export default function Login() {
  const navigator=useNavigate()
  const [value,setValue]=useState({username:"",password:""})
  function handleChange(e)
  {
    setValue({...value,[e.target.name]:e.target.value})
  }

  function handleSignup()
  {
    navigator('/register')
  }

  async function handleSubmit(e)
  {
    e.preventDefault()
    let {username,password}=value
    const {data}=await axios.post('http://localhost:5000/api/auth/login',{username,password})

    if (data.status)
    {
      window.localStorage.setItem('user',data.user.username)
      window.localStorage.setItem('contacts',data.user.Contacts)
      navigator('/')
    }
    else
    {
      alert("Invalid Username or Password!Try Again")
    }
  }
  useEffect(()=>
  {
    try
    {
      window.localStorage.removeItem('user')
      window.localStorage.removeItem('contacts')
    }
    catch(e)
    {
      console.log("Already Clear")
    }
    
  },[])

  return (
    <form action="post" id="loginform" onSubmit={(e)=>handleSubmit(e)}>
        <h1>Login</h1>
        <label htmlFor="username">Username</label>
        <input type="text" name="username" id="username" onChange={(e)=>handleChange(e)}/>
        <label htmlFor="username">Password</label>
        <input type="text" name="password" id="password" onChange={(e)=>handleChange(e)}/>
        <div className='btns'>
        <button type="submit" id="loginButton">Login</button>
        <button id='loginButton' onClick={()=>{handleSignup()}}>Sign Up</button>
        </div>
    </form>
  )
}
