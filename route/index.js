
const express=require('express');
const router =express.Router();
const fs=require('fs');
const path=require('path');

console.log("index.js 호출됨");
const ilist=['Home','WhoIsMinki','Posts', "Dot Arts", "GitHub"];
router.route('/')
    .get((req,res)=>{console.log(req.query.index);
        fs.readdir(path.join(__dirname,"../public"),(err,list)=>{
            if(err){
                console.error(err);
            }else{
                var EXTENSION = '.html';

                var targetFiles = list.filter(function(file) {
                return path.extname(file).toLowerCase() === EXTENSION;
                });
                   
                   
                data={
                    url:targetFiles[req.query.index],
                    list:ilist,
                    index:req.query.index       
                }; 
                res.json(data);
            }                  
            });
        })   
    .post((req,res)=>{});



module.exports=router;