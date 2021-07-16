const passport= require('passport');
const local=require('./localStrategy');
const kakao=require('./kakaoStrategy');
const github=require('./githubStrategy');
const User=require('../models/users');


module.exports=()=>{
    passport.serializeUser((user,done)=>{
        done(null,user.id);
        
        console.log('user'+user);
    });
    passport.deserializeUser((id,done)=>{
        User.findOne({where:{id}})
        .then(user=>done(null,user))
        .catch(err=>done(err));
    });
    local();
    kakao();
    github();
};