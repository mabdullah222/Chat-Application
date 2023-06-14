const mongoose=require('mongoose')

const chatSchema=mongoose.Schema(
    {
        users:{
            type:[String],
        },
        Msg:
        {
            type:[Object],
        }
        
})

module.exports=mongoose.model("Msg",chatSchema)