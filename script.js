const loader = document.getElementById("loader");
const lockScreen = document.getElementById("lockScreen");
const main = document.getElementById("main");

// Loading Screen
window.onload = function(){

    setTimeout(function(){

        loader.style.display="none";

        lockScreen.style.display="flex";

    },2000);

}

// Secret PIN
const SECRET_PIN = "1926";   // Change this PIN

function checkPin(){

    let pin=document.getElementById("pin").value;

    let msg=document.getElementById("message");

    if(pin===SECRET_PIN){

        lockScreen.style.display="none";

        main.style.display="block";

    }

    else{

        msg.innerHTML="❌ Wrong PIN";

        msg.style.color="yellow";

    }

}

// Start Button

document.getElementById("startBtn").addEventListener("click",()=>{

window.scrollTo({

top:window.innerHeight,

behavior:"smooth"

});


});