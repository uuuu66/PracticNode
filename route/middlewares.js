exports.isLoggedIn=(req,res,next)=>{
    if(req.isAuthenticated){
      
        next();
    }else{
        console.log('안됨');
       return  res.json({login:'이용하려면 일단 로그인해주세요.'});
    }
};
exports.isNotLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
        
        next();
    }else{   
       return  res.json({login:'당신 어떻게 여기 들어온거요? 로그인 되어있는데..?'});     
    }
};