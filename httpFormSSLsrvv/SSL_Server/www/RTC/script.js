// globalThis.ex_anouseAliasName = Users.anouseAliasName;
// globalThis.ex_RTCConnection = RTCConnection;

//console.log(navigator.mediaDevices.enumerateDevices());
navigator.mediaDevices.enumerateDevices().then(mediaObtained => {
    console.log("mediaDevices:", mediaObtained);
});

// Event handlers

window.addEventListener('resize', Frontend.setDefaultLayoutForMobile);

document.addEventListener('DOMContentLoaded', () => {
  let name = Users.getCookie('username');
  Users.userLogin(name);

  Frontend.setDefaultLayoutForMobile();
  document.body.style.display = 'grid';
});

const loginunderAliasBut = document.querySelector('#loginAliasBut');    
loginunderAliasBut.addEventListener('click', Users.LoginSubmitButonEvent);

var logOutundAliasBut = document.querySelector('#logOutAliasBut');    
logOutundAliasBut.addEventListener('click', Users.LogOutSubmitButonEvent);

var singlerMsgendbut = document.querySelector('#singlemsgsendbut');    
singlerMsgendbut.addEventListener('click', Chatroom.onSendMSGtoSelectedUsers);

const initBtn = document.querySelector('#init_vid_btn');
initBtn.addEventListener('click', RTCConnection.init);

const callBtn = document.querySelector('#call_btn');    
callBtn.addEventListener('click', RTCConnection.call);

const hangupBtn = document.querySelector('#hangup_btn');
hangupBtn.addEventListener('click', RTCConnection.hangTheFuckingFooneEndCaal);

const brodcastBtn = document.querySelector('#brodcastbut');    
brodcastBtn.addEventListener('click', Chatroom.hitTheTXTbrodcast);

const msgBox = document.querySelector('#message_input');
msgBox.addEventListener('keydown', (e) => {
  if (e.keyCode === 13) Chatroom.hitTheTXTbrodcast(e);
})

const clearHistoryBtn = document.querySelector('#clearHistoryBtn');
clearHistoryBtn.addEventListener('click', Chatroom.clearChatHistory);

const tabMenu = document.getElementById('responsive_menu');
tabMenu.addEventListener('click', Frontend.expandSectionViaButton);









