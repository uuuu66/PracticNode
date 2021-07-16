const fs=require('fs');
const qs=require('querystring');
const axios =require('axios');
const cheerio=require('cheerio');
let character=fs.readFileSync('./cyphersRecords/characterlist.txt','utf-8');

let characterlist=character.split(',');
let characterurl=[];

async function gos(){ 
// for(let i=0;i<character.length;i++){
//     let urls=new Array();
//     for(let j=1;j<35;j++){
        
//         let url=`http://cyphers.nexon.com/cyphers/game/item/itembox?hidCharacName=${qs.escape(characterlist[i])}&hidPageNo=${j}&txtSearchItemName=`;
//         urls.push(url);
//     }
//     characterurl[i]=urls;

// }
for(let j=0;j<characterlist.length;j++){
    let data =fs.readFileSync('./cyphersRecords/itemlist_'+characterlist[j]+".txt",'utf-8');
    let dataStrings=data.split(',');
    dataStrings=deleteX(dataStrings);

    console.log(dataStrings);
    for(let k=0;k<dataStrings.length;k++){
     fs.appendFileSync('./cyphersRecords/[re]itemLists_'+characterlist[j]+".txt",dataStrings[k]+',');
    }
   // await delayProcess(characterurl[j],characterlist[j]);
}


//console.log(character);
}
function delay(){
    return new Promise((resolve)=>setTimeout(resolve,80));
}
async function delayed(Item,name){
    await delay();
    try{
        axios.post(Item).then(function(result){ 
            // const $=cheerio.load(result.data);
            // for(let i=1;i<16;i++){
            //   var item = $(`#container > div.content > div.content_board > div > div.board_list > div > ul:nth-child(${i}) > li.tit > p.name > a > span`).text();
            //   fs.appendFileSync('./cyphersRecords/itemlist_'+name+".txt",item+',');
            // }
            // for(let i=1;i<16;i++){
            //     var item = $(`#container > div.content > div.content_board > div > div > div > font > ul:nth-child(${i}) > li.tit > p.name > a > span`).text();
            //     fs.appendFileSync('./cyphersRecords/itemlist_'+name+".txt",item+",");
            //   }
               
        });
       

    
    }catch(err){
        console.log(err);
        next(err);
    }
}
async function delayProcess(Item,name){
    for(const item of Item){
        await delayed(item,name);
    }
    
    console.log("---DONE---"+name);
  
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
 
 

gos();