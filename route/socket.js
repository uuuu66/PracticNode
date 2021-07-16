const SocketIO=require("socket.io");
const Room=require('../schemas/room');
const cookieParser=require("cookie-parser");
const cookie=require("cookie-signature");
const axios=require("axios");
const passport=require("passport");

module.exports=(server,app,sessionMiddleware)=>{
    
    const io=SocketIO(server,{path:'/socket.io'});
  
    app.set('io',io);
    
    const room=io.of('/room');
   
    const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);
    room.use(wrap(cookieParser(process.env.COOKIE_SECRET)));
    room.use(wrap(sessionMiddleware));
    room.use(wrap(passport.initialize()));
    room.use(wrap(passport.session()));
   


    room.on('connection',async(socket)=>{
        console.log('room 네임스페이스에 접속');
       
        socket.on('disconnect',async()=>{
            console.log('room 네임스페이스 접속 해제 ')
            clearInterval(socket.interval);
            socket.leave('room');
            if(socket.request.user){
                try{
                    socket.broadcast.to(socket.request.user.room).emit("alarmdisconnect",socket.request.user.name);
                }catch(err){
                    console.log(err);
                    socket.broadcast.to(socket.request.user.room).emit("alarmdisconnect",socket.request.user.name);
                    socket.broadcast.emit('error',{err}); 
                }
                try{
                    if(socket.request.user.room!=undefined){
                        const signedCookie = cookie.sign(socket.request.signedCookies['connect.sid'], process.env.COOKIE_SECRET);
                        const connectSID = `${signedCookie}`;
                        await axios.post(`http://39.115.162.208:30000/chat/exitRudely`, {
                                headers: {
                                    Cookie: `connect.sid=s%3A${connectSID}`
                                } ,
                                body:{
                                room:socket.request.user.room,
                                name:socket.request.user.name,
                                },
                            
                        }) ;  
                    }
                }catch(err){
                    console.log(err)
                    socket.emit('error',{err});
                }
             }
        });
        socket.join('room');
        try{
            const rooms= await Room.find({isActive:true});
            socket.emit('roomInfo',{rooms:rooms});
           
        }catch(err){
            socket.emit('error',{err});
            console.log(err);
        }
        socket.on('hi',async()=>{
            intervalRestart(room,socket);
        });
        socket.on('rest',async()=>{
            clearInterval(socket.interval);
        })
        socket.on('entranceRoom',async(data)=>{
            clearInterval(socket.interval);
            socket.leave('room');
            console.log(socket.rooms);
            console.log('ee');
            if(data){
                const entranceRoom=await Room.findOne({_id:data.roomId});
            
            const size=entranceRoom.size+1;
            try{
               
                const room=await Room.updateOne({_id:data.roomId},{size:size});
                socket.join(data.roomId);
            }catch(err){
                socket.emit('error',{err});
                console.log(err);
            }
            }
            if(data==undefined)
              setTimeout(function(){socket.broadcast.to(socket.request.user.room).emit("introduceuser",socket.request.user.name);},500);
            else{
            socket.broadcast.to(data.roomId).emit("introduceuser",socket.request.user.name);    
            socket.request.user.room=data.roomId;
            }
        });
        socket.on('chatconfirm',async(data)=>{
           socket.emit('chatconfirm',{chatUser:socket.request.user,data:data})
        })
       
        socket.on('exitRoom',(data)=>{
            try{
            
                console.log("hey");
                socket.broadcast.to(data.roomId).emit('chatout' ,socket.request.user.name);
                socket.leave(data.roomId);  
                socket.request.user.room=undefined;
                socket.join('room');
                intervalRestart(room,socket);
            }catch(err){
                console.log(err);
                socket.emit('error',{err});
            }
        });
        
    });
    function intervalRestart(room,socket){
    
     
     
        socket.interval=setInterval(async()=>{
            console.log(socket.rooms);
            
            const rooms= await Room.find({isActive:true});
            try{
            room.to('room').emit('roomInfo',{rooms:rooms});
            }catch(err){
                console.log(err);
            }
        },5000);
    }
    const char=io.of('/char');
    char.use(wrap(cookieParser(process.env.COOKIE_SECRET)));
    char.use(wrap(sessionMiddleware));
    char.use(wrap(passport.initialize()));
    char.use(wrap(passport.session()));
    char.on("connection",async(socket)=>{
        console.log("char 액티베이티드");
        socket.join("main");
        if(!char.chars)
            char.chars=[];
        if(socket.request.user){
            let flag=1;
            for(const ch of char.chars){
                if(ch.name==socket.request.user.name)
                {
                   flag=0;
                }
            }
            if(flag==1){
                    const user={
                        name:socket.request.user.name,
                        pos:[600,0],
                        c:0,
                    }
                    socket.user=socket.request.user.name;
                  
                        char.chars.push(user);
                    
            }
            
        }
        char.to('main').emit("charinit",{chars:char.chars})
        socket.on('disconnect',()=>{
            console.log('char 디액티베이티드');
            socket.leave("main");
            
            if(socket.user);{
                for(let i=0;i<char.chars.length;i++){
                  
                    if(char.chars[i].name==socket.user)
                    {
                       
                     char.chars.splice(i,1);
                    }
                }
             
             char.to("main").emit('removethis',{user:socket.user});
            }
        })
        socket.on('move',(data)=>{
            socket.header=data.header;
            socket.footer=data.footer;
            socket.right=data.right;
            socket.left=data.left;
          if(socket.request.user)
            translateOrder(data.e,socket.request.user.name,socket,char)
          else{
            translateOrder(data.e,'undefined',socket,char)  
          }
        });
        socket.on("confirm",(data)=>{
            console.log("confrim");
            if(socket.request.user)
            socket.emit("confirm",{user:socket.request.user});
            
        })
    });
    const vill=io.of('/villeage');
    vill.use(wrap(cookieParser(process.env.COOKIE_SECRET)));
    vill.use(wrap(sessionMiddleware));
    vill.use(wrap(passport.initialize()));
    vill.use(wrap(passport.session()));
    vill.on("connection",async(socket)=>{
        console.log("vill 액티베이티드");
        socket.join("main");
        if(!vill.chars)
        vill.chars=[];
        if(socket.request.user){
            let flag=1;
            for(const ch of vill.chars){
                if(ch.name==socket.request.user.name)
                {
                   flag=0;
                }
            }
            if(flag==1){
                    const user={
                        name:socket.request.user.name,
                        pos:[740,340],
                        c:0,
                    }
                    socket.user=socket.request.user.name;
                  
                        vill.chars.push(user);
                    
            }
          console.log(vill.chars);
        }
        vill.to('main').emit("charinit",{chars:vill.chars})
        socket.on('disconnect',()=>{
            console.log('vill 디액티베이티드');
            socket.leave("main");
            
            if(socket.user);{
                for(let i=0;i<vill.chars.length;i++){
                  
                    if(vill.chars[i].name==socket.user)
                    {
                       
                        vill.chars.splice(i,1);
                    }
                }
             
                vill.to("main").emit('removethis',{user:socket.user});
            }
        })
        socket.on('move',(data)=>{
           
            socket.header=data.header;
            socket.footer=data.footer;
            socket.left=data.left;
            socket.right=data.right;
          if(socket.request.user)
            translateOrder(data.e,socket.request.user.name,socket,vill)
          else{
            translateOrder(data.e,'undefined',socket,vill)  
          }
        });
        socket.on("confirm",(data)=>{
            if(socket.request.user)
            socket.emit("confirm",{user:socket.request.user});
            
        })
        
    })
    function translateOrder(e,user,socket,charRoom){
        const moveSpeed=40;
           
        for(let char of charRoom.chars){
     
            if(char.name==user){
                console.log(char.pos);
                const x=char.pos[0];
                const y=char.pos[1];
                
                switch(e){
                    case "ArrowUp":
                       if(y>socket.header){
                        char.pos=[x,y-moveSpeed];
                        return charRoom.to("main").emit("move",{name:user,e:e,x:x,y:y-moveSpeed,c:char.c});
                        }
                        break;
                    case "ArrowDown":
                        if(y<socket.footer){
                        char.pos=[x,y+moveSpeed];
                        return charRoom.to("main").emit("move",{name:user,e:e,x:x,y:y+moveSpeed,c:char.c});
                        }
                        break;
                    case "ArrowLeft":
                        if(x>socket.left){
                        char.pos=[x-moveSpeed,y];
                        return charRoom.to("main").emit("move",{name:user,e:e,x:x-moveSpeed,y:y,c:char.c});
                        }
                        break;
                    case "ArrowRight":
                        if(x<socket.right){
                        char.pos=[x+moveSpeed,y];
                        return charRoom.to("main").emit("move",{name:user,e:e,x:x+moveSpeed,y:y,c:char.c});
                        }
                        break;
                    case "d":          
                        return charRoom.to("main").emit("move",{name:user,e:e,x:x+moveSpeed,y:y,isDancing:true,c:char.c})
                    case "c":
                        
                        char.c+=1;
                        
                        if(char.c==8){
                            char.c=0;
                        }
                        
                        return charRoom.to("main").emit("move",{name:user,e:e,x:x+moveSpeed,y:y,c:char.c})
                   }
                 
                   break;
            }

        }
       
    }
}



