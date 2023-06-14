// import axios from 'axios';
// import React,{useEffect,useState} from "react";

// <div className='chat'>
        //     <div className="window" id='chatWindow'>
        //     {
        //         Msg.map((element)=>{
        //             return 
        //             (
        //                 element.user===props.current?<p className='right'>{element.msg}</p>:<p className='left'>{element.msg}</p>
        //             )
        //         })
        //     }
        //     </div>
        
            // <hr />
            // <div className="typer">
            //     <input type="text" id='msgText' placeholder='Type Something'/>
            //     <button onClick={(e)=>{handleSendMsg(e)}}>Send</button>
            // </div>
        // </div>




// console.log(props.current,props.chat)
    // const [Msg,setMsg]=useState([])
    // const [currentChat,setCurrentChat]=useState('')
    
    // async function fetchMsg()
    // {
    //     let data=await axios.post('http://localhost:5000/api/auth/getMsg',{currentUser:props.currentUser,requestUser:props.chatUser})
    //     setCurrentChat(data.data.chatname)
    //     setMsg(data.data.messages)
    // }
    // useEffect(()=>
    // {
    //     fetchMsg();
    //     return ()=>
    //     {
    //         let response=axios('http://localhost:5000/api/auth/saveMsg',{currentChat:currentChat,messages:Msg})
    //     }

    // },[])
    

    // async function handleSendMsg(e)
    // {
    //     let msg=document.getElementById('smgText')
    //     let newMsg=msg.value;
    //     msg.value=""
    //     msg={user:props.current,msg:newMsg}
    //     await setMsg(...Msg,msg)
    //     props.socket.current.emit('send-message',{to:props.chat,from:props.current,data:msg})
    //     let p=document.createElement('p')
    //     p.setAttribute('className','right');
    //     p.innerText=newMsg;
    //     document.getElementById('chatWindow').appendChild(p);
    // }

    // useEffect(()=>{
    //     props.socket.current.on('msg-receive',async (message)=>
    //     {
    //         await setMsg(...Msg,message)
    //         let p=document.createElement('p')
    //         p.setAttribute('className','left');
    //         p.innerText=message.msg;
    //         document.getElementById('chatWindow').appendChild(p);
    //     })
    // },[props.socket])