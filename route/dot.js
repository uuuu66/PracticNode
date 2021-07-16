const express=require('express');
const router =express.Router();
const fs=require('fs');
const path=require('path');

const data=['Greeting','WhoIsMinki','Posts', "Dot Arts","Laboratory", "GitHub"];

router.get('/',(req,res,err)=>{
    res.render('dotart',{list:data,message:req.session.message,recent:"mlog가 오픈되었습니다.감사합니다."});
});


module.exports=router;