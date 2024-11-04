const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId

const user = new Schema({
    firstname : String,
    lastname : String,
    password : String,
    email : { type:String , unique :true}

})

const course = new Schema ({
    title: String,
    descripion : String,
    price : Number,
    imageurl : String,
    createrid : ObjectId,

})

const admin = new Schema ({
    firstname : String,
    lastname : String,
    password : String,
    email : { type:String, unique : true}

})

const purchase = new Schema ({
    userId : ObjectId,
    couseid : ObjectId

})


const userModel =mongoose.model("user",user)
const adminModel =mongoose.model("admin",admin)
const courseModel = mongoose.model("course",course)
const purchaseModel = mongoose.model("purchase",purchase) 

module.exports ={
    userModel:userModel,
    adminModel:adminModel,
    courseModel:courseModel,
    purchaseModel:purchaseModel
}