const Chatroom = new function() {
  // trigered by broadcast button
  // prevent form submiting.. 
  // colect text from box
  this.hitTheTXTbrodcast = async function(e)
  {
    e.preventDefault();
    var inputTXTbox = document.querySelector('#message_input');

    WsbroadcastBullshitToAllOthers(inputTXTbox.value); 

    inputTXTbox.value = ''; 
  }

  this.clearChatHistory = function(e) {
    e.preventDefault();
    var slanderWallOfShame = document.querySelector("#podium_inner_common_table tbody");
    if(slanderWallOfShame)
    slanderWallOfShame.innerHTML ="";
  }

  this.onSendMSGtoSelectedUsers = async function(e)
  {
    e.preventDefault();
    SendMSGtoSelectedUsers(e);
  }

}