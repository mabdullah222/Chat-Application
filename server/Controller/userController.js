
function register(res,req,next)
{
    console.log(req.body)
    res.send("post request received")
}
module.exports=register;