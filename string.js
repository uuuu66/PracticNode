



function check(o){
    console.log("원본"+o);
    var i=0;
        if(pop(o,i)=="}"||pop(o,i)=="]"||pop(o,i)==")"){
              var d=0;
             
            while(true){
                d+=1;  
                console.log(i+"o="+pop(o,i));
                console.log(d+"d="+pop(o,d)+"\n");
                if(match(pop(o,i),pop(o,d)))
                {  
                
                   o=o.deleteAt(d);
                   console.log(o);
                   o= o.deleteAt(i);
                          
                    console.log("d는"+d+"변신="+o);
                    break;
                }
               
            }
        }
        else{
            return false;
        }
        
    for(var i=0;i<o.length;i++){
       if (o.indexOf("}")||o.indexOf("]")||o.indexOf(")"))
        return check(o);
            else 
           break;
    }
    return true; 
}

String.prototype.deleteAt=function(idx,idx2){
    console.log(idx+'삭제되는것'+this[idx]);
    return this.substr(0,idx)+this.substr(idx+1,this.length);
}
function match(o,d){
    switch(o){
        case '}':if(d=='{')
            return true;
        break;
        case ']':if(d=='[')
            return true;
            break;
        case ')':if(d=='(')
            return true;
            break;
    }
}


function pop(data,i){
    return data[i];
}


function push(data,str,method){

    if(str==undefined||str==null)
       var str='';
    if(method==0) //0이면 스택  1이면 큐
   str=data+str;
   else
    str=str+data;
   return str;
}

function makeQS(str){
   var stack=''
    for(var i=0;i<str.length;i++){
        if(str[i]=="{"||str[i]=="["|| str[i]=="("||str[i]=="}"||str[i]=="]"||str[i]==")")
          stack= push(str[i],stack,0);
    }
    return stack;
}

console.log(check(makeQS("{}{}[(ads)]")));

console.log(check(makeQS(`function push(data,str,method){

    if(str==undefined||str==null)
       var str='';
    if(method==0) //0이면 스택  1이면 큐
   str=data+str;
   else
    str=str+data;
   return str;
}{()}`)));


