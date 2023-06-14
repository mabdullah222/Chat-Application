import React,{useEffect,useState} from 'react'
import axios from 'axios'
import FileBase64 from 'react-file-base64';
import "../style/chatbox.css"
import Message from './Message';

export default function ChatBox({currentUser,chatUser,socket,userAvailable}) {
    let sender;
    let receiver;
    for (let i=0;i<userAvailable.length;i++)
    {
        if (userAvailable[i].username==currentUser)
        {
            sender=userAvailable[i];
        }
        if (userAvailable[i].username==chatUser)
        {
            receiver=userAvailable[i];
        }
    }
    const [Msg,setMsg]=useState([])
    let [selectedFile,setSelectedFile]=useState("")
    let currentChat="";

    async function fetchMsg()
    {
        let data=await axios.post('http://localhost:5000/api/auth/getMsg',{currentUser:currentUser,requestUser:chatUser})

        currentChat=data.data.chatname
        console.log("Mounted")
        window.localStorage.setItem('currentChat',data.data.chatname)
        setMsg(data.data.messages)  
        await window.localStorage.setItem('chatMessage',JSON.stringify(Msg))
        console.log(currentChat,currentUser);
    }

    useEffect(()=>
    {
        fetchMsg();
        return ()=>
        {
            console.log("unmounted")
            // let chatname= JSON.parse(window.localStorage.currentChat)
            // let chatmsg= JSON.parse(window.localStorage.getItem('chatMessage'))

            // let response= axios.post('http://localhost:5000/api/auth/saveMsg',{currentChat:chatname,messages:chatmsg})

            console.log("Component Unmounted");

            window.localStorage.removeItem('chatMessage')
            window.localStorage.removeItem('currentChat')
        }

    },[chatUser])
    

    function handleSendMsg(e)
    {
        let msg=document.getElementById('msgText')
        let newMsg=msg.value;
        msg.value=""
        msg={user:currentUser,msg:newMsg,image:selectedFile,datetime:new Date().toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) }
        setSelectedFile("")
        setMsg(prev=>[...prev,msg]);
        window.localStorage.setItem('chatMessage',JSON.stringify(Msg))
        socket.current.emit('send-message',{to:chatUser,data:msg,currentChat:window.localStorage.getItem('currentChat')})
        
    }

    useEffect(()=>{
        socket.current.on('msg-receive',(message)=>
        {
            setMsg((prev)=>[...prev,message]);
            window.localStorage.setItem('chatMessage',JSON.stringify(Msg))
        })
    },[socket.current])


  return (
    <div className='chat'>
        <div className='infoPanel'>
        <img src={receiver.Image} alt="" className="infoPhoto" />
        <h1 style={{'textAlign':'center'}}>{receiver.username}</h1>
        </div>
        <hr />
         <div className="window" id='chatWindow'>
            {Msg.map((element)=>{
                return(
                    element.user===currentUser?<Message msg={element.msg} name={element.user} photo={sender.Image} datetime={element.datetime} img={element.image} rightOrLeft={'right'}></Message>:<Message msg={element.msg} name={element.user} photo={receiver.Image} datetime={element.datetime} img={element.image} rightOrLeft={'left'}></Message>
                )
            })}
            </div>
             <hr />
             <div className="typer">
                <input type="text" id='msgText' placeholder='Type Something'/>
                <button onClick={(e)=>{handleSendMsg(e)}}>Send</button>
                <div className="file_input-container">
                    <FileBase64 type="file" multiple={false} onDone={({base64})=>{setSelectedFile(base64)}}></FileBase64>
                </div>
                  
            </div>  
    </div>
  )
}
