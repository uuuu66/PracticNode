function clickStartButton(){
    var backgrounddiv=document.getElementById('bgdiv');
    var movingdiv=document.getElementById('movingdiv');
    
  
 
   
        backgrounddiv.style.display="block";
        movingdiv.style.display="table";
        
}
function cancleDiv(){
    var backgrounddiv=document.getElementById('bgdiv');
    var movingdiv=document.getElementById('movingdiv');
        backgrounddiv.style.display="none";
        movingdiv.style.display="none";
    
}
function dragElement(elmnt) 
{ 
    var x=document.getElementById('x');
    var y=document.getElementById('y');
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
     elmnt.onmousedown = dragMouseDown;
      function dragMouseDown(e) 
      { e = e || window.event;
         e.preventDefault(); 
         pos3 = e.clientX; 
         pos4 = e.clientY; 
         document.onmouseup = closeDragElement; 
         document.onmousemove = elementDrag; } 
    function elementDrag(e)
    { e = e || window.event;
         e.preventDefault();
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
           pos3 = e.clientX; 
           pos4 = e.clientY; 
           elmnt.style.top = (elmnt.offsetTop - pos2) + "px"; 
           elmnt.style.left = (elmnt.offsetLeft - pos1) + "px"; 
           x.innerText=e.clientX;
           y.innerText=e.clientY;
        } 
    function closeDragElement()     
    { document.onmouseup = null; 
    document.onmousemove = null;
  
} 
   
}

dragElement(document.getElementById("movingdiv"));

