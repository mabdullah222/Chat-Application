const mongoose=require('mongoose')
const Msg=require('./chatModel.js')


const userSchema=new mongoose.Schema(
    {
        firstname:{
            type:String,
            required:true,
            min:3,
            max:20,
        },
        lastname:{
            type:String,
            required:true,
            min:3,
            max:20,
        },
        username:{
            type:String,
            required:true,
            max:20,
            unique:true
        },
        password:
        {
            type:String,
            required:true,
            min:8,
            max:20,
        },
        Contacts:
        {
            type:[{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
            default:[]
        },
        Image:
        {
            type:String,
            default:""
        }

    })

module.exports=mongoose.model("User",userSchema)