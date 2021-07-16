var index=document.getElementsByClassName('index');



// 팝업 오픈
function enable() {
  
const body = document.querySelector('body');
let scrollPosition = 0;
  scrollPosition = window.pageYOffset;
  body.style.overflow = 'hidden';
  body.style.position = 'fixed';
  body.style.top = `-${scrollPosition}px`;
  body.style.width = '100%';
  return scrollPosition
}
// 팝업 닫기
function disable(scrollPosition) {
  
const body = document.querySelector('body');

  body.style.removeProperty('overflow');
  body.style.removeProperty('position');
  body.style.removeProperty('top');
  body.style.removeProperty('width');
  window.scrollTo(0, scrollPosition);
}



function hideMenu(){
  var button=document.getElementById('menubtn');
  button.style.display='none';
}
function mobileMenu(){

  var filter = "win16|win32|win64|mac";

 


 
 //document.getElementById("introduceSpan").textContent="포기하지맙시다"
  

  var button=document.getElementById('menubtn');
  var nav=document.getElementById('nav');
  var login=document.getElementById('jipsa');
  var con=document.getElementById('container');
  var msg=document.getElementById('messages');
    msg.animate( [// keyframes
      { transform: 'translateX(2px)' }, 
      { transform: 'translateX(-4px)' },
      {transform:'translateX(2px)'},
      {transform: 'translateX(0)'}, {transform: 'translateX(0)'}, {transform: 'translateX(0)'},{transform: 'translateX(0)'},{transform: 'translateX(0)'}
    ], { 
      // timing options
      duration: 1000,
      iterations: Infinity
    });
    msg.innerText="메뉴를 닫으려면 터치";
    con.style.display='block';
  login.style.display='block';
  nav.style.display='block';
  msg.style.backgroundColor='wheat';  
  button.style.display='none';
let a= enable();
  
 


 con.addEventListener('click',(e)=>{
  con.style.display='none';
  login.style.display='none';
  nav.style.display='none';
  button.style.display='block';
 disable(a);
 })

}
function goLab(){
  window.open(new URL("http://39.115.162.208:30000/lab"),'_self');
}
function goDot(){
  window.open(new URL("http://39.115.162.208:30000/dotgallery","__self"));
  //window.open(new URL("http://127.0.0.1:30000/dotgallery"),'_self');
}
function goHome(){
  window.open(new URL("http://39.115.162.208:30000/"),'_self');
}
function goError(){
  window.open(new URL("http://39.115.162.208:30000/error"),'_self');
}
async function requestLogin(){
  try{
    clearTimeout();
    await axios.get('/');
   
    
    $(document).ready(function(){
     $("#content").load('/login.html');
    });
    scrollp();
    var message=document.getElementById('messages');
    message.innerText='로그인하시는군요';
    hiddenC();
  }catch(err){
    console.log(err);
  }
}

async function requestSign(){
  try{
    clearTimeout();
    await $(document).ready(function(){
      $("#content").load('/join.html');
     });
     scrollp();
     var message=document.getElementById('messages');
     message.innerText='회원가입하시는군요';
     hiddenC();
  }catch(err){
    console.log(err);
  }
}
function requestFind(){
  clearTimeout();
   $(document).ready(function(){
    $("#content").load('/find.html');
   });
   scrollp();
   var message=document.getElementById('messages');
   message.innerText= "비밀번호를 잊어버리셨군요.";
   hiddenC();
}

async function getIndex(i){
    try{
    var id =i.getAttribute('id')
    clearTimeout();
      var res= await axios.get(`/index/?index=${id}`);
        console.log(id);
       var nPage=res.data.list;
        var jipsaSay=document.getElementById('messages');
        jipsaSay.innerText= "현재페이지는 \n"+nPage[res.data.index]+'입니다';
     $(document).ready(function(){
        $("#content").load('/'+res.data.url);
     });
   scrollp();
      
    }catch(err){
        console.error(err);
    }
}
function goGit(){
  window.open('https://github.com/uuuu66/','__blank');
}
async function search(){
  var category=document.getElementById("searchtype");
  var condition=category.options[category.selectedIndex].value;
  var data=document.getElementById('search');
  
  var msg= document.getElementById('messagees');
  if(data.value==""||data.value==null){
  msg.innerText="검색내용이 없습니다."
  return 0;
  }
  var urls='http://39.115.162.208:30000/post/?search='+data.value+"&condition="+condition;
  window.open(new URL(urls),'_self');
}

async function getIdx(e){
 var c=location.href;
 var y=0;
if(c.indexOf("/?search=")!=-1||c.indexOf("&search=")!=-1){
  y=c.split("search=")[1];
  c="&search="+y;  
}else{
 if(c.indexOf("/?category=")!=-1){
 
  y=c.split("category=")[1];  
    c="&category="+y;
    
 }  
 else if(c.indexOf("&category=")!=-1){

    y=c.split("category=")[1];  
    c="&category="+y;
    
}
else{
  c="";
}
}

    var q='/?row=';
    var i='http://39.115.162.208:30000/post/';
    i+=e.innerText;
    if(e.innerText>=11){
      if((Math.floor(e.innerText)%10)!=0)
        q+=Math.floor(e.innerText/10);
      else
        q+=(Math.floor(e.innerText/10)-1);
    }
    else{
      q+=0;
    }
    var url=i+q+c;
   
    window.open(new URL(url),'_self');
   
}

 function getNext(row,i){
  var c=location.href;
 var y=0;

 if(c.indexOf("/?search=")!=-1){
  y=c.split("category=")[1];
  c="&category="+y;  
}else{
 if(c.indexOf("/?category=")!=-1){
  
  if(indexof("&detail=")!=-1){
    y=c.split("category=")[1];
    var cy=y.split("&detail=")[0];  
    c="&category="+cy+"&detail="+y.split("&detail=")[1];
  }else{
    y=c.split("category=")[1];
    c="&category="+y;
  }
 }  
 else{
  if(c.indexOf("&category=")!=-1){
      if(indexof("&detail=")!=-1){
        y=c.split("category=")[1];
        var cy=y.split("&detail=")[0];  
        c="&category="+cy+"&detail="+y.split("&detail=")[1];
      }else{
        y=c.split("category=")[1];
        c="&category="+y;
      }
    
    
    }else{
  c="";
  }
 }
}
  console.log(row);
 if(i==0)
 row=row+1;
 else
 row=row-1;

urls="http://39.115.162.208:30000"+'/post/'+(parseInt(10*row)+1)+'/?row='+row+c;
  
window.open(new URL(urls),'_self');

}
function getAuthor(A){
  var urls="http://39.115.162.208:30000"+'/post/?search='+A+"&condition=author";
  window.open(new URL(urls),'_self');
  
}
function getDetail(C,D){
  var urls="http://39.115.162.208:30000"+'/post/?category='+C+"&detail="+D;
  window.open(new URL(urls),'_self');
 
}
function scrollp(){
  var Y="";
  if(document.querySelector('#section')==null||document.querySelector('#section')==undefined||document.querySelector('#content').innerText==null)
    Y='40%';
  else
   Y=document.querySelector('#content').offsetTop+0;
   window.setTimeout(function(){;window.scrollTo({top:Y,left:0,behavior:'smooth'});},100);

}
function getWrite(){
  $(document).ready(function(){
    $("#content").load('/write.html');
 });
scrollp();
hiddenC();
}
async function getStory(id,name,authorid,userid){
   var res=await axios.post('/post/story',{id,userid});
   document.getElementById('content').innerHTML=res.data.story;
  document.getElementById('content').style.border="1px white solid";
 document.getElementById('cbtn').setAttribute('sid',id);
 var cf=document.getElementById('commentform');
  cf.style.display='block';
 var comment =document.getElementById('comment');
 comment.style.display='block';
 console.log(res.data.isauthor);
 var btncollection =document.getElementById('btncollection');
  while ( btncollection.hasChildNodes() )
   { btncollection.removeChild( btncollection.firstChild ); }
   if(authorid==res.data.isauthor){
    var deletebtn=document.createElement('button');
    var repairbtn=document.createElement('button');
    deletebtn.innerText="삭제";
    repairbtn.innerText="수정";
    deletebtn.style.color="white";
    repairbtn.style.color="white";
    deletebtn.addEventListener('click',async function(){
      if (window.confirm("삭제하면 되돌릴 수 없습니다.")) {
          var res=await axios.post("/post/delete",{id,});
          if(res.data.success=="y"){
            window.open(new URL("http://39.115.162.208:30000/post"),'_self');
          }else{
            alert("무언가 문제가 있어요. 다시 시도해 주세요.");
          }
      }
    })
    repairbtn.addEventListener('click',async function(){
      if (window.confirm("수정하시겠습니까?")) {
        var res= await axios.post("/post/repair",{id,});
        if(res.data.success=="y"){
          $(document).ready(function(){
            $("#content").load('/write.html');
            window.setTimeout(function(){editor.setData(res.data.story);
              var repair=document.getElementById('repair');repair.value=id;
              var detailcategory=document.getElementById('detailtype');
              var category=document.getElementById('type');
              category.value=res.data.category;
              detailcategory.value=res.data.detailcategory;

            },100);
           hiddenC();
          });
        }else{
          alert("무언가 문제가 있어요. 다시 시도해 주세요.");
        }
      }
    }  )
   var hr=document.createElement('hr');
   document.getElementById('content').appendChild(hr);
   var btncollection =document.getElementById('btncollection');
   
   btncollection.appendChild(repairbtn);
   btncollection.appendChild(deletebtn);
  
  }
  var viewCount=document.getElementById(id+"/view");
  viewCount.innerText="["+res.data.views+"]"; 
  scrollp();
   getComment(id,name,userid); 
}
function hiddenC(){
  var comment =document.getElementById('comment');
  comment.style.display='none';
  var cf=document.getElementById('commentform');
  cf.style.display='none';
  var btncollection =document.getElementById('btncollection');
  while ( btncollection.hasChildNodes() )
   { btncollection.removeChild( btncollection.firstChild ); }

}
async function getCategory(obj){
  

  window.open(new URL("http://39.115.162.208:30000/post/?category="+obj),'_self');


}
function rename(){ 
  clearTimeout();
  $(document).ready(function(){
    $("#content").load('/rename.html');
 });
 scrollp();
}
async function goPost(){
 
  window.open(new URL("http://39.115.162.208:30000/post"),'_self');
  
}
async function logOut(){
 try{
  var res=  await axios.get('/auth/logout');
  window.open(new URL(location.href),'_self');
 }catch(error){
  console.log(error);
 }
}
async function addComment(obj,name,userid){
  var id =obj.getAttribute('sid');
  var comment=document.getElementById('ct').value;
  var bc=document.getElementById('cbtn').getAttribute('bc');
  
  
  
  if(comment.length>80){
    return alert("80자를 넘었습니다.");
  }
  try{
  var res=await axios.post('/post/addc',{id,comment,bc}); 
 
  if(res.data.message=="login"){
    hiddenC();
    return requestLogin();
  }
}catch(err){
    console.log(err);
  }
 
  document.getElementById('ct').value="";
 getComment(id,name,userid);
 
 

}
async function getComment(id,name,userid,bc){
  
  var colorcode=["red","orange","yellow","greenyellow","skyblue","indigo","purple"];
  var res=await axios.post('/post/getc',{id});
 
  var Comment =res.data;
  if(res.data.Comment=="댓글없음"){
    return 0;
  }
  var dontBc=document.getElementById('cancle');
  cancleBabyc(document.getElementById('frog3'));
  var i=0;
  if(Comment=="오류가발생하였습니다."){
    var commentdiv =document.getElementById('comment');
    return commentdiv.innerText="댓글을 불러오는데에 오류가 발생하였습니다."
  }   
  var commentdiv =document.getElementById('comment');
   while ( commentdiv.hasChildNodes() )
   { await commentdiv.removeChild( commentdiv.firstChild ); }
  var h=document.createElement("h1");
  h.innerText="댓굴들";
  commentdiv.appendChild(h);

  console.log(Comment);
  await Comment.Comment.map(function(comment){
      var parentcdiv=document.createElement('div');  
      parentcdiv.style.width="100%";
      parentcdiv.setAttribute('parentid',comment.id);

      parentcdiv.style.textAlign="center";
      
      parentcdiv.style.borderBottom="white 1px solid";
      parentcdiv.style.backgroundColor="rgba(0,0,0,0.4)";
      var detailsdiv=document.createElement('details');
      detailsdiv.setAttribute('numberofbaby',0);
      var summary=document.createElement('summary');
      summary.innerText="대댓글";
      detailsdiv.appendChild(summary);    
      detailsdiv.style.cursor="pointer";
      detailsdiv.setAttribute("class","parent");
      detailsdiv.setAttribute('parentid',comment.id);
      detailsdiv.style.border="1px white solid";
      detailsdiv.style.marginBottom="-1px";
      detailsdiv.open=true;
      var portrait=document.createElement('img');
     
      portrait.setAttribute('src',"imgs/?name=frogbtn_rainbow%!_"+i%7+".gif");
      portrait.style.padding="10px 10px 10px 10px";
      portrait.style.backgroundColor="gray";
      portrait.style.border="white 1px solid";
      portrait.style.marginTop="30px";
      portrait.style.cursor="pointer";
      portrait.title="대댓글 달기";
      var daeexp=document.createElement('div');
      daeexp.style.fontSize="10px";
      daeexp.style.color="red";
      daeexp.style.animation="messageanim infinite 2s"
      daeexp.style.marginBottom="10px";
      daeexp.innerText="대댓글 달기";
    
      portrait.addEventListener("click",function(){
        var frogs=document.getElementsByClassName("frogs");
        for(var i=0; i<frogs.length;i++){
          
          frogs[i].innerHTML="대댓굴 작성 취소";

          frogs[i].style.fontSize="20px";

          frogs[i].style.cursor="pointer";

        
         
        }
        
        window.setTimeout(function(){;window.scrollTo({top:frogs[0].offsetTop,left:0,behavior:'smooth'});},100);
        document.getElementById('ct').innerText = '대댓굴 작성하기'
        document.getElementById('cbtn').setAttribute('bc',comment.id);
        
      });
     
    var user=document.createElement('div');
     user.style.float="top";
     user.style.marginLeft="0";
     if(comment.commenter_id==userid){
       user.style.color="skyblue";
     }
     user.innerText=(i+1)+"번째 댓굴이 "+comment.name;
     commentdiv.style.borderRight="solid white 1px";
     commentdiv.style.borderLeft="solid white 1px";
     commentdiv.style.borderBottom="solid white 1px";
    
    
     var date=document.createElement('div');
     date.style.float="top";
     date.style.color="gray";
     date.style.fontSize="15px";
     date.innerText=comment.created_at;
     var cdiv=document.createElement('div');
     cdiv.style.marginLeft="0";
     cdiv.style.width="100%";
     cdiv.style.paddingBottom="15px";
    
     var cContent=document.createElement('textarea');
     cContent.style.resize="none";
     cContent.style.backgroundColor=colorcode[i%7];
     cContent.readOnly=true;
     cContent.style.width="80%";
     cContent.style.float="top";
     cContent.style.height="30px";
     
     cContent.setAttribute("c_id",comment.id);
     cContent.setAttribute("id","ct"+comment.id);
     cContent.setAttribute("userid",comment.commenter_id);
     cContent.innerText=comment.comment;
     
     cdiv.appendChild(cContent);
     var div=document.createElement('div');
     var ids=comment.id;
    var length=document.createElement('div');
    length.style.marginLeft="0";
    var lengthspan=document.createElement('span');
    length.appendChild(lengthspan);
    lengthspan.setAttribute('id',"length"+ids);
    console.log(comment.commenter_id+'/'+userid);
    var ac=document.createElement('button');
   
     if(comment.commenter_id==userid){
      
      div.style.float="top";
      div.style.marginLeft="0";
      var cr =document.createElement('button');
      
      cr.style.color='white';
      cr.innerText="수정";
      cr.addEventListener('click',async function(){
        $(`#ct${ids}`).on("propertychange change keyup paste input", function(){
          if($(this).val().length>80){
            $(`#length${ids}`).css({color:"red"});
          }else{
              $(`#length${ids}`).css({color:"white"});
          }
          $(`#length${ids}`).text($(this).val().length+"/80");
        
    }); var oricolor=cContent.style.backgroundColor;
        cContent.style.backgroundColor="white";
        while ( div.hasChildNodes() )
        { await div.removeChild( div.firstChild ); }

        var crbtn =document.createElement('button');
        crbtn.style.color='white';
        crbtn.innerText="확인";
        cContent.readOnly=false;
       
        cContent.focus();
        div.appendChild(crbtn);
        crbtn.addEventListener('click',async function(){
          var comment=cContent.value;
          if(comment.length>80){
            return alert("80자를 넘었습니다.");
          }
       
          var res=await axios.post("/post/cr",{comment,ids});
          if(res.data.success=="y"){
            while ( div.hasChildNodes() )
            { await div.removeChild( div.firstChild ); }
            div.appendChild(cr);
            div.appendChild(cd);
        
            date.innerText=res.data.date;
            cContent.readOnly=true;
            cContent.style.backgroundColor=oricolor;
            $(`#length${ids}`).text("");
          }else{
            return alert("수정에 실패하였습니다.다시 시도해주세요.");
          }
        })
      });
      
      var cd=document.createElement('button');
        cd.style.color="white";
        cd.innerText="삭제";
        
        cd.addEventListener('click',async function(){
        did=comment.id;  
          var res=await axios.post('/post/cd',{did});
        if(res.data.succes=="y"){
          return getComment(id,name,userid);
        }else{
          return alert("삭제에 실패하였습니다.다시 시도해주세요.");
        }})
        
        div.appendChild(cr);
        div.appendChild(cd);
        
     }
     i++;
    
     parentcdiv.appendChild(portrait);
     parentcdiv.appendChild(daeexp);
     parentcdiv.appendChild(user);
     parentcdiv.appendChild(date);
     parentcdiv.appendChild(cdiv);
     parentcdiv.appendChild(length);
     if(comment.commenter_id==userid){
      parentcdiv.appendChild(div);
     }
     parentcdiv.appendChild(detailsdiv);
     commentdiv.appendChild(parentcdiv);

    
    });

   
  if(Comment.bc!=undefined)
    await Comment.bc.map(function(comment){
      var parentcdiv=document.createElement('div');  
      parentcdiv.style.width="100%";
      parentcdiv.setAttribute('parentid',comment.id);
      parentcdiv.setAttribute('class',"parent");
      parentcdiv.style.backgroundColor="rgba(0,0,0,0.5)";
      var ff =document.createElement('img');
      ff.setAttribute('src','imgs/?name=ff.png');
      
      var portrait=document.createElement('img');
      portrait.setAttribute('src',"imgs/?name=tadpole.gif");
     
      portrait.style.backgroundColor="gray";
      portrait.style.border="white 1px solid";
      portrait.style.marginTop="40px";
      portrait.style.cursor="pointer";
      portrait.title="대댓글 달기";
      var daeexp=document.createElement('div');
      daeexp.style.fontSize="10px";
      daeexp.style.color="red";
      daeexp.style.animation="messageanim infinite 2s"
      daeexp.style.marginBottom="10px";
      daeexp.innerText="대댓글 달기";
      dontbc=document.getElementById('cancle');
      portrait.addEventListener("click", function(){
        var frogs=document.getElementsByClassName("frogs");
        
     
        for(var i=0; i<frogs.length;i++){
          frogs[i].innerText="대댓굴 작성 취소";
          frogs[i].style.fontSize="20px";
          frogs[i].style.cursor="pointer";
          
        }
        document.getElementById('ct').innerText = '대댓굴 작성하기'
        document.getElementById('cbtn').setAttribute('bc',comment.id);
        
       
        window.setTimeout(function(){  window.scrollTo({top:frogs[0].offsetTop,left:0,behavior:'smooth'});},100);
      
      });

   
    var user=document.createElement('div');
     user.style.float="top";
     user.style.marginLeft="0";
     user.style.fontSize="15px";
     if(comment.commenter_id==userid){
       user.style.color="skyblue";
     }
     user.innerText="애기 댓굴이 "+comment.name;
     commentdiv.style.borderRight="solid white 1px";
     commentdiv.style.borderLeft="solid white 1px";
     commentdiv.style.borderBottom="solid white 1px";
    
    
     var date=document.createElement('div');
     date.style.float="top";
     date.style.color="gray";
     date.style.fontSize="15px";
     date.innerText=comment.created_at;
     var cdiv=document.createElement('div');
     cdiv.style.marginLeft="0";
     cdiv.style.width="100%";
     cdiv.style.paddingBottom="15px";
    
     var cContent=document.createElement('textarea');
     cContent.style.resize="none";
     cContent.style.backgroundColor="rgb(188, 228, 223 )";
     cContent.readOnly=true;
     cContent.style.width="80%";
     cContent.style.float="top";
     cContent.style.height="30px";
     
     cContent.setAttribute("c_id",comment.id);
     cContent.setAttribute("id","ct"+comment.id);
     cContent.setAttribute("userid",comment.commenter_id);
     cContent.innerText=comment.comment;
     cdiv.appendChild(ff);
     cdiv.appendChild(cContent);
     var div=document.createElement('div');
     var ids=comment.id;
    var length=document.createElement('div');
    length.style.marginLeft="0";
    var lengthspan=document.createElement('span');
    length.appendChild(lengthspan);
    lengthspan.setAttribute('id',"length"+ids);
    console.log(comment.commenter_id+'/'+userid);
    var ac=document.createElement('button');
   
     if(comment.commenter_id==userid){
      
      div.style.float="top";
      div.style.marginLeft="0";
      var cr =document.createElement('button');
      
      cr.style.color='white';
      cr.innerText="수정";
      cr.addEventListener('click',async function(){
        $(`#ct${ids}`).on("propertychange change keyup paste input", function(){
          if($(this).val().length>80){
            $(`#length${ids}`).css({color:"red"});
          }else{
              $(`#length${ids}`).css({color:"white"});
          }
          $(`#length${ids}`).text($(this).val().length+"/80");
        
    }); var oricolor=cContent.style.backgroundColor;
        cContent.style.backgroundColor="white";
        while ( div.hasChildNodes() )
        { await div.removeChild( div.firstChild ); }

        var crbtn =document.createElement('button');
        crbtn.style.color='white';
        crbtn.innerText="확인";
        cContent.readOnly=false;
       
        cContent.focus();
        div.appendChild(crbtn);
        crbtn.addEventListener('click',async function(){
          var comment=cContent.value;
          if(comment.length>80){
            return alert("80자를 넘었습니다.");
          }
       
          var res=await axios.post("/post/cr",{comment,ids});
          if(res.data.success=="y"){
            while ( div.hasChildNodes() )
            { await div.removeChild( div.firstChild ); }
            div.appendChild(cr);
            div.appendChild(cd);
        
            date.innerText=res.data.date;
            cContent.readOnly=true;
            cContent.style.backgroundColor=oricolor;
            $(`#length${ids}`).text("");
          }else{
            return alert("수정에 실패하였습니다.다시 시도해주세요.");
          }
        })
      });
      
      var cd=document.createElement('button');
        cd.style.color="white";
        cd.innerText="삭제";
        
        cd.addEventListener('click',async function(){
        did=comment.id;  
          var res=await axios.post('/post/cd',{did});
        if(res.data.succes=="y"){
          return getComment(id,name,userid);
        }else{
          return alert("삭제에 실패하였습니다.다시 시도해주세요.");
        }})
        
        div.appendChild(cr);
        div.appendChild(cd);
       
     }
     i++;
    
     parentcdiv.appendChild(portrait);
     parentcdiv.appendChild(daeexp);
     parentcdiv.appendChild(user);
     parentcdiv.appendChild(date);
     parentcdiv.appendChild(cdiv);
     parentcdiv.appendChild(length);
     if(comment.commenter_id==userid){
      parentcdiv.appendChild(div);
     }
     
     var parent=document.getElementsByClassName("parent");
     for(var i=0;i<parent.length;i++){
       if(parent[i].getAttribute('parentid')==comment.babycomment){
        
        return parent[i].appendChild(parentcdiv);
       }
     }
     });
     
}

function cancleBabyc(obj){
  dontBc=obj;
  if(obj.innerText=="대댓굴 작성 취소"){
    document.getElementById('cbtn').setAttribute('bc',0);
    var frogs=document.getElementsByClassName("frogs");
    for(var i=0; i<frogs.length;i++){
      frogs[i].innerText="댓굴 작성";  
      frogs[i].addEventListener("click",null);    
    }
    
    document.getElementById('ct').innerText = '댓글작성'
  }else{

  }
 

}
function sendIO(){
  const socket=io.connect('http://localhost:')

}
function chatOn(){
  const chatDiv=document.getElementById('chatContainer');
  chatDiv.style.display="";
}