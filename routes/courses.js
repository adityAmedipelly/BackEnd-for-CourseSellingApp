 const { Router } = require ("express")
const { courseModel } = require("../db")

 const couresRouter = Router()

 couresRouter.post("/purchases",async function (req,res){
    const purchaseId = req.purchaseIdId

   if(purchaseId==courseId){
    const purchases = await courseModel.findOne({
        course 
    })
        res.json({
          purchases
        })
   }
})

   


module.exports = {
    couresRouter:couresRouter
}
