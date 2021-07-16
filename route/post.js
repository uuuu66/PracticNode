const express=require('express');
const Users=require('../models/users');
const Posts=require('../models/post');
const Comments=require('../models/comment');
const data=['Greeting','일상','코딩', "공부","생축", "GitHub"];
const {Op}=require('sequelize');
const router=express.Router();
const multer=require('multer');
const fs=require('fs');
const path=require('path');
var colorcode=["rgb(255, 50, 50)","rgb(255, 166, 65)","rgb(255, 242, 65)","rgb(178, 255, 62)","rgb(109, 143, 255)","rgb(86, 61, 153)","rgb(190, 93, 255)"];

router.get('/imgs',async (req,res,next)=>{
  await fs.readFile(`./images/${req.query.name}`,async(err,data)=>{
      if(err){
       await fs.readFile(`./temp/${req.query.name}`,(err,data)=>{
          if(data){
          console.log(data);
              return res.end(data);
          }
        });
       console.log(err.stack);
      }else{
          console.log("이미지로딩됨");
          res.end(data);
      }
  })
  
});
// router.get('/:idx/imgs',async (req,res,next)=>{
//   await fs.readFile(`./images/${req.query.name}`,async (err,data)=>{
//       if(err){
//        await fs.readFile(`./temp/${req.query.name}`,(err,data)=>{
//         if(data)
//         return res.end(data);
//       });
//        console.log(err.stack);
//       }else{
        
//         console.log("이미지로딩됨");
//         res.end(data);
//       }
//   })
  
// });
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }
const upload=multer({
  storage:multer.diskStorage({
    destination(req,file,done){
      done(null,'temp');
    },filename(req,file,done){
      const ext=path.extname(file.originalname);
      done(null,path.basename(file.originalname,ext)+"_"+req.user.id+"_"+Date.now()+ext);
    },
  }),
  limits:{fileSize:5*1024*1024},
});
router.post('/cr',async(req,res,next)=>{
  try{
    console.log(req.body.ids);
    var day=new Date();
    cday=day.getFullYear()+"_"+(parseInt(day.getMonth())+1)+"_"+day.getDate()+"_"+day.getHours()+"_"+day.getMinutes()+"_"+day.getSeconds()+'(수정됨)' ;

    var reComment=await Comments.update({
      comment:req.body.comment,
      created_at:cday,
    },{
      where:{id:req.body.ids}
    });
    res.json({success:'y',date:cday})
    }catch(err){
      console.log(err);
      res.json({success:'n'});
      next('error')
    }
  
});
router.post('/cd',async(req,res,next)=>{
try{
    var comment= await Comments.destroy({
      where:{id:req.body.did}
    });
    res.json({succes:'y'});
}catch(err){
  console.log(err);
  res.json({succes:'n'});
  next('error');
}});
router.post('/addc',async(req,res,next)=>{
  try{
    var day=new Date();
    if(req.body.bc!=0){
      var puser =await Comments.findOne({
      where:{id:req.body.bc}
      }); 
      req.body.comment="@"+puser.name+" "+req.body.comment;
    }
    
    var comment=await Comments.create({
      name:req.user.name,
      comment:req.body.comment,
      created_at:  day.getFullYear()+"_"+(parseInt(day.getMonth())+1)+"_"+day.getDate()+"_"+day.getHours()+"_"+day.getMinutes()+"_"+day.getSeconds(),
      babycomment:req.body.bc,
    });
      var cauthor=await Users.findOne({
        where:{name:req.user.name}
      });
      cauthor.addComment(comment);
      var cpost =await Posts.findOne({
        where:{id:req.body.id}
      });
    
      cpost.addComment(comment);
      var cmt=cpost.getComments();
      console.log(cmt);
      res.json({message:'yes',cmt:cmt,});
  }catch(err){
    if(!req.user){
      res.json({message:'login'});
    }
    console.log(err);
    next('error');
  }
  
}

);
router.post('/delete',async(req,res,next)=>{
  try{
    var Rpost =await Posts.findOne({
      where:{id:req.body.id}
    });
    var Rcomment=await Comments.destroy({
      where:{comment_id:Rpost.id},
    });
     await Posts.destroy({
      where:{id:req.body.id}
    });
   
    res.json({success:'y'});
  }catch(err){
    console.log(err);
    res.json({success:'n'});
    next('error');
  }
});
router.post('/upload/images' ,upload.single('upload'), function(req, res) {
  console.log(req.file);
  res.json({url:"imgs/?name="+req.file.filename});
  });
router.post('/repair',async(req,res,next)=>{
 try{
  var Rauthor= await Posts.findOne({
    where:{id:req.body.id}
  })
  if(Rauthor.story.indexOf('<iframe width="80%" style="min-height:300px" src="https://www.youtube.com/embed url=')){
      console.log('유튜브잇음');
      
      Rauthor.story=replaceAll(Rauthor.story,'<iframe width="80%" style="min-height:300px" src="https://www.youtube.com/embed','<oembed url="https://youtu.be');
      Rauthor.story=replaceAll(Rauthor.story,'title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>','></oembed>');
      console.log(Rauthor.story);

    }
  res.json({success:'y',story:Rauthor.story,category:Rauthor.category,detailcategory:Rauthor.detailcategory});
  }catch(err){
    res.json({success:'n'});
    next('error');
  }

})
function replaceAll(str, searchStr, replaceStr) {
  return str.split(searchStr).join(replaceStr);
}
router.post('/upload/story',async(req,res,next)=>{
  try{
    var repair=req.body.repair;
    var ccstory=req.body.cstory;
    var story=req.body.story;
    var title=req.body.title;
    var category=req.body.category;
    var detailcategory=req.body.detailcategory;
    console.log(ccstory);
    if(title.indexOf('&nbsp;')){
      title=replaceAll(title,'&nbsp;',"");
    }
    

    if(story.indexOf('<oembed url=')){
      console.log('유튜브잇음');
      
      story=replaceAll(story,'<oembed url="https://youtu.be','<iframe width="80%" style="min-height:300px" src="https://www.youtube.com/embed');
      story=replaceAll(story,'></oembed>','title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
      console.log(story);

    }
   author=req.user.name;
   if(repair!='no'){
    var rePost=await Posts.update({
      cstory:ccstory,
      story:story,
      title:title+"(수정됨)",
      category: category,
      detailcategory: detailcategory,
    },{
      where:{id:req.body.repair}
    })
  }else{
   

    var day=new Date();
    const newPost= await Posts.create({
      title: title ,
      fileType: "글" ,
      category: category,
      detailcategory: detailcategory,
      story: story,
      cstory:ccstory,
      author: author,
      created_at: day.getFullYear()+"_"+(parseInt(day.getMonth())+1)+"_"+day.getDate()+"_"+day.getHours()+"_"+day.getMinutes()+"_"+day.getSeconds()
    });
    console.log("이름은"+req.user.name);
    var Rauthor= await Users.findOne({
      where:{name:req.user.name}
    })
    Rauthor.addPost(newPost);
  }
    await fs.readdir("./temp",(err,file)=>{
      console.log(file);
     for(var i=0;i<file.length;i++){
       if(story.indexOf(file[i])){
         fs.renameSync("./temp/"+file[i],"./images/"+file[i]);
       }
     }
    })
  
     res.json({message:"성공"});
  }catch(err){
    if(err){
      console.log(err);
      return  res.json({message:"게시판 DB문제로 생성을 못하였습니다."});
        
    }
  }

});
router.post('/getc',async(req,res,next)=>{
  try{
    const story =await Posts.findOne({
      attributes:['story','author',],
      where:{id:req.body.id,},
      include:{
        model:Comments,  
        where:{
          babycomment:0,
        }   
      }
    });

    const daec=await Posts.findOne({
      where:{id:req.body.id,},
      include:{
        model:Comments,
        where:{
          [Op.not]:[{babycomment:0}],
        }
      }

    });
   
    if(req.user)
    {
     
      if(daec!=null){
       return res.json({Comment:story.Comments,bc:daec.Comments})
      }else{
        
        return res.json({Comment:story.Comments})
      }
    }else{
    
      if(daec!=null){
        return res.json({Comment:story.Comments,bc:daec.Comments})
       }else{
        
         return res.json({Comment:story.Comments})
       }
    }
    
  }catch(err){
   
    res.json({Comment:"오류가발생하였습니다."});
    next(err);
  }
  
});
router.post('/story',async(req,res,next)=>{
try{
  
    const story =await Posts.findOne({
      attributes:['story','author','views'],
      where:{id:req.body.id},
      include:{
        model:Comments,
         
      }
    
    });
  
    if(req.user){
      console.log('name='+req.user.name);
        if(req.user.name==story.author)
          var countPlus=parseInt(story.views);
        else
          var countPlus=parseInt(story.views)+1;
    }else{
      var countPlus=parseInt(story.views)+1;
    }

    await Posts.update({
      views:countPlus,
    },{
      where:{id:req.body.id}
    });
    
    if(req.user){
    const users=await Users.findOne({

      where:{id:req.body.userid}
    });console.log("id="+users.id);
      return res.json({story:story.story,isauthor:users.id,Comment:story.Comments,views:countPlus})
     
  }else{
    return res.json({story:story.story,isauthor:'noddddadasdasdsasadsda',Comment:story.Comments,views:countPlus})
  }
     
      
    
}catch(err){
  console.log(err);
  res.json({story:"오류가 발생하였습니다."});
}

});

router.get('/:idx',async(req,res,next)=>{
  try{
    let allcount =await Posts.findAndCountAll();
    let ilcount =await Posts.findAndCountAll({where:{category:"일상"}});
    let cocount =await Posts.findAndCountAll({where:{category:"코딩"}});
    let gongcount=await Posts.findAndCountAll({where:{category:"공부"}});
    let gicount =await Posts.findAndCountAll({where:{category:"생축"}});
    let ild=await Posts.findAndCountAll({
      where:{category:"일상"},
      group:["detailcategory"],
  });
  let cod=await Posts.findAndCountAll({
    where:{category:"코딩"},
    group:["detailcategory"],
  });
  let gongd=await Posts.findAndCountAll({
    where:{category:"공부"},
    group:["detailcategory"],
  });
  let gid=await Posts.findAndCountAll({
    where:{category:"생축"},
    group:["detailcategory"],
  });
  let count=allcount;
  if(req.params.idx==null){
       
    req.params.idx=2;
  }else{
    req.params.idx=parseInt(req.params.idx)+1;
  }
 if(req.query.row==null){
   res.render('error',{error:"잘못된 요청"});
 }
 
 
 
 if(req.query.category==null){
 
 var posts=0;
  if(count.count >10){
   posts = await Posts.findAll({
     
       offset: 10*(parseInt(req.params.idx)-2),
       order: [['id', 'DESC']],
       limit: 10,
     });
    }else{
     
      posts = await Posts.findAll({
     
        order: [['id', 'DESC']],
        
        limit: 10,
      });
    }
  }else{
    if(req.query.detail==null){
      count=await Posts.findAndCountAll({
        where:{category:req.query.category},
      });
    
    var posts=0;
     if(count.count >10){
      posts = await Posts.findAll({
           where:{category:req.query.category},
         
          offset: 10*(parseInt(req.params.idx)-2),
          order: [['id', 'DESC']],
          limit: 10,
        });
       }else{
        
         posts = await Posts.findAll({
           where:{category:req.query.category},
          
           order: [['id', 'DESC']],
           
           limit: 10,
         });
       }
      }else{
        count=await Posts.findAndCountAll({
          where:{detailcategory:req.query.detail},
        })
        if(count.count >10){
          posts = await Posts.findAll({
               where:{detailcategory:req.query.detail},
            
              offset: 10*(parseInt(req.params.idx)-2),
              order: [['id', 'DESC']],
              limit: 10,
            });
           }else{
            
             posts = await Posts.findAll({
               where:{detailcategory:req.query.detail},
              
               order: [['id', 'DESC']],
               
               limit: 10,
             });
           }



      }
  }
  if(req.query.search!=null){
    var condition=req.query.condition;
    var datas=req.query.search;
    
    if(condition=='titleAndstory'){
      count=await Posts.findAndCountAll({
        where:{[Op.or]:
          [{
            cstory:{[Op.like]:"%"+datas+"%"}
           },{
            title:{[Op.like]:"%"+datas+"%"}
        }]},
      });
      console.log("카운트는"+count.count);
      if(count.count >10){
        posts = await Posts.findAll({
          where:{[Op.or]:
            [{
              cstory:{[Op.like]:"%"+datas+"%"}
             },{
              title:{[Op.like]:"%"+datas+"%"}
          }]},
            offset: 10*(parseInt(req.params.idx)-2),
            order: [['id', 'DESC']],
            limit: 10,
          });
         }else{
          
           posts = await Posts.findAll({
            where:{[Op.or]:
              [{
                cstory:{[Op.like]:"%"+datas+"%"}
               },{
                title:{[Op.like]:"%"+datas+"%"}
            }]},
             order: [['id', 'DESC']],
             
             limit: 10,
           });
         }



  }else if(condition=="title"){
    count=await Posts.findAndCountAll({
      where:{
        title: {
          [Op.like]:"%"+datas+"%"
        }
      },
    });
    console.log(count.count);
    if(count.count >10){
      posts = await Posts.findAll({
        where:{
          title: {
            [Op.like]:"%"+datas+"%"
          }
        },
          offset: 10*(parseInt(req.params.idx)-2),
          order: [['id', 'DESC']],
          limit: 10,
        });
       }else{
        
         posts = await Posts.findAll({
          where:{
            title: {
              [Op.like]:"%"+datas+"%"
            }
          },
          
           order: [['id', 'DESC']],
           
           limit: 10,
         });
       }
  }else if(condition=="story"){
    count=await Posts.findAndCountAll({
      cstory:{
        title: {
          [Op.like]:"%"+datas+"%"
        }
      },
    });
    console.log(count.count);
    if(count.count >10){
      posts = await Posts.findAll({
        where:{
          cstory: {
            [Op.like]:"%"+datas+"%"
          }
        },
          offset: 10*(parseInt(req.params.idx)-2),
          order: [['id', 'DESC']],
          limit: 10,
        });
       }else{
        
         posts = await Posts.findAll({
          where:{
            cstory: {
              [Op.like]:"%"+datas+"%"
            }
          },
          
           order: [['id', 'DESC']],
           
           limit: 10,
         });
       }
  }else if(condition=="author"){
    count=await Posts.findAndCountAll({
      where:{
        author: {
          [Op.like]:"%"+datas+"%"
        }
      },
    });
    console.log(count.count);
    if(count.count >10){
      posts = await Posts.findAll({
        where:{
          author: {
            [Op.like]:"%"+datas+"%"
          }
        },
          offset: 10*(parseInt(req.params.idx)-2),
          order: [['id', 'DESC']],
          limit: 10,
        });
       }else{
        
         posts = await Posts.findAll({
          where:{
            author: {
              [Op.like]:"%"+datas+"%"
            }
          },
          
           order: [['id', 'DESC']],
           
           limit: 10,
         });
       }
  }
  }
   

     req.params.idx=parseInt(req.params.idx)-1;
 
     if(parseInt(req.params.idx)>((count.count)/10)+1)
     {
     
     
      return res.render('error',{error:"잘못된 요청"});
     }
     if(req.query.row){
     if(((parseInt(req.params.idx))%10)==0){
      
        if(Math.floor((parseInt(req.params.idx))/10)!=(parseInt(req.query.row)+1))
          return res.render('error',{error:'잘못된 요청'});
     }else{     
     if(Math.floor(parseInt(req.params.idx)/10)!=req.query.row)
     return res.render('error',{error:'잘못된 요청'});
     } 
    }
    if(req.user==undefined){
      var ids="아무것도아닌..";
    }else{
      var ids=req.user.id;
    }
return res.render('post',
   {post:'post',
   ild:ild,
   cod:cod,
   gongd:gongd,
   gid:gid,   
   colorcode:colorcode,  
  
      userid:ids,
       list:data,
       message:req.session.message,idx:(req.params.idx),
       plist:posts, count:(count.count/10), row:req.query.row, realcount:allcount.count,
       ilcount:ilcount.count,
       cocount:cocount.count,
       gongcount:gongcount.count,
       gicount:gicount.count,
           });
          }catch(err){
            console.log(err);
            next('error');
          }
});



router.get('/',async (req,res,next)=>{
   
   
   
    try{
      
      let allcount =await Posts.findAndCountAll();
      let ilcount =await Posts.findAndCountAll({where:{category:"일상"}});
      let cocount =await Posts.findAndCountAll({where:{category:"코딩"}});
      let gongcount=await Posts.findAndCountAll({where:{category:"공부"}});
      let gicount =await Posts.findAndCountAll({where:{category:"생축"}});
      let ild=await Posts.findAndCountAll({
          where:{category:"일상"},
          group:["detailcategory"],
      });
      let cod=await Posts.findAndCountAll({
        where:{category:"코딩"},
        group:["detailcategory"],
      });
      let gongd=await Posts.findAndCountAll({
        where:{category:"공부"},
        group:["detailcategory"],
      });
      let gid=await Posts.findAndCountAll({
        where:{category:"생축"},
        group:["detailcategory"],
      });
   

    let count=allcount;
      if(req.query.row==null)
      req.query.row=0;
      if(req.params.idx==null){
       
        req.params.idx=2;
      }else{
        req.params.idx=parseInt(req.params.idx)+1;
      }
      var posts=0;
      if(req.query.category==null){
      if(count.count>10){
        posts = await Posts.findAll({
          offset: 10*(parseInt(req.params.idx)-2),
          order: [['id', 'DESC']],
          limit: 10,
          });
        }else{
           posts = await Posts.findAll({
           
            order: [['id', 'DESC']],
            limit: 10,
          });
        }
      }else{
        if(req.query.detail==null){
        count=await Posts.findAndCountAll({
          where:{category:req.query.category},
        });
     

        var posts=0;
         if(count.count >10){
          posts = await Posts.findAll({
               where:{category:req.query.category},
            
              offset: 10*(parseInt(req.params.idx)-2),
              order: [['id', 'DESC']],
              limit: 10,
            });
           }else{
            
             posts = await Posts.findAll({
               where:{category:req.query.category},
              
               order: [['id', 'DESC']],
               
               limit: 10,
             });
           }
          }else{
            count=await Posts.findAndCountAll({
              where:{detailcategory:req.query.detail},
            })
            if(count.count >10){
              posts = await Posts.findAll({
                   where:{detailcategory:req.query.detail},
                
                  offset: 10*(parseInt(req.params.idx)-2),
                  order: [['id', 'DESC']],
                  limit: 10,
                });
               }else{
                
                 posts = await Posts.findAll({
                   where:{detailcategory:req.query.detail},
                  
                   order: [['id', 'DESC']],
                   
                   limit: 10,
                 });
               }



          }
          
      }
      
      if(req.query.search!=null){
        var condition=req.query.condition;
        var datas=req.query.search;
        
        if(condition=='titleAndstory'){
          count=await Posts.findAndCountAll({
            where:{[Op.or]:
              [{
                cstory:{[Op.like]:"%"+datas+"%"}
               },{
                title:{[Op.like]:"%"+datas+"%"}
            }]},
          })
          if(count.count >10){
            posts = await Posts.findAll({
              where:{[Op.or]:
                [{
                  cstory:{[Op.like]:"%"+datas+"%"}
                 },{
                  title:{[Op.like]:"%"+datas+"%"}
              }]},
                offset: 10*(parseInt(req.params.idx)-2),
                order: [['id', 'DESC']],
                limit: 10,
              });
             }else{
              
               posts = await Posts.findAll({
                where:{[Op.or]:
                  [{
                    cstory:{[Op.like]:"%"+datas+"%"}
                   },{
                    title:{[Op.like]:"%"+datas+"%"}
                }]},
                 order: [['id', 'DESC']],
                 
                 limit: 10,
               });
             }



      }else if(condition=="title"){
        count=await Posts.findAndCountAll({
          where:{
            title: {
              [Op.like]:"%"+datas+"%"
            }
          },
        });
        if(count.count >10){
          posts = await Posts.findAll({
            where:{
              title: {
                [Op.like]:"%"+datas+"%"
              }
            },
              offset: 10*(parseInt(req.params.idx)-2),
              order: [['id', 'DESC']],
              limit: 10,
            });
           }else{
            
             posts = await Posts.findAll({
              where:{
                title: {
                  [Op.like]:"%"+datas+"%"
                }
              },
              
               order: [['id', 'DESC']],
               
               limit: 10,
             });
           }
      }else if(condition=="story"){
        count=await Posts.findAndCountAll({
          story:{
            title: {
              [Op.like]:"%"+datas+"%"
            }
          },
        });
        if(count.count >10){
          posts = await Posts.findAll({
            where:{
              cstory: {
                [Op.like]:"%"+datas+"%"
              }
            },
              offset: 10*(parseInt(req.params.idx)-2),
              order: [['id', 'DESC']],
              limit: 10,
            });
           }else{
            
             posts = await Posts.findAll({
              where:{
                cstory: {
                  [Op.like]:"%"+datas+"%"
                }
              },
              
               order: [['id', 'DESC']],
               
               limit: 10,
             });
           }
      }else if(condition=="author"){
        count=await Posts.findAndCountAll({
          where:{
            author: {
              [Op.like]:"%"+datas+"%"
            }
          },
        });
        if(count.count >10){
          posts = await Posts.findAll({
            where:{
              author: {
                [Op.like]:"%"+datas+"%"
              }
            },
              offset: 10*(parseInt(req.params.idx)-2),
              order: [['id', 'DESC']],
              limit: 10,
            });
           }else{
            
             posts = await Posts.findAll({
              where:{
                author: {
                  [Op.like]:"%"+datas+"%"
                }
              },
              
               order: [['id', 'DESC']],
               
               limit: 10,
             });
           }
      }
      }
      if(req.user==undefined){
        var ids="아무것도아닌..";
      }else{
        var ids=req.user.id;
      }
          req.params.idx=parseInt(req.params.idx)-1;
          console.log(req.user);
            res.render('post',
                    {post:'post',
                        ild:ild,
                        cod:cod,
                        gongd:gongd,
                        gid:gid,   
                        colorcode:colorcode,
                        userid:ids,
                        list:data,
                        message:req.session.message,idx:0,
                        idx:(req.params.idx),
                        plist:posts,
                        realcount:allcount.count,
                        ilcount:ilcount.count,
                        cocount:cocount.count,
                        gongcount:gongcount.count,
                        gicount:gicount.count,
                        count:(count.count)/10,
                        row:req.query.row,
                     
                            });
        

      }catch(err){


        console.log(err);
        return errorHandler(err,req,res,next);
      }
    
   
    
});



module.exports=router;