const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const Msg=require('./Models/chatModel')
const userRoutes=require('./Routes/userRoutes')
const app=express()
const socket=require('socket.io')
var bodyParser = require('body-parser');

require('dotenv').config()





app.use(express.json())
app.use(cors())
app.use(bodyParser.json({limit: '500mb',extended:true}));
app.use(bodyParser.urlencoded({limit: '500mb', extended: true}));
mongoose.set('strictQuery',false)
mongoose.connect(process.env.MONGO_URL).then(()=>{console.log('Db connection Successful')}).catch((error)=>{console.log("Db connection Error",error)})


app.use('/api/auth',userRoutes)
    
const server=app.listen(process.env.PORT,()=>{
    console.log("Server Started on Port 5000")
})

const io=socket(server,
    {
        cors:{
            origin:"http://localhost:3000",
            credentials:true,
        }
    });


global.onlineUsers=new Map()
io.on('connection',(socket)=>{
    global.chatSocket=socket;
    socket.on('add-user',(userid)=>
    {
        console.log(userid,socket.id,"Connected")
        onlineUsers.set(userid,socket.id)
    })
    socket.on('send-message',async (msg)=>
    {
        let sendingSocket=onlineUsers.get(msg.to)
        if (sendingSocket)
        {
            socket.to(sendingSocket).emit('msg-receive',msg.data)
        }
        else
        {
            console.log("Not online");
        }
    })
})

    

