


function RometoNum(Num){
    var result=0;

 
    
    for(var i=0;i<Num.length;i++){
        if(Convert(Num[i])>Convert(Num[i+1])){
           
           result+=Convert(Num[i]);
        }else if(Convert(Num[i])==Convert(Num[i+1])){
         
            result+=Convert(Num[i]);
        }else if(Convert(Num[i])<Convert(Num[i+1])){
            
            result+=(Convert(Num[i+1])-Convert(Num[i]));
            i+=1;
        }else{
            result+=Convert(Num[i]);
        }
    }

    return result;
}

function Convert(x){
    if(x=='M'||x=='m')
    return 1000;
    
    if(x=='D'||x=='d')
    return 500;
    
    if(x=='C'||x=='c')
    return 100;
    
    if(x=='L')
    return 50;
    
    if(x=='X'||x=='x')
    return 10;
    
    if(x=='V'||x=='v')
    return 5;
    
    if(x=='1'||x=='I'||x=='i'||x=='l')
    return 1;

}


function ator(){
    var value=document.getElementsByName("ator");
    var res=NumtoRome(value[0].value);
    var result=document.getElementsByName("res");
   
    return  result[0].innerHTML=value[0].value +" -> " + res;
}
function rtoa(){
    var value=document.getElementsByName("rtoa");
 
    var res=RometoNum(value[0].value);
  
    var result=document.getElementsByName("res");
    
    return result[0].innerHTML=value[0].value +" -> " + res;
}

function NumtoRome(testArrayEle,result){
    
    if(result===undefined){
        result='';
    }
    
    var numlength=testArrayEle.toString().length;
    var divnum="1";
    for(var i=0;i<numlength-1;i++){
        divnum+="0";
    }
    if(Math.floor(testArrayEle/divnum)==9){
        console.log("구"+numlength);
        switch(numlength){
           
            case 3:        
                result=result+"CM";
                break;     
            case 2:
                result=result+'XC';
            break;    
            case 1:
                result=result+'lX';
            break; 
        }
       
    }
    else if(Math.floor(testArrayEle/divnum)==5){
        console.log("오"+numlength);
        switch(numlength){ 
            case 3:
                result=result+'D';
            break;
            case 2:
                result=result+'L';
            break;
               
            case 1:
                result=result+'V';
            break;
        }
    }else if(Math.floor(testArrayEle/divnum)==4){
        console.log("사"+numlength);
        switch(numlength){
          
            case 3:
                result=result+'CD';
            break;
                
            case 2:
                result=result+'XL';
            break;
            
            case 1:
                result=result+'lV';
            break;   
        }
    }else{  
        for(var i=0;i<Math.floor(testArrayEle/divnum);i++){
        console.log("기본"+numlength);
        switch(numlength){  
            case 4:
                result=result+'M';        
            break;
            case 3:
                result=result+'C';
            break;
            case 2:
                result=result+'X';
            break;
            case 1:
                result=result+'l';
            break;
        }
    }
    }
    console.log(result);
    testArrayEle%=divnum;
    console.log(testArrayEle);
    if(testArrayEle==0){
       
        const res=result;
      
        return res;
     }
     else{
      return NumtoRome(testArrayEle,result);
     }
}
function checknom(){
    var value=document.getElementsByName("number");
 
    var res=numTomun(value[0].value);
    var result=document.getElementsByName("res");
    if(res=="yes"){
        return result[0].innerHTML="yes";
    }else{
        return  result[0].innerHTML="no";
    }
  
}
function numTomun(num){
   
    if(num.toString()[0]=='-'){
       return "no";
    }
    
    var strLen=num.toString().length;
    var Leftnum =num.toString().substring(0,Math.floor(strLen/2));

    var Rightnum=num.toString().substring(strLen-Math.floor(strLen/2),strLen);
   
    Rightnum=Rightnum.split("").reverse().join("");
    if(Rightnum==Leftnum)
    return "yes";
    else
    return "no";

}

console.log(numTomun(123321));
