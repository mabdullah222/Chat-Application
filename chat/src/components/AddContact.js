import React,{useState,useEffect} from "react";
import axios from "axios";
import "../style/AddContact.css"
import { useNavigate } from 'react-router-dom';
export default function AddContact(props)
{
    const [availableUser,setAvailableUser]=useState([])
    async function sentData(e)
    {
        let data=await axios.post('http://localhost:5000/api/auth/addContact',{currentUser:props.currentUser,requestUser:e.target.id})
    }

    async function getData()
    {
        let data=await axios.get('http://localhost:5000/api/auth/onlineUsers')
        setAvailableUser(data.data)
    }

    useEffect(()=>
    {
        getData()
    },[])

    return(
        availableUser.map((element)=>
            {   
                return (
                    element.username!==props.currentUser?<div className="number" id={element.username} onClick={(e)=>{sentData(e)}}>
                        <img src={element.Image} className="profilePhoto" alt="" />
                        <h3 id={element.username}>{element.username}</h3>
                    </div>:<></>
                )
            })
    );
    
}