
 const{Router} = require("express")
 const {userModel, courseModel} = require("../db")
 const{z} = require("zod")
 const jwt = require("jsonwebtoken")
 const express = require("express")
 const JWT_SECRET="aditya"
 const bcrypt = require("bcrypt")

    const userRouter = Router();

    userRouter.use(express.json())

    userRouter.post("/signup",async function(req,res){
        const requirebody = z.object({
            email: z.string(),
            firstname: z.string(),
            lastname: z.string(),
            password: z.string()
        })

       

        const parsed =requirebody.safeParse(req.body)

        if(!parsed.success){
            res.json({
                message:"incorect login",
                error:parsed.error
            })
            return
        }
       try{
      
        const email=req.body.email
        const firstname=req.body.firstname
        const lastname=req.body.lastname
        const password=req.body.password

        const haspasword = await bcrypt.hash(password,5)
        console.log(password)

       await userModel.create({
            email,
            firstname,
            lastname,
            password:haspasword
            
        })
       } catch(error){
        res.json({
            messsage:"your is alread login "
        })
        return
       }
       

        res.json({
            message:"you are signup"
        })
    
    })
    
    userRouter.post("/signin",async function(req,res){
        const email=req.body.email
        const password=req.body.password

        const find = await userModel.findOne({
            email:email
        })

        if(!find){
            res.json({
                message:"user not exit "

            })
            return
        }

        const  passwordmatch = await bcrypt.compare(password, find.password)

        if(passwordmatch){
            const token  =jwt.sign({
                id :find._id.toString()
            },JWT_SECRET)

            res.json({
                token : token
            })
        }
        else{
            res.status(403).json({
                message:"incorect login"
              })
            
        }
    })
    
    userRouter.get("/prive",async function (req,res){
        const userId = req.userId
        const purchase= await courseModel.findOne({
            userId,

        })
        res.json({
            purchase
          
        })
    })



module.exports = {
    userRouter : userRouter 
}