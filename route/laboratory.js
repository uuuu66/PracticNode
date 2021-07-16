const express=require('express');
const qs= require('querystring');
const axios=require('axios');
const fs = require('fs');
const router=express.Router();
const Laboratorys=require('../models/laboratory');
const {Op}=require('sequelize');
const excelparser = require("excel");
const exceljs=require('exceljs');
const logs=require('../logs/logs');
const cheerio=require('cheerio');
const data=['Greeting','WhoIsMinki','Posts', "Gallery","Laboratory", "GitHub"];
axios.defaults.headers.origin="http://39.115.162.208:30000/cyphers";
//     const data=result.data;

//         var workbook=new exceljs.Workbook;
//        workbook.created=new Date(); 
    
//        const worksheet=workbook.addWorksheet('characters',);//{properties:{tabColor:{argb:'FFC0000'},headerFooter:{firstHeader:"캐릭터들",firstFooter:"엑셀"}}});
//        var firstc=Object.keys(data.rows[0])[0];
//        var secondc=Object.keys(data.rows[0])[1];
//        var firstrow=[];
        
//        firstrow[0]=firstc;
//        firstrow[1]=secondc;
//        worksheet.addRow(firstrow);
//     for(var i=0;i<data.rows.length;i++){
    
//         var row=Object.values(data.rows[i]); 
//         //console.log(row);  
//         worksheet.addRow(row);
   
//     }

//     const options = {
//           encoding:'CP949',
//       };
//      //await workbook.csv.writeFile('./cyphersRecords/characters.csv',options);
//     await workbook.xlsx.writeFile('./cyphersRecords/characters.xlsx',options);
   
//    // await workbook.csv.write(file, { sheetName: 'characters' });
// }catch(error){
//    console.log(error);
//    next(error);
// }
  //  return res.json({y:"yes"});

function filereWrite(name){
    let charData;
    let directory="./cyphersRecords/";
    let filename='itemLists_'+name+'.txt';
        try{
        charData= fs.readFileSync(directory+filename,'utf-8');
        }catch(err){
            console.log(err);
            next(err);
        }
    
        new Promise(function(resolve,reject){
            charData=charData.split(','); 
            for(let i=0;i<charData.length;i++){
            charData[i]= charData[i].split('\n');
            }
        // console.log(charData.length);
        //  console.log(1);
            return resolve(charData);
        }).then(function(charData){
            
            for(let i=0;i<charData.length;i++){ 
                // console.log(typeof(charData));
                // console.log(i);
                charData[i]=deleteX(charData[i]);
            }
        //  console.log(2);
        return charData;
        }).then(function(charData){
            // console.log(3);

            charData.forEach((ele,j)=>{
                if(j==0){
                    charData[0].splice(1);
                }
                if(ele.length==0){
                    charData.splice(j,1);
                }
            })
        //console.log(charData);
            const resData= String(charData);
                try{
                const wfile=fs.writeFileSync(directory+"[re]"+filename,resData);
                
                }catch(err){
                    console.log(err);
                    next(err);
                }
            
        });

    return filename;
}
function deleteX(array){
    let count=0;
   array.forEach((ele,j)=>{
       if(ele==''){
           count++;
           array.splice(j,1);
       }
   })
   //console.log(count);
    if(count==0){
        return array;
    }

    return deleteX(array);
}
 
 

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


 
   
      
    router.post('/testc',async(req,res,next)=>{
       var res= await axios.post('https://blog.naver.com/huasheng_xinya%7B%22blogId%22%3A%22huasheng_xinya%22%2C%22logNo%22%3A%22222373951545%22%2C%22elapsed%22%3A14743%7D');

        res.json({result:res.data});
    });

  router.post('/cyphersitem',async(req,res,next)=>{
      //crowl();
    const dir='./cyphersRecords/';
    let characters=fs.readFileSync(dir+"characterlist.txt",'utf-8');
    characters=characters.split(',');
    let character=[];
    for(let i=0;i<characters.length;i++){
        character.push(characters[i]);
    }

    for(let j=33;j<character.length;j++){
        let today=new Date();
        let now=today.getHours()+"시"+today.getMinutes()+"분"+today.getSeconds()+"초"+today.getMilliseconds()+"밀리초";
        fs.appendFileSync('./logs/cypherscharacterlog.txt',now+":"+character[j]+j+'\n');
        let item=fs.readFileSync(dir+"[re]itemLists_"+character[j]+".txt",'utf-8');
       // item=fs.readFileSync(dir+"[re]itemLists_"+character[j]+".txt",'utf-8');
        item=item.split(',');
        //item.shift();
        item.pop();
        console.log(character[j]+"{{{{}}}}");
        let itemcodeArray=new Array();
        itemcodeArray= await delayProcess(item,itemcodeArray);
        itemcodeArray=String(itemcodeArray);
        fs.writeFileSync(dir+"[code]item_"+character[j]+".txt",itemcodeArray);
        console.log("씀"+character[j]);
    
   }
    
   
    

});
 function delay(){
    return new Promise((resolve)=>setTimeout(resolve,40));
}
async function delayed(Item,array){
    await delay();
    try{
       const result= await axios.get(`https://api.neople.co.kr/cy/battleitems?itemName=${qs.escape(Item)}&wordType=fyll&limit=10&apikey=dagxFMoUoEfELDjmBOVVO2vkf6aoELx7`);
   
       //console.log(result.data.rows);
     
       Item=String(Item);
       const data=Item+":"+result.data.rows[0].itemId;
        
        array.push(data);
        console.log(data);
    }catch(err){
        console.log(err);
        next(err);
    }
}
async function delayProcess(Item,array){
    for(const item of Item){
        await delayed(item,array);
    }
    
    console.log("DONE");
    return array;
}
    
async function crowl(){
    let urls=[]
    for(let i=0;i<35;i++){
     urls[i]=`http://cyphers.nexon.com/cyphers/game/item/itembox?hidCharacName=jannette&hidPageNo=${i}&txtSearchItemName=`;
    }
    let count=0;
    for await(item of urls){
        
        new Promise((resolve)=>setTimeout(resolve(item),200)).then(async function(item){
           
          try{
                const result= axios.post(item)
                .then(function(result){
                let $=cheerio.load(result.data);
               
              //  console.log(result.data);
                for(let j=0;j<16;j++){
                    let item=$(` #container > div.content > div.content_board > div > div.board_list > div > ul:nth-child(${j}) > li.tit > p.name > a > span`).text();
                    try{fs.appendFileSync('./cyphersRecords/jannette.txt',item+",");
                    console.log(item);
                    }catch(err){
                        console.log(err);
                    }
                 
                } 
              
            });
            }catch(err){
                console.log(err);
            }
        })
        console.log('done'+count);
        count++;
    }
   
}




router.post('/cyphers',async(req,res,next)=>{
    const username=req.body.username;
    
    
   try{
    var result=await axios.get(`https://api.neople.co.kr/cy/players?nickname=${qs.escape(username)}&wordType=<wordType>&apikey=dagxFMoUoEfELDjmBOVVO2vkf6aoELx7`);
    var nick=result.data.rows[0].nickname;
    var level=result.data.rows[0].grade;
    //승률구하기
    var winrateResult= await axios.get(`https://api.neople.co.kr/cy/players/${result.data.rows[0].playerId}?apikey=dagxFMoUoEfELDjmBOVVO2vkf6aoELx7`)
    var officialWinrate="공식전 기록없음";
    var normalWinrate="일반전 기록없음";
    var officialWincount=0;
    var officialGame=0;
    var normalWincount=0;
    var normalGame=0;
    
    if(winrateResult.data.records[0].gameTypeId=='rating'){
            if((winrateResult.data.records[0].winCount+winrateResult.data.records[0].loseCount)==0){
                
            }
            else{
            officialWinrate=(winrateResult.data.records[0].winCount/(winrateResult.data.records[0].winCount+winrateResult.data.records[0].loseCount))*100+"%";
            officialWincount=winrateResult.data.records[0].winCount;
            officialGame=(winrateResult.data.records[0].winCount+winrateResult.data.records[0].loseCount);
            }
            if((winrateResult.data.records[1].winCount+winrateResult.data.records[1].loseCount)==0){
               
            }else{
            normalWinrate=(winrateResult.data.records[1].winCount/(winrateResult.data.records[1].winCount+winrateResult.data.records[1].loseCount))*100+"%";
            normalWincount=winrateResult.data.records[1].winCount;
            normalGame=(winrateResult.data.records[1].winCount+winrateResult.data.records[1].loseCount);
            }
        
    }else if(winrateResult.data.records[0].gameTypeId=='normal'){
        if((winrateResult.data.records[0].winCount+winrateResult.data.records[0].loseCount)==0){
            
        }
        else{
        normalWinrate=(winrateResult.data.records[0].winCount/(winrateResult.data.records[0].winCount+winrateResult.data.records[0].loseCount))*100+"%";
        normalWincount=winrateResult.data.records[0].winCount;
        normalGame=(winrateResult.data.records[0].winCount+winrateResult.data.records[0].loseCount);
    
        }
    }
    //매칭분석 
    var today=new Date();
    
    var toyear=today.getFullYear();
    var tomonth=today.getMonth()+1;
    var todate=today.getDate();
    var enddate=toyear+"-"+tomonth+"-"+todate;
    
    var fromyear=today.getFullYear();
    var frommonth=tomonth-1;
    if(tomonth==1){
        fromyear=toyear-1;
        frommonth=12;
    }
    var fromdate=todate;
    var startdate=fromyear+"-"+frommonth+"-"+fromdate;
   
    var partyResult=await axios.get(`https://api.neople.co.kr/cy/players/${result.data.rows[0].playerId}/matches?gameTypeId=normal&startDate=${startdate}&endDate=${enddate}&limit=500&apikey=dagxFMoUoEfELDjmBOVVO2vkf6aoELx7`)
    
    
    var partymembers=new Map();
    var partys=new Map();
    var partyswinrate=new Map();
    var partysloserate=new Map();
    var partyswin=new Map();
    var partyslose=new Map();
    var winPartiesposition=new Map();
    
    partyResult.data.matches.rows.map(function(match){
       for(var i=0;i<match.playInfo.partyInfo.length;i++){
            if(partymembers.has(match.playInfo.partyInfo[i].nickname)){
                var mebernumber= partymembers.get(match.playInfo.partyInfo[i].nickname) +1;
                partymembers.set(match.playInfo.partyInfo[i].nickname,mebernumber);
            }else{
                partymembers.set(match.playInfo.partyInfo[i].nickname,1);
            }
            
       }
       //파티 같이 게임한 수 
     var partynames="";
       for(var i=0;i<match.playInfo.partyInfo.length;i++){      
                   partynames+=match.playInfo.partyInfo[i].nickname+"/";      
         }
         if(partynames==''){
            partynames="혼자서 쓸쓸하게 솔플하기";
        }
         if(partys.has(partynames)){
                    partys.set(partynames,partys.get(partynames)+1)
            }else{
                    
                    partys.set(partynames,1)
            }
       //파티 이긴 수 
       var partynames="";
       if(match.playInfo.result=="win"){
           
           for(var i=0;i<match.playInfo.partyInfo.length;i++){
             partynames+=match.playInfo.partyInfo[i].nickname+"/";    
           }
           if(partynames==''){
                 partynames="혼자서 쓸쓸하게 솔플하기";
            }
            if(winPartiesposition.has(partynames)){
                var idarray=winPartiesposition.get(partynames);
                idarray.add(match.matchId);
                winPartiesposition.set(partynames,idarray);
                
            }else{
               var idarray=new Set();
               idarray.add(match.matchId);
                winPartiesposition.set(partynames,idarray);
            }


           if(partyswin.has(partynames)){
                partyswin.set(partynames,partyswin.get(partynames)+1);
           }else{

                partyswin.set(partynames,1);
           }
       }else{
            for(var i=0;i<match.playInfo.partyInfo.length;i++){
            partynames+=match.playInfo.partyInfo[i].nickname+"/";    
           }
           if(partynames==''){
            partynames="혼자서 쓸쓸하게 솔플하기";
            }
           if(partyslose.has(partynames)){
                partyslose.set(partynames,partyslose.get(partynames)+1);
            }else{
                partyslose.set(partynames,1);
                }
        }
    });
    
    for(lose of partys.keys() ){
            if(partys.has(lose)){
                var wins=partyswin.get(lose);
                var loses=partyslose.get(lose);
                partyswinrate.set(lose,(wins/partys.get(lose))*100);
                partysloserate.set(lose,(loses/partys.get(lose))*100);
            }
    }var GamePosition=0;

    if(req.query.team!=null){
        GamePosition=new Map();
        
    var teams=req.body.key;
        var urls=new Array();

        for (val of winPartiesposition.get(teams)){
            url=`https://api.neople.co.kr/cy/matches/${val}?&apikey=dagxFMoUoEfELDjmBOVVO2vkf6aoELx7`
        urls.push(url);
        console.log(urls);
        }
        //console.log(urls);
       GamePosition= await processArray(urls,GamePosition);

        GamePosition=Object.fromEntries(GamePosition);
       
    }
    function delay() {
        return new Promise(resolve => setTimeout(resolve, 300));
      }
      
      async function delayed(item,GamePosition) {
        // notice that we can await a function
        // that returns a promise
            await delay();
            console.log("item="+item);
           let result= await axios.get(item);
                   // console.log()
                    let s=new Array();
                        
                    let user=result.data.players;
        


                    for(let i=0;i<user.length;i++){
                  //  console.log(username+"-"+user[i].nickname);
                  //  console.log(user);
                    
                    let parties=teams.split('/');
                    for(let j=0;j<parties.length;j++){   
                        if(user[i].nickname==parties[j]){
                        let p= parties[j]+"-"+user[i].position.name;
                        s.push(p);
                        }
                    }
                    if(user[i].nickname==username){
                        let f=username+"-"+user[i].position.name;
                        s.push(f);
                    }
                

                }
                s=String(s);
            if(GamePosition.has(s)){
                    GamePosition.set(s,GamePosition.get(s)+1);
                }
            else{
                    GamePosition.set(s,1);
                }
     
                    
      }
      async function processArray(array,GamePosition) {
          for (const item of array) {
              await delayed(item,GamePosition);
            }
           
        console.log('real Done!');
        return GamePosition;
      }
        console.log(GamePosition);
       
    

    partys=Object.fromEntries(partys);
    partysloserate=Object.fromEntries(partysloserate);
    partymembers=Object.fromEntries(partymembers);
    partyswinrate=Object.fromEntries(partyswinrate);
    partyswin=Object.fromEntries(partyswin);
    partyslose=Object.fromEntries(partyslose);
   winPartiesposition=Object.fromEntries(winPartiesposition);
    
    res.json({  nick:nick,
                level:level,
                officialWinrate:officialWinrate,
                officialWincount:officialWincount,
                officialGame:officialGame,
                normalWincount:normalWincount,
                normalGame:normalGame,
                normalWinrate:normalWinrate,
                partyMembers:partymembers,
                partys:partys,
                partysWinrate:partyswinrate,
                partysLoserate:partysloserate,
                partysWin:partyswin,
                parytsLose:partyslose,
                winPartiesposition:winPartiesposition,
                GamePosition:GamePosition,
                y:'y',
            })
}catch(error){
       console.error(error);
      
    res.json({  nick:nick,
        level:level,
        officialWinrate:officialWinrate,
        officialWincount:officialWincount,
        officialGame:officialGame,
        normalWincount:normalWincount,
        normalGame:normalGame,
        normalWinrate:normalWinrate,
        partyMembers:partymembers,
        partys:partys,
        partysWinrate:partyswinrate,
        partysLoserate:partysloserate,
        partysWin:partyswin,
        parytsLose:partyslose,
        winPartiesposition:winPartiesposition,
        GamePosition:GamePosition,
        y:'n',
    });
    
   }

})
router.post('/postLab',async(req,res,next)=>{
    const title=req.body.title;
    const category=req.body.category;
    const tag=req.body.tag;
    const html=req.body.html;
   
    const LabCon=await Laboratorys.create({
        title:title,
        category:category,
        tag:tag,
        html:html,
    });
    if(LabCon!=null){
        res.send({message:"y"});
    }
    else{
        res.send({message:"n"})
    }
});

router.post('/getLab',async(req,res,next)=>{  
    const html=req.body.html;
    const post=await Laboratorys.findOne({
        where: {html:html}
    })
    res.json({html:post});

});

router.get('/',async(req,res,next)=>{

    var listofLab=0;
    const ld=await Laboratorys.findAndCountAll({
        group:["category"],
    });
  
    if(req.query.search==null||req.query.search==undefined){   
       
         listofLab = await Laboratorys.findAll({
            attributes:['title','category','html','tag'],
        });
            var tags=new Array();
            var msg="";
            listofLab.map(function(Lab){
            var tag= Lab.tag.split(',');
            tag=tag.map(x=>"#"+x);
            
                tags.push(tag);
            })
             console.log(tags);

        
         }else {
            var condition=req.query.condition;
            var datas=req.query.search;
            if(condition=="tag"){
                listofLab =await Laboratorys.findAll({
                    attributes:['title','category','html','tag'],
                    where:{tag:{[Op.like]:"%"+datas+"%"},}
                    });
            }
            else if(condition=='title'){
                listofLab =await Laboratorys.findAll({
                    attributes:['title','category','html','tag'],
                    where:{title:{[Op.like]:"%"+datas+"%"},}
                    });
            }
            else if(condition=='category'){
                listofLab =await Laboratorys.findAll({
                    attributes:['title','category','html','tag'],
                    where:{category:{[Op.like]:"%"+datas+"%"},}
                    });
            }
        var tags=new Array();
        listofLab.map(function(Lab){
            var tag= Lab.tag.split(',');
            tag=tag.map(x=>"#"+x);
            
                tags.push(tag);
            })
            console.log(tags);
       const msg="검색완료";
    }

    res.render('laboratory',
    {   
      
        post:'laboratory',
        list:data,
        plist:listofLab,
        tags:tags,
        ld:ld,
        message:msg,
    });

       
});

function makecharacter(i){
    var characters=[];
    let urls=[];
                try{
                fs.readFile("./cyphersRecords/characterlist.txt",'utf-8',(err,datas)=>{
                    if(err){
                        console.log(err);
                    }else{
                        characters=datas.split(',');
                        console.log(characters[i]);
                        
                        let data='';
                                
                        data+="<"+characters[i]+">\n";
                        var pages=34;
                        try{
                            //console.log(data);
                        fs.appendFile('./cyphersRecords/itemLists_'+characters[i]+'.txt',data,(error)=>{
                        
                        });
                        
                        }
                        catch(err){
                            console.log(err);
                            next(err);
                        }
                        for (let p=0;p<pages+1;p++){
                            var url=`http://cyphers.nexon.com/cyphers/game/item/itembox?hidCharacName=${qs.escape(characters[i])}&hidPageNo=${qs.escape(p)}&txtSearchItemName=`;
                            urls[p]=url;
                        }
                        processArray(urls,characters[i]);
                         
                        
                      
                            
                                
                
                    
                    
                    
            
                    }
                    
                    
                });
            }catch(err){
                console.log(err);
                next(err);
            }
}


module.exports=router;