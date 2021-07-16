
async function cyphers(){
    var doc=window.document;
   var username=doc.getElementById('username').value;
   var dv=doc.getElementById('detailview');
   while ( dv.hasChildNodes() ) 
    {    await dv.removeChild( dv.firstChild ); }
   var tablen=doc.getElementById('tablen');
    while ( tablen.hasChildNodes() ) 
    {    await tablen.removeChild( tablen.firstChild ); }
    var tablel=doc.getElementById('tablel');
    while ( tablel.hasChildNodes() ) 
   {  tablel.removeChild( tablel.firstChild ); }
   var tablew=doc.getElementById('tablew');
   while ( tablew.hasChildNodes() ) 
   {  tablew.removeChild( tablew.firstChild ); }
   var tablem=doc.getElementById('mvp');
   while ( tablem.hasChildNodes() ) 
   {  tablem.removeChild( tablem.firstChild ); }
   console.log(username);
    var res =await axios.post("/lab/cyphers",{username});
    var msg=doc.getElementById("messageOfcy");
    var psg=doc.getElementById("partysummary");
     msg.innerHTML="닉네임:"+res.data.nick +"<br>"+"급수:"+res.data.level;
     if(res.data.level>70){
         msg.innerHTML+= "<span style='color:pink'> <<<<--샆창! </span>"
     }
     msg.innerHTML+="<br>"+"공식전 승률: "+res.data.officialWinrate+"("+res.data.officialWincount+"/"+res.data.officialGame+")"+"<br>일반전 승률: "+res.data.normalWinrate+"("+res.data.normalWincount+"/"+res.data.normalGame+")";
     psg.innerText='파티 분석 (부제: 어느 놈들이랑 해야 이길까?!)';

     var mss=doc.getElementById('messageOfsy');
     mss.innerText="세부 분석";
     var partys=res.data.partys;
     var partyMembers=res.data.partyMembers;
     partyMembers=sortobj(partyMembers);
     
        var nr1=doc.createElement('tr');
        var nr=doc.createElement('td');
        nr.setAttribute('class',"titles");
        nr.setAttribute('colspan',4);
        nr.innerText="자주하는 파티원";
        nr1.appendChild(nr);
        var nr2=doc.createElement('tr');

        var nd1=doc.createElement('td');
        nd1.style.columnSpan=1;
        nd1.innerText="순위";
        var nd2=doc.createElement('td');
        nd2.style.columnSpan=3;
        nd2.innerText='플레이어';
        nr2.appendChild(nd1);
        nr2.appendChild(nd2)
        tablen.appendChild(nr1);
        tablen.appendChild(nr2);
     
     var nr1=doc.createElement('tr');
     var nr=doc.createElement('td');
     nr.setAttribute('class',"titles");
     nr.setAttribute('colspan',4);
     nr.innerText="승리하는 파티";
     nr1.appendChild(nr);
     var nr2=doc.createElement('tr');

     var nd1=doc.createElement('td');
     nd1.style.columnSpan=1;
     nd1.innerText="순위";
     var nd2=doc.createElement('td');
     nd2.style.columnSpan=3;
     nd2.innerText='플레이어';
     nr2.appendChild(nd1);
     nr2.appendChild(nd2)
     tablew.appendChild(nr1);
     tablew.appendChild(nr2);
   
    
     var nr1=doc.createElement('tr');
     var nr=doc.createElement('td');
     nr.setAttribute('class',"titles");
     nr.setAttribute('colspan',4);
     nr.innerText="패배하는 파티";
     nr1.appendChild(nr);
     var nr2=doc.createElement('tr');

     var nd1=doc.createElement('td');
     nd1.style.columnSpan=1;
     nd1.innerText="순위";
     var nd2=doc.createElement('td');
     nd2.style.columnSpan=3;
     nd2.innerText='플레이어';
     nr2.appendChild(nd1);
     nr2.appendChild(nd2)
     tablel.appendChild(nr1);
     tablel.appendChild(nr2);

      
     var nr1=doc.createElement('tr');
     var nr=doc.createElement('td');
     nr.setAttribute('class',"titles");
     nr.setAttribute('colspan',4);
     nr.innerText="누구랑 해야 이기나 ";
     nr1.appendChild(nr);
     var nr2=doc.createElement('tr');

     var nd1=doc.createElement('td');
     nd1.style.columnSpan=1;
     nd1.innerText="순위";
     var nd2=doc.createElement('td');
     nd2.style.columnSpan=3;
     nd2.innerText='플레이어';
     nr2.appendChild(nd1);
     nr2.appendChild(nd2)
     tablem.appendChild(nr1);
     tablem.appendChild(nr2);


     for(var i=0;i<partyMembers.length;i++){
        var r=doc.createElement('tr');

        var s=doc.createElement('td');
        s.innerText=i+1;
        var n=doc.createElement("td");
        n.style.columnSpan=3;
        n.innerHTML=partyMembers[i][0]+"<strong style='color:black'>("+partyMembers[i][1]+")회 플레이</strong>";
        r.appendChild(s);
        r.appendChild(n);
        r.setAttribute('class',"rise");
        tablen.appendChild(r);
     }


     var partysWinrate=res.data.partysWinrate;
     var partyWins=res.data.partysWin;
     var winners=Object.keys(partysWinrate);
     for(var i=0;i<winners.length;i++){
         if(partyWins[winners[i]]==undefined){
             partyWins[winners[i]]=0;
         }
     }
    
    partysWinrate=sortobj(partysWinrate);
      
    for(var i=0;i<partysWinrate.length;i++){
       
        var r=doc.createElement('tr');

        var s=doc.createElement('td');
        s.innerText=i+1;
        var n=doc.createElement("td");
        n.style.columnSpan=3;
        n.innerHTML=partysWinrate[i][0]+"<strong style='color:black'>("+partysWinrate[i][1]+"%)</strong>"+"<br><span style='color:pink'>"+partyWins[partysWinrate[i][0]]+"/"+partys[partysWinrate[i][0]]+"회</span>";
        r.appendChild(s);
        r.appendChild(n);
        r.setAttribute('class',"rise");
        tablew.appendChild(r);
     }

     var partysLoserate=res.data.partysLoserate;

     partysLoserate=sortobj(partysLoserate);
     
     for(var i=0;i<partysLoserate.length;i++){
        var r=doc.createElement('tr');

        var s=doc.createElement('td');
        s.innerText=i+1;
        var n=doc.createElement("td");
        n.innerHTML=partysLoserate[i][0]+"<strong style='color:black'>("+partysLoserate[i][1]+"%)</storng>"+"<br><span style='color:pink'>"+(partys[partysLoserate[i][0]]-partyWins[partysLoserate[i][0]])+"/"+partys[partysLoserate[i][0]]+"회</span>";
        r.appendChild(s);
        r.appendChild(n);
        r.setAttribute('class',"rise");
        tablel.appendChild(r);
     }

     tablel.style.display='';
     tablen.style.display='';
     tablew.style.display='';
     tablem.style.display='';
      var  partysWins= Object.entries(partyWins);
     partysWins=new Map(partysWins);
     var heroes=new Map(partyMembers);
     for(key of heroes.keys()){
       
       heroes.set(key,0);
     }
    heroes.set('혼자서 쓸쓸하게 솔플하기',0);
     for(keya of partysWins.keys()){
        var x= keya.split('/');
     
        x.map(function(name){
         if(name==''){
             
         }
            if(partysWins.get(keya)>0){
            
            for(key of heroes.keys()){
               
                if(name==key){
                    
                    var value=heroes.get(name);
                    var addvalue=partysWins.get(keya);
                    heroes.set(name,value+addvalue);
                }
             }
            }
        });
            
        
     }
   

    
     var  mems= Object.fromEntries(partyMembers);
     
     mems=new Map(Object.entries(mems));
   
     for(key of heroes.keys()){
         if(key=="혼자서 쓸쓸하게 솔플하기"){
             for(var i=0;i<partysWinrate.length;i++){
                 if(partysWinrate[i][0]==key){
                    var winrate=partysWinrate[i][1];
                 }
             }        
         }else{
       
            var winrate=heroes.get(key)/mems.get(key)*100;
         }
        heroes.set(key,winrate);
    }
    
    
    rheroes=Object.fromEntries(heroes);
    rheroes=sortobj(rheroes);
    
    heroes=new Map(Object.entries(rheroes));

    for(key of heroes.keys()){
        var r=doc.createElement('tr');
        var value=heroes.get(key);
        var a=String(value).split(',');
        var s=doc.createElement('td');
        s.innerText=parseInt(key)+1;
        var n=doc.createElement("td");
        n.innerHTML="<strong style='color:black'>  "+a[0]+"</spam>"+"<br><span>"+a[1]+"%</span>";
        r.setAttribute('class',"rise");
        r.appendChild(s);
        r.appendChild(n);
        
        tablem.appendChild(r);
       
     }
     var divs = doc.getElementsByClassName('rise');

        for(var i =0; i < divs.length; i++){
        divs[i].style.background = getRandomColor();
        }
        
        var sm=doc.getElementById('detailsum');
        var fm=doc.getElementById('detailtitle');
        var wp=res.data.winPartiesposition;
        for(key of Object.keys(wp)){
            var div=doc.createElement('div');
            fm.innerHTML="이겼던 파티 포지션보기(부제: 너가 탱커하면 이기잔아!)"
            sm.innerHTML="궁금한 파티를 클릭하면 각자 어떠한 포지션을 몇번 맡았는지 확인할 수 있습니다<br>(시간이 좀 걸립니다.)";
            div.setAttribute('id',key);
            div.setAttribute('class',"partys");
            div.innerText=key;
            var table=doc.createElement('table');
            table.setAttribute('id',key+"t")
            div.setAttribute('onclick',`sendteam("${username}","${key}",this)`);
            dv.appendChild(div);
            div.appendChild(table);
        }
    }
   async function sendteam(username,key,object){
       try{
           var doc=window.document;
           var bgdiv=doc.getElementById('bgdiv');
           
           

           bgdiv.style.display="block";
           var ori=object.innerText;
        
        
           var res=await axios.post('/lab/cyphers/?team=yes',{username,key});
         
           if(res.data.y=='y'){
            object.setAttribute('onclick',null);
               bgdiv.style.display="none";
               object.innerText=ori;
               var partyinfo=res.data.GamePosition;   
               var keys=Object.keys(partyinfo);
               var table=doc.getElementById(key);
                table.style.cursor="none";
               for(var i=0;i<keys.length;i++){
               var td3=doc.createElement('h3');
   
               var td4=doc.createElement('h4')
                   
               td3.innerHTML=keys[i];
               td4.innerText=partyinfo[keys[i]];
            
               table.appendChild(td3);
               table.appendChild(td4);
               }
               
           }else{
            bgdiv.style.display="none";
            var table=doc.getElementById(key);
            var td3=doc.createElement('h3');
            td3.innerHTML="예상치 못한 문제로 실패햇어요 ㅠㅠ";
           }
           
            
            
       }catch(err){

       }
   }
    function sortobj(testobj){
    let sortobj = [];
    
   
    for (let number in testobj) {
        if(testobj[number]==null){
          testobj[number]=0;  
        }
      sortobj.push([number, testobj[number]]);
    }
    sortobj.sort(function(a, b) {
        if(a[0]==''){
            a[0]="혼자서 쓸쓸하게 솔플하기"
        }
     
      return b[1]-a[1];
    });
    return sortobj
    }
    
    function getRandomColor() {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    function nopogi(){
        var doc=window.document;
        var div=doc.createElement('div');
        var bgdiv=doc.getElementById('bgdiv');
        bgdiv.appendChild(div);
         div.setAttribute('class',"nopogi");
        div.style.top=Math.floor(Math.random()*100)+"%";
        
        div.style.left=Math.floor(Math.random()*100)+"%";
        
       
        setTimeout(function(){div.remove();},500);
    }
   