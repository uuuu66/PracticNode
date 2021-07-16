const fs=require('fs');
const ip=require("request-ip");

exports.writeLog= async function(req,res,next){
    var today=new Date();
    var todays=today.getFullYear()+"_"+(today.getMonth()+1)+"_"+today.getDate();
    var now=String(today.getHours())+"_"+String(today.getMinutes())+"_"+String(today.getSeconds())+"_"+String(today.getMilliseconds());

            var logdatah=now+":\n 접속아이피:"+ip.getClientIp(req)+"\n헤더:"+JSON.stringify(req.headers);
            var logurl="\nurl:"+JSON.stringify(req.url);
            var logdatab="\n바디:"+JSON.stringify(req.body);
            var logdatap="\n파라미터스:"+JSON.stringify(req.params);
            var logdatau="\n유저"+JSON.stringify(req.user)+"\n\n\n\n";
            var logdata=logdatah+logurl+logdatab+logdatap+logdatau;
        
                try{
                fs.open("./logs/logs"+todays+".txt","a",(err,fd)=>{
                    fs.appendFile("./logs/logs"+todays+".txt",logdata,(err)=>{
                        if(err){
                            console.log(err);
                        }else{
                            console.log("log생성완료-"+now);
                           next();
                        }

                    })
                });
            }catch(error){
                next();
            }
                
         
}
exports.writeErrlog=function writeErrlog(err,req){
 
    console.log('errorwriting');
        var today=new Date();
    var todays=today.getFullYear()+"_"+(today.getMonth()+1)+"_"+today.getDate();
    var now=String(today.getHours())+"_"+String(today.getMinutes())+"_"+String(today.getSeconds())+"_"+String(today.getMilliseconds());
    var logdatah=now+":\n 접속아이피:"+ip.getClientIp(req);
    var logurl="\nurl:"+JSON.stringify(req.url);
    var logdatab="\n바디:"+JSON.stringify(err.stack);
    if(err==404){
     logdatab="404 에러"   ;
    }
    var logdatau="\n유저"+JSON.stringify(req.user)+"\n\n\n\n";
    var logdata=logdatah+logurl+logdatab+logdatau;
   try{
    fs.open("./logs/errlogs"+todays+".txt","a",(err,fd)=>{
        fs.appendFile("./logs/errlogs"+todays+".txt",logdata,(err)=>{
           
            if(err){
                console.log(err);
            }else{
                console.log("log생성완료-"+now);
               
            }

        })
    });
}catch(error){
    next();
}

}