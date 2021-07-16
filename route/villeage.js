const express= require('express');
const router=express.Router();
const data=['Greeting','WhoIsMinki','Posts', "Dot Arts","Laboratory", "GitHub"];

router.get("/",async(req,res,next)=>{
    res.render("villeage",{list:data,post:'villeage'});
})

module.exports=router;