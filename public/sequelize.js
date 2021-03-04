var index=document.getElementsByClassName('index');



async function getIndex(i){
    try{
    var id =i.getAttribute('id')
        
      var res= await axios.get(`/index/?index=${id}`);
       console.log(res);
       
       var nPage=res.data.list;
        var jipsaSay=document.getElementById('message');
        jipsaSay.innerText= "현재페이지는 \n"+nPage[res.data.index]+'입니다';
      $(document).ready(function(){
        $("#content").load('/'+res.data.url);
     });
      
      
    }catch(err){
        console.error(err);
    }
}
function goGit(){
  window.open('https://github.com/uuuu66/','__blank');
}


for(var i=0;i<index.length;i++){
    index[i].addEventListener('click',getIndex(index[i]));
}