// globalThis.ex_anouseAliasName = Users.anouseAliasName;
// globalThis.ex_RTCConnection = RTCConnection;

//console.log(navigator.mediaDevices.enumerateDevices());
var gl_mediaDevices = null;
navigator.mediaDevices.enumerateDevices().then(mediaObtained => {
   gl_mediaDevices = mediaObtained;  // dont confuse it with with getUserMedia !!
    console.log("mediaDevices:", mediaObtained);
});

// Event handlers

window.addEventListener('resize', Frontend.setDefaultLayoutForMobile);
//window.visualViewport.onresize = function(ee) {  console.log(" ooon reziize :", ee); };

document.addEventListener('DOMContentLoaded', () => {
  
  //let name = Users.getCookie('username');     ..moved to event on socketopen..sooner it wont send andy login anywhere  !!
  // Users.userLogin(name);
       
  Frontend.setDefaultLayoutForMobile();
  // why is the body style adjustment here ??? ...since it is declared in styleshit.. 
  // document.body.style.display = 'grid';
});

function defineTabID() {
  var iPageTabID = sessionStorage.getItem("tabID");
  // if it is the first time that this page is loaded
  if (iPageTabID == null) {
    var iLocalTabID = localStorage.getItem("tabID");
    // if tabID is not yet defined in localStorage it is initialized to 1
    // else tabId counter is increment by 1
    var iPageTabID = (iLocalTabID == null) ? 1 : Number(iLocalTabID) + 1;
    // new computed value are saved in localStorage and in sessionStorage
    localStorage.setItem("tabID", iPageTabID);
    sessionStorage.setItem("tabID", iPageTabID);
  }
}

const loginunderAliasBut = document.querySelector('#loginAliasBut');    
loginunderAliasBut.addEventListener('click', Users.LoginSubmitButonEvent);

var logOutundAliasBut = document.querySelector('#logOutAliasBut');    
logOutundAliasBut.addEventListener('click', Users.LogOutSubmitButonEvent);

var singlerMsgendbut = document.querySelector('#singlemsgsendbut');    
singlerMsgendbut.addEventListener('click', Chatroom.onSendMSGtoSelectedUsers);

const initBtn = document.querySelector('#init_vid_btn');
//initBtn.addEventListener('click', RTCConnection.init);
initBtn.addEventListener('click', (event)=>{
event.preventDefault();  
//RTCConnection.init(event);     // ...just for now comented out..testing exploring..
startLocalStreams();
});

const callBtn = document.querySelector('#call_btn');    
//callBtn.addEventListener('click', RTCConnection.call);
callBtn.addEventListener('click', (e) => {
//RTCConnection.call();   // ..temporialy disabled..
halooCaal(e);
});

const hangupBtn = document.querySelector('#hangup_btn');
//hangupBtn.addEventListener('click', RTCConnection.hangTheFuckingFooneEndCaal);    // bypased for now..
hangupBtn.addEventListener('click', (event) =>{ 
   event.preventDefault();
   halooHang(event);
   //MDNrtc.hangUpCall();
}); 

const brodcastBtn = document.querySelector('#brodcastbut');    
brodcastBtn.addEventListener('click', Chatroom.hitTheTXTbrodcast);

const msgBox = document.querySelector('#message_input');
msgBox.addEventListener('keydown', (e) => {
  if (e.keyCode === 13) 
   {
      if(gl_lastSelectedUsers.length > 0)
      {
         SendMSGtoSelectedUsers(e);
      }
      else
         Chatroom.hitTheTXTbrodcast(e);
   }
});

const clearHistoryBtn = document.querySelector('#clearHistoryBtn');
clearHistoryBtn.addEventListener('click', Chatroom.clearChatHistory);

const tabMenu = document.getElementById('responsive_menu');
tabMenu.addEventListener('click', Frontend.expandSectionViaButton);




// the link for confirming security exeption will be better generaten based on current location
// following assuming we will be always on https !! ...as more than one part of this thing wont work without https 
//(amongst other is the browser acces to camera and microphone)
// "wss://127.0.0.1:9995/kunda" >> there fore >> "https://127.0.0.1:9995/kunda"; 
setTimeout(() => {
   var curentAdressAndPort = location.host;
   if(curentAdressAndPort && curentAdressAndPort != "")
   {
      var criticalUraloval = document.getElementById("criticalUrl_1");
      if(criticalUraloval)
      {
         var hostItself = curentAdressAndPort.split(":")[0];
         if(!globalThis.gl_wsock_port)gl_wsock_port = 9995;
         var targetpseudoUral = `https://${hostItself}:${gl_wsock_port}/kunda`;
         criticalUraloval.href = targetpseudoUral;
      }
   }
}, 100);







