const jwt = require("jsonwebtoken")
const {JWT_user_SECRET}= require("../config")

function usermildware(req,res,next){
    const token = req.headers.token;
    const decode = jwt.verify(token, JWT_user_SECRET)

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
    usermildware:usermildware
}