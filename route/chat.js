const express= require('express');
const Room=require('../schemas/room');
const Chat=require('../schemas/chat');
const fs=require('fs');
const router=express.Router();

router.post('/exit',async(req,res,next)=>{

const id=req.body.roomId;

const user=req.user.name;
const room= await Room.findOne({_id:id});
  for(let i=0;i<room.users.length;i++){
      if(room.users[i]==user){
          room.users[i].splice(i,1);
          break;
      }
  }
   let size=room.size;
   size-=1;
   await Room.updateOne({_id:id},{size:size});
   if(size==0&&room.title!="공동 채팅방"){
    await Room.updateOne({_id:id},{isActive:false});
   }
   await  req.app.get('io').of('/room').to(room).emit('chatout',{user:user});
   const rooms=await Room.find({isActive:true});
   console.log(rooms);
   return res.json({rooms:rooms});
});
router.post('/exitRudely',async(req,res,next)=>{
    const id=req.body.body.room;
    
    const user=req.body.body.name;

const room= await Room.findOne({_id:id});
  for(let i=0;i<room.users.length;i++){
      if(room.users[i]==user){
          room.users[i].splice(i,1);
          break;
      }
  }
   let size=room.size;
   size-=1;
   await Room.updateOne({_id:id},{size:size});
   if(size==0&&room.title!="공동 채팅방"){
    await Room.updateOne({_id:id},{isActive:false});
   }
  await req.app.get('io').of('/room').to(room).emit('chatout',{user:user});
   const rooms=await Room.find({isActive:true});
   return res.json({rooms:rooms});
})
router.post('/userIntroduce',async(req,res,next)=>{
    try{const id=req.body.id;
    const room=await Room.findOne({_id:id});
    const users=room.users;
    const today=new Date();
    const time=today.getFullYear()+"-"+(today.getMonth()+1)+"-"+today.getDate()+"-"+today.getHours()+"-"+today.getMinutes()+"-"+today.getSeconds()+"-"+today.getMilliseconds();
    
    await Chat.create({user:"입장하는사람소개하는사람",chat:req.user.name+"입장",room:id,createdAt:time})
    users.push(req.user.name);
    req.app.get('io').of('/room').to(room).emit('introduceuser',req.user.name);
    return res.send({users:users});
    }catch(err){
        console.log(err);
    }
});
router.post('/make',async(req,res,next)=>{
    const title=req.body.name;
    const pwd=req.body.pwd;
    const today=new Date();
    const time=today.getFullYear()+"-"+(today.getMonth()+1)+"-"+today.getDate()+"-"+today.getHours()+"-"+today.getMinutes()+"-"+today.getSeconds()+"-"+today.getMilliseconds();
   try{
    const room=await Room.create({
        title:title,
        password:pwd,
        createdAt:time,
   });
   res.send({
       ok:'ok',
      id:room._id,
   })
}catch(err){
    res.send({
        ok:'not ok'
    })
    console.log(err);
}
   
});
router.post('/send',async(req,res,next)=>{
    try{
    
    const chatContent=req.body.chat;
    const room=req.body.roomId;
    const user=req.user.name;
    let gif=req.body.gif;
    const folder=req.body.folder;
    gif=folder+"/"+gif;
    const today=new Date();
    const time=today.getFullYear()+"-"+(today.getMonth()+1)+"-"+today.getDate()+"-"+today.getHours()+"-"+today.getMinutes()+"-"+today.getSeconds()+"-"+today.getMilliseconds();
    const chat=await Chat.create({
        room:room,
        user:user,
        chat:chatContent,
        gif:gif,
        createdAt:time,
    });
    if(gif=="undefined/undefined"){
        gif=undefined;
    }
    await Room.updateOne({_id:room},{recent:time});
    req.app.get('io').of('/room').to(room).emit('chat',{
        room:room,
        chat:chatContent,
        gif:gif,
        createdAt:time,
        user:req.user.name,
    });
    res.send({msg:'ok'});
    }catch(err){
        res.send({msg:err})
    }
});
router.post('/imoticon',(req,res,next)=>{
    const folder=req.body.folder;
     fs.readdir(`./public/imoti/${folder}`,(err,files)=>{
        if(err){
            console.log(err);
            return  res.send({imos:"err"});
        }else{
            return res.send({imos:files});
        }
    });
})
router.post('/join',async(req,res,next)=>{
    const room=req.body.room;
    
    const chats=await Chat.find({room:room}).sort('_id');
    for(let i=0;i<chats.length;i++){
        
        if(chats[i].user==req.user.name){
            chats[i].user+="-<>+?"+"1"
        }
        else{
            chats[i].user+="-<>+?"+"0"
        }
    }  
    
    return res.send({chat:chats});
});
router.post('/:id',async(req,res,next)=>{
  
})

module.exports=router;