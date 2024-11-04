const jwt = require("jsonwebtoken")
const { JWT_SECRET}= require("../config")

function mildware(req,res,next){
    const token = req.headers.token;
    const decode = jwt.verify(token,JWT_SECRET)

    if(decode){
        req.userId = decode.id
        next()
    } else{
        res.status(403).json({
            messaage:"you are not signed"
        })
    }
    
}

module.exports={
    mildware:mildware
}