// const register=require('../Controller/userController')
const bcrypt=require('bcrypt')
const User=require('../Models/userModel')
const Msg=require('../Models/chatModel')
const router=require('express').Router()


router.post('/register',async (req,res,next)=>
{
    let {username,password,firstname,lastname,selectedFile}=req.body
    const cryptpass=await bcrypt.hash(password,10)
    const user=await User.findOne({username:username})
    if (user)
    {
        res.json({msg:"Username Taken",status:false})
    }
    else
    {
        const user=await User.create({username:username,password:password,firstname:firstname,lastname:lastname,Image:selectedFile})
        res.json({msg:"User created",status:true,user:user})
    }
})

router.post('/login',async (req,res,next)=>
{
    let {username,password}=req.body
    // const decryptpass=await bcrypt.hash(password,10)
    const user=await User.findOne({username:username,password:password})
    if (user)
    {
        res.json({msg:"User is Present",status:true,user:user})
    }
    else
    {
        res.json({msg:"user not available",status:false})
    }
})

router.post('/getContacts',async (req,res,next)=>
{
    let data=req.body;
    let currentUser=await User.findOne({username:data.user}).populate('Contacts')
    try
    {
        if (currentUser.Contacts)
        {
            res.json([...currentUser.Contacts,currentUser]);
        }
    }
    catch(e)
    {
        res.json([]);
    }
})


router.post("/addContact",async (req,res,next)=>
{
    let data=req.body;

    let findChat=await Msg.findOne({users:[data.currentUser,data.requestUser]})
    

    if(!findChat)
    {
        findChat=await Msg.findOne({users:[data.requestUser,data.currentUser]})
        if (!findChat)
        {
            let newChat=await Msg.create({users:[data.currentUser,data.requestUser]});
            let user=await User.findOne({username:data.currentUser});
            let user2=await User.findOne({username:data.requestUser});
            user.Contacts.push(user2._id);
            await user.populate('Contacts')
            await user.save();
            
            user2.Contacts.push(user._id);
            await user2.populate('Contacts')
            await user2.save();
            res.json({status:200})
            
        }
    }
    else
    {
        res.json({status:200})
    }
    
    
})

router.get('/onlineUsers',(req,res,next)=>
{
    let users=User.find({},(err,users)=>
    {
        res.send(users)
    })
})



router.post('/getMsg',async (req,res,next)=>
{
    let {currentUser,requestUser}=req.body

    let currentChat=await Msg.findOne({users:[currentUser,requestUser]})
    
    if (!currentChat)
    {
        currentChat=await Msg.findOne({users:[requestUser,currentUser]});
    }
    res.json({chatname:currentChat.users[0]+'-'+currentChat.users[1],messages:currentChat.Msg})

})

router.post('/saveMsg',async (req,res,next)=>
{
    let data=req.body;
    console.log(data)
    let currentChat=await Msg.findOne({users:data.currentChat.split('-')})
    currentChat.Msg=data.messages;
    await currentChat.save()
})

module.exports=router