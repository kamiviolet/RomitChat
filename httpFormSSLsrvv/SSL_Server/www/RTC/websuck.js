// websocket handings...
// in order to work... the browser MUST first attempt open the wss as https to create security expetion ..
// ..like https://127.0.0.1:9995/kunda

// for hearbeat tenis,,
var cipACK = "\x0D\x00\x02\x00\x00";      // "\u000e\u0000\u0002\u0000\u0000"
var cipACKok = "\x0E\x00\x02\x00\x00";
// ..the client is expected to send periodicly the cipACK ...while respons recive cipACKok
var gl_wsock_port = 9995;
var gl_wsock_FullUrl = "wss://127.0.0.1:9995/kunda";     // aka last used uri
var gl_wosock_recconectPeriod = 88000;    // 660000  should be 11 minuts
var gl_masterPeriodicTickPeriod = 93000;
var gl_lastMsgTimeMilisecs = -1;     // every incoming msg is reseted to curent time ..

var gl_autConnect = true; //false;       // uncoment to go for connect when script loaded..
var gl_wosocko = null;

var active_userlist = [];
              
              
var gl_lastUsedName = "User name X";
var gl_lastSelectedUsers = [];              
        
        
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
      connectionStatusElement.innerHTML = "Disconnected";
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
   console.log("wosocko Wos_onOpen:", hopen, (hopen.originalTarget ? hopen.originalTarget : hopen.target));
   
   var connectionStatusElement = document.getElementById("wsconsignal");
   if(connectionStatusElement)
   {
      connectionStatusElement.innerHTML = "Connected";
      connectionStatusElement.style.backgroundColor = "#adff2fd4";
   }
   
  //  WsAnouceLoginAliasName();
  SendCsharpReflexcutor("","distrubuteLogedUsersList",null);
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
         // TODO: push it to some kind of queue buffer send front..
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






 // main incoming fun called from websock event handler..
function processWSmessage(mesuge)
{
   if(!mesuge)return;
  // console.log("wosocko processWSmessage:",mesuge.data);
   var ojebanyObjekt = JSonSafePrase(mesuge.data);
   if(ojebanyObjekt)
   {
   
      console.log(" processWSmessage >> parsed ob> ",ojebanyObjekt);
      var normalizedType = ojebanyObjekt["type"];
      if(normalizedType)
      {
         // TODO: some funct with hevier switch case ..
         //   // type ... letsay >> general, broadcast, chat, login, invite, offer, answear, candidates, refresh
        processProtocoledOb(ojebanyObjekt, normalizedType);
      }
   }
   else
   {
    console.log("not parsed ? >>", mesuge);
   }           
}
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
           if(explanationResult.startsWith("-") && explanationResult.endsWith("-"))
           {
              // printToLogScreen(whichTaskIsReferingTo + " to:" + targnam + ", " + explanationResult);
               // TODO: replace with >>
               printMessageOnScreen(prasedPizdaload);
           }
           else
           {
               //printToLogScreen(whichTaskIsReferingTo + " " + targnam + ", " + explanationResult);
                printMessageOnScreen(prasedPizdaload);
           }
           
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
               console.log("incoming broadcast msg is originated from US:%s,  >> nsg:%s ???",possibleAddmitingOFshamefulName, prasedPizdaload["value"]);
               // return;
            }
         }      
         // printToLogScreen("from:" + possibleAddmitingOFshamefulName + " " + prasedPizdaload["value"]);
         printMessageOnScreen(prasedPizdaload);
      }break;
      
      case "eval":
      {
        var maybeZlemmi = safeZaaval(prasedPizdaload["value"])
        if(maybeZlemmi != null)
            console.log("resulz of OK eval of:%s, is:%o",prasedPizdaload["value"],maybeZlemmi); 
      
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
           printToLogScreen(prasedPizdaload["value"]);
      }break;
      
      case "answear":
      {
           printToLogScreen(prasedPizdaload["value"]);
      }break;
      
      case "candidates":
      {
           printToLogScreen(prasedPizdaload["value"]);
      }break;
   
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
   try
   {
     var someZu = null; 
     someZu = globalThis.eval(txtCode);     
     return someZu;
   }
   catch(error)
   {
     console.log("..err during EVAL of:%s, err:%o",txtCode,error);
     return null;
   }
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
   let msg = msgData.value;
            
   tamtoCpat.innerHTML += `
      <tr class='msg-row'>
         <td data-sender='${user}'>${user}</td>
         <td data-sender='${user}'>${msg}</td>
      </tr>
   `;
   return;
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















// gloobal ws sender...precompose the transport payload , populate
function gl_SEND(whatToSendValue, mesageType)
{
   if(!whatToSendValue)return;
   var txtedOb = "";   
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
   },700);
}
