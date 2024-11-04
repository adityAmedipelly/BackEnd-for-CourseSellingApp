const {Router} = require("express")
const {adminModel, courseModel} = require("../db")
const{z} = require("zod")
 const jwt = require("jsonwebtoken")
 const express = require("express")
 const JWT_SECRET="akhil"
 const bcrypt = require("bcrypt")
 const {mildware}=require("../mildware/adminmildware")

const admin = Router()
admin.use(express.json())

admin.post("/signup",async function(req,res){

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
    console.log(haspasword)

   await adminModel.create({
        email,
        firstname,
        lastname,
        password:haspasword
        
    })
    console.log("completed")
   } 
   catch(error){
    res.json({
        messsage:"incorrect "
    })
    return
   }
   
    res.json({
        message:"you are signup"
    })


})

admin.post("/signin",async function(req,res){
    const email=req.body.email
    const password=req.body.password

    const findadmin = await adminModel.findOne({
        email:email
    })

    if(!findadmin){
        res.json({
            message:"user not exit "

        })
        return
    }

    const  passwordmatch = await bcrypt.compare(password, findadmin.password)

    if(passwordmatch){
        const token  =jwt.sign({
            id :findadmin._id.toString()
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

    res.json({
        message:"in"
    })

})





admin.post("/create",mildware,async function(req,res){
    const adminId =req.userId;

    const { title, descripion,imageurl, price }=req.body

    const course = await courseModel.create({
        title:title,
        descripion:descripion,
        imageurl:imageurl,
        price:price,
        createrid:adminId

    })

    res.json({
        message:"created course",
        courseId:course._id
    })


})

admin.put("/upadted", async function(req,res){
    const adminId =req.userId;

    const { title, descripion,imageurl, price }=req.body

    const course = await courseModel.create({
        title:title,
        descripion:descripion,
        imageurl:imageurl,
        price:price,
        createrid:adminId

    })
   

    res.json({
        message:"upadted"
    })


})

admin.post("/deleted",async function(req,res){
    const adminId =req.userId;
    const title = req.body

 await courseModel.deleteOne({
    title:title,
    deleteId :adminId 
  })
   

    res.json({
        message:"delete "
    })


})

module.exports={
    admin:admin
}