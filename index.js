const express = require('express');
const mongoose = require('mongoose')
const {userRouter} = require ("./routes/user");
const {couresRouter} = require ("./routes/courses")
const {admin} =require ("./routes/admin")
const app = express();

app.use("/api/v1/user",userRouter)
app.use("/api/v1/admin",admin)
app.use("/api/v1/courses",couresRouter)


async function main (){
    await mongoose.connect("mongodb+srv://aditya:5QoZaHnDA3Pv6ltW@cluster0.qqyta.mongodb.net/broF-app")
    app.listen(3000);
    console.log("listen")
}

main()