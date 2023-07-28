// function save(){
//     console.log("clicked from onclick");
// }

//using event listener

const inpBtn=document.getElementById('inp_btn');

const inp=document.getElementById('inp');

const ul=document.getElementById('ul');

const delBtn=document.getElementById("del_btn");

const tabBtn=document.getElementById('tab');


let data=[];

let index=0;

//localStorage store data in the form of key value pairs


//localStorage.setItem("name","Shubham Mishra");

//an event listener functionality always wrap inside double quotaion "click"  REMEMBER THIS

inpBtn.addEventListener('click',()=>{
    
    if(inp.value!=""){
    
     if(index==0 || (index>0 && inp.value!=data[index-1])){   
          
        data.push(inp.value);

        localStorage.setItem("AllData",JSON.stringify(data));

     }

    }

   // console.log("clicked fron event Listener");
   
   data=JSON.parse(localStorage.getItem("AllData"));

    console.log(data);

    ShowAllData(data);
})


//deleting all url for a DOUBLE CLICK  

delBtn.addEventListener("dblclick",()=>{

   localStorage.clear("AllData");
   data=[];
   index=0;
   console.log("Double clicked");
   listItems="";
   ShowAllData(data);

});


//saving current tab

tabBtn.addEventListener("click",()=>{

  chrome.tabs.query({active:true,currentWindow:true},(tabs)=>{
        
    data.push(tabs[0].url);

    localStorage.setItem("AllData",JSON.stringify(data));

    ShowAllData(data);


  })

});



let listItems="";


function ShowAllData(data){

    

    for(;index<data.length;index++){
        //console.log(data[i]);
           
        //listItems+="<li><a target='_blank' href="+data[index]+">"+data[index]+"</a></li>";

        //using template string

        listItems+=`<li><a target='_blank' href='${data[index]}'>${data[index]}</a></li>`

    }
    ul.innerHTML=listItems;

}


ShowAllData(JSON.parse(localStorage.getItem("AllData")));

