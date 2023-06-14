import React,{useState,useEffect} from 'react'
import axios from 'axios';
import { json, useNavigate } from 'react-router-dom';
import FileBase64 from 'react-file-base64';
import "../style/Register.css"

export default function () {
  const navigator=useNavigate()
  const [value,setValue]=useState({username:"",password:"",firstname:"",lastname:"",confirmpassword:"",selectedFile:""})
  function handleChange(e)
  {
    setValue({...value,[e.target.name]:e.target.value})
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
  
  async function submit(e)
  {
    e.preventDefault();
    let {username,password,firstname,lastname,confirmpassword,selectedFile}=value
    if (username && password && firstname && lastname && confirmpassword)
    {
      if (password=confirmpassword)
      {
        const {data}=await axios.post('http://localhost:5000/api/auth/register',{username,password,firstname,lastname,selectedFile})
        if (data.status)
        {
          window.localStorage.setItem('user',data.user.username)
          navigator('/')
        }
        else
        {
          alert(data.msg)
        }
      }
      else
      {
        alert("Password and Confirm Password Dont Match")
      }
    }
    else
    {
      alert("One of the Fields is Empty")
    }

    
  }
  return (
    <div> 
        <form id="form" onSubmit={(e)=>submit(e)}>
            <h1>Register</h1>
            <label htmlFor="firstname">First Name</label>
            <input type="text" name="firstname" id="firstname"  onChange={(e)=>handleChange(e)}/>
            <label htmlFor="lastname">Last Name</label>
            <input type="text"  name="lastname" id="lastname" onChange={(e)=>handleChange(e)}/>
            <label htmlFor="username">Username</label>
            <input type="text" name="username" id="username" onChange={(e)=>handleChange(e)}/>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" onChange={(e)=>handleChange(e)}/>
            <label htmlFor="confirmpassword">Confirm Password</label>
            <input type="password" name="confirmpassword" id="dob" onChange={(e)=>handleChange(e)} />
            <div className="file_input-container">
              <label>Choose profile Picture</label> 
                <FileBase64 type="file" multiple={false} onDone={({base64})=>setValue({...value,selectedFile:base64})}></FileBase64>
              </div>
            <button type='submit' id="submitbtn" onClick={(e)=>{submit(e)}}>Submit</button>
            
        </form>
    </div>
  )
}
