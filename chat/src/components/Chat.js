import React from 'react'
import "../style/chat.css"
import AddContact from './AddContact'
import axios from 'axios';  
import { useNavigate } from 'react-router-dom';
import {io} from 'socket.io-client'
import {useState,useEffect,useRef} from 'react'
import ChatBox from './ChatBox'



export default function Chat() {
  const navigator=useNavigate()
  let username=window.localStorage.getItem('user')
  
  
  const [user,setUser]=useState(username)
  const [SelectedUser,setSelectedChat]=useState('')
  const [userAvailable,setAvailableUser]=useState([])
  const [addUser,setAddUser]=useState(false)

  const socket=useRef()
  async function fetchData()
  {
    let data=await axios.post('http://localhost:5000/api/auth/getContacts',{user:user})
    await setAvailableUser(data.data)
    

  }

  useEffect(()=>{
    if (username==null)
    {
      navigator('/login')
    }
    fetchData();

  },[addUser])

  useEffect(()=>{
    socket.current=io('http://localhost:5000')
    socket.current.emit('add-user',user)
  },[user])



  function selectChat(e)
    {
      setSelectedChat(e.target.innerText) 
    }

    async function HandleAddUser(e)
    {
      e.preventDefault();
      setSelectedChat('') ;
      setAddUser(!addUser);
    }


 return(
  username?<>
  
   <div className='bigbox'>
    <div className="toolkit">
    <button class='searchbtn' onClick={(e)=>{HandleAddUser(e)}}>Add Contact</button>
    </div>
   
    <div id="contact">
        <h1>Chats</h1>
        {userAvailable.map((element)=>
        {
          return(
            element.username!==user?<div className="number" onClick={(e)=>selectChat(e)} id={element}>
              <img src={element.Image} alt="" className='profilePhoto'/>
              <h3>{element.username}</h3>
            </div>:<></>
          )
        })}
    </div>
    <div className="displayBox">
    {
      SelectedUser?<ChatBox socket={socket} currentUser={username} chatUser={SelectedUser} userAvailable={userAvailable}/>:addUser?<div className='chat' id='specialChat'>
      <AddContact currentUser={user} />
      </div>:
      <div className='chat'>
        <div className="window">
          <h1 style={{textAlign:"center"}}>Select A Chat</h1>
        </div>
        <hr />
      </div>
    }
    </div>
   
    
  </div>
  </>:<></>
  )
}
