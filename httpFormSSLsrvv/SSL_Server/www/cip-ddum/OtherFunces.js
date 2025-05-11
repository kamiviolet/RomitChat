var Cezius = "\xB0" + "C"; // "°C";
var maxDeep = 76;
function LoadLindedHTML() {
  var containerDements = document.querySelectorAll("[loadfrom]");
  var loadFuskaCounter = containerDements.length;
  if(loadFuskaCounter < 1)return;
 // console.log("conta",containerDements);
  containerDements.forEach(pp => {
    var datpath = pp.attributes["loadfrom"].value;
    // console.log("pp", datpath)
    fetch(datpath).then(poteem => {
      poteem.text().then(tenxten => {
        //console.log("tenx", tenxten)
        pp.innerHTML = tenxten;
        //pp.outerHTML = tenxten;        
        loadFuskaCounter--;
        //if case where the content holder is also present in the loaded file as capsuler..
        // but apparentlu replacing outerhtml have catastrophic consequences..
        if(pp.childElementCount > 0)
        {
            if(pp.children[0].id == pp.id)
            {
            // if mad desire to compare txt then  
            // pp.children[0].outerHTML.substr(0,pp.children[0].outerHTML.indexOf(">") +1)
               if(pp.children[0].hasAttribute("loadfrom"))
               {
                 if(pp.children[0].attributes["loadfrom"].value == datpath)
                 {
                  // then there can be no doubt ...part of the load is our reflection...
                  //pp.outerHTML = tenxten; 
                  //pp.children[0].id +="_motherFuck";
                  var subWraper = pp.children[0];
                  pp.replaceWith(subWraper);
                  pp = subWraper; 
                 }
               }
            }
         }
         
        pp.setAttribute("loadedfrom", datpath);
        pp.removeAttribute("loadfrom");     
        
        RedoLoScripts(pp, datpath);
        if(loadFuskaCounter < 1)
         {
            if(--maxDeep > 0)
            LoadLindedHTML();
         }
      })
    });
  });
}

window.onload = function(lo){ 
//console.log("window onload..");
LoadLindedHTML();
// maybe here finaly call ws instanint..
}

/*  this does NOT fire !!
document.onloadend = function(lo){
console.log("documentload ended");  
}
*/

function RedoLoScripts(parntDement, datpath) {
  parntDement.querySelectorAll("script").forEach(scri => {
    if (!scri.src || scri.src.length < 1) {
      var inerInlinerCode = scri.innerHTML;
      // console.log("scri", inerInlinerCode)
      if (inerInlinerCode) {
        var recript = document.createElement("script");
        recript.innerHTML = inerInlinerCode;        
        recript.id = scri.id ? scri.id : "rescript_" + datpath;
        if(scri.parentElement)
            scri.parentElement.append(recript);
         else         
            document.body.append(recript);
        scri.remove();
      }
    } else {
      // todo extreme solution ...fetch it from that src and put it there
      /*
      fetch(scri.src).then(pscripteem => {
        if (pscripteem.text) pscripteem.text().then(ctxten => {

        });
      });
      */
      var srcscript = document.createElement("script");
      srcscript.src = scri.src;
      srcscript.id = scri.id ? scri.id : "rescript_" + datpath;
      if(scri.parentElement)
        scri.parentElement.append(srcscript);
      else
         document.body.append(srcscript);
      scri.remove();
    }

  })
}


// ida is for obtaining x and y to which to put at developing eldement..
var Muze = {};
function tougeMouseLoger(representingDement, desiretState) {
  if (desiretState != undefined && desiretState != null) {
    if (desiretState == false) {
      document.removeEventListener("pointerdown", MouseLog);
      Muze.isAdded = false;
    } else if (desiretState == true) {
      document.addEventListener("pointerdown", MouseLog);
      Muze.isAdded = true;
    }
  } else {
    if (Muze.isAdded == true) {
      tougeMouseLoger(representingDement, false);
      return;
    } else {
      tougeMouseLoger(representingDement, true);
      return;
    }
  }
  
  if (representingDement) {
    var signalClassa = representingDement.attributes["fbactiveclass"];
    if (signalClassa)
      representingDement.classList.toggle(signalClassa.value, Muze.isAdded);
  }
}
function MouseLog(eve)
{
//console.log("muuze:",eve);
Muze.lastEve = eve;
Muze.pageX = eve.pageX.toFixed(0);
Muze.pageY = eve.pageY.toFixed(0);
// clientX clientY seems to be relative in window, offset absolute on elemt, x, y same as client
// page seems absolute no matter what element
var infoMSGabs = `top:${Muze.pageY}px; left:${Muze.pageX}px;`;
var infoMSGrelat = `top:${Muze.lastEve.offsetY.toFixed(0)}px; left:${Muze.lastEve.offsetX.toFixed(0)}px;`;
var aboutDement = eve.srcElement ? eve.srcElement.id : "";
console.log("id:%s relative: %s", aboutDement, infoMSGrelat);
//document.execCommand("cut");
// prepare it to clipboard se it cen be pasted..
navigator.clipboard.writeText(infoMSGrelat);
console.log("absolute:",infoMSGabs);
}

function safePrint(msg)
{
   console.log(msg);
}

function FromShitUSH16ZbliitToTemperature(e,badykData)
{
// ment as resuable asignable func for ush sigs vals XXX incoming from ws to be displayed as XX.X C
// eg "function(e){ var reko=e[5]/10; Souslozi.innerHTML=(Souslozi.innerHTML.split(\":\")[0] +\":\"+ reko + \" C\"); }"
   
   if(badykData == null || badykData == undefined)return;
   
   if(e > 32766)e -= 65535; 
   var reco=(e/10).toFixed(1);
     
   if(!badykData.hasOwnProperty("id"))
   {
   console.log("incomingg temperature func forsig:%o with no id of Eldement to push it, val:%o",badykData.signalName, (reco + Cezius));
    return;
   }
   
 //  var targetDmnt = document.getElementById(badykData.id);
   var targetDmnts = document.querySelectorAll("#" + badykData.id);
   if(targetDmnts.length < 1)
   {
      console.log("incomingg temperature func with no Eldement forid:%o to push it, signam:%o, Temp:%s",badykData.id,  badykData.signalName, (reco + Cezius));
      return;
   }
   
    targetDmnts.forEach(targetDmnt =>{
                                // \xB0
      targetDmnt.innerHTML=(reco + Cezius);

     })   
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
// (getRandomArbitrary(1000,5000).toFixed() - 0)   
function RepresentHeatingStateANAL(e,data)
{
   if(!data.id)return;
  var targetDmnts = document.querySelectorAll("#" + data.id);
  if(targetDmnts.length > 0)
  {
    targetDmnts.forEach(targetDmnt =>{
          if(targetDmnt.hasAttribute("fbActiveClass"))
          {
            var togeclassname = targetDmnt.attributes.fbActiveClass.value;
            targetDmnt.classList.toggle(togeclassname,(e > 0));
          }
          else if(targetDmnt.hasAttribute("fbactiveclass"))
          {
            var togeclassname = targetDmnt.attributes.fbactiveclass.value;
            targetDmnt.classList.toggle(togeclassname,(e > 0));
          }
     })  
  }
}

function OnReproZoneActive(e,data)
{ 
// when selected it uses the classic fbactiveclass, this is special func when active..
   if(!data.id)return;
   var targetDmnts = document.querySelectorAll("#" + data.id);
   var togeclassname = "reproIsPlaying";
   targetDmnts.forEach(targetDmnt =>{
         targetDmnt.classList.toggle(togeclassname,e);
     });   
}
function OnFanRunningChangeByAnal(e,data)
{
   if(!data.id)return;
   var targetDmnts = document.querySelectorAll("#" + data.id);
   var togeclassname = "fanIsRunning";
   targetDmnts.forEach(targetDmnt =>{
         targetDmnt.classList.toggle(togeclassname,(e==1));
     });   
}
// when some of the 3 repros selected ...show the slider..or hide him...its not CP logic but pseudo- local
function showHideVolumCntrl(dmntsClasstxt, shuuOrHiide)
{
   if(!dmntsClasstxt)return;
   if(!dmntsClasstxt.startsWith("."))
      dmntsClasstxt = ("." + dmntsClasstxt);
    var targetDisplay = (shuuOrHiide == true) ? "flex" : "none";
    var targetDmnts = document.querySelectorAll(dmntsClasstxt);
    targetDmnts.forEach(targetDmnt =>{
         targetDmnt.style.display = targetDisplay;
     });
}
// for fan and heating controls panel.. so far
function showHideRelativCntrl(dmntsClasstxt, shuuOrHiide, specificOtherControlsTohide)
{
   if(!dmntsClasstxt)return;
   if(!specificOtherControlsTohide)
      specificOtherControlsTohide = ".relativeControls";
   if(!dmntsClasstxt.startsWith("."))
      dmntsClasstxt = ("." + dmntsClasstxt);
      
    document.querySelectorAll(specificOtherControlsTohide).forEach(othrd => othrd.style.display = "none");
    
    var targetDisplay = (shuuOrHiide == true) ? "flex" : "none";
    var targetDmnts = document.querySelectorAll(dmntsClasstxt);
    targetDmnts.forEach(targetDmnt =>{
         targetDmnt.style.display = targetDisplay;
     });
}
 

function SomBulbStateChanged(e,data)
{
   if(!data.id)return;

   var targetDmnts = document.querySelectorAll("#" + data.id);
   if(targetDmnts.length < 1)
   {
       console.log("incomingg SomBulbStateChanged func with no Eldement forid:%o to push it, signam:%o, val:%o",data.id,  data.signalName, e);
       return;
   }
   else
   {
    targetDmnts.forEach(targetDmnt =>{
          if(targetDmnt.hasAttribute("fbActiveClass"))
          {
              var togeclassname = targetDmnt.attributes.fbActiveClass.value;            
              targetDmnt.classList.toggle(togeclassname,e);          
          }
          else if(targetDmnt.hasAttribute("fbactiveclass"))
          {
             var togeclassname = targetDmnt.attributes.fbactiveclass.value;
             targetDmnt.classList.toggle(togeclassname,e);
          }
     })   
   } 
}



// generic bool incoming
function SomeBoolStateChanged(e,data)
{
   // same as SomBulbStateChanged but ment for geeneric use relays on dement to have fbActiveClass
   if(!data.id)return;

   var targetDmnts = document.querySelectorAll("#" + data.id);
   if(targetDmnts.length < 1)   
       return;
   else
   {
    targetDmnts.forEach(targetDmnt =>{
          if(targetDmnt.hasAttribute("fbActiveClass"))
          {
            var togeclassname = targetDmnt.attributes.fbActiveClass.value;
            targetDmnt.classList.toggle(togeclassname,e);          
          }
          else if(targetDmnt.hasAttribute("fbactiveclass"))
          {
            var togeclassname = targetDmnt.attributes.fbactiveclass.value;
            targetDmnt.classList.toggle(togeclassname,e);          
          }
     });   
   } 
}
// generic string incoming
function SomeStringStateChanged(e,data)
{
   if(!data.id)return;
   var targetDmnts = document.querySelectorAll("#" + data.id);
   if(targetDmnts.length < 1)   
       return;
   else
   {
      if(e != null && e!="")
      {  //when from prog come some format for shitpanels socaleed html..
          //e = e.trim();
          if(e.startsWith("<"))
          {
            if(e.toUpperCase().startsWith("<FONT"))
            {
               e = getRidOfShitHTMLformating(e);
               
            }
         }
      }
   
    targetDmnts.forEach(targetDmnt =>{
    if(targetDmnt.type == "text")
    {
      targetDmnt.value = e;
    }
    else
      targetDmnt.innerHTML = e; 
     });   
   } 
}
// generic Ushort incoming
function SomeUshortStateChanged(e, data) {
  if (!data.id) return;
  var targetDmnts = document.querySelectorAll("#" + data.id);
  if (targetDmnts.length < 1)
    return;
  else {
    targetDmnts.forEach(targetDmnt => {
      var tagNam = targetDmnt.tagName;
      if (tagNam == "INPUT" && targetDmnt.type == "range") {
           targetDmnt.value = e;
      }else if(tagNam == "METER"){
            targetDmnt.value = e;
      } else {
        targetDmnt.innerHTML = e;
      }
    });
  }
}

var detager = new RegExp(/>([^<]+)/mi);
// when from prog comming oldhtml formated texts..
function getRidOfShitHTMLformating(incomingShitStronString)
{
   var rgxResu = detager.exec(incomingShitStronString);
   if(rgxResu !=null)
   {
      if(rgxResu.length > 1)
      {
         return rgxResu[1];
      }
   }   
   return incomingShitStronString;
}

function UniacessShowHideUponLogin(e,data)
{
// when loged with ezskey ..thn page 1311 acitvated
// first should be shown rozcesti, crossroad, 
// in in fact ARMdisArm securing/unsecuuring already usable as it is...
// only when dochazka ,, it sends name to another modul who shows his page...on 1255
// ....seeeems fucked up ...so bypassingg this. for now... 

if(!e)return;

   var targetDisplay = e ? "inline-block" : "none";
   if(data.signalName == "Bool-1255")
   {
      var attendance = document.getElementById("Dochazing");
      if(attendance)
         attendance.style.display = targetDisplay;
      return;      
   }
   else
   {
      var crossRoad = document.getElementById("nextplace");
      var ArmDisArmPanel = document.getElementById("EZSarming"); 
      crossRoad.style.display = targetDisplay;
      ArmDisArmPanel.style.display = targetDisplay;  
   }
}




function CPutilCPUreport(e,data)
{

}

function PIRincoming(e,data)
{
   if(!data.id)return;
   var targetDmnts=document.querySelectorAll("#" + data.id);
   if(targetDmnts.length < 1)
   {
      //console.log("incomingg PIRincoming func with no Eldement forid:%o to push it, signam:%o, val:%o",data.id,  data.signalName, e);
      return;
   }
   
    targetDmnts.forEach(targetDmnt =>{
          if(targetDmnt.hasAttribute("fbActiveClass"))
          {
               var togeclassname = targetDmnt.attributes.fbActiveClass.value;            
               targetDmnt.classList.toggle(togeclassname,e);          
          }
          else if(targetDmnt.hasAttribute("fbactiveclass"))
          {
               var togeclassname = targetDmnt.attributes.fbactiveclass.value;            
               targetDmnt.classList.toggle(togeclassname,e);          
          }
     });  
}

function TXTfieldOnChange(whoo)
{
   if (whoo.attributes.stringjoin) {
      var joinNamee = whoo.attributes.stringjoin.value;
      var targetIPid = "0x51";
      if(whoo.hasAttribute("ipId"))
       targetIPid = whoo.attributes.ipId.value;
      var jenNumbero = joinNamee.split("-").slice(-1)[0]; 
      ActivateSig("s", jenNumbero, whoo.value, targetIPid); 
   } 
}

function EvenixAudioZoneAdvaSel(targetZone)
{
// mmento for now...
// ..otheer zones above 3 can be selectted by smartob 171 aka select room
// ....BUT dont forget the 1-3 zone are by sparate interlock symbol... remain selected ..therefore you may end up with 2 selected zones...
// so........... unselect the normal 1-3 zone first !!
//   172 is select sourc
  if(!targetZone)
   targetZone = "4"
   // btw you wont get the analog output sig in sigdyykk ..it have only output its Item clicked
   // ..but it will result inn activating 171-Bool-11  to  171-Bool-11 (zone1) to  171-Bool-36  (zone 25)
   //var isBasicZonesSelected = SigDyk["Bool-311"].value || SigDyk["Bool-312"].value || SigDyk["Bool-313"].value;
/*   
   //previous deseperate solution when there was not direct nax signals in simplw
    
   var tobechecked = ["Bool-311", "Bool-312", "Bool-313"];
   tobechecked.forEach(onesig => {
     if (SigDyk[onesig]) {
   
       if (SigDyk[onesig].value == true) {
       // ..de tooging interlock toge if necesary..
        // console.log("j", SigDyk[onesig])
         var numericSig = onesig.split("-").splice(-1)[0];
         ActivateSig("b", numericSig, true, "0x26,0x27,0x28,0x29,0x30");
         ActivateSig("b", numericSig, false, "0x26,0x27,0x28,0x29,0x30");
       }
     }
   });
  ActivateSig("n", "1", targetZone, "0x26,0x27,0x28,0x29,0x30", 171);
// Object.values(SigDyk).filter( those => those.smartObjectId==171)
// 171-Bool-14 should be zone4 which can be passthrued to dmps
// then you can send volume to that zone ...which is necessary to gain something on the dmps input...
  ActivateSig("n", "10", "42000", "0x26,0x27,0x28,0x29,0x30");
  
*/


  ShotHTTPapi('https://192.168.166.54/cws/flags/TRIG/denonTurner');
  // then adjust denon volume ..
  // turn on denon by 
  // ShotHTTPapi("http://192.168.166.54:8888/SIG/ac/31/(p>30")
//   ShotHTTPapi('https://192.168.166.54/cws/flags/TRIG/denonTurner');

// !!!  NEWLY ADDED DIRECT ZONE VOLUME SIGNALS ON  joins 221-228 !!!
//    ... and routing signals 231-238
// media players are sources 9-16  ..so for mediaplayer4 to zone 4  >> 4+8 = 12
 //  ActivateSig("n", "234", "12", "0x26,0x27,0x28,0x29,0x30");
   // volume of zone 4
 //   ActivateSig("n", "224", "42000", "0x26,0x27,0x28,0x29,0x30");
 
   // media player 4 to zone 4 >>
   ActivateSig("n", "234", "12", "0x26,0x27,0x28,0x29,0x30");
   // ..because nax will take some time aftter all befor actualy route that media player ...and after that he will reset the volume to default starting vol
   // ..so ...better wait littl beforee sending our desired vol
   setTimeout((jakjako) =>{
                  // vol of zone 4 ... which is connected to dmps anal in 5
        ActivateSig("n", "224", "43000", "0x26,0x27,0x28,0x29,0x30");
 
   },5000);
   // in addition  we can continue by>>
   
   // https://192.168.166.166/cws/flags/CRPC/5/playerstate+1
   // https://192.168.166.166/cws/flags/CRPC/4/play+1
   // https://192.168.166.166/cws/flags/CRPC/4/favorites+6     // bad bead
   // https://192.168.166.166/cws/flags/CRPC/4/favorites+9     // color
   // CrpcGetSome("4", favorites+6",null);
}

function ButonBulbOnclick(whoo) {
  // console.log("cliick of:",whoo);
  if (whoo.attributes.booljoin) {

    var joinNamee = whoo.attributes.booljoin.value;
    var targetIPid = "0x27";
    if(whoo.hasAttribute("ipId"))
      targetIPid = whoo.attributes.ipId.value;
    else if(SigDyk[joinNamee])
    {
      // not yet wise ...there is overlaping problems..
      targetIPid = SigDyk[joinNamee].hisIPID;
      // ..maybe storing also the ipid in that butons attribs ?? 
    }
    var jenNumbero = joinNamee.split("-").slice(-1)[0];  // joinNamee.split("-")[1];
    ActivateSig("b", jenNumbero, true, targetIPid);
    ActivateSig("b", jenNumbero, false, targetIPid);
  }
}

function OnIncomingShadeSlected(e,data)
{
// we are allowed to select several at once ..
   if(!data.id)return;

   var hewhoos = document.querySelectorAll("#" + data.id);
   hewhoos.forEach(oneHoo => {
      oneHoo.classList.toggle("ShadeeBoxSelected",(e == true));
   }); 
   if(e == true)
   {
      document.querySelectorAll(".relativeControls").forEach(othrd => othrd.style.display = "none");
      document.querySelectorAll(".shadeControls").forEach(othrd => othrd.style.display = "flex");
   }
   else
   {
     document.querySelectorAll(".shadeControls").forEach(othrd => othrd.style.display = "none");
   } 
}

function ButtonShadeSelect(whoo)
{  // we are allowed to select several at once ..
   var targetIPid = "0x27";
   if(!globalThis.WokersRegistry)
   {
      whoo.classList.toggle("ShadeeBoxSelected");
      
      document.querySelectorAll(".relativeControls").forEach(othrd => othrd.style.display = "none");
      document.querySelectorAll(".shadeControls").forEach(othrd => othrd.style.display = "flex");
      return;
   }
    
   var curentBoolSig = whoo.attributes.booljoin.value;
   var jNum = curentBoolSig.split("-").slice(-1)[0];
   targetIPid = whoo.attributes.ipId.value;
   ActivateSig("b", jNum, true, targetIPid);
   ActivateSig("b", jNum, false, targetIPid);
}

function ButonHeatSelect(whoo)
{
   var targetIPid = "0x27";
   var toBeDeselected = document.querySelectorAll(".heatBoxes");
   toBeDeselected.forEach(htbx => { 
      htbx.classList.toggle("HeatBoxSelected",false) 
       // maybee send false sig to all possiblly selected..
   });
   whoo.classList.toggle("HeatBoxSelected",true);
   // for case we are on our combo home page..
   document.querySelectorAll(".relativeControls").forEach(othrd => othrd.style.display = "none");
   document.querySelectorAll(".heatControls").forEach(othrd => othrd.style.display = "flex");
   
   var curentBoolSig = whoo.attributes.booljoin.value;
   var jNum = curentBoolSig.split("-").slice(-1)[0];
   targetIPid = whoo.attributes.ipId.value;
   ActivateSig("b", jNum, true, targetIPid);
   ActivateSig("b", jNum, false, targetIPid);
   // ...that should activate particular abuf to send desired temp to Ushot-50
   // then perhaps reading from
   //SigDyk["UShort-50"]   
}
function InkrDekrHeatt(whoo)
{
  if (whoo.attributes.booljoin) {

    var joinNamee = whoo.attributes.booljoin.value;
    var targetIPid = "0x27";
    if(whoo.hasAttribute("ipId"))
      targetIPid = whoo.attributes.ipId.value;
    else if(SigDyk[joinNamee])
      targetIPid = SigDyk[joinNamee].hisIPID;

    var jenNumbero = joinNamee.split("-").slice(-1)[0];
    ActivateSig("b", jenNumbero, true, targetIPid);
    ActivateSig("b", jenNumbero, false, targetIPid);
  }
}

// for main panel codepad
function KeyPadCode(whoo)
{
   var joinNamee = whoo.attributes.booljoin.value;
   var targetIPid = "0x27";
   if(whoo.hasAttribute("ipId"))
      targetIPid = whoo.attributes.ipId.value;
    else if(SigDyk[joinNamee])
      targetIPid = SigDyk[joinNamee].hisIPID; 
   var jenNumbero = joinNamee.split("-")[1];
   var smrdID = 40;     // some special
   smrdID = 12;   // 12 is ezs for secure unsecure...
      // to smart ob 40
      // SigDyk["String-1169"] is curent keycode
   ActivateSig("b", jenNumbero, true, targetIPid, smrdID);
   ActivateSig("b", jenNumbero, false, targetIPid, smrdID);     
}
// for ezs dochazka and coding pad
function UniacessKeyPadCode(whoo)
{
   var joinNamee = whoo.attributes.booljoin.value;
   var targetIPid = "0x27";
   if(whoo.hasAttribute("ipId"))
      targetIPid = whoo.attributes.ipId.value;
    else if(SigDyk[joinNamee])
      targetIPid = SigDyk[joinNamee].hisIPID; 
   var jenNumbero = joinNamee.split("-")[1];
   var smrdID = 27;     
   smrdID = 27;   // 

   ActivateSig("b", jenNumbero, true, targetIPid, smrdID);
   ActivateSig("b", jenNumbero, false, targetIPid, smrdID);     
}

function incomingCodeByKey(e,data)
{
   if(!data.id)return;
   var targetDmnts=document.querySelectorAll("#" + data.id);
   if(targetDmnts.length > 0)
   {
    targetDmnts.forEach(targetDmnt =>{
         targetDmnt.innerHTML = e;
     })
   }
   // by the ocasion clear the previous invalid field if any...
   if(e)
   {
      var invalidReasonField = document.getElementById("reponsInvalidReason");
      if(invalidReasonField)
      invalidReasonField.innerHTML = "-";
   }
}

function reportCodeykeyFaillureAndClr(e,data)
{
 if(e)
    console.log(" passcode entry invalid reason: ",e); 
    
 var targetDebentName = data.id ? data.id : "reponsInvalidReason";
 var reportDements = document.querySelectorAll("#" + targetDebentName);
 reportDements.forEach(rdm => {
    rdm.innerHTML = "" + (e ? e : "-");    
 });
 
 if(e && e.length > 0)
 {
   setTimeout((potomClearka) =>{
   
   // console.log("potom clearka invalidneeho...") 
     reportCodeykeyFaillureAndClr(null, potomClearka);
     
    }, 8000, data);    
 }
}

function SecureStateCanged(e,data)
{
   if(!data.id)return;
   var targetDmnts=document.querySelectorAll("#" + data.id);
   if(targetDmnts.length < 1)
      return;
   
    targetDmnts.forEach(targetDmnt =>{
          targetDmnt.innerHTML = e ? "SECURED" : "UNsecured";
          if(targetDmnt.hasAttribute("fbActiveClass"))
          {
              var togeclassname = targetDmnt.attributes.fbActiveClass.value;
              targetDmnt.classList.toggle(togeclassname,e);
          }
          else if(targetDmnt.hasAttribute("fbactiveclass"))
          {
              var togeclassname = targetDmnt.attributes.fbactiveclass.value;
              targetDmnt.classList.toggle(togeclassname,e);
          }
     })
}
function EZSsendARMdisArm(whoo)
{
   // maybe check SigDyk["Bool-96"] first...
   // moved to TOPmenuCLiced for ezs will go for this.
 //  ActivateSig("b", "96", true, "0x27");
 //  ActivateSig("b", "96", false, "0x27");
     
   var butonYde = whoo.id;
   if(butonYde == "ARMezs")
   {
      // however curentlu is NOTHING on 272 simpl side !!!
     ActivateSig("b", "272", true, "0x27,0x26,0x28,0x29,0x30");
     ActivateSig("b", "272", false, "0x27,0x26,0x28,0x29,0x30");
   }
   else if(butonYde == "DISarmezs")
   {
      // it pass throu anyway only if panel menu 6 join 96 is true ..
      // ..ege panel ui has to be at subpage with keypad..

     ActivateSig("b", "271", true, "0x27,0x26,0x28,0x29,0x30");
     ActivateSig("b", "271", false, "0x27,0x26,0x28,0x29,0x30");
   }
   else
   {
         // then storno
     ActivateSig("b", "273", true, "0x27,0x26,0x28,0x29,0x30");
     ActivateSig("b", "273", false, "0x27,0x26,0x28,0x29,0x30");
   }
}


var TOPmenuCategorySelected = ""; // home
var LEFTmenuFloorSelected = "P3";

function TOPmenuClick(whoo)
{
   var konec = whoo.href.split("#");
  // console.log("topemenu ",konec[1], whoo.href);
   TOPmenuCategorySelected = konec[1];
      document.querySelectorAll(".subContenntPage").forEach(onan => {
     onan.style.display = "none";
   })
  // var targetID = LEFTmenuFloorSelected + konec[1].trim(); 
  // for now fuck the floors... all will be at one..
   var targetID = konec[1].trim();
   var dementToBeDisplayed = document.getElementById(targetID);
   if(dementToBeDisplayed)
      dementToBeDisplayed.style.display = "block";
   
   document.querySelectorAll(".topNavSelected").forEach(seltop => { seltop.classList.toggle("topNavSelected",false); });
   whoo.classList.toggle("topNavSelected",true);
   
   if(TOPmenuCategorySelected == "home" && LEFTmenuFloorSelected != "")
   {
      document.querySelectorAll("[floor]").forEach(hevyFloor => { hevyFloor.style.display = (hevyFloor.attributes.floor.value == LEFTmenuFloorSelected) ? "grid" : "none"; });
      //document.querySelectorAll("[floor='"+LEFTmenuFloorSelected+"']")
   }
   
   // just avoidin possible error..when cheecking that later..
    if(!SigDyk["Bool-96"])
    {
      SigDyk["Bool-96"] = {
           signalName: "Bool-96",
           value: false
         }
    }
    
    var speciIPid = "0x27,0x26,0x28,0x29,0x30";
     
    // maybe some preinits for particular menu ??
    switch(targetID)
    {
     case "ezs":
     // ..so the keypad passed may go for subpage... 96 is settings subpagee NOT TOP menu interlock
       ActivateSig("b","96",true,speciIPid);
       ActivateSig("b","96",false,speciIPid);
     break;
      case "attendand":
     // .. 0x51 dochazka
      /* ...nor for now
       ActivateSig("b","15",true, "0x51");
       ActivateSig("b","15",false, "0x51");
      */ 
       // 1307 is storno exit that
     break;     
     case "home":
     // ..so panel WONT stay on ezs or aywhhere NOT supposed to   10 is SETUP exit page ..clears setup inerlock, ALSO HEAT init and others !!
     if(SigDyk["Bool-96"].value)
     {
       ActivateSig("b","10",true,speciIPid);
       ActivateSig("b","10",false,speciIPid);
     }
     break;
     case "lights":
     // ..so panel WONT stay on ezs or aywhhere NOT supposed to   10 is SETUP exit page ..clears setup inerlock, ALSO HEAT init and others !!
     if(SigDyk["Bool-96"].value)
     {
       ActivateSig("b","10",true,speciIPid);
       ActivateSig("b","10",false,speciIPid);
     }
     // actual panel SVs join  31, but fb is floor dependand  2np=81,1np=71,0np=61

       ActivateSig("b","31",true,speciIPid);
       ActivateSig("b","31",false,speciIPid);
     
     break;
     case "fans":
     // ..so panel WONT stay on ezs or aywhhere NOT supposed to   10 is SETUP exit page ..clears setup inerlock, ALSO HEAT init and others !!
     if(SigDyk["Bool-96"].value)
     {
       ActivateSig("b","10",true,speciIPid);
       ActivateSig("b","10",false,speciIPid);
     }
     break;
     case "heating":
     // ..so panel WONT stay on ezs or aywhhere NOT supposed to   10 is SETUP exit page ..clears setup inerlock, ALSO HEAT init and others !!
     if(SigDyk["Bool-96"].value)
     {
       ActivateSig("b","10",true,speciIPid);
       ActivateSig("b","10",false,speciIPid);
     }
     break;
     case "settings":
     // ..so panel WONT stay on ezs or aywhhere NOT supposed to   10 is SETUP exit page ..clears setup inerlock, ALSO HEAT init and others !!
     if(SigDyk["Bool-96"].value)
     {
       ActivateSig("b","10",true,speciIPid);
       ActivateSig("b","10",false,speciIPid);
     }
     
     PrelinearyOfCriticalURLcompose(false);
     
     break;
     default:
      if(SigDyk["Bool-96"].value)
     {
       ActivateSig("b","10",true,speciIPid);
       ActivateSig("b","10",false,speciIPid);
     }
     break;
    }        
}
function LEFTmenuClick(whoo)
{
   var konec = whoo.href.split("#");
  // console.log("LEFTmenu ",konec[1], whoo.href);
   LEFTmenuFloorSelected =konec[1]; 
   
   document.querySelectorAll(".sideNavSelected").forEach(seltop => { seltop.classList.toggle("sideNavSelected",false); });
   whoo.classList.toggle("sideNavSelected",true);
   
   if(TOPmenuCategorySelected == "home" && LEFTmenuFloorSelected != "")
   {
      document.querySelectorAll("[floor]").forEach(hevyFloor => { hevyFloor.style.display = (hevyFloor.attributes.floor.value == LEFTmenuFloorSelected) ? "grid" : "none"; });
      //document.querySelectorAll("[floor='"+LEFTmenuFloorSelected+"']")
   }
}

function SlyydaGo(whoo)
{
   var joinNamee = whoo.attributes.ushortjoin.value;  
   var targetIPid = "0x27";
   targetIPid = whoo.attributes.ipId.value;
   var jenNumbero = joinNamee.split("-")[1];
   var targtetSendVal = whoo.value;
   ActivateSig("n", jenNumbero, targtetSendVal, targetIPid);
}

function SliidaPohlaa(whoo)
{
   var joinNamee = whoo.attributes.ushortjoin.value;  
   var targetIPid = "0x27";
   targetIPid = whoo.attributes.ipId.value;
   var jenNumbero = joinNamee.split("-")[1];
   
   // in case we dont wana realy on incoming fb of that signal...but we should
   if(whoo.hasAttribute("showPercent"))
   {
         //  using incoming fb in this case....
      //var targetId ="#" + whoo.attributes["showPercent"].value;
      //document.querySelectorAll(targetId).forEach(shpr => { shpr.innerHTML = "" + whoo.value + " %";}); 
   }
   else
      whoo.nextElementSibling.children[0].innerHTML = "" + whoo.value + " %";
      
   var targtetSendVal = whoo.value;
  if(whoo.max <= 100)
  {
      targtetSendVal = targtetSendVal * 655;
  }  
   
   ActivateSig("n", jenNumbero, targtetSendVal, targetIPid);
}
function OnUSHtoSLiida(e,data)
{
 if(!data.id)return;
    var targetDmnts = document.querySelectorAll("#" + data.id);
   if(targetDmnts.length < 1)
   console.log("no sliida for:",data);
   else
   {
       var downCulcing =  e/655;
       if(downCulcing < 0.9)
       downCulcing = 0;
      targetDmnts.forEach(targetDmnt =>{
         targetDmnt.value = downCulcing;
         if(targetDmnt.hasAttribute("showPercent"))
         {
            var targetId ="#" + targetDmnt.attributes["showPercent"].value;
            document.querySelectorAll(targetId).forEach(shpr => { shpr.innerHTML = "" + downCulcing.toFixed(1) + " %";}); 
         }
         else
            targetDmnt.nextElementSibling.children[0].innerHTML = "" + downCulcing.toFixed(1) + " %";  

     })
   }   
}
function OnUSHtoAudioSLiida(e,data)
{
 if(!data.id)return;
    var targetDmnts = document.querySelectorAll("#" + data.id);
   if(targetDmnts.length < 1)
   console.log("no sliida for:",data);
   else
   {
      targetDmnts.forEach(targetDmnt =>{
      
         targetDmnt.value = e;
         // folowing is kind of maybe conflicting with incoming fb value doing the same !!! 
         //  check  SliidaSetovaaa    ...inside MainSettiings.html
         if(targetDmnt.hasAttribute("showValPrcnt"))
         {
         // expected value from default volume where the range is till 50%  32767.5
            var howPrcent  = 0;
            if(e > 0)
                howPrcent = (e / 65535) * 100;
                        
            var targetId ="#" + targetDmnt.attributes["showValPrcnt"].value;
            document.querySelectorAll(targetId).forEach(shpr => { shpr.innerHTML = "" + howPrcent.toFixed(1);}); 
         }
         else if(targetDmnt.hasAttribute("showValNum"))
         {
            var targetId ="#" + targetDmnt.attributes["showValNum"].value;
            document.querySelectorAll(targetId).forEach(shpr => { shpr.innerHTML = "" + e;}); 
         }
         else
            targetDmnt.previousElementSibling.children[0].innerHTML = "" + e;  

     })
   }   
}
function OnSignedUSHtoAudioSLiida(e,data)
{
 if(!data.id)return;
    var targetDmnts = document.querySelectorAll("#" + data.id);
   if(targetDmnts.length < 1)
   console.log("no sliida for:",data);
   else
   {
      var downCulcing =  e;  // mayb e.toFixed(1)
            // if signed value ..as example treble and bass are -120 +120
      if(downCulcing > 32766)
            downCulcing-=65536;      // instead of 65535 using 65536 to reach -120 ..otherwise will be somehoww onlyy -119 
              
      targetDmnts.forEach(targetDmnt =>{
      
         targetDmnt.value = downCulcing;

         if(targetDmnt.hasAttribute("showValNum"))
         {
            var targetId ="#" + targetDmnt.attributes["showValNum"].value;
            document.querySelectorAll(targetId).forEach(shpr => { shpr.innerHTML = "" + downCulcing;}); 
         }
         else
            targetDmnt.previousElementSibling.children[0].innerHTML = "" + downCulcing;  
     })
   }   
}

function ShotHTTPapi(fullURL) {
  if (fullURL) {
   try
   {
    fetch(fullURL).then(pocem => {
       // alert("respons " + pocem);
      pocem.text().then(pxx => {
        //  alert("pxx " + pxx);
        if (pxx != null && pxx.length > 1) {
        //console.log("shot api respons",fullURL,pxx);
        }
      });
    });
    //alert("done " + fullURL);
    }
    catch(erOr)
    {
      alert("tak prej: "+ erOr.message + ", " + erOr);
    }
  }  
}

function AboutDenonVol() {
// even on our server it was half blockedd ..but volm was set at least.
  fetch("http://192.168.166.91/MainZone/index.put.asp", {
    method: "POST",
    "body": "cmd0=PutMasterVolumeSet%2F-30.0"
  });
  
  // fetch("http://192.168.166.91/MainZone/index.put.asp",{ method:"POST", "body": "cmd0=PutMasterVolumeSet%2F-20.0" })
   // http://192.168.166.54:8888/trig/WhoreForDegenVOLsend/nul/nul/45
   // https://192.168.166.54/cws/flags/TRIG/WhoreForDegenVOLsend/nul/nul/45
   // https://192.168.166.54/cws/flags/TRIG/WhoreForDegenVOLsend/nul/nul/60
}

function AudioSRCselected(whoo)
{   
   AudioSrcWasSelected(whoo);
   ButonBulbOnclick(whoo); 
}

var AVdik={
   "1": "898",
   "2": "899",
   "3": "900",
   "4": "901",
   
   "5": "891",
   "6": "892",
   "7": "893",
   
   "8": "896",
   "9": "897",
   
   "898":"1",
   "899":"2",
   "900":"3",
   "901":"4",
   
   "891":"5",
   "892":"6",
   "893":"7",
   "896":"8",
   "897":"9"
};

function onIncomingAVrouteChange(e,data)
{
var siigername = data.signalName.split("-")[1];   
var outIex = AVdik[siigername];
var routedInput = "" + e;
var relatedBoxes = document.querySelectorAll((`[outputX='${outIex}']`));
relatedBoxes.forEach(oneRbox => {
      if(oneRbox.attributes.inputX.value == routedInput)
         oneRbox.checked = true;
      else
         oneRbox.checked = false;
   });
}

function MatrixCHKboxCHangge(whoo)
{
 //  console.log("boxchange",whoo.id,whoo.checked);
  // 898 is HDMI 1 out01
  // 899 is HDMI 2 out02 
  // 900,901 DM 
  // 891 is progoutt, 892 aux1 893 aux2
  // 896,897 digi mixes
   
   var targetOut_X =whoo.attributes.outputX.value;
   var targetIN_X =whoo.attributes.inputX.value;
   var graphicalClaassName = ".routebox_o" + (""+ targetOut_X).padStart(2,"0");
   document.querySelectorAll(graphicalClaassName).forEach(oneRbox => {
      if(oneRbox.id!=whoo.id)
            oneRbox.checked = false;
   });
   // alternatively 
   // document.querySelectorAll("[outputX='1']")   document.querySelectorAll("[outputX='+targetOut_X+']")
     
  var ushortSigNum =AVdik[targetOut_X];
  var targetval = whoo.checked ? targetIN_X : "0";   
  ActivateSig("n",ushortSigNum, targetval, "0x27,0x26,0x28,0x29,0x30")

  // secrretly pre-check digimixes asign to outputs..and set it if needded..
  if(targetOut_X == 8)
  {
   // digimix01 then check hdmi01 and dm01 at sig 902 and 904
      if(SigDyk["UShort-902"])
         if(SigDyk["UShort-902"].value != 1)
           ActivateSig("n","902", 1, "0x27,0x26,0x28,0x29,0x30");
      if(SigDyk["UShort-904"])
         if(SigDyk["UShort-904"].value != 1)
           ActivateSig("n","904", 1, "0x27,0x26,0x28,0x29,0x30");                      
  }
  else if(targetOut_X == 9)
  {
   // digimix01 then check hdmi02 and dm02 at sig 903 and 905
      if(SigDyk["UShort-903"])
         if(SigDyk["UShort-903"].value != 2)
           ActivateSig("n","903", 2, "0x27,0x26,0x28,0x29,0x30");
      if(SigDyk["UShort-905"])
         if(SigDyk["UShort-905"].value != 2)
           ActivateSig("n","905", 2, "0x27,0x26,0x28,0x29,0x30"); 
  }
}

function infoAboutAVinput(whoo)
{
// not yet impledemented...
   if(whoo.hasAttribute("outputxInfo"))
   {
      // output info
      var outNumber = whoo.attributes.outputxInfo.value;
   }
   else
   {
      // input info
      var inNumber = whoo.attributes.inputx.value;
   }
}

function togeDMPSpanel(tgORset) {
  var tenDMPSpanel = document.getElementById("matirix");
  if (tenDMPSpanel) {
    if (tgORset == undefined && tgORset == null)
      tgORset = "tg";
    if (tgORset == "tg") {
      // tenDMPSpanel.style.display; // normally "inline-flex"
      if (tenDMPSpanel.style.display != "none")
        tenDMPSpanel.style.display = "none";
      else
        tenDMPSpanel.style.display = "inline-flex";
    } else {
      if (tgORset.includes("false"))
        tenDMPSpanel.style.display = "none";
      else
        tenDMPSpanel.style.display = "inline-flex";
    }
  }
}





function EncodingRelatedFetch()
{
// mmo  ...folowing not realy solveed ..but
// when in PSPad changed fw times encoding to (thos inn list) and bac....
// it wass suddenttly OK !!!s
fetch("./Cams/cams.html").then(rsp => {
  rsp.blob().then(blub => {
 //   console.log("r", blub)
    blub.arrayBuffer().then(hen =>{
      var utf8decoder = new TextDecoder(); 
      var jinaar = new Uint8Array(hen);
      var sirsaa = new Uint16Array(hen);
      console.log("hen",hen,jinaar,sirsaa);
      var tox = utf8decoder.decode(jinaar);
      
      console.log("tox",tox)
      
    });
  });
});

}






function ExeSexuleLokl(some) {
  var totozmrvit = "";
  if (some != null && some != undefined)
    totozmrvit = some;
  else
    totozmrvit = document.getElementById("dopsat").value;

    try {
      var zdalipaknecozhnilo = window.eval(totozmrvit);
      if (zdalipaknecozhnilo != null) {
        
        document.getElementById("dopsatTWA").value += (zdalipaknecozhnilo + "\n");
      } else {
      document.getElementById("dopsatTWA").value += ("-NA-" + "\n");   
      }
    } catch (roor) {
    // maybe use roor.stack
      document.getElementById("dopsatTWA").value += ("\n" + roor.message);
    }
    // Reflect.ownKeys(window.eval.arguments);
}
function CLRoneORmore(...arrofEments) {
  // you can also use directive arguments
  if (arrofEments.length > 0) {
    arrofEments.forEach(whagd => {
      if (whagd != null) {
        var targetDmnt = null;
        if ((typeof whagd) == "object") {
          targetDmnt = whagd;
        } else if ((typeof whagd) == "string") {
      
         whagd = whagd.trim();
         if(whagd.includes(","))
         {
            whagd.split(",").forEach(singleWagd => CLRoneORmore(singleWagd));
            
            return;          
         }
                    
         if (whagd.startsWith("."))
            targetDmnt = document.querySelector(whagd);
         else
            targetDmnt = document.getElementById(whagd);          
        }
        if (targetDmnt != null) {
          if (targetDmnt.value)
            targetDmnt.value = "";
          else if (targetDmnt.innerHTML)
            targetDmnt.innerHTML = "";
        }
      }
    });
  }
}



var showCriticalProcessing = 0;        // so it wont triger by two workers at same time..
function ShowOfferTheCriticalUrls(assumedWokerKey)
{
   if(showCriticalProcessing == 0)
   {  
      showCriticalProcessing = 1;
     
      var setyngAchor = document.getElementById("menu_settings");
      if(setyngAchor)
         TOPmenuClick(setyngAchor);
     
      var panelSetBut = document.getElementById("set_panel");
      if(panelSetBut)
       MenuClick(panelSetBut);    
      
      setTimeout((begingPosr) => {
      
         showCriticalProcessing = 0;
         console.log("beeguju for worker key:", begingPosr);
         
         confirm("pls click on these links, and acceept security issue !! \n ---then refresh the page--");
         
      }, 3000, assumedWokerKey);      
      //showCriticalProcessing = 0;
   }
}



// idea is tto return value of desired param instead of searching in many row that window.getComputedStyle ususaly rets
function GeetComputedStyle(edement, txtName)
{
   if(!edement)return null;
   var coputed = globalThis.getComputedStyle(edement);
   if(coputed && coputed[txtName] != undefined)   
    return coputed[txtName];      
    
   // if everything fail rets whole syle..non compu
   return (coputed ? coputed : edement.style);
}













function makeEmbedVydeou()
{
   // another atempt to avoid fuucking content security on shitstron cp servers... 
   // since iframe is not possible ...seems maybe embed can be...
   // also ..check  impresiveUselessUse();
   
var prev = document.getElementById("movabed");
if (prev) {
  prev.remove();
  return;
}   
var obj = document.createElement("embed")
//obj.contentDocument = new Document()
obj.id="movabed";
obj.src ="https://192.168.166.213/rawV/cums/fenku/";
obj.style.cssText= "display: flex; position: absolute; width: 600px; height: 400px; z-index: 900; top: 50px; left: 70px;border: ridge 10px;";
obj.draggable = true;

var kamNacpat =document.body;     
kamNacpat.append(obj)
   
}

// prepVidDragWokno()  
// prepVidDragWokno("3npCorridor")
function prepVidDragWokno(optionalCamlink) {
  var prev = document.getElementById("movabed");
  if (prev) {
  var prevVideo = prev.querySelector("video");
  if (prevVideo) {
    prevVideo.PlyvadByslo = false;
    if (prevVideo._MSERE) {
      if (prevVideo._MSERE.readyState != "ended")
        prevVideo._MSERE.endOfStream();
    }
    globalThis.URL.revokeObjectURL(prevVideo.src);
    if (prevVideo._WS)
      prevVideo._WS.close();
  }
    prev.remove();
    return;
  }
var woknous = document.createElement("div");
woknous.id="movabed";
woknous.style.cssText= "display: flex; position: absolute; width: 600px; height: 366px; z-index: 1010; top: 100px; left: 70px;border: ridge 10px;flex-flow: column;justify-content: space-between;";
woknous.draggable = true;
woknous.innerHTML = `<div style="display: flex;align-self: flex-end;"><button onclick="closeVidWokno('movabed');">X</button></div><video id="mse-video-1" autoplay muted playsinline controls style="max-width: 100%; max-height: 100%;"></video>`;

document.body.append(woknous);
   if(globalThis.TanglesDRAG_Atacher)
      globalThis.TanglesDRAG_Atacher(woknous);
   
   if(hardCamsDef)
   {
      if(!optionalCamlink)optionalCamlink = "3npCorridor";
      if(hardCamsDef[optionalCamlink])
      {
        var tagGuid = hardCamsDef[optionalCamlink];
        HadovaVychazka(tagGuid, "mse-video-1", true);
      }
   }
}

function closeVidWokno(WoknoDmntID) {
  if (!WoknoDmntID) WoknoDmntID = "movabed";
  var prev = document.getElementById(WoknoDmntID);
  if (prev) {
    var prevVideo = prev.querySelector("video");
    if (prevVideo) {

      if (prevVideo.id != "")
        closeVideoStream(prevVideo.id);
      else {
        prevVideo.PlyvadByslo = false;
        if (prevVideo._MSERE) {
          if (prevVideo._MSERE.readyState != "ended")
            prevVideo._MSERE.endOfStream();
        }
        globalThis.URL.revokeObjectURL(prevVideo.src);
        if (prevVideo._WS)
          prevVideo._WS.close();
      }
    }
    prev.remove();
    return;
  }
}

function MemoAboutScaling(optionalThatElement)
{

if(optionalThatElement)
{
// so the left upper corner will stay...
optionalThatElement.style.transformOrigin = "0px 0px 0px";
if(optionalThatElement.style.transform == "")optionalThatElement.style.transform ="scale(0.7)";else optionalThatElement.style.transform ="";
return;
}
/*
if(document.documentElement.style.transform == "")
   document.documentElement.style.transform ="scale(0.7)";
 else document.documentElement.style.transform ="";
*/
// or
if(pudrysWithElements.style.transform == "")pudrysWithElements.style.transform ="scale(0.7)";else pudrysWithElements.style.transform ="";
// or 
//if(mainSubContent.style.transform == "")mainSubContent.style.transform ="scale(0.5)";else mainSubContent.style.transform ="";
 // dont forget to put  transform-origin: 0% 0%; 
 // pudrysWithElements.style.transformOrigin = "0px 0px 0px"
 // pudrysWithElements.style.transformOrigin="0% 0%";      
 // GeetComputedStyle(pudrysWithElements,"transformOrigin")
}
var victimofscale = document.querySelector("#mainSubContent")

function CustoScale(optionalThatElement, scaleFactor) {
  if (!scaleFactor == undefined || scaleFactor == null) scaleFactor = "0.7";
  if (!optionalThatElement) return;

  var textprasion = scaleFactor != "" ? `scale(${scaleFactor})` : "";
  if (Array.isArray(optionalThatElement)) {
    if (optionalThatElement.length > 0) {
      var decidedByFirstDementTrans = optionalThatElement[0].style.transform;
      if (decidedByFirstDementTrans != "")
        textprasion = "";
      optionalThatElement.forEach(mrtka => {
        MemoAboutScaling(mrtka, scaleFactor);
      });
    }
    return;
  }
  optionalThatElement.style.transformOrigin = "0px 0px 0px";
  if (optionalThatElement.style.transform == "")
    optionalThatElement.style.transform = textprasion;
  else
    optionalThatElement.style.transform = "";
  console.log("oo", optionalThatElement, scaleFactor, textprasion)
}
// like MemoAboutScaling([victimofscale], "")   always to unscale 
// or MemoAboutScaling(victimofscale, "")
// or MemoAboutScaling([victimofscale])
// MemoAboutScaling([victimofscale], 0.7)       // toge with that val
// MemoAboutScaling(victimofscale, "0.9")


      
function extractInnerFuncFromInvisibleEvent(thatDmnt, onEventName) {
  //  eg  sv22.onclick.toString() >>  "function onclick(event) { ButonBulbOnclick(this); }"
  // ..converting it to atribe style ..
  // ....but ...we cannot put anonymous function .. like function(ev){  }
  // as attribute... there can be only direct code .. or regular name of func..!! 
  if (!thatDmnt) return;
  if (!onEventName) onEventName = "onclick";
  var posibleFuncAsigned = thatDmnt[onEventName];
  if (posibleFuncAsigned) {
    // if the attrib is there already ..no action..
    if (thatDmnt.attributes[onEventName] != null) return;

    var totam = posibleFuncAsigned.toString(); //   toLocaleString
    totam = totam.trim(); 
    var vyyter = "";
    if(totam.startsWith("function("))
    { 
     // ..it is anonymouse func...
     
    // that way will cut the upper anon function !!! ...but as it is put to attribute and element is parsed...
    // his onlick event is recreated to be again like onclick(evet){  user func} 
    // not exactly ideal...
       var odzud = totam.indexOf("{");
       var posem = totam.lastIndexOf("}");
       if (odzud < 0 || posem < 0) return;
       vyyter = totam.substring(1 + odzud, posem)
       vyyter = vyyter.trim();
       
       // or ...
         /*
       var indexofBRa = totam.indexOf("(");
       var paramsAndBody = totam.substring(indexofBRa);     // >> like (eve){...}
       var recombinedOurs = "function " + onEventName + paramsAndBody; // eg >>  "function onclick(eve){ OnDropDownClick(eve); }" 
       vyyter = recombinedOurs;
       // ...that will only end up capsulated by their capsuler ... onclick(event){onclick(eve){} }
       */
    }
    else
    {
      // some named func..
      vyyter = "" +  totam;
    }
    //console.log("vyyter", vyyter, vyyter == sv22.attributes[onEventName].value)
    //thatDmnt.setAttribute(onEventName, vyyter);
    thatDmnt[onEventName] = null;
    thatDmnt.setAttribute(onEventName, "");
    // or maybe thatDmnt.removeAttribute(onEventName)
    thatDmnt.setAttribute(onEventName, vyyter);
  }
}
// extractInnerFuncFromInvisibleEvent(sv22, "onclick")
// [...document.querySelectorAll("*")].filter(whooose => whooose.onclick != null && whooose.attributes["onclick"] == null)
function GadrThoseWhosOnclikISinvisible(specificEvenName) {
  if (!specificEvenName) specificEvenName = "onclick";

  var nonatribonclick = [...document.querySelectorAll("*")].filter(whooose => whooose[specificEvenName] != null && whooose.attributes[specificEvenName] == null);
  nonatribonclick.forEach(inkognyt => {
    console.log("calling reasign of:%s on:%o ",specificEvenName, inkognyt)
    extractInnerFuncFromInvisibleEvent(inkognyt, specificEvenName);
  });
}
//GadrThoseWhosOnclikISinvisible()
// at athat time ...it as pretty much just 7 buttons in media player .. the svgs..




var unusedCSSselectors = {};

function remakeTheirStyle(oneRoura, selekokotor, purentsheet, specificDementAndHisChildren) {
  if (!oneRoura) return;
  if (!selekokotor && !oneRoura.selectorText) return;
   if(!specificDementAndHisChildren)specificDementAndHisChildren = globalThis.document;
  //  var stuuledef = oneRoura.style ? oneRoura.style.cssText : "";
  var kakejs = Object.values(oneRoura.style);
  var relatedDEments = [...specificDementAndHisChildren.querySelectorAll(selekokotor)];
 // relatedDEments.push(specificDementAndHisChildren);
  if (relatedDEments.length > 0) {
     console.log("selektor:%s ", selekokotor, specificDementAndHisChildren)
    relatedDEments.forEach(supraDement => {
      //console.log("supra", supraDement, selekokotor);
      for (var ski = 0; ski < kakejs.length; ski++) {
        supraDement.style[kakejs[ski]] = "" + oneRoura.style[kakejs[ski]];
       // console.log("tranfering >> ", kakejs[ski], oneRoura.style[kakejs[ski]]);
      }
      var removename = "";
      //if(!selekokotor.includes(" "))
      if (selekokotor.startsWith(".") || selekokotor.startsWith("#"))
        removename = selekokotor.substring(1);
      if (supraDement.classList.contains(removename))
        supraDement.classList.remove(removename);
    });
    
  var hiskajrijer = purentsheet ? purentsheet : oneRoura.parentStyleSheet;
  if (hiskajrijer) {
   var posibleDEx = [...hiskajrijer.rules].findIndex(jak => jak.cssText == oneRoura.cssText && oneRoura.selectorText == jak.selectorText);
    console.log("removing", oneRoura,posibleDEx);
    if(posibleDEx > -1)
         hiskajrijer.deleteRule(posibleDEx);
   // hiskajrijer.removeRule(oneRoura.cssText);
    // hiskajrijer.removeRule(oneRoura);
  } else
    console.log("no parent shiit ..for ", oneRoura);    
  }
  else
  {
    unusedCSSselectors[selekokotor] = oneRoura;
  }
}

function gadherdeclaredCSS(specificDementAndHisChildren) {

    if(!globalThis.backupFontFaces)
   {
     globalThis.backupFontFaces = [...document.styleSheets[0].cssRules].filter(pokl => pokl.type > 3);
   }
   
   if(!specificDementAndHisChildren)specificDementAndHisChildren = globalThis.document;
  var seckyShiity = [...document.styleSheets];
  //var kelektor = document.styleSheets[0].cssRules.item(170).selectorText
  //document.querySelectorAll(kelektor)
  seckyShiity.forEach(oneShiit => {
    var roury = [...oneShiit.rules];
    // excluding font faces, and media defs..
    roury = roury.filter(dletypa => dletypa.type < 2);

    // excluding font faces and media defs
    roury = roury.filter(johl => johl.selectorText);
    var rouryCombo = roury.filter(giter => giter.selectorText.includes(" "));
    console.log("shiit:%o, totalRules:%o,  combedones:%o", oneShiit, roury.length, rouryCombo.length);
    // console.log("shiit:%o, r:%o, com:%o", oneShiit, roury, rouryCombo)
    // first lets do the otherclass dependant combed ones etc..
    rouryCombo.forEach(pseudoRoura => {
      // var selkokot = pseudoRoura.selectorText;

      remakeTheirStyle(pseudoRoura, pseudoRoura.selectorText, oneShiit, specificDementAndHisChildren);

    });

    roury = roury.filter(giter => !giter.selectorText.includes(" "));
    console.log("finished combed rules.. now nomral ones with leng:", roury.length);
    roury.forEach(oneRoura => {
      var selekokotor = oneRoura.selectorText;
      if (selekokotor) {
        remakeTheirStyle(oneRoura, selekokotor, oneShiit, specificDementAndHisChildren);
      } else
        console.log("prapravidlo:", oneRoura);
    })
  })
  
  var afterZbirka = [...document.styleSheets[0].cssRules];
  
       globalThis.backupFontFaces.forEach(zach => {
       var predeslo = afterZbirka.find(kle => kle.cssText == zach.cssText);
       if(!predeslo)
            document.styleSheets[0].insertRule(zach.cssText)
  });
}
//gadherdeclaredCSS(audio_player_modal)
//gadherdeclaredCSS()
//var kolura = document.styleSheets[0].rules[0];
//kolura.parentStyleSheet.removeRule(kolura)
//gadherdeclaredCSS()
 // document.querySelectorAll("[class]:not([class=''])")
 
 
 
 
function JustGaderRuule()
{
var previousEvilState = EvilReplace.toString();
EvilReplace = false;
OtherStileAndRulesGubering();
EvilReplace = previousEvilState.endsWith("rue");
} 
  
  
var EvilReplace = true;   // if actualy go for this replacementm, otherwise is just gadhering..  
var unzorteds = [];  
var pakRole = {};
var paklAllStilkuu = {};  
var removedClasses = [];
function OtherStileAndRulesGubering(particularDement) {
  // sinnce situation is much more complicated than it was years ago...

  unzorteds = [];
  removedClasses = [];
  [...document.styleSheets].forEach(stilka => {

      LootThtStyleShit(stilka);
      
  });

  console.log("have gadhered stileshits:%o and ruliiks:%o, resUnsorted:%o, len of Unfiltered rulless:%o", paklAllStilkuu, pakRole, unzorteds, Object.values(pakRole).length);    
  
     // ...unfortunely seems cant doo anything about pseudo classes like hover, active, focus and so on..., not INLINE
   // but there are other behin colon :  ...like last-of-type, first-of-type, not, open ...and who know what else
  pakRole = FylterOUTpseudoKlazesAndExludedKeys(pakRole);
    
 // console.log("fyltered rules len:", Object.values(pakRole).length);    // coment it out after debug
  sweepTheDementsWithSelectors(pakRole, particularDement);
  
  console.log("removed atempts of classes:",removedClasses);

}
// like OtherStileAndRulesGubering(document.getElementById("matirix"))
// or arr  OtherStileAndRulesGubering(document.querySelectorAll("#matirix *"))
// OtherStileAndRulesGubering(document.getElementById("audio_player_modal"))
// or just OtherStileAndRulesGubering();

// sweep passed styleshit for rules AND subRefered Styleshits.
function LootThtStyleShit(singleStileShit)
{
   if(!singleStileShit)return;
   
   paklAllStilkuu[singleStileShit.href] = singleStileShit;
   
   [...singleStileShit.rules].forEach(strangeRule => {
   
       if(strangeRule.type == 3)
       {
            // imported stileshit...
            LootThtStyleShit(strangeRule.styleSheet);
            
       }
       else
       {
        // the most common is 1 ... some media and screen got their own
        if(strangeRule.selectorText)
        {
           pakRole[strangeRule.selectorText] = strangeRule;
        }
        else
        {
        // font faces, media rules,...
        console.log("no selector>> ",strangeRule);
           unzorteds.push(strangeRule);
        }
       }   
   });
}

function sweepTheDementsWithSelectors(someParticularRoleDic, particularDement) {
  if(someParticularRoleDic == undefined || someParticularRoleDic == null)someParticularRoleDic = pakRole;
  var inrikable = Object.values(someParticularRoleDic);
  
//  var rulesWithColon = inrikable.filter(blyy => blyy.selectorText.includes(":"));
//  var rulesWithSpace = inrikable.filter(blyy => blyy.selectorText.includes(" "));
//  var rulesWithSharpBrac = inrikable.filter(blyy => blyy.selectorText.includes(">"));
  var rulesNOsubrules = inrikable.filter(blyy => !blyy.selectorText.includes(":") && !blyy.selectorText.includes(" ") && !blyy.selectorText.includes(">"));
  var rulesWithSubrules = inrikable.filter(blyy => blyy.selectorText.includes(":") || blyy.selectorText.includes(" ") || blyy.selectorText.includes(">"));

  /*
  inrikable.forEach(roura => {
      console.log(roura);
  });
  */
  if(EvilReplace == true)
  {
     rulesWithSubrules.forEach(roura => {
        // console.log("subrule:",roura);
         HardStyleAdder(roura, false, particularDement);
     });
   
     rulesNOsubrules.forEach(roura => {
       //  console.log("NOsubRule:",roura);
         HardStyleAdder(roura, true, particularDement);
     });
  }
  
  var backcheckOfcovering = (inrikable.length == rulesWithSubrules.length + rulesNOsubrules.length);
  console.log("total:%s, sub:%s, NOsub:%s, coveredCountOK:%o",inrikable.length, rulesWithSubrules.length, rulesNOsubrules.length, backcheckOfcovering);
  
}
var excludedSelector = [
   "#navbar",
   ".navlink_wrapper",
   ".navlink_wrapper a",
   ".navlink_wrapper.hidden",
   ".hidden",
   ".hide",
   ".repro_wrapper",
   ".fan_wrapper",
   ".vertical_submenu, .horizontal_submenu",
   ".topNavSelected",
   ".sideNavSelected",
   ".subContenntPage"
   
];
// .vertical_submenu > .relativeControls > div
// .horizontal_submenu > div

function FylterOUTpseudoKlazesAndExludedKeys(PaklRolesDic)
{
   if(!PaklRolesDic)PaklRolesDic = pakRole;
   var rgxpseudo = /:hover|:active|:focus|:visited|:target|:checked/mi;
   var arrOfRules = Object.values(PaklRolesDic);
   var NoPseudoss = arrOfRules.filter(blyy => {
     return !rgxpseudo.test(blyy.selectorText);
   });
  // NoPseudoss.filter(koo => koo.selectorText.includes(":"))  .. to test if sucefull..
  var fylteredDic = {};
  NoPseudoss.forEach(mrzak => { if(!excludedSelector.includes(mrzak.selectorText))fylteredDic[mrzak.selectorText] = mrzak } );
  return fylteredDic;
}

function HardStyleAdder(CeEsEsRule, isNotPseudoOrSubRule, particularDement)
{
   if(!CeEsEsRule)return;
   if(!CeEsEsRule.selectorText)
   {
      console.log("that rule have NOOO Selector !! : ", CeEsEsRule);
      return;
   }
   
   if(particularDement)
   {
      if(particularDement.length != undefined && particularDement.forEach != undefined)
      {
         // then seems some Arr passed instead of root dement as document
         particularDement.forEach(ohneDement => {
            HardStyleAdder(CeEsEsRule, isNotPseudoOrSubRule, ohneDement);
         });
         
         return;
      }
   }
   
   var targetDmnts = [];
   if(particularDement == undefined || particularDement == null)
      targetDmnts = document.querySelectorAll(CeEsEsRule.selectorText);
   else
   {      
      targetDmnts = particularDement.querySelectorAll(CeEsEsRule.selectorText);
   } 
      
   if(targetDmnts.length < 1)
   {
    //  console.log("that rule DOES NOT APPLY TO anything now:", CeEsEsRule);
   }
   else
   {
    //  console.log("that rule:%o WILL be INLINED ...and there fore should be removed from styleshit:%o",CeEsEsRule, CeEsEsRule.parentStyleSheet);
      var defStylesKeys = Object.values(CeEsEsRule.style);
      if(defStylesKeys.length > 0)
      {
         targetDmnts.forEach(CezedDmnt => {
           
             for (var ski = 0; ski < defStylesKeys.length; ski++) {
               if(CezedDmnt.style[defStylesKeys[ski]] == "")
                  CezedDmnt.style[defStylesKeys[ski]] = "" + CeEsEsRule.style[defStylesKeys[ski]];
             }
             
             if(isNotPseudoOrSubRule)
             {
               // means it can be class def or id def 
               if(CeEsEsRule.selectorText.startsWith("."))
               {
                  // it should be class..
                  
                  removedClasses.push(CeEsEsRule.selectorText);
                  
                  var removename = CeEsEsRule.selectorText.substring(1);
                  if (CezedDmnt.classList.contains(removename))
                     CezedDmnt.classList.remove(removename);
                  
               }
               
             }
           
         });
      }
   }
}

function obtainStileRulesBySelectorText(classOrIdOrTagOrSelector, onlyExactMatch)
{
   if(removedClasses.length < 1 && unzorteds.length < 1)
     JustGaderRuule(); 

   if(!classOrIdOrTagOrSelector)return null;
   if(classOrIdOrTagOrSelector == "")return null;

   var arredRules = Object.values(pakRole);
   if(arredRules.length < 1)
   {
      JustGaderRuule();
      arredRules = Object.values(pakRole);
   }
    
   if(!onlyExactMatch)
   {  
      var poshitibles = arredRules.filter(thoze => thoze.selectorText.includes(classOrIdOrTagOrSelector));
      return poshitibles;
   }
   else
   {
      var poshitibles = arredRules.filter(thoze => thoze.selectorText == classOrIdOrTagOrSelector);
      return poshitibles;   
   }
   // usually returns shortest at first and then the combo rules with space..
}
// var crulesArr = obtainStileRulesBySelectorText("repro_wrapper")
// var crulesArr = obtainStileRulesBySelectorText("home_wrapper");
// var crulesArr = obtainStileRulesBySelectorText(".home_wrapper > *");
// var opral = obtainStileRulesBySelectorText(".audio_modal", true);

// ...rather nonsense>>
function InlyneOneDmntWithRule(taadmnt, classOrIdOrTagOrSelector)
{
   if(!taadmnt || !classOrIdOrTagOrSelector)return;
   var arrofRules = obtainStileRulesBySelectorText(classOrIdOrTagOrSelector);
   if(arrofRules && arrofRules.length > 0)
   {
       var CesesRule = arrofRules[0];
       var defStylesKeys = Object.values(CesesRule.style);
      
       for (var ski = 0; ski < defStylesKeys.length; ski++) {
          if(taadmnt.style[defStylesKeys[ski]] == "")
               taadmnt.style[defStylesKeys[ski]] = "" + CesesRule.style[defStylesKeys[ski]];
      }  
   }
}
// InlyneOneDmntWithRule(document.getElementById("Icon-repro1"), "repro_wrapper")


function InlyneBySingleSelector(selectorText, onlyExactMatch)
{
if(!selectorText)return;
var ruulez = obtainStileRulesBySelectorText(selectorText, onlyExactMatch);
if(!ruulez || ruulez.length < 1)return;
// longest at start >>
ruulez.sort((aa, bb) => {
  if(!aa.selectorText.includes(" "))return 1;
  if (aa.selectorText.length > bb.selectorText.length) return -1;
  if (aa.selectorText.length < bb.selectorText.length) return 1;
  return 0;
});

   ruulez.forEach(hurle =>{
     var selkec = hurle.selectorText;
     document.querySelectorAll(selkec).forEach(querDement => {  
             console.log("replacing dmnt:%o with rule:%o", querDement, hurle);
       CruleToDmnt(querDement, hurle);                
     });
   });
}
// InlyneBySingleSelector(".home_wrapper > *")
// InlyneBySingleSelector(".audio_modal")
// InlyneBySingleSelector(".modal", false)

function CruleToDmnt(elDument, cssrule)
{
   if(!elDument || !cssrule)return;
   var defStylesKeys = Object.values(cssrule.style);
   
   for (var ski = 0; ski < defStylesKeys.length; ski++) {
      if(elDument.style[defStylesKeys[ski]] == "")
            elDument.style[defStylesKeys[ski]] = "" + cssrule.style[defStylesKeys[ski]];
   }
   
   if(cssrule.selectorText.startsWith(".") && !cssrule.selectorText.includes(" ") && !cssrule.selectorText.includes(":") && !cssrule.selectorText.includes(">"))
   {
      var removename = cssrule.selectorText.substring(1);
      if (elDument.classList.contains(removename))
      {
         elDument.classList.remove(removename);
         console.log("inlined and REMOVED class:%s from dmnt:%o ",removename, elDument);
      }
   }    
}





function InsertWraperOfLoadFrom(pathToLoadFrom, whereDmntTopuIt)
{
    // precreates neutral div wraper with loadfrom atrib ..apends it and then calls   LoadLindedHTML
    // the path should be heatly one .. like "./Home/home.html";
   // dontforget on posibilities of whereTopuIt.insertAdjacentElement("afterend",komament)
   // beforebegin   afterbegin beforeend afterend
   if(!pathToLoadFrom)return;
   if(!whereDmntTopuIt)whereDmntTopuIt = document.body;
   
   var posibleIde = pathToLoadFrom.split("/").splice(-1)[0].split(".")[0];
   if(document.getElementById(posibleIde)!=null)
       posibleIde+="_" + (""+Math.random()).substring(8);
   var prepTuxt = `<div id="${posibleIde}" loadfrom="${pathToLoadFrom}"  style="display: block;" class="subContenntPage"></div>`;
   var kerosedPacient = CreeAteDement(prepTuxt);            
   whereDmntTopuIt.append(kerosedPacient);
   maxDeep = 76;
   LoadLindedHTML();   
}

//InsertWraperOfLoadFrom("./Home/modalPlayer.html");



// not realy reussable..
function MultiGen(startingDex, amount, destinationDement) {
  if (!amount) amount = 1;
  if (startingDex > amount) startingDex = 0;
  if (destinationDement == undefined || destinationDement == null)
    destinationDement = document.createElement("div");
  for (var mi = startingDex; mi < amount; mi++) {
    var dvojCifro = ("" + mi).padStart(2, "0");
    var templut = `<button id="homebut_${dvojCifro}" fbactiveclass="lehcePushd" onclick="HomeSideControlsButs(this);" booljoin="Bool-17${dvojCifro}" class="homeCntrl" ipid="0x27" style="height: 55px;text-shadow: 1px 2px 4px #0d0c0ced;font-weight: bold;margin-block-end: 4px;">homeBut ${dvojCifro}</button>
    `;
    var oneKrutor = CreeAteDement(templut);
    destinationDement.appendChild(oneKrutor);
  }
  return destinationDement;
}
//MultiGen(2, 9, document.getElementById("homeColumner"))

function CreeAteDement(fullTXT) {
  if (fullTXT) {
    var dyvar = document.createElement("div");
    dyvar.innerHTML = fullTXT;
    if (dyvar.children.length == 1)
      return dyvar.children[0];
    else
      return dyvar;
  }
}
// CreeAteDement("<p>aaa</p>")

function temporialyGenerateButtons()
{
// document.querySelectorAll("[booljoin]")


var duplifacha = SigDyk["Bool-101"].facha;
var sindex = 9;
for (var kar = 109; kar < 201; kar++) {
  var asiprasi = "Bool-" + kar;
  var svs = "sv" + ("" + sindex).padStart(2, "0");
  if (SigDyk[asiprasi]) {
    SigDyk[asiprasi].id = svs;
SigDyk[asiprasi].facha = duplifacha;
  }
  sindex++;


}


// gen heat boxes..
var odkudex = 4;

for (var p = odkudex; p < 21; p++) {
  var pux = ("" + p).padStart(2, "0");
  var boolex = p + 500;
  var tempultej = `<button id="heat${pux}" style="display: block;position: relative;min-width: 5%;text-shadow: 1px 1px 2px black;font-weight: bolder;" fbactiveclass="lehceRed" booljoin="Bool-${boolex}" ushortjoin="UShort-53" onclick="ButonHeatSelect(this);" class="oneHeatBox" ipid="0x27">
         <p>Room Nam X</p>
        <span class="tempDisplay" id="temp${pux}">44 C</span>
        </button>`;
  var onehBox = CreeAteDement(tempultej);
  var tamlifruj = document.querySelector("#heats > div:nth-child(4) > div:nth-child(1)");
  if (tamlifruj.children.length < 20)
    tamlifruj.append(onehBox)
  console.log("re", onehBox);
}

}
