// websocket handings...
// in order to work... the browser MUST first attempt open the wss as https to create security expetion ..
// ..like https://127.0.0.1:9995/kunda
"use strict";
// for hearbeat tenis,,
var cipACK = "\x0D\x00\x02\x00\x00";      // "\u000e\u0000\u0002\u0000\u0000"
var cipACKok = "\x0E\x00\x02\x00\x00";
// ..the client is expected to send periodicly the cipACK ...while respons recive cipACKok
var gl_wsock_port = 9995;
var gl_wsock_FullUrl = "wss://127.0.0.1:9995/kunda";     // aka last used uri
var gl_wosock_recconectPeriod = 50000;    // 660000  should be 11 minuts
var gl_masterPeriodicTickPeriod = 93000;
var gl_lastMsgTimeMilisecs = -1;     // every incoming msg is reseted to curent time ..

var gl_autConnect = true; //false;       // uncoment to go for connect when script loaded..
var gl_wosocko = null;

var gl_arrofusers = [];
// when residing on local network ... the hevy negotiating way works... 
// when outside ..eg home, the stepping version works better !!...however DOES NOT COnnect on when on 192.168.166.0/24
var gl_steppingver = true;   
              
              
var gl_lastUsedName = "User name X";
var gl_lastSelectedUsers = [];

const publicStuns = [
    { urls: "stun:stun.l.google.com:19302" },
    { urls: "stun:stun.l.google.com:5349" },
    { urls: "stun:stun1.l.google.com:3478" },
    { urls: "stun:stun1.l.google.com:5349" },
    { urls: "stun:stun2.l.google.com:19302" },
    { urls: "stun:stun2.l.google.com:5349" },
    { urls: "stun:stun3.l.google.com:3478" },
    { urls: "stun:stun3.l.google.com:5349" },
    { urls: "stun:stun4.l.google.com:19302" },
    { urls: "stun:stun4.l.google.com:5349" },
    { urls: "stun:stun.services.mozilla.com"}
];              
        
        
function oreKoKoDaak()
{
var wosoko = new WebSocket(gl_wsock_FullUrl);
globalThis.gl_wosocko = wosoko;
wosoko.onopen = function(hopen){ console.log("wosocko onopen:",hopen); }
wosoko.onerror = function(eler){  console.log("wosocko onerror:",eler); }
wosoko.onclose = function(eler){  console.log("wosocko onclose:",eler); }
wosoko.onmessage = function(mesuge){  console.log("wosocko onmessage:",mesuge); }

if(gl_wosocko.readyState == 1)
wosoko.send("hejhole..")
}



function SStopWSS(forbidAutoReconect)
{
   if(gl_wosocko != null)
   {      
      if(gl_wosocko.readyState < 2)      
        gl_wosocko.close();
    
    if(forbidAutoReconect == true)    
         gl_wosocko = null;      // when null then prepreconect wont act        
   }
   console.log("global websock closed by SStopWSS, beingNulled:", (gl_wosocko == null));
}
// to stop wsuck from autorecon use SStopWSS(true)



function OopenWSS(custoFullWssUriToOveride)
{
   if(gl_wosocko != null)   
     SStopWSS();

   var targetWSurl = "wss://127.0.0.1:9995/kunda";
  
   if(!custoFullWssUriToOveride)
   {
      if(location.href.startsWith("http"))  
      {
          // href can be like  .."https://127.0.0.1:9999/RTC/index.html" ..or "file:///C:/WLOZ...
         var arrOfurlparts = location.href.split("/").filter(jenNeprazdne => jenNeprazdne);
         // at index 1 should be the ip:port ..like 127.0.0.1:9999
         var hostIp = arrOfurlparts[1].split(":")[0];
         var wssOrNot = arrOfurlparts[0].startsWith("https") ? "wss" : "ws"; 
         targetWSurl = `${wssOrNot}://${hostIp}:${gl_wsock_port}/kunda`;  
      }
   }
   else
      targetWSurl = custoFullWssUriToOveride;
   
   globalThis.gl_wsock_FullUrl = targetWSurl; 
   globalThis.gl_wosocko = new WebSocket(targetWSurl);

   globalThis.gl_wosocko.onopen = function(hopen){ Wos_onOpen(hopen); };
   globalThis.gl_wosocko.onerror = function(eler){ Wos_onErr(eler); };
   globalThis.gl_wosocko.onclose = function(closet){ Wos_onClose(closet); }
   globalThis.gl_wosocko.onmessage = function(mesuge){  Wos_onMessage(mesuge); }
}

function Wos_onErr(elerr)
{
   var tensuck = elerr.originalTarget ? elerr.originalTarget : elerr.target;   
   console.log("wosocko Wos_onErr:",elerr, tensuck);
   if(globalThis.sysloginner)
      sysloginner.innerHTML += "err during websocket connect atempt"; 
   // since there is err AND also close event fired when unsucesfull atempt to connect..
   // ... we therefore WILL relly on close event only ...NOT calling recon here ..
   
   //if(tensuck.readyState > 1)
     // prepRecconectWosock();
     
}
function Wos_onClose(closet)
{
   console.log("wosocko Wos_onClose:",closet);
   var connectionStatusElement = document.getElementById("wsconsignal");
   if(connectionStatusElement)
   {
      connectionStatusElement.innerHTML = "Disconected";
      connectionStatusElement.style.backgroundColor = "#f40808cc";
   }
   prepRecconectWosock();
   
   
   // if(Users.anouseAliasName) {
   //    Users.anouseAliasName(false);
   // }
   if(Users.userLogout) Users.userLogout();
}

function Wos_onOpen(hopen)
{
   globalThis.gl_lastMsgTimeMilisecs = Date.now();
   // explicitOriginalTarget , originalTarget, target, srcElement
  // console.log("wosocko Wos_onOpen:", hopen, (hopen.originalTarget ? hopen.originalTarget : hopen.target));
  var passedWsuck = (hopen.originalTarget ? hopen.originalTarget : hopen.target);
  console.log("wosocko Wos_onOpen:", passedWsuck.readyState);
   
   var connectionStatusElement = document.getElementById("wsconsignal");
   if(connectionStatusElement)
   {
      connectionStatusElement.innerHTML = "CONECTED";
      connectionStatusElement.style.backgroundColor = "#adff2fd4";
   }
   
   var historyname = Users.getCookie('username');
   if(historyname != undefined && historyname != null && historyname != "")                  // ..for now ..fuck it ..neew testing more user at tabs
   {
      // for now comented out anyway ...cause is anoying during multiple tab deving debuging testing...
        // Users.userLogin(historyname);

        // ..while firefox automaticaly uses kind of cache wehere after refresh remain the previous name in box 
        // chrome does not work lik that...and since i kind of get fond of the firefox feature using folowing
        // gl_lastUsedName .. should be by that time "User name X" ..so maybe better use that ??
        if(usernamebox.value == "User name X")
        {
            // it seems is default despite the cookies nonzero previous val..
            usernamebox.value = historyname;
        }
   }
  //  WsAnouceLoginAliasName();
  setTimeout(() => {
         SendCsharpReflexcutor("","distrubuteLogedUsersList",null);
         
         setTimeout(() => {
            if(usernamebox)
            {
                if(usernamebox.value != "User name X" && usernamebox.value.length > 2)
                {
                     var LastCachedname = usernamebox.value;
                     if(!gl_arrofusers.includes(LastCachedname))
                        Users.userLogin(LastCachedname);
                }
            }
         },550);
  }, 50);
}

function Wos_onMessage(mesuge)
{
   globalThis.gl_lastMsgTimeMilisecs = Date.now();
   if(mesuge.data)
   {
     // console.log("wosocko Wos_onMessage:",mesuge); 
      if(mesuge.data == cipACKok)
      {
         // means its JUST recpost for periodic ack sended from here to server...
         // ..DO NOTHING ..specialy dont respond with ack otherwise infinite lethat cyclying starts...
         return;
      }
      processWSmessage(mesuge);      
   }
}

function prepRecconectWosock(uniqueDelay)
{
   // thisOne will ACT only if the wsoc is not null  !!
   if(!uniqueDelay)uniqueDelay = Number.parseInt(("" + Math.random()).slice(-4));
               // ..so if two calls from err and from closed wont colide.   
   if(globalThis.gl_wosocko != null)
   {
      //  0 = connectin, 1 = open, 2 = closing 
      if(globalThis.gl_wosocko.readyState > 1)
      {
            setTimeout(somePrasan => {
                 // console.log("delayed recconecting recheck ..WS atempt..", somePrasan);
                  // check if we did do it already ...manualy or so ..
                  if(globalThis.gl_wosocko != null && globalThis.gl_wosocko.readyState > 1)
                  {
                     console.log("delayed recconecting recheck ..WS atempt..", somePrasan);
                     OopenWSS(somePrasan);
                  }

            }, gl_wosock_recconectPeriod + uniqueDelay, "" + globalThis.gl_wsock_FullUrl);          
      }  
   }
}
// periodicaly called func from superior ticker..
function Wos_ResolveSendHearBeat()
{
    if(globalThis.gl_wosocko != null)
    {
      if(globalThis.gl_wosocko.readyState == 1)
      {
         // ...otherwise is only matter of time when this accidentaly colide with at the moment sending desire ...
         globalThis.gl_wosocko.send(cipACK);   
      }
      else
      {
         // ...maybe go for reconnect
            var timeFromLastKnowResponsAndNow = Date.now()  - globalThis.gl_lastMsgTimeMilisecs;
            if(timeFromLastKnowResponsAndNow > (3 * gl_masterPeriodicTickPeriod))
            {
                  // ..means more than 3 master cycles passed since we recived any msg from srv...
                  prepRecconectWosock(); 
            }
      }
   }
}




 // main pieace of chain of incoming fun called from websock event handler..
 // this one calls safe parse and call further with type name
function processWSmessage(mesuge)
{
   if(!mesuge)return;
  // console.log("wosocko processWSmessage:",mesuge.data);
   var ojebanyObjekt = JSonSafePrase(mesuge.data);
   if(ojebanyObjekt)
   {
      var normalizedType = ojebanyObjekt["type"];
      if(normalizedType)
      {
         // type ... letsay >> general, broadcast, chat, login, invite, offer, answear, candidates, refresh
        processProtocoledOb(ojebanyObjekt, normalizedType);
      }
   }
   else
   {
    console.log("not parsed ? >>", mesuge);
   }           
}
// ment to be main incoming msg switch ...curently bypassed on behalf of stepping atempt..
function processProtocoledOb(prasedPizdaload, normalizedType)
{
   // type ... letsay >> general, broadcast, chat, login, invite, offer, answear, candidates, refresh, userslist
   if(!prasedPizdaload)return;
   if(!normalizedType)normalizedType = prasedPizdaload["type"];
   
   switch(normalizedType)
   {
   
      case "response":
      {
           // response answear to any task client sends to server ...eg ...target user is not aviable...
           // im this case the  prasedPizdaload.name will contain ref to original task ....
           var whichTaskIsReferingTo = prasedPizdaload.name;   // eg chat
           var explanationResult = prasedPizdaload.value;      // it may stars and end with -sended-
           var targnam = prasedPizdaload.targetname ? prasedPizdaload.targetname : "";
       //    if(explanationResult.startsWith("-") && explanationResult.endsWith("-"))
           
           printMessageOnScreen(prasedPizdaload);
           
      }break;
      
      case "logout":
      case "login":
      {
         // response of the server for client login atempt under name that is better to check and censore at server side..
         // ...then send back here ..so the client will be aware of his fuckedupname..
         var resultsMsg = prasedPizdaload.value;   // ... for know expect OK ,... but if we ever implement some account logging mechanims..we will need this field for 
         // 'wrong password', "banned", "too busy to have sex with you", "duplicite not allowed", "users limit reached"... ect
         var confirmedNameOflogin = prasedPizdaload.name;
         if(confirmedNameOflogin != "" && confirmedNameOflogin.length > 2)
         {
            if(confirmedNameOflogin != gl_lastUsedName)
            {
               globalThis.gl_lastUsedName = confirmedNameOflogin;
               document.querySelector('.user_profile_wrapper > div > p').innerHTML = globalThis.gl_lastUsedName;
               document.getElementById("usernamebox").value = globalThis.gl_lastUsedName;
               
               console.log("login respons us with randomized name...duplicity ?");
            //   Users.setCookie('username',gl_lastUsedName);
            }         
         }      
               
      }break;
      
      case "general":
      case "broadcast":
      case "chat":
      {
         var possibleAddmitingOFshamefulName = "";
         if(prasedPizdaload["name"])
               possibleAddmitingOFshamefulName = prasedPizdaload["name"];
         //printToLogScreen("from:" + possibleAddmitingOFshamefulName + " " + prasedPizdaload["value"]);

         printMessageOnScreen(prasedPizdaload);
      }break;
      case "txtmsg":
      {                                                        
         var possibleAddmitingOFshamefulName = "";
         if(prasedPizdaload["name"])
         {              
            possibleAddmitingOFshamefulName = prasedPizdaload["name"];
            if(possibleAddmitingOFshamefulName == gl_lastUsedName)
            {
               console.log("incoming broadcast msg is originated from Us:%s,  >> msg:%s ",possibleAddmitingOFshamefulName, prasedPizdaload["value"]);
               // return;
            }
         }      
         printMessageOnScreen(prasedPizdaload);
      }break;
      
      case "eval":
      {
        var maybeZlemmi = safeZaaval(prasedPizdaload["value"])
        if(maybeZlemmi != null)
        {
            var optionalNameOfOrigin = prasedPizdaload["name"] ? prasedPizdaload["name"] : "";
            console.log("resulz of OK eval of:%s, is:%o",prasedPizdaload["value"],maybeZlemmi);

            if (optionalNameOfOrigin != "") {
              // logic prepared for possible extra serializing ...eg functions body, extra delimiters char etc...
              // ...but now its pointles as the whole ob is stringifed before sending...
              var carryBox = maybeZlemmi;
              /*
              var retuba = typeof maybeZlemmi;              
              if(retuba == 'number' || retuba == 'string')
                carryBox = maybeZlemmi;
              else
                carryBox = JSON.stringify(maybeZlemmi);
              */
              sendToServer({
                name: gl_lastUsedName,
                type: "eval-response",
                targetname: optionalNameOfOrigin,
                value: carryBox
            });
          }
        }      
      }break;
      case "eval-response":
      { 
        var optionalNameOfOrigin = prasedPizdaload["name"] ? prasedPizdaload["name"] : "";
        console.log("..some EVAL respons: %o , from:%s", prasedPizdaload["value"], optionalNameOfOrigin);

      }break;
      
      case "userslist":
      {
            console.log("users list changed... ",prasedPizdaload["value"]);
            
            // now ..we have to actualy keep the info about selected users before...
            var curentlySelectedUsersBackup = [...document.querySelectorAll("#user_list .selectedUser")];
            if(curentlySelectedUsersBackup.length > 0)
               curentlySelectedUsersBackup = curentlySelectedUsersBackup.map(kabuton => kabuton.value.trim());
            
            var userdementwraper = document.querySelector('#user_list .overflow-inner-wrapper');
            userdementwraper.innerHTML = "";
         
            if(prasedPizdaload["value"] != null && prasedPizdaload["value"].length > 2)
            {
               var arrofusers = prasedPizdaload["value"].split(";");
               globalThis.gl_arrofusers = arrofusers;

               var comboTxt = "";
               arrofusers.forEach(oneuser => {
                   comboTxt += `<button value="${oneuser}" onclick="whenUserInListClicked(this);" class="usrSelElm">${oneuser}</button>\n`;
                 });
                 
                userdementwraper.innerHTML = comboTxt;
                
                
                // after that ...re-sekecting what what previously selected..
                if(curentlySelectedUsersBackup.length > 0)
                {
                     // gadher all cutens users
                   var allUsersInlist = document.querySelectorAll("#user_list button");
                   allUsersInlist.forEach(oneposer => {  
                  //	console.log(oneposer.value)
                      if(curentlySelectedUsersBackup.includes(oneposer.value))
                             oneposer.classList.toggle("selectedUser", true);
                  });
                }  
            }
         //   printToLogScreen(prasedPizdaload["value"]);
      }break;   
      
      case "offer":
      {
           //printToLogScreen(prasedPizdaload["value"]);
//           HandleIncomingRTCoffer(prasedPizdaload);
          MDNrtc.handleVideoOfferMsg(prasedPizdaload);
           
      }break;
      
      case "answer":
      {
           //printToLogScreen(prasedPizdaload["value"]);
            //HandleIncomingRTCanswear(prasedPizdaload);
            
          MDNrtc.handleVideoAnswerMsg(prasedPizdaload);
      }break;
      
      case "candidate":
      {
          // printToLogScreen(prasedPizdaload["value"]);
          //HandleIncomingRTCcandidate(prasedPizdaload);
          MDNrtc.handleNewICECandidateMsg(prasedPizdaload);
           
      }break;
   
   case "hang-up": // The other peer has hung up the call
        MDNrtc.handleHangUpMsg(prasedPizdaload);
   break;
   
      default:
      {
         console.log("undeclared pizdaload type:%s", normalizedType); 
          printToLogScreen(prasedPizdaload["value"]);
          
      if(globalThis.sysloginner)
         sysloginner.innerHTML += " undefined mesage case: " + normalizedType;
          
      }break;
   }   
}

function JSonSafePrase(somePotentialJasan)
{
   if(!somePotentialJasan)return null;
   try
   {
     var prasedOb = JSON.parse(somePotentialJasan);
     return prasedOb;
   }
   catch(error)
   {
     console.log("..failed to jsonPrase of:%s, err:%o",somePotentialJasan,error);
     return null;
   }
}

function safeZaaval(txtCode)
{
   if(!txtCode)return null;
   if(txtCode.includes("await"))
   {
      txtCode = txtCode.replace(/await/gm,"");
   }

   try
   {
     var someZu = null; 
     someZu = globalThis.eval(txtCode);     
     return someZu;
   }
   catch(error)
   {
     console.log("..err during EVAL of:%s, err:%o",txtCode,error);
     return error; //null;
   }
}

function aboutAsiVlasy(txtHandl) {
  //https://rostacik.net/2023/01/21/async-eval-in-javascript/
  const AsyncFunction = Object.getPrototypeOf(async function () { }).constructor;
  function awaitFromString(handler) {
    return new Promise((resolve, reject) => {
      new AsyncFunction(
        "resolve",
        "reject",
        `try { await ${handler}; resolve(); } catch (e) { reject(e); }`,
      )(resolve, reject)
    })
  }
  return awaitFromString(txtHandl);
}

function printToLogScreen(whaat)
{
   var tamtoCpat = document.getElementById("podium_inner_common");
   if(tamtoCpat)
   {
      if(tamtoCpat.innerHTML.length > 3500)
         tamtoCpat.innerHTML = "";
         
       var jakTupee = typeof whaat;
       if(jakTupee == "number" || jakTupee == "string")
       {
            tamtoCpat.innerHTML += `<li>${whaat}</li>\n`;
            return;
       }
       else
       {
         var tmpKoulekce = Object.values(whaat);
         tmpKoulekce.forEach(oneOb => {
              //tamtoCpat.innerHTML += `<li>${oneOb}</li>\n`;
              // ..if sub sub containeers...
              printToLogScreen(oneOb);
         });
         
         if(tmpKoulekce.length > 0)
            return;
       }
              
       tamtoCpat.innerHTML += `<li>${whaat}</li>\n`;
   }
}

function printMessageOnScreen(msgData) {
   var tamtoCpat = document.querySelector("#podium_inner_common_table tbody");

   if (!tamtoCpat) return;

   if (tamtoCpat.innerHTML.length > 3500) tamtoCpat.innerHTML = "";

   let user = msgData.name;
   let msg = msgData.value || "";
   var timestumpa = new Date().toLocaleTimeString().split(" ")[0];
    
if (msg.includes("<") || msg.includes(">")) 
  msg = getRidOfElementChars(msg);

    // prepended ..
   tamtoCpat.innerHTML = `
      <tr class='msg-row'>
         <td data-sender='${user}'>${timestumpa}</td>
         <td data-sender='${user}'>${user}:</td>
         <td data-sender='${user}'>${msg}</td>
      </tr>
      ${tamtoCpat.innerHTML}
   `;
   
   return;
}
// for possible input containing '<' '>' replaces them with span, 
// ..so it can be send to some innerHtml dements
function getRidOfElementChars(rawTxt)
{
   if(!rawTxt)return;
     var gex = /<|>/gm;
  rawTxt = rawTxt.replace(gex, (foundedPart, indx) => {
    //console.log("m:", foundedPart, indx);
    if (foundedPart == "<") 
      return "<span class='coloredChar'><</span>";
    else if (foundedPart == ">") 
      return "<span class='coloredChar'>></span>";
    else return foundedPart;
  });
  return rawTxt; 
}

// broadcastBut.onclick.hitTheTXTbrodcast > WsbroadcastBullshitToAllOthers
// compose broadcast payload, populaye it, serialize to txt then >> gl_WSdispatchOb
function WsbroadcastBullshitToAllOthers(txtMegaBullshit)
{
    var tyranosportOb = {
      type: "broadcast",
      name: gl_lastUsedName,
      value: txtMegaBullshit
    };
   var packeddatamsg = JSON.stringify(tyranosportOb);
   gl_WSdispatchOb(packeddatamsg);
}

function WsAnouceLoginAliasName(specificName)
{
 //  document.querySelector('#user_list > *').innerHTML = "";
   if(!specificName)
   {
      var desiredUserNameBox = document.getElementById("usernamebox");
      if(desiredUserNameBox && desiredUserNameBox.value)
      {
         gl_lastUsedName = desiredUserNameBox.value;
      }
   }
   else
      gl_lastUsedName = specificName;  
   
   gl_lastUsedName = gl_lastUsedName.length > 2 ? gl_lastUsedName : "User naaser X"; 
   gl_SEND(gl_lastUsedName,"login");   
   // ..or simply just  gl_SEND(usernamebox.value,"login") 
}

function WsAnouceLogOUTbyAliasName(specificName)
{
   if(specificName && specificName.length > 2)
   {
       gl_SEND(specificName,"logout"); 
       return;
   }
   else
   {
     // somehow still we lost our name ??? ..as last resort atempt read it from input element...
      if(gl_lastUsedName.length < 3)
      {
         var desiredUserNameBox = document.getElementById("usernamebox");
         if(desiredUserNameBox && desiredUserNameBox.value)
            gl_lastUsedName = desiredUserNameBox.value;
      }
      
      gl_SEND(gl_lastUsedName,"logout"); 
   } 
}

function SendMsgToSelectedUser(brutalSlandersToSend, desiredUserName)
{
   if(!brutalSlandersToSend)return;
   if(!desiredUserName)
   {
      WsbroadcastBullshitToAllOthers(brutalSlandersToSend);
      return;
   }
   
    var tyranosportOb = {
      type: "chat",
      name: gl_lastUsedName,
      value: brutalSlandersToSend,
      targetname: desiredUserName
    };
   var packeddatamsg = JSON.stringify(tyranosportOb);
   gl_WSdispatchOb(packeddatamsg);
}

function SendEvalTaskToOneOrMultiUsers(somePoisonToDeal, specificName)
{  
   if(!somePoisonToDeal)return;
   if(!specificName || specificName == "")specificName = GetSelectedUserOrAnybody();
   if(!specificName)specificName = "";    //..letsay that will mean to all..
   
   var tyranosportOb = {
      type: "eval",
      name: gl_lastUsedName,
      value: somePoisonToDeal,
      targetname: specificName
    };
    gl_WSdispatchOb(tyranosportOb);
}

// ...exercise in futility ..
// lets task the server to do something on his side ...by cSharp reflection...
function SendCsharpReflexcutor(targetInstaNAme, desiredFuncNam, combedParams)
{
   var arrPosrans = [];
   if(combedParams)
   {
      if(combedParams.forEach != null)
        arrPosrans = combedParams;
      else
      {
         var typeAndValPairs = combedParams.split(" "); //  like >> "string+boooring int+17";
         
         arrPosrans = typeAndValPairs;  
      } 
   }
   
   var combedTXTtoDO = targetInstaNAme + "." + desiredFuncNam + " " + combedParams;
   var tyranosportOb = {
      type: "refexe",
      name: gl_lastUsedName,
      value: combedTXTtoDO,
      targetname: "-Father Server-",
      
      instancename: targetInstaNAme,
      funcname: desiredFuncNam,
      posrans: arrPosrans
       
    };
    gl_WSdispatchOb(tyranosportOb);
}
// eg >> SendCsharpReflexcutor("","distrubuteLogedUsersList",null)      // ok
function TestEvalBrood()
{
   var poizonToeval =`WsAnouceLoginAliasName();`;
   SendEvalTaskToOneOrMultiUsers(poizonToeval, "");
}


function whenUserInListClicked(whoo)
{
   if(!whoo)return;
   var referedNAmeOFthatUser = whoo.value;
   if(!referedNAmeOFthatUser)return;
   whoo.classList.toggle("selectedUser");
   
   var allUsersInlist = document.querySelectorAll("#user_list button");
   var allCurentlySelected = [...document.querySelectorAll("#user_list .selectedUser")]
   
   // secondary more safe backup of selected users  (as it may be lost when list refreshed..)
   globalThis.gl_lastSelectedUsers = allCurentlySelected.map(pluton => pluton.value);     
   
   // temporialy enabling the call button here when someon selected...
   
   
    var callBtn = document.querySelector('#call_btn');
    callBtn.disabled = !(gl_lastSelectedUsers.length == 1 && gl_lastSelectedUsers[0] != gl_lastUsedName); 
}

function preSelectUserInButList(bySpecUserName)
{
   if(!bySpecUserName)return;
   if(bySpecUserName=="")return
   
   var tobeSelected = [...document.querySelectorAll("#user_list button")].find(boho => boho.value == bySpecUserName);
   if(tobeSelected)
   {
      // desel all what possibly selected.....and sel mark the one with that name..
      document.querySelectorAll("#user_list .selectedUser").forEach(toDesel => toDesel.classList.toggle("selectedUser",false));
      tobeSelected.classList.toggle("selectedUser",true);
      
   }
   // ..and the usual after sels...
   var allCurentlySelected = [...document.querySelectorAll("#user_list .selectedUser")];
   globalThis.gl_lastSelectedUsers = allCurentlySelected.map(pluton => pluton.value);
   
   var callBtn = document.querySelector('#call_btn');
   if(callBtn)
      callBtn.disabled = !(gl_lastSelectedUsers.length == 1 && gl_lastSelectedUsers[0] != gl_lastUsedName);  
}

async function SendMSGtoSelectedUsers(e)
{
   var textTosend = "";
   var inputTXTbox = document.querySelector('#message_input');
   textTosend = ("" + inputTXTbox.value);
   
   gl_lastSelectedUsers.forEach(oneUserKey => {
       SendMsgToSelectedUser(textTosend, oneUserKey);
   });
   
   inputTXTbox.value = "";  
}


// expected obj with already populated fields of candidate
function SendRTC_candidateToUsers(PretyranosportOb)
{
    if(!PretyranosportOb)return;
    if(gl_lastSelectedUsers.length < 1)
      gl_lastSelectedUsers = [...document.querySelectorAll("#user_list button")].map(pluton => pluton.value);
   
    gl_lastSelectedUsers.forEach(trgUserNam => {
    
        SendRTC_candidateToSINGLEuser(trgUserNam, PretyranosportOb);
    })
}
function SendRTC_candidateToSINGLEuser(desireUserName, PretyranosportOb)
{
   if(!desireUserName)return;
   
   // pointless to fake it ..but fake it anyway .. : D
   if(!PretyranosportOb)
      PretyranosportOb = {
      type: "candidate",
      name: gl_lastUsedName,
      targetname: desireUserName,
      candidate: null,
      sdpMid: null,
      sdpMLineIndex: 0            
      };
   
     var tyranosportOb = {
      type: "candidate",
      name: gl_lastUsedName,
      targetname: desireUserName,
      candidate: PretyranosportOb.candidate,
      sdpMid: PretyranosportOb.sdpMid,
      sdpMLineIndex: PretyranosportOb.sdpMLineIndex
    };
    
    // for some identifi and debug around...
    if(PretyranosportOb.candidate && PretyranosportOb.candidate.candidate)
        tyranosportOb.value = PretyranosportOb.candidate.candidate;
   
   var packeddatamsg = JSON.stringify(tyranosportOb);
   gl_WSdispatchOb(packeddatamsg);   
}

function SendRTC_offerToUsers(offerFromRTCpeer)
{
    if(!offerFromRTCpeer)return;
   // console.log("SendRTC_offerToUsers > ", gl_lastSelectedUsers);
    if(gl_lastSelectedUsers.length < 1)
    {
      console.log("no selected target users !!! ");
      //return;
      gl_lastSelectedUsers = [...document.querySelectorAll("#user_list button")].map(pluton => pluton.value);
    }
   
    gl_lastSelectedUsers.forEach(trgUserNam => {
    
        SendRTC_offerToSINGLEuser(trgUserNam, offerFromRTCpeer);
    });
}
function SendRTC_offerToSINGLEuser(desireUserName, offerFromRTCpeer)
{
   if(!desireUserName || !offerFromRTCpeer)return;
     
   var tyranosportOb = {
      type: "offer",
      name: gl_lastUsedName,
      targetname: desireUserName,
      sdp: offerFromRTCpeer.sdp      
    };
   
   var packeddatamsg = JSON.stringify(tyranosportOb);
   gl_WSdispatchOb(packeddatamsg);   
}
/* ... should be useles...
function SendRTC_answerToUsers(answerFromRTCpeer)
{
    if(!offerFromRTCpeer)return;
    // should be not by localy selected peers but by origin user who sended offer on which this reposnse is sended..
    if(gl_lastSelectedUsers.length < 1)
      gl_lastSelectedUsers = [...document.querySelectorAll("#user_list button")].map(pluton => pluton.value);
   
    gl_lastSelectedUsers.forEach(trgUserNam => {    
        SendRTC_answerToSINGLEuser(trgUserNam, answerFromRTCpeer);
    });
}
*/
function SendRTC_answerToSINGLEuser(desireUserName, answerFromRTCpeer)
{
   if(!desireUserName || !answerFromRTCpeer)return;
     
   var tyranosportOb = {
      type: "answer",
      name: gl_lastUsedName,
      targetname: desireUserName,
      sdp: answerFromRTCpeer.sdp      
    };
   
   var packeddatamsg = JSON.stringify(tyranosportOb);
   gl_WSdispatchOb(packeddatamsg);   
}  


//  rtc stuff  ##########################################

var pcc = null;         // local insta of RTCPeerConnection
var lastoffer = null;   // for later examining ..
var lastanswer = null   // for later examine ...
var iceServerss = [];
var candidatess = [];
var localStreams = null;       // MediaStream  obtained from pc camera and mic
var incomingTrack = [];

// mementos       // mementos
function uselessAroundes()
{
   iceServerss = [];
   candidatess = [];
     
   var rawTurn = '{"urls":["turn:91.139.6.78:8888"],"username":"testuser","credential":"superpwd"}';
   var srvCfgLike = JSON.parse(rawTurn); 
   iceServerss.push(srvCfgLike);
   
   var icePolizy = "all"; // "relay"      // ...if i understamd it coretly .. we should use relay
   
   var config = {
       iceServers: iceServerss,
       iceTransportPolicy: icePolizy,
     };
   console.log("target cfg:",config);
   
   var offerOptions = {offerToReceiveAudio: 1, offerToReceiveVideo: 1};
   
   pcc = new RTCPeerConnection(config);
   

  var localVideoElmnt = document.getElementById("local_cam");
  var remoteVideoElmnt = document.getElementById("remote_cam");

  navigator.mediaDevices.getUserMedia({audio: true, video: true}).then(geven => {
   localStreams = geven;
   console.log("g",geven);
   localVideoElmnt.srcObject = localStreams;
  
   });

}

function memoAboutSecureCertificutingOmfging()
{
let configuration = myPeerConnection.getConfiguration();

   if (configuration.certificates?.length === 0) {
     RTCPeerConnection.generateCertificate({
       name: "RSASSA-PKCS1-v1_5",
       hash: "SHA-256",
       modulusLength: 2048,
       publicExponent: new Uint8Array([1, 0, 1]),
     }).then((cert) => {
       configuration.certificates = [cert];
       myPeerConnection.setConfiguration(configuration);
     });
   }
}

//var neutralSteam = new MediaStream();
async function startLocalStreams()
{
   if(localStreams != null)
   {
      STOPallTracksInStream(localStreams);
      localStreams = null;
      return;
   }
   var localVideoElmnt = document.getElementById("local_cam");
   navigator.mediaDevices.getUserMedia({audio: true, video: true}).then(geven => {
      //console.log("g",geven);      
      localStreams = geven;
     // neutralSteam = geven;
     // localVideoElmnt.srcObject = localStreams;
     localVideoElmnt.srcObject = new MediaStream(localStreams.getVideoTracks());  // ..local only video
   });
   var callBtn = document.querySelector('#call_btn');
   if(callBtn)callBtn.disabled = false; 
}

function stopLocalStreams()
{
   if(localStreams == null)return;
   var localVideoElmnt = document.getElementById("local_cam");
   //localVideoElmnt.srcObject = null;
   localStreams.getTracks().forEach(tarak =>{
   // console.log("ta",tarak)
      tarak.enabled = false;
      tarak.stop();
   });
   localVideoElmnt.srcObject = null;
   
   if(pcc)pcc.close();
   // assuming also will need remote wokno
   var remoVoko = document.getElementById("remote_cam");
   if(remoVoko.srcObject != null)
    remoVoko.srcObject.getTracks().forEach(prak => {
         //console.log(prak)
      prak.enabled = false;
      prak.stop();
   });  
   
  remoVoko.srcObject = null; 
  
   // additionaly os posible to close atempt some on the devices..>>
   /*
navigator.mediaDevices.getUserMedia({audio:1, video:1}).then(op => {
 var kraks =  op.getTracks();
  kraks.forEach(onekrak => {
    
    onekrak.enabled = false;
    onekrak.stop()
  });
  console.log(op,kraks)
});
*/
  
}

// for purpose of understanding and debuging.. we attach all possible event hadnlers ..
function attachRTCallEvents(RtcPeerConInsta, overwriteWithouMercy)
{
   if(!RtcPeerConInsta)return;
   if(overwriteWithouMercy == undefined || overwriteWithouMercy == null)overwriteWithouMercy = false;
   var thoseEvents = ["onconnectionstatechange", "ondatachannel", "onicecandidate", "oniceconnectionstatechange", "onicegatheringstatechange", "onnegotiationneeded", "onsignalingstatechange", "ontrack"];  
   //...and then iterate...aka univerzaal vrzaal..but not now ..

   thoseEvents.forEach(evenam => {
	//	console.log("evnam:%s, cur:%o",evenam, RtcPeerConInsta[evenam])
      if(RtcPeerConInsta[evenam] == null)
          RtcPeerConInsta[evenam] = function(event){  onRTCxxxEvent(event, evenam); }  
      else if(overwriteWithouMercy == true)
          RtcPeerConInsta[evenam] = function(event){  onRTCxxxEvent(event, evenam); }
   });                 
}
async function onRTCxxxEvent(event, originDescr)
{
   if(!originDescr)originDescr = event.type ? event.type : "unknowEventtype";
   if("onconnectionstatechange" == originDescr)
   {
      var stateofconection = event.explicitOriginalTarget ? event.explicitOriginalTarget : event.target;
      console.log("on: %s >> e:%o >> to:%o", originDescr, event, stateofconection.connectionState); 
   }
   else if("onsignalingstatechange" == originDescr)
   {
    var torotocopo = event.target;
    console.log("on: %s >> val:%o",originDescr,torotocopo.signalingState);
   }
   else
      console.log("on: %s >> e:%o",originDescr,event);
}
// bypasssed when gl_steppingver !!
function halooHang(e)
{
MDNrtc.hangUpCall();
}

function halooCaal(e)
{
   console.clear();
   var simpleCfg = MDNrtc.origoConCfgArchiver();
   return MDNrtc.Ynvyte(e,simpleCfg);      
}

function halooCaal_Bypased(specificCfg)
{
  if(incomingTrack.length > 0)
   incomingTrack =incomingTrack.filter(plejuje => plejuje[0].active);

   if(localStreams == null || localStreams.active == false)
   {
        // startLocalStreams();
         
         navigator.mediaDevices.getUserMedia({audio: true, video: true}).then(geven => {     
            localStreams = geven;
            local_cam.srcObject = localStreams;
            /* ...  ok ...but paused for now...
            var triktak = geven.getTracks();            
            var temptMrdastrim = new MediaStream([triktak[1]]);             
            local_cam.srcObject = temptMrdastrim;            
           console.log("done prep localstreams..");
           */
         
            halooCaal();
            return;
            
         });
         
         Reatempt_for_halooo--;
         if(Reatempt_for_halooo > 0)
            return;
   }
   else
      Reatempt_for_halooo = 6;
   
  if(gl_lastSelectedUsers.length < 1)
  {
      if(sysloginner)
         sysloginner.innerHTML += "Nobody Selected... !! who you want to call then ???";
      return; 
  }
  else if(gl_lastSelectedUsers[0] == gl_lastUsedName)
  {
      if(sysloginner)
         sysloginner.innerHTML += "Seems selected yourself... calling yourself as you want ..";
      return;    
  }
  
  var vracenaStejneGlobalniPcc = karatePeerConn(specificCfg);
    
  // folowing options should not be required..but  anyway,,,
  var offerOptions = {offerToReceiveAudio: 1, offerToReceiveVideo: 1};
  //var offer = null;
  pcc.createOffer(offerOptions).then(slowfr => {
      //console.log("created offer:", slowfr)
      lastoffer = slowfr;
       // signaling.postMessage({type: 'offer', sdp: offer.sdp});         
     SendRTC_offerToUsers(slowfr); 
             
      pcc.setLocalDescription(slowfr).then(() => {  }); ;    // <<< that returns promiss !! ..however quite empty..
      
      // btw the description seems can be prep-made from manual txt input
      // new RTCSessionDescription(sdp)
      
  });  
}
//  halooCaal(gl_turn_config)

var gl_turn_config= {
  "iceServers": [{
    "urls": ["turn:91.139.6.78:8888"],
    "username": "testuser",
    "credential": "superpwd"
  }],
  "iceTransportPolicy": "all"
};


function karatePeerConn(specificCfg)
{
  if(!specificCfg)
    specificCfg = {
    iceTransportPolicy: "relay", 
     iceServers: [
       {
         urls: "turn:91.139.6.78:8888",
         username: "testuser",
         credential: "superpwd",
       },
     ],
   };

  pcc = new RTCPeerConnection(specificCfg);
  pcc.onicecandidate = function(e){
   
    console.log("pcc oniceCandidate:" ,e);
    candidatess.push(e.candidate);
    // ...seems there may be a need in the protocol to send ..at the end ...an empty one ..!!
    var message = {
      type: 'candidate',
      candidate: null,
    };
    
    // btw indeed >> e.candidate.candidate  >>  event.candidate.RTCIceCandidate 
    // ...but i need transport whole ob anywa  ??!? !    
    if (e.candidate) {
      //message.candidate = e.candidate.candidate;
    //  message.sdpMid = e.candidate.sdpMid;
    //  message.sdpMLineIndex = e.candidate.sdpMLineIndex;
        message.candidate = e.candidate;
    }
    
     SendRTC_candidateToUsers(message);      
  };
  
  pcc.ontrack = function(e){
    console.log(">>>>>>>>>pcc ontrack incoming: ", e); 
    incomingTrack.push(e.streams);
    var remoteVideoElmnt = document.getElementById("remote_cam");
    if(remoteVideoElmnt)
      remoteVideoElmnt.srcObject = e.streams[0]; 
    };
    
  if(localStreams)
     localStreams.getTracks().forEach(track => {
       
       var rtcpSender = pcc.addTrack(track, localStreams);
        // console.log("adding track to pcc, track:%o",track);
     });
   
   attachRTCallEvents(pcc, false);  
   return pcc;
}

// ############################################
// example chat server >>  https://github.com/mdn/samples-server/tree/master/s/websocket-chat
// about streams adding  >>      https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/addTrack
// about sigbaling >>      https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API/Signaling_and_video_calling
// example dw  >>  C:\WLOZ\gstreamer\webRTC\MDNexample 
// ############################################
 // incoming packet of other user sended by above func on ice candidate inside new rtcPeerCon
function HandleIncomingRTCcandidate(prasedPizdaload)
{
      if(!prasedPizdaload)return;
      // TODO: check, if mediastreams > localStreams, ok, rtcpeercon > pcc, 

      if(pcc == null)
      {
         console.log("for incoming candidate DONT have inst of rtcpeer Con pcc !! ", prasedPizdaload);
         // return;   // ..again ..we supposed do bail ...but lets crack on ...
         pcc = karatePeerConn();
      }
      
      if(localStreams == null)
         startLocalStreams();
         
  if (!prasedPizdaload.candidate) 
  {   
    console.log("..incoming paklpizda DOES not have expected candidate !! ", prasedPizdaload);
    pcc.addIceCandidate(null).then(() => {  });
  } 
  else 
  {
  
    //  console.log("-- %s, >> ADDing candidade:%o ", gl_lastUsedName, prasedPizdaload);
    //handleNewIceCandidate(prasedPizdaload.candidate)
    // pcc.addIceCandidate(prasedPizdaload.candidate).then(() => {  });
      pcc.addIceCandidate(prasedPizdaload.candidate).catch((e) => { 
         console.log("failed add candidate, name:%o, er:%o , candy:%o",e.name, e,prasedPizdaload.candidate);
      });
  }                 
}
// or throu that >>>
function handleNewIceCandidate(candidateSDP) {
  const candidateObj = new RTCIceCandidate(candidateSDP);
  if(candidateObj)
  candidatess.push(candidateObj);
  
  pcc.addIceCandidate(candidateObj).catch((e) => {
    console.log("addin candy:%o failed, txt:%o ", candidateObj, candidateSDP);
  });
}

var Reatempt_for_halooo = 6;
//var Reatempt_for_incomingOffer = 6;

async function HandleIncomingRTCoffer(prasedPizdaload)
{
   if(!prasedPizdaload)return;
   
   printMessageOnScreen({name:"SYSTEM", value:"incoming CALL !! from: " + prasedPizdaload.name})
      
   if(localStreams == null || localStreams.active == false)
   {
      localStreams = new MediaStream();
       // startLocalStreams();
      navigator.mediaDevices.getUserMedia({audio: true, video: true}).then(geven => {  
         if(localStreams != null)
         {
             geven.getTracks().forEach(onetarak => {
               localStreams.addTrack(onetarak);
             });
         }
         else   
            localStreams = geven;
         
            local_cam.srcObject = localStreams;
            
            console.log("done prep localstreams..");            
         });
       
   }

//  printMessageOnScreen({name:"SYSTEM", value:"incoming CALL !! from: " + prasedPizdaload.name})

   // since our ob is full of other stuff..
   var pureOfferOb = {type: "offer", sdp: prasedPizdaload.sdp };
   lastoffer = pureOfferOb;
   
   if(pcc != null)
   {
      console.log("on incoming offer err, local RTCpeercon pcc is NOT null already some connection ??? !! >> signalingState:%o", pcc.signalingState);
      //return;      .. for now we contrinue andyway ..over corpses. we have to go ... 
      pcc.close();        
   }
   karatePeerConn();
   pcc.setRemoteDescription(pureOfferOb).then(() => {  
        pcc.createAnswer().then(answer => {
             lastanswer = answer;
            
            var targetName = prasedPizdaload["name"];  // from incoming name backt o him ..
            
            SendRTC_answerToSINGLEuser(targetName, answer);
             
            pcc.setLocalDescription(answer).then(() => {  });
        });
   });
         
} 


function HandleIncomingRTCanswear(prasedPizdaload)
{
   if(!prasedPizdaload)return;
   
   printMessageOnScreen({name:"SYSTEM", value:"Answear for our CALL !! from: " + prasedPizdaload.name})
   
   if(!pcc)
   {
      console.log("herelocal insta of rtcpeer con is NULL !!! ");
     // return;     // we supposed to ..but lets walk over corpses..
      karatePeerConn();
   }
   
   var pureAnswerOb = {type: "answer", sdp: prasedPizdaload.sdp };
   pcc.setRemoteDescription(pureAnswerOb).then(()=> { 
    //  console.log("we just set remoteDescription by incoming answear: ", pureAnswerOb);
    lastanswer = pureAnswerOb;
   });   
} 


function rtcDbgSomeStats()
{
   pcc.getStats().then(sste => {
  sste.forEach(oprd => console.log(oprd))
  
   });
}



//    ##########################################    of rtc stuff
// from >>> C:\WLOZ\gstreamer\webRTC\MDNexample\samples-server\s\webrtc-from-chat
//    ##############>>

var logDebug = true;
function log(text) {
  if(!logDebug)return;
  var time = new Date();
  console.log("[" + time.toLocaleTimeString() + "] " + text);
}
function log_error(text) {
  var time = new Date();
  console.trace("[" + time.toLocaleTimeString() + "] " + text);
}
function reportError(errMessage) {
  log_error(`Error ${errMessage.name}: ${errMessage.message}`);
}
// to replace alert( in here code
function aleale(msg)
{
   if(globalThis.sysloginner)
      sysloginner.innerHTML += msg + "\n";
}
function STOPallTracksInStream(merdiaStreamInsta, doNullTheOb)
{
   if(!merdiaStreamInsta)return;
   merdiaStreamInsta.getTracks().forEach(prak => prak.stop());
   if(doNullTheOb)
     merdiaStreamInsta = null;
}

// atempt to adjusted for my shitty C# handler..
function sendToServer(msg) {
  var msgJSON = JSON.stringify(msg);

  //console.log("Sending to ws > %s, msgJSON:%o", msg.type, msgJSON);
  // ..to decrease spaming console..substring of that ....as we approach working configuration anyway... kind of..
  console.log("Sending to ws > %s, msgJSON:%o", msg.type, msgJSON.substring(0,95));
 // connection.send(msgJSON);
 gl_WSdispatchOb(msgJSON);
}

// for every prize ..will return somebody !!
function GetSelectedUserOrAnybody()
{
    if(gl_lastSelectedUsers.length < 1)
    {
      console.log("no selected target users !!! ...using anybody  posibly  foundable !!!");
      //return;
      var regadheredTobeSure = document.querySelectorAll("#user_list .selectedUser");
      if(regadheredTobeSure.length > 0)
          gl_lastSelectedUsers = Array.prototype.map.call(regadheredTobeSure, pluton => pluton.value);
      else 
         gl_lastSelectedUsers = [...document.querySelectorAll("#user_list button")].map(pluton => pluton.value);
    }
    
    if(gl_lastSelectedUsers.length < 1)
    {
      console.log("..sooory ...but it seems there is nobody !!! .. returning null targetUser !!!");
      return null;   // anyway return nonsens to cause catastropty...
    }
    
    return gl_lastSelectedUsers[0];
}



// for now a temporialy overwraper
//async function capituCaal()
const MDNrtc = new function()
{

this.mediaConstraints = {
  audio: true,            // We want an audio track
  video: true
  /*
  video: {
    aspectRatio: {
      ideal: 1.333333     // 3:2 aspect is preferred
    }
  }
   */
  
};          

this.myPeerConnection = null;
this.targetUsername = null;
this.transceiver = null;         // RTCRtpTransceiver
this.webcamStream = null;        // MediaStream from webcam

this.ConCfg = { 
    iceServers: [     // Information about ICE servers - Use your own!
      {
        urls: "turn:91.139.6.78:8888",  // A TURN server
        username: "testuser",
        credential: "superpwd"
      },
      {
        urls: "turn:192.168.166.84:8888",  // A TURN server
        username: "testuser",
        credential: "superpwd"
      }
    ],
    iceTransportPolicy: "relay",
    SdpSemantic: "PlanB"
};
// Unified or PlanB

this.origoConCfgArchiver = function()
{
   var myHostname = window.location.hostname;
   if (!myHostname) {
     myHostname = "localhost";
   }
  // tohle se pouzivale v examplu ..nemohlo to fachat.. ale fachalo..
 var origoConCfg = {
    iceServers: [     // Information about ICE servers - Use your own!
      {
        urls: "turn:" + myHostname,  // A TURN server
        username: "webrtc",
        credential: "turnserver"
      }
    ]
  };
  
  return origoConCfg;
}

//this.peeroCoProto = {
/*
 get [expr]() {
    return "bar";
  }
     get oo(){ return 19; }
get: [1,2,3]
  get latest() {
    return (myPeerConnection ? myPeerConnection : document.all);
  },
  get: function() { return myPeerConnection ? myPeerConnection : document.all; },
  set: function(value) {  }
  */

 /*
Object.defineProperty(this, "peeroCoProto", {
  get : function () { return this.myPeerConnection; },
  set : function (x) { this.myPeerConnection = x; }
}); 
*/


this.clrLite = function clrLite()
{
  if(incomingTrack != null && incomingTrack.length > 0)
   incomingTrack = incomingTrack.filter(plejuje => plejuje[0].active);
   
   if(this.webcamStream != null)
   {
      if(this.webcamStream.active == true)
      {
         this.webcamStream.getTracks().forEach(otrak => otrak.stop())
      }
      this.webcamStream = null;     
   }
   if(this.myPeerConnection != null)
   {
      if(this.myPeerConnection.signalingState != "closed")
         this.myPeerConnection.close();   
   } 
   this.myPeerConnection = null;   
}

this.Ynvyte = async function(evt, optionalCustoCfg)
{
  // var prokopal = "nazastaafku";
   return this.inviteUserToPokaaal(evt);   
}

this.inviteUserToPokaaal = async function(evt) {
  log("Starting to prepare an invitation");
  
  // console.log(">>", this.mediaConstraints, this.origoConCfgArchiver, this.ConCfg);
  
  this.clrLite();
  
  if(this.myPeerConnection)
  {
      if(this.myPeerConnection.signalingState == "closed")
            this.myPeerConnection = null;
  }
  
  if (this.myPeerConnection) 
  {
    aleale("You can't start a call because you already have one open! ..sigstate:" + this.myPeerConnection.signalingState);
  } 
  else
   {
   
    var clickedUsername = GetSelectedUserOrAnybody();//evt.target.textContent;

    // Don't allow users to call themselves, because weird.
    if(clickedUsername == null)return;
    
    if (clickedUsername === gl_lastUsedName) {
      aleale("I'm afraid I can't let you talk to yourself. That would be weird.");
      return;
    }

    // Record the username being called for future reference

    this.targetUsername = clickedUsername;
    log("ok WILL Inviteuser: " + this.targetUsername + " ..but wait a second..");

    // Call createPeerConnection() to create the RTCPeerConnection.
    // When this returns, myPeerConnection is our RTCPeerConnection
    // and webcamStream is a stream coming from the camera. They are
    // not linked together in any way yet.

 //   log("Setting up connection to invite user: " + targetUsername);
    this.createPeerConnection();

    // Get access to the webcam stream and attach it to the
    // "preview" box (id "local_video").

    try {
      this.webcamStream = await navigator.mediaDevices.getUserMedia(this.mediaConstraints);
      document.getElementById("local_cam").srcObject = this.webcamStream;
    } 
    catch(err) 
    {
      console.log("eeeroooor during obtaining mediadevices...>> %s > %o",err.name, err);
      //handleGetUserMediaError(err);
      this.closeVideoCall();
      return;
    }

    // Add the tracks from the stream to the RTCPeerConnection

    try {
      this.webcamStream.getTracks().forEach(
        this.transceiver = track => this.myPeerConnection.addTransceiver(track, {streams: [this.webcamStream]})
      );
    } catch(err) {
       console.log("eeeroooor during Adding tracks to RTCpeerCon %s > %o",err.name, err);
    //  handleGetUserMediaError(err);
      this.closeVideoCall();
    }
  }
}

this.DejMNE = async function()
{
   console.log("ja jsem >>",this);
   return this;
}
this.DEJ = function()
{
   return this;
}


this.createPeerConnection = async function(custoCfg) 
{
  
  //log("Setting up a RTCPconnection...");

  // Create an RTCPeerConnection which knows to use our chosen
  // STUN server.
  var conCfg = {};
  
  if(custoCfg==undefined || custoCfg==null)
  {
      conCfg = this.ConCfg ;
  }
   else
      conCfg = custoCfg;      //   this.origoConCfgArchiver()
  
 // console.log("cotokurva: ",conCfg, this.ConCfg,origoConCfg);  
  
  this.myPeerConnection = new RTCPeerConnection(conCfg);
   console.log("created RTCPconnection with ",this.myPeerConnection.getConfiguration(),this.myPeerConnection);
  // Set up event handlers for the ICE negotiation process.

 // console.log("handley vidime:",this,MDNrtc, this.handleICECandidateEvent);

 /*
  this.myPeerConnection.onicecandidate = this.handleICECandidateEvent;
  this.myPeerConnection.oniceconnectionstatechange = this.handleICEConnectionStateChangeEvent;
  this.myPeerConnection.onicegatheringstatechange = this.handleICEGatheringStateChangeEvent;
  this.myPeerConnection.onsignalingstatechange = this.handleSignalingStateChangeEvent;
  this.myPeerConnection.onnegotiationneeded = this.handleNegotiationNeededEvent;
  this.myPeerConnection.ontrack = this.handleTrackEvent;
  
  */ 
  
  if(!this.myPeerConnection)
     this.myPeerConnection = this.myPeerConnection;
                                                            
  MDNrtc.myPeerConnection.onicecandidate = function(event){  MDNrtc.handleICECandidateEvent(event); }
  MDNrtc.myPeerConnection.oniceconnectionstatechange = function(event){ MDNrtc.handleICEConnectionStateChangeEvent(event); }
  MDNrtc.myPeerConnection.onicegatheringstatechange = function(event){ MDNrtc.handleICEGatheringStateChangeEvent(event); }
  MDNrtc.myPeerConnection.onsignalingstatechange = function(event){ MDNrtc.handleSignalingStateChangeEvent(event);  }
  MDNrtc.myPeerConnection.onnegotiationneeded =function(event){ MDNrtc.handleNegotiationNeededEvent(event); }
  MDNrtc.myPeerConnection.ontrack = function(event){ MDNrtc.handleTrackEvent(event); }
  // to asign those maybe not yet asiged..
  attachRTCallEvents(this.myPeerConnection, false)       //.. somehow binded to self. 
}

// ########  peercon event handler #######
//this.sendedCandysCount = 0;
this.handleICECandidateEvent = function handleICECandidateEvent(event) {
  if (event.candidate) {
  
   candidatess.push(event.candidate);
   
    log("*** Outgoing ICE candidate: " + event.candidate.candidate);
  //  this.sendedCandysCount++;
 //   if(this.sendedCandysCount > 1)return; //.... seem all candys has to be exchanged ??    
    var selectedUser = this.targetUsername ? this.targetUsername : GetSelectedUserOrAnybody();

    sendToServer({
      name: gl_lastUsedName,
      type: "candidate",
      targetname: selectedUser,
      candidate: event.candidate      
      //sdpMid: event.candidate.sdpMid,
      //sdpMLineIndex: event.candidate.sdpMLineIndex 
    });
  }
}


this.handleICEConnectionStateChangeEvent = function handleICEConnectionStateChangeEvent(event) {
     
      // console.log("handleICEConnectionStateChangeEvent>>this>>", this);
  log("*** ICE connection state changed to " + this.myPeerConnection.iceConnectionState);
  // checking, connecting , connected
  switch(this.myPeerConnection.iceConnectionState) { 
    case "failed":
     this.closeVideoCall();
      break;
    case "closed":
    case "disconnected":    
    // want to examine before..
       // closeVideoCall();      
      break;
  }
}

this.handleICEGatheringStateChangeEvent = function handleICEGatheringStateChangeEvent(event) {
  //if(!this.myPeerConnection)  console.log("handleICEGatheringStateChangeEvent>>this>>", this);
  log("*** ICE gathering state changed to: " + this.myPeerConnection.iceGatheringState);
  // statee like >>  "gathering", "complete"
  if(this.myPeerConnection.iceGatheringState == "complete")
  {
   // maybe now send it ???
   // console.log("...now ...creating offer ");
 //  var offer = await this.myPeerConnection.createOffer();  
 //  await this.myPeerConnection.setLocalDescription(offer);
      
      /*
    var selectedUserName = this.targetUsername ? this.targetUsername : GetSelectedUserOrAnybody();
    log("---> Sending the offer to the remote peer: " + selectedUserName);
    sendToServer({
      name: gl_lastUsedName,
      targetname: selectedUserName,
      type: "offer",
      sdp: this.myPeerConnection.localDescription  
    });
    */
    
  }
}

// Set up a |signalingstatechange| event handler. This will detect when
// the signaling connection is closed.
//
// NOTE: This will actually move to the new RTCPeerConnectionState enum
// returned in the property RTCPeerConnection.connectionState when
// browsers catch up with the latest version of the specification!
this.handleSignalingStateChangeEvent = function(event) {
//console.log("handleSignalingStateChangeEvent >> ", this);         // again somehow this is internal of the peer instance..


  log("*** WebRTC signaling state changed to: " + this.myPeerConnection.signalingState);
  switch(this.myPeerConnection.signalingState) {
    case "closed":
      // wait a minut...
      // closeVideoCall();
      
      break;
      
    case "have-local-offer":
      // consider using that...
      break;
   
   case "have-remote-offer":
      break;   
      
    case "stable":
      break;
    
    default:
    break;  
  }
}

   
// Called by the WebRTC layer to let us know when it's time to
// begin, resume, or restart ICE negotiation.
this.handleNegotiationNeededEvent = async function() {
  log("*** Negotiation needed event onnegotiationneeded");

  try {
    log("---> Creating offer");
  //  if(this.myPeerConnection == undefined)
    //     this.myPeerConnection = this;
                     
//   console.log("this.myPeerConnection>>", this);            // somehow binded to self..and this referes insta od rpcp... not his class.
    var offer = await this.myPeerConnection.createOffer();

    // If the connection hasn't yet achieved the "stable" state,
    // return to the caller. Another negotiationneeded event
    // will be fired when the state stabilizes.

    if (this.myPeerConnection.signalingState != "stable") {
      log("     -- The connection isn't stable yet; postponing...")
      return;
    }

    // Establish the offer as the local peer's current
    // description.

    log("---> Setting local description to the offer");
    await this.myPeerConnection.setLocalDescription(offer);

    // Send the offer to the remote peer.
    
    var selectedUserName = this.targetUsername ? this.targetUsername : GetSelectedUserOrAnybody();

    log("---> Sending the offer to the remote peer: " + selectedUserName);
    sendToServer({
      name: gl_lastUsedName,
      targetname: selectedUserName,
      type: "offer",
      sdp: this.myPeerConnection.localDescription  
    });
   
  }
   catch(err) {
    log("*** The following error occurred while handling the negotiationneeded event:");
    reportError(err);
  };
}


this.handleTrackEvent = function handleTrackEvent(event) {
  log("*** Track event ");
  
  //document.getElementById("remote_cam").srcObject =  event.streams[0][0] != null ?  event.streams[0][0] : event.streams[0];
  var remoKaam = document.getElementById("remote_cam");
  if(remoKaam.srcObject!=null)
  {
    if(remoKaam.srcObject.active != true)
      remoKaam.srcObject = event.streams[0];
   // else
     // console.log("..already have remotecam stream ...",event.streams);
  }
  else
    remoKaam.srcObject = event.streams[0][0] != null ?  event.streams[0][0] : event.streams[0]; 

  if(event.streams.forEach)
  {
   event.streams.forEach(brimrim => {
      incomingTrack.push(brimrim);
   });   
  }
  else
      incomingTrack.push(event.streams);  
  //document.getElementById("hangup-button").disabled = false;
}
// ########  peercon event handler area end #######


// Close the RTCPeerConnection and reset variables so that the user can
// make or receive another call if they wish. This is called both
// when the user hangs up, the other user hangs up, or if a connection
// failure is detected.
this.closeVideoCall = function closeVideoCall() {
  var localVideo = document.getElementById("local_cam");

  log("--------------Closing the call------------------");

  // Close the RTCPeerConnection

  if (this.myPeerConnection) {
    log("--> Closing the peer connection");

    // Disconnect all our event listeners; we don't want stray events
    // to interfere with the hangup while it's ongoing.

    this.myPeerConnection.ontrack = null;
    this.myPeerConnection.onnicecandidate = null;
    this.myPeerConnection.oniceconnectionstatechange = null;
    this.myPeerConnection.onsignalingstatechange = null;
    this.myPeerConnection.onicegatheringstatechange = null;
    this.myPeerConnection.onnotificationneeded = null;

    // Stop all transceivers on the connection

    this.myPeerConnection.getTransceivers().forEach(transceiver => {
      transceiver.stop();
    });

    // Stop the webcam preview as well by pausing the <video>
    // element, then stopping each of the getUserMedia() tracks
    // on it.

    if (localVideo.srcObject) {
      localVideo.pause();
      localVideo.srcObject.getTracks().forEach(track => {
        track.stop();
      });
    }

    // Close the peer connection

    this.myPeerConnection.close();
    this.myPeerConnection = null;
    this.webcamStream = null;
  }

  // Disable the hangup button
 // document.getElementById("hangup-button").disabled = true;
  //this.targetUsername = null;
}

// Handle the "hang-up" message, which is sent if the other peer
// has hung up the call or otherwise disconnected.

this.handleHangUpMsg = function handleHangUpMsg(msg) {
  log("*** Received hang up notification from other peer");

  this.closeVideoCall();
}



this.handleVideoOfferMsg = async function handleVideoOfferMsg(msg) {
  this.targetUsername = msg.name;
  preSelectUserInButList(this.targetUsername);
  var offerORanswer = "offer";
  offerORanswer = msg.type;
  // If we're not already connected, create an RTCPeerConnection
  // to be linked to the caller.

  log("handleVideoOfferMsg Received video chat: "+offerORanswer+" from " + this.targetUsername);
  if (!this.myPeerConnection) {
  console.log("myPeerConnection is null ..creating first...");
    this.createPeerConnection();
  }

  // We need to set the remote description to the received SDP offer
  // so that our local WebRTC layer knows how to talk to the caller.

  var desc = new RTCSessionDescription(msg.sdp);

  // If the connection isn't stable yet, wait for it...

  if (this.myPeerConnection.signalingState != "stable") 
  {
    log("------ UNSTABLE - But the signaling state isn't stable, so triggering rollback, curentSignalState:" + this.myPeerConnection.signalingState);

    // Set the local and remove descriptions for rollback; don't proceed
    // until both return.
    await Promise.all([
      this.myPeerConnection.setLocalDescription({type: "rollback"}),
      this.myPeerConnection.setRemoteDescription(desc)
    ]);
    
    console.log("----AFTER ROLLBACk---- nam:",gl_lastUsedName);
    
    return;
    
  } 
  else 
  {
    log ("  - Setting remote description by incoming OFFER... while already have remodescr: " + (this.myPeerConnection.remoteDescription != null));
  //  console.log("setting REMOTE descripiton by recived remote OFFER !!....",desc);
 // if(this.myPeerConnection.remoteDescription == null)
    await this.myPeerConnection.setRemoteDescription(desc);
  }
  
   // Get the webcam stream if we don't already have it 
  if (!this.webcamStream) 
  {
    try {
      this.webcamStream = await navigator.mediaDevices.getUserMedia(this.mediaConstraints);
    }
    catch(err) 
    {
      //handleGetUserMediaError(err);
      console.log("zeror during obtaingn mediaDejviice.. :%o , ...closing vidcaals..", err);
      this.closeVideoCall();
      return;
    }

    document.getElementById("local_cam").srcObject = this.webcamStream;

    // Add the camera stream to the RTCPeerConnection
    console.log("addin local streams to peerConection..");
    
    try {
      this.webcamStream.getTracks().forEach(
        this.transceiver = track => this.myPeerConnection.addTransceiver(track, {streams: [this.webcamStream]})
      );
    } 
    catch(err) 
    {
     // handleGetUserMediaError(err);
     console.log("err when adding local streamTracks do peerConne : ",err);
     this.closeVideoCall();
    }
  }

  log("---> Creating and sending answer to caller:" + this.targetUsername + ",  ...and setting localDescr by the VERY answear we created and WILL send..");

 //  console.log("..responding to remote offer by creating answer and and use it for SETTING local desription...");
   
  await this.myPeerConnection.setLocalDescription(await this.myPeerConnection.createAnswer());
    
    // since we ar e in video offer event..we should figure out who is calling us...
  //var selectedUser = GetSelectedUserOrAnybody();

  sendToServer({
    name: gl_lastUsedName,
    targetname: this.targetUsername,
    type: "answer",
    sdp: this.myPeerConnection.localDescription
  });
  
}

// Responds to the "video-answer" message sent to the caller
// once the callee has decided to accept our request to talk.

this.handleVideoAnswerMsg = async function handleVideoAnswerMsg(msg) {
  log("*** Call recipient has accepted our call who:" + msg.name);
  // Configure the remote description, which is the SDP payload
  // in our "video-answer" message.
  var desc = new RTCSessionDescription(msg.sdp);
  console.log("setting REMOTE descripiton by recived remote ANSWER....",desc);
  if(this.myPeerConnection)
  {
   await this.myPeerConnection.setRemoteDescription(desc).catch(reportError);
  }
}

// A new ICE candidate has been received from the other peer. Call
// RTCPeerConnection.addIceCandidate() to send it along to the
// local ICE framework.

this.handleNewICECandidateMsg = async function handleNewICECandidateMsg(msg) {
  var candidate = new RTCIceCandidate(msg.candidate);

  candidatess.push(candidate); //(e.candidate);
  var tehdajDex = candidatess.length - 1;

  log("*** Adding received ICE candidate: " + JSON.stringify(candidate));
  /*
  if(this.myPeerConnection.connectionState == "connected")
  {
      console.log("since we already are ...connected..., .wont atempt to add incoming candidate:%o, at index:%o", candidate, tehdajDex);
      return;
  }
  */
  
  try 
  {
    await this.myPeerConnection.addIceCandidate(candidate)
  } 
  catch(err) 
  {
    reportError("inside handleVideoAnswerMsg during addIceCandidate " + err);
  }
}

// hangup localy and also notifies remote he is no longer funny...
this.hangUpCall = function() {
  this.closeVideoCall();

  var selectedUser = this.targetUsername ? this.targetUsername : GetSelectedUserOrAnybody();	
  sendToServer({
    name: gl_lastUsedName,
    targetname: selectedUser,
    type: "hang-up"
  });
  
  if(localStreams)
  {
    STOPallTracksInStream(localStreams, true);  
  }
  
}

}     // ..end of capicaaler  .. the MDNrtc 











// NOT perfect negotitation ...but ...most simplest.... just one offer -answer 
// ...but its crucial that localStreams area already pregadhered...only disabled for moment..

async function temporialWSonmsg(mesuge)
{
   if(mesuge.data)
   {
      if(mesuge.data == cipACKok)
      {
         return;
      }     
      
      var ojebanyObjekt = JSonSafePrase(mesuge.data);
      if(ojebanyObjekt)
      {
         var tupee = ojebanyObjekt["type"]; 
         
         switch(tupee)
         {
         
         case "prepmedia":
         {
            sselectedUser = ojebanyObjekt["name"];
          // ..sadly getting >>  A window.confirm() dialog generated by this page was suppressed because this page is not the active tab of the front... 
          // ..so cant uuse confirm !!
          // same gous for prompt and alert
            if(!confirm(sselectedUser +" is calling you, do you Accept ?"))
            {
              sendToServer({
                  name: gl_lastUsedName,
                  type: "response",
                  targetname: sselectedUser,
                  value: "call rejected"                   
                }); 
              return;
            }

            preSelectUserInButList(sselectedUser);
            if(localStreams != null)
               STOPallTracksInStream(localStreams);
            localStreams = await navigator.mediaDevices.getUserMedia(MDNrtc.mediaConstraints);
            if(localStreams == null)console.log("...NOOO local streams obtained ..!!! nothing to send to remote side...");
            sendToServer({
                  name: gl_lastUsedName,
                  type: "prepmedia-done",
                  targetname: sselectedUser,
                  success: (localStreams != null)    
                });              
         }break;
         case "prepmedia-done":
         {
            sselectedUser = ojebanyObjekt["name"];
            // ...continute caaaling ..
            if(ojebanyObjekt["success"] != true)
            {
                  console.log("at respons  prepmedia-done ...REMOTE SIDE FAILED to obtain any streams !!! ");
            }
            else
            {
                    await steppingRTC(true);
            }
            
         }break;
         
         case "offer":
            {
              sselectedUser = ojebanyObjekt["name"];
              preSelectUserInButList(sselectedUser);
              
              if(localStreams == null)
                  localStreams = await navigator.mediaDevices.getUserMedia(MDNrtc.mediaConstraints);
               
              if(rtcp != null)
               console.log("when incoming offer.. local rtcp is NOT NULL ..!!!...");
              else
              {
               await makePeerCon();
               console.log("local peer con made because offer...");
              }
            
               var cusenders = rtcp.getSenders();
               // maybe do it like that >>>> 
                /*  cusenders.forEach(cender => {
                     var posiblej = localStreams.getTrackById(cender.track.id);
                     if(!posiblej)
                        console.log("NO tracks from local stream are on sender:",cender);  // ..therefore is safe to to add track to rtcp
                  })   */
                  
               localStreams.getTracks().forEach(prak => {
                 
                  if(cusenders != null && cusenders.length > 0)
                  {
                     var senderWithThatTrack = cusenders.find(coho => coho.track && coho.track.id == prak.id);
                     if(senderWithThatTrack != null)
                     {
                      //  console.log("this stream track:%o is already added to rtcp sendedr:%o",prak,senderWithThatTrack);
                        return;
                     }
                  }
               
                console.log("adding local streamTrak:%o to rtcp senders",prak);
                 var zblitk = rtcp.addTrack(prak, localStreams);
                 rtSenders.push(zblitk);                 
               });
               
               var shalowOffer = {type: 'offer', sdp: ojebanyObjekt.sdp};      
               await rtcp.setRemoteDescription(shalowOffer);
               var answr = await rtcp.createAnswer();
               
               sendToServer({
                  name: gl_lastUsedName,
                  type: "answer",
                  targetname: sselectedUser,
                  sdp: answr.sdp      
                });
               
               await rtcp.setLocalDescription(answr); 
                                
            }break;
      
         case "answer":
            {
               if(rtcp == null)
               {   
                  console.log("when incoming answer.. local rtcp is  NULL ..!!!...");
                  return;
               } 
               var shalowAnswer = {type: 'answer', sdp: ojebanyObjekt.sdp};  
               await rtcp.setRemoteDescription(shalowAnswer);      
                     
            }break;
      
         case "candidate":
            {
               if(rtcp == null)
               {   
                  console.log("when incoming candidate.. local rtcp is NULL ..!!!...");
                  return;
               }
              
               candidatess.push(ojebanyObjekt.candidate);
               console.log("..ws signaled incoming CANDY :",ojebanyObjekt.candidate);
               
               if(ojebanyObjekt.candidate == null || !ojebanyObjekt.candidate.candidate)
               {
                  await rtcp.addIceCandidate(null);
               }
               else
               {
                  var rebornCandy = new RTCIceCandidate(ojebanyObjekt.candidate);                  
                  //candidatess.push(rebornCandy);
                  //if(rtcp.connectionState == "connected")return;
                  await rtcp.addIceCandidate(rebornCandy);

               }  
                 
            }break;
            
            case "close":
            case "hang":
            {
                StopKill_rtcp();
            }break;


            case "codec-change":
               {
                  if(rtcp == null)return;

                  var desire = ojebanyObjekt["value"];
                   sselectedUser = ojebanyObjekt["name"];

                   if(Array.isArray(desire))
                   {
                   //  console.log("multi codec desure >>>  ", desire);
                     desire.forEach(osire => {
                       // changeVideoCodec(osire,rtcp);
                        changeCodecRCVonly(osire,rtcp);
                     });
                   }
                   else
                   {
                   //  changeVideoCodec(desire,rtcp);
                     changeCodecRCVonly(desire,rtcp);
                   }

               sendToServer({
                  name: gl_lastUsedName,
                  type: "codec-done",
                  targetname: sselectedUser,
                  value: desire   
                });

               }break;

            case "codec-done":
              {
               // then lets koroze ..??
               if(rtcp == null)return;
               var fromUserName = ojebanyObjekt["name"];
               if(fromUserName != sselectedUser)
               {
                  console.log("recieved codec-done, ...but from diferent name than expected !! >> incomingOrigin:%s, ourSelected:%s", fromUserName,sselectedUser);
               }
               var desire = ojebanyObjekt["value"];
               console.log("after remote side confirmed codec change to:%s, going to triger koroze and reconect !!",desire);
              
               await korozeOffer(rtcp);

              }break;
         
            default:
            {
               Wos_onMessage(mesuge); 
            }break;
         }
          
      }       
   }
}

if(globalThis.gl_steppingver == true)
{

// temporial rewrit..reasign....
setTimeout(() => {
// reasing ws mesaging..
globalThis.gl_wosocko.onmessage = function(mesuge){  temporialWSonmsg(mesuge); }
// original was... // globalThis.gl_wosocko.onmessage = function(mesuge){  Wos_onMessage(mesuge); }

//call_btn
globalThis.halooCaal = async function halooCaal(e){
   console.clear();
   await steppingRTC()
}
// hang but
// or ..just replace the func curently called by hangbut
globalThis.halooHang = async function halooHang(e){
   // if conection never happend ..or already killed by already issued hang kill call...
   // the assumning its mnt to also take care of localstream !!!
   if(rtcp == null)
   {
      if(localStreams)
      {
         STOPallTracksInStream(localStreams);
         localStreams = null;
      }
   }

   if(sselectedUser)
      sendToServer({
            name: gl_lastUsedName,
            type: "hang",
            targetname: sselectedUser      
          });
                     
   StopKill_rtcp();
  // STOPallTracksInStream(localStreams)     // ..with stop of tracks
}
// ...reforce >>
  /* navigator.mediaDevices.getUserMedia(MDNrtc.mediaConstraints).then(postrem => { 
    localStreams = postrem; 
    localStreams.getTracks().forEach(prakk => {       
        prakk.enabled = false;
      });
   }); */
}, 1500);

}

var rtcp = null;
var sselectedUser = "";
var rtSenders = [];
var rtReceivers = [];
var rtTransivers = [];


function makePeerCon()
{
   if(MDNrtc.ConCfg.iceServers.length > 1)
   {
      if(window.location.hostname.startsWith("91.139.6.78"))
         MDNrtc.ConCfg.iceServers = [ MDNrtc.ConCfg.iceServers[0] ];       // 0 for external acces, .. 1 for internal network ... or keep bot for internal...
      else if(window.location.hostname.startsWith("192.168.166."))
         MDNrtc.ConCfg.iceServers = [ MDNrtc.ConCfg.iceServers[1] ];
      else if(window.location.hostname.startsWith("127.0.0"))
      {
       // then keep both...      
      }      
   }   
   rtcp = new RTCPeerConnection(MDNrtc.ConCfg);
   attachRTCallEvents(rtcp,true);
    
   rtcp.onicecandidate = function(e){
   
      console.log("local candy to send:",e.candidate);
      candidatess.push(e.candidate);
      sendToServer({
         name: gl_lastUsedName,
         type: "candidate",
         targetname: sselectedUser,
         candidate: e.candidate      
       });
   }  
   
   rtcp.onicegatheringstatechange = function(e){
      // gathering  complete
      console.log("gadhering:",rtcp.iceGatheringState);
      //if(rtcp.iceGatheringState == "complete")      
   }
   rtcp.onnegotiationneeded = function(e){
      console.log("rtcp onnegotiationneeded ..",e);
      // here will be trigered after we set some codec preference...restart ice ? renegotiate con ?
   }
      
   rtcp.ontrack = function(e){
   
      console.log("rtcp ontrack >>>: ",e.streams);
      incomingTrack.push(e.streams[0]);
      remote_cam.srcObject = e.streams[0];
    
      rtReceivers.push(e.transceiver.receiver);
    //  if(supportsSetCodecPreferences)
      //   resolveCudecPrefFor(e)
   // if(rtcp.connectionState == "connected")
      podium_inner_cam.classList.toggle("on-call",true);
 //   else
   //  console.log("..not yett connected...");
   }
   
   rtcp.onconnectionstatechange = function(event){
      var relatedPeerconection = event.explicitOriginalTarget ? event.explicitOriginalTarget : event.target;
      console.log("onconnectionstatechange >> to: ", relatedPeerconection.connectionState);
      if(relatedPeerconection.connectionState == "connected")
      {
         localStreams.getTracks().forEach(prakk => {      
           prakk.enabled = true;
         });
         
         if(localStreams != null && local_cam)
         {
            local_cam.srcObject = new MediaStream(localStreams.getVideoTracks());
         }

        setTimeout(() => {
          if (relatedPeerconection && relatedPeerconection.connectionState == "connected" && relatedPeerconection.signalingState == "stable") {
            setDeBandwidth(750).then(limiten => {
                console.log("limiting bandwidth to 750");
            });
          }
        }, 1100);
      }
      else if(relatedPeerconection.connectionState == "failed")
      {
         // ..in theory ..we can try 
         //  >>>  rtcp.restartIce(); ...but we have to call ourselfs the ofer and whole negotiation proces again..
         rtcp.restartIce();
        //StopKill_rtcp();
      }
   }  
}

function StopKill_rtcp()
{ 
   if(rtcp != null)
   {
    console.log("colosing killing nulling...");
    rtcp.close();
    rtcp = null;
  
  podium_inner_cam.classList.toggle("on-call",false)
   }
   
   if(localStreams)
   {   
      localStreams.getTracks().forEach(prakk => {     
         prakk.enabled = false;
       //  prakk.stop();
      }); 
   }  

   if(remote_cam && remote_cam.srcObject)
      STOPallTracksInStream(remote_cam.srcObject);
      
    incomingTrack.forEach(once => { STOPallTracksInStream(once); });
    incomingTrack = [];
    candidatess = [];
    rtSenders = [];  
    rtReceivers = [];
    rtTransivers = [];
}

async function steppingRTC(fejzTwo)
{
  if(!fejzTwo)
  {
      sselectedUser = GetSelectedUserOrAnybody();
   
      if(rtcp != null)
      {
         StopKill_rtcp();
      sendToServer({
            name: gl_lastUsedName,
            type: "hang",
            targetname: sselectedUser      
          });  
       return;
      }
   }

//MDNrtc.ConCfg.iceServers.shift();
// or..
//if(MDNrtc.ConCfg.iceServers.length > 1)
  // MDNrtc.ConCfg.iceServers = [ MDNrtc.ConCfg.iceServers[1] ];
  // ...moved to  makePeerCon ..
   
if(localStreams != null)
{
   localStreams.getTracks().forEach(prakk => {
     prakk.enabled = true;     
   });
}

if(!fejzTwo)
{
 // ...signal first to prep media for local streams...
   sendToServer({
      name: gl_lastUsedName,
      targetname: sselectedUser,
      type: "prepmedia"
    });   
return;
}
   
await makePeerCon();

//rtcp = new RTCPeerConnection(MDNrtc.ConCfg)
//attachRTCallEvents(rtcp,true);
if(localStreams == null)
   localStreams = await navigator.mediaDevices.getUserMedia(MDNrtc.mediaConstraints);
   
localStreams.getTracks().forEach(prak => {
  
  var zblitk = rtcp.addTrack(prak, localStreams);
  rtSenders.push(zblitk);
  
});

var puffer = await rtcp.createOffer();

   sendToServer({
      name: gl_lastUsedName,
      targetname: sselectedUser,
      type: "offer",
      sdp: puffer.sdp  
    });

// that >> will triger whol variete of events.. like > onsignalingstatechange, onicegatheringstatechange, onicecandidate  
rtcp.setLocalDescription(puffer).then(() => {
  console.log("our offer has ben set as loccal descr..to peer conn");
         
});


}

// ment for trigering renegotiation///
async function korozeOffer(sRtcp)
{
   var puffer = await sRtcp.createOffer();

   sendToServer({
      name: gl_lastUsedName,
      targetname: sselectedUser,
      type: "offer",
      sdp: puffer.sdp  
    });
   rtcp.setLocalDescription(puffer).then(() => {
      //console.log("our offer has ben set as loccal descr..to peer conn");  
   });
}
// ..not used
function reKorozeOffer(sRtcp)
{
  sRtcp.createOffer().then((offer) => sRtcp.setLocalDescription(offer)).then(() =>
      sendToServer({
         name: gl_lastUsedName,
         targetname: sselectedUser,
         type: "offer",
         sdp: sRtcp.localDescription.sdp
      })
    ).catch((err) => {
    console.log("reKorozeOffer Errr>> ",err);
    });
}



// obviously not avviable in my firefox.... some is in chrome...

const supportsSetCodecPreferences = window.RTCRtpTransceiver &&
  'setCodecPreferences' in window.RTCRtpTransceiver.prototype;
function aboutCodecPrefs()
{
// https://getstream.io/resources/projects/webrtc/advanced/codecs/

var ssupportsSetCodecPreferences = window.RTCRtpTransceiver &&
  'setCodecPreferences' in window.RTCRtpTransceiver.prototype;

const videoTransceiver = rtcp.addTransceiver('video');
const codecs = RTCRtpSender.getCapabilities('video').codecs.filter(
  codec => codec.mimeType === 'video/H264'
);
videoTransceiver.setCodecPreferences(codecs);


const audioTransceiver = rtcp.addTransceiver('audio');
audioTransceiver.setCodecPreferences([
  {
    mimeType: 'audio/opus',
    clockRate: 48000,
    channels: 2,  // Required for stereo=1 to work in Chrome/Edge
    sdpFmtpLine: 'minptime=10;useinbandfec=1;stereo=1'
  }
]);

// Check if AV1 is supported
function isAV1Supported() {
  const capabilities = RTCRtpSender.getCapabilities('video');
  return capabilities.codecs.some(codec => 
    codec.mimeType.toLowerCase() === 'video/av1');
}

// Prioritize AV1 if available
if (isAV1Supported()) {
  const av1Codecs = RTCRtpSender.getCapabilities('video').codecs
    .filter(codec => codec.mimeType.toLowerCase() === 'video/av1');
  videoTransceiver.setCodecPreferences(av1Codecs);
}

  const videoCodecs = RTCRtpSender.getCapabilities('video').codecs;
  const audioCodecs = RTCRtpSender.getCapabilities('audio').codecs;
    // Prioritize H.264 for hardware acceleration on low-end devices
    // ...so assuming h.264 is better for network 
    
    function preferCodec(codecs, mimeType) {
  let otherCodecs = [];
  let sortedCodecs = [];
  let count = codecs.length;

  codecs.forEach((codec) => {
    if (codec.mimeType === mimeType) {
      sortedCodecs.push(codec);
    } else {
      otherCodecs.push(codec);
    }
  });

  return sortedCodecs.concat(otherCodecs);
}

// https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Formats/WebRTC_codecs    
 async function chachange_VideoCodec(mimeType) {
  const transceivers = rtcp.getTransceivers();
  rtTransivers = transceivers;

  transceivers.forEach((transceiver) => {
    const kind = transceiver.sender.track.kind;
    let sendCodecs = RTCRtpSender.getCapabilities(kind).codecs;
    let recvCodecs = RTCRtpReceiver.getCapabilities(kind).codecs;

    if (kind === "video") {
      sendCodecs = preferCodec(sendCodecs, mimeType);
      recvCodecs = preferCodec(recvCodecs, mimeType);
      transceiver.setCodecPreferences([...sendCodecs, ...recvCodecs]);
    }
  });

  rtcp.onnegotiationneeded();
//  await korozeOffer(rtcp)
}
 // video/AV1

 //const [transceiver1] = rtcp.getTransceivers();
// const codecs1 = RTCRtpReceiver.getCapabilities("video").codecs;   
// https://blog.mozilla.org/webrtc/cross-browser-support-for-choosing-webrtc-codecs/
}




async function gadherAviableCodecs() {
  if (!supportsSetCodecPreferences) {
    console.log("..seems we cant do anything with codecs...");
    return;
  }
// video part...
  if(!globalThis.cudecsOptionsVideo)
   globalThis.cudecsOptionsVideo = document.createElement("select");
  if(cudecsOptionsVideo.children.length != 1)
   {
      cudecsOptionsVideo.innerHTML = "";
      var prvoZmrdo = document.createElement("option");
      prvoZmrdo.value = "Default";
      prvoZmrdo.innerText = prvoZmrdo.value;
      cudecsOptionsVideo.appendChild(prvoZmrdo)
   }
  var capas = RTCRtpReceiver.getCapabilities("video");
  var coudes = capas.codecs;
  var excludedCoudes = ["video/red", "video/ulpfec", "video/rtx", "video/flexfec-03"];
  coudes.forEach((oneCudec) => {
    if (excludedCoudes.includes(oneCudec.mimeType)) {
      // console.log("skipping some anomalic codec?:",oneCudec);
      return;
    }
   // console.log("video cudec:", oneCudec.mimeType);
    var copotion = document.createElement("option");
    copotion.value = (oneCudec.mimeType + " " + (oneCudec.sdpFmtpLine || "")).trim();
    copotion.innerText = copotion.value;
    cudecsOptionsVideo.appendChild(copotion);
    copotion._relatedCodecOb = oneCudec;
  });

  // Audio part...
  if(!globalThis.cudecsOptionsAudio)
   globalThis.cudecsOptionsAudio = document.createElement("select");
  if(cudecsOptionsAudio.children.length != 1)
   {
      cudecsOptionsAudio.innerHTML = "";
      var prvoZmrdo = document.createElement("option");
      prvoZmrdo.value = "Default";
      prvoZmrdo.innerText = prvoZmrdo.value;
      cudecsOptionsAudio.appendChild(prvoZmrdo)
   }
    capas = RTCRtpReceiver.getCapabilities("audio");
    coudes = capas.codecs;
    coudes.forEach((oneCudec) =>{
   // console.log("audio cudec:", oneCudec.mimeType);
        var copotion = document.createElement("option");
    copotion.value = (oneCudec.mimeType + " " + (oneCudec.sdpFmtpLine || "")).trim();
    copotion.innerText = copotion.value;
    cudecsOptionsAudio.appendChild(copotion);
      copotion._relatedCodecOb = oneCudec;
    });
}

function applyPrefCodedcsSels(event)
{
   // like   ChangeCodecBothSides(["audio/G722", "video/H264 profile-level-id=42e01f;level-asymmetry-allowed=1;packetization-mode=1"]) 
   if(gl_prefVidCodec != null && gl_prefAudCodec != null)
   {
       ChangeCodecBothSides([gl_prefAudCodec, gl_prefVidCodec]);       
   }
}

function whenCodecOptionSel(eve) {
  var whichSelbox = eve.target;
  var opocnoNavalo = whichSelbox.selectedOptions[0].value;
  // var thyyCodec = whichSelbox.selectedOptions[0]._relatedCodecOb;
  //  console.log("for %s codec option selected:%s , thycodec:%o",whichSelbox.name, opocnoNavalo, thyyCodec);
  if (whichSelbox.name == "video") {
    gl_prefVidCodec = opocnoNavalo;
    //   ChangeCodecBothSides(gl_prefVidCodec);
  } else if (whichSelbox.name == "audio") {
    gl_prefAudCodec = opocnoNavalo;
  }
}

setTimeout(() => {
  if(supportsSetCodecPreferences)
    gadherAviableCodecs();
   else
    applySelCodecs.disabled = true;
}, 10);

// called from event of ontrack of peercon
function resolveCudecPrefFor(e)
{
  // console.log("-------resolving pref codec for incoming track event:",e);
    if (e.track.kind === 'video')
    {
      resolveCudecPrefForVideo(e);
    }
    else if(e.track.kind == "audio")
    {
   //  resolveCudecPrefForAudio(e);
    }
    else
    {
      console.log("...no track kind !!",e);
    }
}
var gl_prefVidCodec = null;   // napr "video/H264 profile-level-id=42001f;level-asymmetry-allowed=1" 
var gl_prefAudCodec = null;   // napr "audio/G722" 
function resolveCudecPrefForVideo(e)
{
 var preferredVidoCodecOpotion = cudecsOptionsVideo.options[cudecsOptionsVideo.selectedIndex];
 var [mimeType, sdpFmtpLine] = preferredVidoCodecOpotion.value.split(' ');
 var cudecOb = null;
 var aviabcodecs = RTCRtpReceiver.getCapabilities('video').codecs;
 var dieCindex = -1;
   if(preferredVidoCodecOpotion._relatedCodecOb)
   {
      cudecOb = preferredVidoCodecOpotion._relatedCodecOb;
      dieCindex = aviabcodecs.findIndex(c => c.mimeType === cudecOb.mimeType && c.sdpFmtpLine === cudecOb.sdpFmtpLine);
   }
   else
   {      
        dieCindex = aviabcodecs.findIndex(c => c.mimeType === mimeType && c.sdpFmtpLine === sdpFmtpLine);       
   }
   
   if(dieCindex > -1)
    {
        cudecOb = (cudecOb == null) ? aviabcodecs[dieCindex] : cudecOb;
            // ..cutting it from the aviable arra and putting it on start of it ..as the transiever require whole arr of codecs..
            // ..so by putting our pref on top ...it should be preff..
         aviabcodecs.splice(dieCindex,1);
         aviabcodecs.unshift(cudecOb);
    }
   
   if(cudecOb != null)
   {
      e.transceiver.setCodecPreferences(aviabcodecs);
      console.log('Receiver\'s preferred video codec on top of list:', aviabcodecs[0]);
   }
}
function resolveCudecPrefForAudio(e)
{
 var preferredAudoCodecOpotion = cudecsOptionsAudio.options[cudecsOptionsAudio.selectedIndex];
 var mimeType = preferredAudoCodecOpotion.value;
 var cudecOb = null;
 var aviabcodecs = RTCRtpReceiver.getCapabilities('audio').codecs;
 var dieCindex = -1;
   if(preferredAudoCodecOpotion._relatedCodecOb)
   {
      cudecOb = preferredAudoCodecOpotion._relatedCodecOb;
      dieCindex = aviabcodecs.findIndex(c => c.mimeType === cudecOb.mimeType);
   }
   else
   {      
        dieCindex = aviabcodecs.findIndex(c => c.mimeType === mimeType);       
   }
   
   if(dieCindex > -1)
    {
        cudecOb = (cudecOb == null) ? aviabcodecs[dieCindex] : cudecOb;
            // ..cutting it from the aviable arra and putting it on start of it ..as the transiever require whole arr of codecs..
            // ..so by putting our pref on top ...it should be preff..
         aviabcodecs.splice(dieCindex,1);
         aviabcodecs.unshift(cudecOb);
    }
   
   if(cudecOb != null)
   {
      e.transceiver.setCodecPreferences(aviabcodecs);
      console.log('Receiver\'s preferred audio codec on top of list:', aviabcodecs[0]);
   }
}


// "video/H264 profile-level-id=42e01f;level-asymmetry-allowed=1" 


function preferCodec(codecs, mimeType) {
  let otherCodecs = [];
  let sortedCodecs = [];
  let count = codecs.length;
  var posible_dpFmtpLine = null;
  // if passed mime with sdpFmtpLine and so oon...
  if(mimeType.includes(" "))
  {
      var mimAsdpFmtpLine = mimeType.split(" ").filter(tho => tho);
      posible_dpFmtpLine = mimAsdpFmtpLine[1];
      mimeType = mimAsdpFmtpLine[0]; 
  }

  codecs.forEach((codec) => {
    if (codec.mimeType === mimeType) {
      sortedCodecs.push(codec);
    } else {
      otherCodecs.push(codec);
    }
  });

  if(posible_dpFmtpLine != null)
  {
     var specifex = sortedCodecs.findIndex(spenz => spenz.sdpFmtpLine && spenz.sdpFmtpLine == posible_dpFmtpLine);
     if(specifex > -1)
     {
      var vipBuzerant = sortedCodecs.splice(specifex,1);
      sortedCodecs.unshift(vipBuzerant[0]);
     }
  }

  return sortedCodecs.concat(otherCodecs);
}

// changeCodecRCVonly("video/H264",rtcp);

function changeCodecRCVonly(mimeType, ofThatRtcp){
  const transceivers = ofThatRtcp.getTransceivers();
    transceivers.forEach((transceiver) => {
    const kind = transceiver.sender.track.kind;
    let recvCodecs = RTCRtpReceiver.getCapabilities(kind).codecs;

      if (kind === "video" && mimeType.includes("video")) {
        recvCodecs = preferCodec(recvCodecs, mimeType);
        transceiver.setCodecPreferences([...recvCodecs]);
      }
      else if(kind == "audio" && mimeType.includes("audio")){
        recvCodecs = preferCodec(recvCodecs, mimeType);
        transceiver.setCodecPreferences([...recvCodecs]);
      }
    });
    ofThatRtcp.onnegotiationneeded();
}

function changeVideoCodec(mimeType, ofThatRtcp) {
  const transceivers = ofThatRtcp.getTransceivers();

  transceivers.forEach((transceiver) => {
    const kind = transceiver.sender.track.kind;
    // ..on the mobile side this will caus killing the video stream..
    let sendCodecs = RTCRtpSender.getCapabilities(kind).codecs;
    let recvCodecs = RTCRtpReceiver.getCapabilities(kind).codecs;

    if (kind === "video" && mimeType.includes("video")) {
      sendCodecs = preferCodec(sendCodecs, mimeType);
      recvCodecs = preferCodec(recvCodecs, mimeType);
        console.log("++setting VIDEO codecs pref to:%o , with send:%o, rec:%o",transceiver, sendCodecs, recvCodecs);
      transceiver.setCodecPreferences([...sendCodecs, ...recvCodecs]);
    }
    else if(kind == "audio" && mimeType.includes("audio"))
    {
      sendCodecs = preferCodec(sendCodecs, mimeType);
      recvCodecs = preferCodec(recvCodecs, mimeType);
        console.log("++setting AUDIO codecs pref to:%o , with send:%o, rec:%o",transceiver, sendCodecs, recvCodecs);
      transceiver.setCodecPreferences([...sendCodecs, ...recvCodecs]);
    }

  });
  ofThatRtcp.onnegotiationneeded();
  // ..or maybe directly  
 // korozeOffer(rtcp)
 //  await getOutboundCodecStat(rtcp)
}
// ..like  changeVideoCodec("video/H264",rtcp)    
// ..or  changeVideoCodec("video/VP8",rtcp)     
// ..or  changeVideoCodec("video/AV1",rtcp) 
 // ChangeCodecBothSides(["audio/G722", "video/H264 profile-level-id=42e01f;level-asymmetry-allowed=1;packetization-mode=1"]) 
 // ChangeCodecBothSides(["audio/G722", "video/H264"]);

// uses signaling ws to made same change on remote..then 
// on incoming codec-done should triger the reconnect nego
function ChangeCodecBothSides(mimeTypeDesire)
{
   if(rtcp == null)return;

   if(Array.isArray(mimeTypeDesire))
   {
      mimeTypeDesire.forEach(oneMyme => {
          //changeVideoCodec(oneMyme,rtcp);
          changeCodecRCVonly(oneMyme, rtcp);
      });
   }
   else
   {
      //changeVideoCodec(mimeTypeDesire,rtcp);
      changeCodecRCVonly(mimeTypeDesire, rtcp);
   }
    sselectedUser = GetSelectedUserOrAnybody();
            sendToServer({
                  name: gl_lastUsedName,
                  type: "codec-change",
                  targetname: sselectedUser,
                  value: mimeTypeDesire   
                });

}
//  ChangeCodecBothSides(["audio/G722", "video/H264"]) 
//  ChangeCodecBothSides(["audio/G722", "video/H264 profile-level-id=42e01f;level-asymmetry-allowed=1;packetization-mode=1"]) 
//  ChangeCodecBothSides("video/H264") 
 // ChangeCodecBothSides("video/AV1") 
  // ChangeCodecBothSides("video/VP8") 
    // ChangeCodecBothSides("video/VP9") 
 // "video/H264 profile-level-id=42e01f;level-asymmetry-allowed=1"
  // ChangeCodecBothSides("video/H264 profile-level-id=42001f;level-asymmetry-allowed=1;packetization-mode=1") 
  // ChangeCodecBothSides("video/H264 profile-level-id=42e01f;level-asymmetry-allowed=1;packetization-mode=1");

// ..for checking if the codec setting actualy take off...
async function getOutboundCodecStat(pc) {
  const stats = await pc.getStats();
  var arredStats = [...stats.values()];
  var filtredToOutbond = arredStats.filter(tupee => tupee.type == "outbound-rtp");
  var otbondovyKoudelky = filtredToOutbond.map(naa => stats.get(naa.codecId));  
   //console.log("sss",theyrIdes)
  return otbondovyKoudelky;
}
// like >> await getOutboundCodecStat(rtcp)


// ....bandwithing..

async function aboutBandwith(desirBandwithKB)
{
if(!desirBandwithKB)desirBandwithKB = 50;

var zunders = rtcp.getSenders()
var oprans1 = zunders[0].getParameters();
var oprans2 = zunders[1].getParameters();
oprans1.encodings[0].maxBitrate = (desirBandwithKB * 1000)
oprans2.encodings[0].maxBitrate = (desirBandwithKB * 1000)

var cozby1 = zunders[0].setParameters(oprans1);
var cozby2 = zunders[1].setParameters(oprans2);
console.log("zbylo ",cozby1,cozby2)

//var specSDP = updateBandwidthRestriction(rtcp.remoteDescription.sdp, desirBandwith);
 //await korozeOffer(rtcp);

   return rtcp.createOffer()
      .then(offer => rtcp.setLocalDescription(offer))
      .then(() => {
        const desc = {
          type: rtcp.remoteDescription.type,
          sdp: desirBandwithKB === 'unlimited' ?
          removeBandwidthRestriction(rtcp.remoteDescription.sdp) :
          updateBandwidthRestriction(rtcp.remoteDescription.sdp, desirBandwithKB)
        };
        console.log('Applying bandwidth restriction to setRemoteDescription:\n' + desc.sdp);
        return rtcp.setRemoteDescription(desc);
      })
      .catch(onSetSessionDescriptionError);
}

function onSetSessionDescriptionError(error) {
  console.log('Failed to set session description: ', error.toString());
}

function updateBandwidthRestriction(sdp, bandwidth) {
  let modifier = 'AS';
  if (adapter.browserDetails.browser === 'firefox') {
    bandwidth = (bandwidth >>> 0) * 1000;
    modifier = 'TIAS';
  }
  if (sdp.indexOf('b=' + modifier + ':') === -1) {
    // insert b= after c= line.
    sdp = sdp.replace(/c=IN (.*)\r\n/, 'c=IN $1\r\nb=' + modifier + ':' + bandwidth + '\r\n');
  } else {
    sdp = sdp.replace(new RegExp('b=' + modifier + ':.*\r\n'), 'b=' + modifier + ':' + bandwidth + '\r\n');
  }
  return sdp;
}
function removeBandwidthRestriction(sdp) {
  return sdp.replace(/b=AS:.*\r\n/, '').replace(/b=TIAS:.*\r\n/, '');
}

function setDeBandwidth(bandwidthInKbps) {
  // In modern browsers, use RTCRtpSender.setParameters to change bandwidth without
  // (local) renegotiation. Note that this will be within the envelope of
  // the initial maximum bandwidth negotiated via SDP.
  if(!rtcp)return null;
  if ((adapter.browserDetails.browser === 'chrome' ||
       adapter.browserDetails.browser === 'safari' ||
       (adapter.browserDetails.browser === 'firefox' &&
        adapter.browserDetails.version >= 64)) &&
      'RTCRtpSender' in window &&
      'setParameters' in window.RTCRtpSender.prototype) {
    const sender = rtcp.getSenders()[1];
    const parameters = sender.getParameters();
    if (!parameters.encodings) {
      parameters.encodings = [{}];
    }
    if (bandwidthInKbps === 'unlimited') {
      delete parameters.encodings[0].maxBitrate;
    } else {
      parameters.encodings[0].maxBitrate = bandwidthInKbps * 1000;
    }
    console.log("seting budwih... ",parameters.encodings);
    return sender.setParameters(parameters);
  }
  else
  {
    console.log("...toto zde neeni podprdovanee...");
    return null;
  }
}
// await setDeBandwidth(500)


var peece1 = null;
var peece2 = null;
Object.defineProperty(globalThis,"preece2",{  
  get(){ 
    return window.location; 
  }, 
  set(xv){  },
  configurable:true
});

function rtcpRestart(someRtcp) {
  if (!someRtcp) someRtcp = rtcp;
  if (someRtcp == null) return;
  peece1 = someRtcp;

  var specofferOptions = {
    offerToReceiveAudio: 1,
    offerToReceiveVideo: 1,
    iceRestart: true
  };
  someRtcp.createOffer(specofferOptions).then(onhooCreateOfferSuccess,(elEr) =>{ console.log("during ice restart er:",elEr); });
}
function onhooCreateOfferSuccess(desc)
{
  console.log("offer from pc1 localrtcp:",desc.sdp);
  console.log('pc1 local setLocalDescription start');
  rtcp.setLocalDescription(desc).then(() => { console.log("pc1 setLocalDescription OK"); }, (elEr) =>{ console.log("during pc1 setLocalDescription er:",elEr);} );


  console.log('pc2 setRemoteDescription start');
  peece2.setRemoteDescription(desc).then(() => { console.log("pc2 setLocalDescription OK"); }, (elEr) =>{ console.log("during pc2 setLocalDescription er:",elEr);} );
  console.log('pc2 createAnswer start');
  // Since the 'remote' side has no media stream we need
  // to pass in the right constraints in order for it to
  // accept the incoming offer of audio and video.
  peece2.createAnswer().then(onhooCreateAnswerSuccess, (elEr) =>{ console.log("during pc2 createAnswer er:",elEr);});
}

function onhooCreateAnswerSuccess(desc) {
  console.log(`Answer from peece2:\n${desc.sdp}`);
  console.log('peece2 setLocalDescription start');
  peece2.setLocalDescription(desc).then(() => onSetLocalSuccess(peece2), onSetSessionDescriptionError);
  console.log('pc1 setRemoteDescription start');
  peece1.setRemoteDescription(desc).then(() => onSetRemoteSuccess(peece1), onSetSessionDescriptionError);

  if (useSelectedCandidatePairChange) {
    peece1.getSenders()[0].transport.iceTransport.onselectedcandidatepairchange = () => {
      checkStats(peece1);
      if (peece1.iceConnectionState === 'connected') {
        restartButton.disabled = false;
      }
    };
    peece2.getSenders()[0].transport.iceTransport.onselectedcandidatepairchange = () => {
      checkStats(peece2);
    };
  }
}






// temporialy ..
//MDNrtc.ConCfg = MDNrtc.origoConCfgArchiver();

//    ##########################################    of rtc stuff










// gloobal ws sender...precompose the transport payload , populate
function gl_SEND(whatToSendValue, mesageType)
{
   if(!whatToSendValue)return;
  
   if(!mesageType)mesageType = "general";    // letsay >> general, broadcast, chat, login, invite, offer, answear, candidates, refresh
//   var whatKindOfshitItis = typeof whatToSend;
   // object string number
    var tyranosportOb = {
      type: mesageType,
      value: whatToSendValue
    };
   gl_WSdispatchOb(tyranosportOb);
}

// END of sending chain ...expect already ezuiped object which then will be serializeed...if NOT string already..
function gl_WSdispatchOb(preparedNormalizedOb)
{
   if(!preparedNormalizedOb)return;
   if(gl_wosocko == null || gl_wosocko.readyState > 1)return;
   
   var txtedOb = "";                    
   if(typeof preparedNormalizedOb != "string")
      txtedOb = JSON.stringify(preparedNormalizedOb);
   else 
      txtedOb = preparedNormalizedOb;
   
   gl_wosocko.send(txtedOb);
}













// side idea ... since is intervals and timeouts does not passing theyr original index, we cannot be hunderpercent sure if index to be cleared is accurate..
// so ..at the expense of shifting that index by 1 we obtain most recent internal global index for timers, 
// interval and timeout is same, each will increment the global timer index no matter if some clearing happened..
function getNextIntervalIndexToBE()
{
  var tmpdex = -1;
  // .. since timeout and interval seems to have common counter ... lets rather use timeout to get it 
  // so there wont be some acidental cyclyng hanging 
// tmpdex = setInterval 
  tmpdex = setTimeout(()=>{
    clearInterval(tmpdex);
   // console.log("cleared interval/timeout of:%o, so next timerindex of any will be:%o",tmpdex,1 + tmpdex)    
  },1);
  return 1 + tmpdex;
}


  // ...can use   clearInterval(periodickClockIntervalNum)
var periodickClockIntervalNum = -1;
var fromTimeToTimeSpamTheConsole = 10;
function SuperiorTicking(someDrsans, originalIntervalIndex)
{
  // console.log("periodic master Tick, whenStarted:%o, intervalIndex:%o", someDrsans, periodickClockIntervalNum);
      // ...can use   clearInterval(periodickClockIntervalNum)
   // TODO: do checking around, resyncing.. regeting, ...websock reconn..
    // mainly ment for hearbeating....
    Wos_ResolveSendHearBeat();
    if(--fromTimeToTimeSpamTheConsole < 1)
    {
      fromTimeToTimeSpamTheConsole = 10;
      console.log("macro anual reporting from masterTick, last time WS active:%o s", (Date.now() - gl_lastMsgTimeMilisecs) / 1000);
    }
}




periodickClockIntervalNum = setInterval(SuperiorTicking, globalThis.gl_masterPeriodicTickPeriod, window.performance.now(),(0 + periodickClockIntervalNum));


// ...when finnaly done ...use auto connect from start...
if(globalThis.gl_autConnect == true)
{
   setTimeout(()=>{
       OopenWSS(); 
        //OopenWSS("wss://91.139.6.78:9995/kunda"); 
   },700);
}
