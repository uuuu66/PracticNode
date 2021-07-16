const passport=require('passport');
const LocalStartegy=require('passport-local').Strategy;
const crypto=require('crypto-js');


const User=require('../models/users');

function compare(x,y){
    y=crypto.AES.decrypt(y,'minki').toString(crypto.enc.Utf8);

    if(x==y)
    return true
    else
    return false
}

module.exports=()=>{
    passport.use(new LocalStartegy({
        usernameField:'email',
        passwordField:'password',
    },async(email,password,done)=>{
        console.log(email);
        console.log(password);
        try{
            const exUser =await User.findOne({where:{email}});
            if(exUser){
            const result=await compare(password,exUser.password);
                if(result)
                {
                    done(null,exUser);
                }else{
                    done(null,false,{message:'비밀번호가 일치하지 않습니다.'});
                }
            }else{
                done(null,false,{message:'가입되지않은 회원입니다.'});
            }
        }catch(err){
            console.error(err);
            done(err);
        }


    }));
};