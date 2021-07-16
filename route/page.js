
const express=require('express');
const fs = require('fs');
const router=express.Router();
const user= require("../models/users");
const path=require('path');
const url=require('url');
const data=['Greeting','WhoIsMinki','Posts', "Gallery","Laboratory", "GitHub"];


 
 
 

 router.use(async(req,res,next)=>{
 
    if(req.user!=null){
    console.log(req.user.get('name'));
    res.locals.provider=req.user.provider;
    res.locals.name=req.user.get('name');
    }else{
        
    }
  
    res.locals.user=req.user;
 

    next();
});


router.get('/join',(req,res,next)=>{ 
    res.render('content',{ list:data});

});
router.get('/auth',(req,res,next)=>{
    res.render('content',{ list:data});  
});
router.get('/err',(req,res,next)=>{  
        res.render('content',{ list:data, message: req.session.message});  
});

router.get('/error',(req,res,next)=>{
   return res.render('error',{error:"공사중이에요.아직 안만듬 ㅋㅋ"});
})
router.get('/lerror',(req,res,next)=>{
    return res.render('error',{error:"SNS 로그인 에러에요.이상하네요."});
});
router.get('/',(req,res,next)=>{  
    
    res.render('content',{ title:`${user}`,list:data,message:req.session.message,recent:"형준 생일 기념 Post의 생축 주제로 생일축하글을 올리면 추첨을 통해 형준이가 선물을 줍니다! ",});  
});


router.get('/imgs',async (req,res,next)=>{

    
    await fs.readFile(`./images/${req.query.name}`,async(err,data)=>{
        if(err){
         await fs.readFile(`./temp/${req.query.name}`,(error,data)=>{
            if(data){
            console.log(data);
                return res.end(data);
            }
          });
         console.log(err.stack);
         next(err);
        }else{
            console.log("이미지로딩됨");
            res.end(data);
        }
    })
    
  });

  

module.exports=router;