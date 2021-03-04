
const express=require('express');
const fs = require('fs');
const router=express.Router();
const user= 'abc';
const path=require('path');
const url=require('url');
const data=['Home','WhoIsMinki','Posts', "Dot Arts", "GitHub"];


console.log("page.js 호출됨");

router.get('/',(req,res,next)=>{
    var filearray=new Array;
    console.log('이게호출됨');
   
        res.render('content',{title:`${user}`,list:data});
  
});


router.get('/imgs',(req,res,next)=>{
    fs.readFile(`./images/${req.query.name}`,(err,data)=>{
        if(err){
         console.log("이미지로딩안됨");
         console.log(err.stack);
        }else{
            console.log("이미지로딩됨");
            res.end(data);
        }
    })
    
 });



function errorHandler(err,req,res,next){
  
    
    
    res.status(404);
    res.render('error',{error:err});
    console.log(err.stack);
};




router.use('/',errorHandler);
module.exports=router;