const express= require('express');
const passport=require('passport');
const LocalStartegy=require('passport-local');
const crypto =require('crypto-js');
const {isLoggedIn,isNotLoggedIn}=require('./middlewares');
const User=require('../models/users');
const Posts=require('../models/post');
const Comments=require('../models/comment');
const Mail=require('nodemailer');



const router=express.Router();



router.post ('/login/github',isNotLoggedIn,passport.authenticate('github'));
router.post('/join',isNotLoggedIn,async(req,res,next)=>{
    const email=req.body.email;
    const name=req.body.name;
    const password=req.body.password;
    var flag=0;
    try{
        
        if(password.length>12)
        flag=1;
       const exUser=await User.findOne({where:{email}});
        if(exUser){
          var emessage=email+':중복이메일 존재함.'
            flag=1;
         
        }
        const exName=await User.findOne({where:{name}});
        if(exName){
            var nmessage=name+":중복닉네임 존재함."
            flag=1;
          
        }
        if(flag==1)
        return res.send({emessage:emessage,nmessage:nmessage})
        const hash=await crypto.AES.encrypt(password,'minki').toString();
        await User.create({
            email,name,password:hash,
        })
        var message='COMPLETED';
    return res.send({message:message});
    }catch(err){
        
        console.log(err);
        res.redierect('/')
        next(error);
         
        
    }
});

router.post('/login',isNotLoggedIn,(req,res,next)=>{

    passport.authenticate('local',(authError,user,info)=>{
        if(authError){
            res.json({login:'Server ERROR'});
            next(error);
           
        }
        if(!user){
            return res.json({login:info.message});
        }
        return req.login(user,(loginError)=>{
            if(loginError){
                console.error(loginError);
                return next(loginError);
            }
           
            return res.json({login:'yes'});
        });
    })(req,res,next)

});
router.post('/find',async (req,res,next)=>{
    const email=req.body.email;
   try{
    
      const reqUser= await User.findOne({where:{email}}) 
      if(!reqUser){
        return res.json({message:"가입된 이메일이 없어요."});
      }
      let transporter = Mail.createTransport({
        // 사용하고자 하는 서비스, gmail계정으로 전송할 예정이기에 'gmail'
        service: 'gmail',
        // host를 gmail로 설정
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          // Gmail 주소 입력, 'testmail@gmail.com'
          user: process.env.NODEMAILER_USER,
          // Gmail 패스워드 입력
          pass: process.env.NODEMAILER_PASS,
        },
      });

      const fpassword =crypto.AES.decrypt(reqUser.password,'minki').toString(crypto.enc.Utf8);
      console.log(process.env.NODEMAILER_PASS);
      var message = {
        from: "leemingi0428@gmail.com",
        to: email,
        subject: "당신의 m_log 비밀번호 찾기 결과입니다.",
        html: `<h1>다시는 잃어버리지 말게나..</h1><p>당신의 비밀번호:${fpassword}</p><p>그럼 이만</p><a href="http://39.115.162.208:30000"><span style="font-size:30px;">mlog로 가기</span></a>`
      }

      transporter.verify((err,success)=>{
          if(err){
              console.log(err);
             try{
              res.json({message:'server ERROR'});
             }catch(error){
                return next(error); 
             }
             
              return next(err);
           
          }
          else{
              console.log("메일 준비완료 ");
          }
      })
   transporter.sendMail(message,(err,info)=>{
    
    if(err){
           console.log(err);
           try{
           res.json({message:'server ERROR'});
           }catch(error){
                return next(error);
           }
          return next(err);      
       }
       if(info.accepted!=[]){
           return res.json({message:'메일을 보냈어요.'});
       }else{
           return res.json({message:'메일을 보냈지만 거절당했네요?일단 저희쪽 문제는 아닐걸요.아마'})
       }
   })
 
    }
    catch(err){
        console.log(err);
    }
});
router.post('/rename',isLoggedIn,async(req,res,next)=>{
    try{ 
        var oname='';
        if(req.user)
         oname=req.user.name;
         const cname=req.body.name;
        const requser=await User.findOne({where:{name:cname}});
        if(requser)
        return res.json({message:cname+":이미 누가 사용중이에요."});

        
         await User.update({
        name:cname,
    },{where:{name:oname}});
    await Posts.update({
        author:cname,
    },{where:{author:oname} });
    await Comments.update({
        name:cname,
    },{where:{name:oname}});

    res.redirect('/');
    } catch(err){
       console.log(err);
   }
});
router.get('/logout',isLoggedIn,async (req,res,next)=>{
  console.log("?");

    try{
        await req.app.get('io').emit('chatout',{user:req.user.name});
         await req.logout();
   } catch(err){
    console.log(err);
    return next(err);
    
  }
  
    req.session.destroy();
    
    res.redirect('/');
});


router.post ('/login/github',isNotLoggedIn,passport.authenticate('github'));
router.get('/github/callback',passport.authenticate('github',{failureRedirect:'/lerror',}),(req,res,next)=>{
    res.redirect('/');
})

router.post ('/login/kakao',isNotLoggedIn,passport.authenticate('kakao'));

router.get('/kakao/callback', passport.authenticate('kakao', {
  failureRedirect: '/lerror',
}), (req,res) => {
    req.session.provider='kakao';
  res.redirect('/');
});
module.exports=router;