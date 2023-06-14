import React from 'react'
import "../style/Message.css"
function Message({msg,img,name,datetime,rightOrLeft,photo}) {
  return (
    <div className={`msgDisplay ${rightOrLeft}`}>
        <div className="info">
            <img src={photo} className='profilePhoto' alt="" />
            <h3>{name}</h3>
        </div>
        <div className="msg">
            {img?<img src={img} alt="" className='msgImage'/>:<></>}
            <p className="text">{msg}</p>
            <div  className='date'>
              <p>{datetime}</p>
            </div>
            
        </div>
    </div>
  )
}

export default Message