// idea is to have worker instancer 
// where each will capsulate comunication wich specific IPID and IP

// both worker and this kyrych has to havve this
var i ={
    "INITIALIZE_WS": "INITIALIZE_WS",
    "CONNECT_WS": "CONNECT_WS",
    "DISCONNECT_WS": "DISCONNECT_WS",
    "WEBSOCKET_EVENT": "WEBSOCKET_EVENT",
    "SET_BASE_PATH": "SET_BASE_PATH",
    "SET_JWT": "SET_JWT",
    "AUTHENTICATE": "AUTHENTICATE",
    "LOGGER_EVENT": "LOGGER_EVENT",
    "BRIDGE_SEND_BOOLEAN_TO_NATIVE": "BRIDGE_SEND_BOOLEAN_TO_NATIVE",
    "BRIDGE_SEND_INTEGER_TO_NATIVE": "BRIDGE_SEND_INTEGER_TO_NATIVE",
    "BRIDGE_SEND_STRING_TO_NATIVE": "BRIDGE_SEND_STRING_TO_NATIVE",
    "BRIDGE_SEND_OBJECT_TO_NATIVE": "BRIDGE_SEND_OBJECT_TO_NATIVE",
    "BRIDGE_RECEIVE_BOOLEAN_FROM_NATIVE": "BRIDGE_RECEIVE_BOOLEAN_FROM_NATIVE",
    "BRIDGE_RECEIVE_INTEGER_FROM_NATIVE": "BRIDGE_RECEIVE_INTEGER_FROM_NATIVE",
    "BRIDGE_RECEIVE_STRING_FROM_NATIVE": "BRIDGE_RECEIVE_STRING_FROM_NATIVE",
    "BRIDGE_RECEIVE_OBJECT_FROM_NATIVE": "BRIDGE_RECEIVE_OBJECT_FROM_NATIVE",
    "CCS_DIAGNOSTICS": "CCS_DIAGNOSTICS",
    "LICENSE_EVENT": "LICENSE_EVENT",
    "VALIDATION_EVENT": "VALIDATION_EVENT",
    "INTERNAL_EVENT": "INTERNAL_EVENT",
    "SET_PARAM_IPID": "SET_PARAM_IPID",
    "EVAL": "EVAL",
    "REACHED": "REACHED"
};


// same as insiide workers..
// this is used only when true, then overwrites individual debug settings in socket connection from sigdyk
// ..so if false, then individual is used, if true then true for all
globalThis.DEBUG = false;

// importted from meeleme
// file:///D:/WLOZ/HmltJQlz/gogleWEbdezideer/farking/meleme.html
function SexalKoktal(totoEval) {

  var pojebal;
  if (totoEval) {
    try {
         // ...recently encouterend strange anomaly behavior...
         // some eval.. that resulting in other SCOPE !!!
       //pojebal = eval(totoEval);
       pojebal = globalThis.eval(totoEval);
      
    } catch (errika) {
      var stuk;

      pojebal = errika.message;

      if (errika.stack) {
        stuk = errika.stack;
      } else if (errika.stacktrace) {
        stuk = errika.stacktrace;
      }

      if (stuk != null && stuk != undefined) pojebal += " " + stuk;
    }
    // may be..ifneeded final
  }
  return pojebal;
}

function FletchAsBlob(uralTofetch) {
  fetch(uralTofetch).then((response) => {
    response.blob().then((blobFile) => {     
      console.log("nblb", blobFile)
       var objectURL = URL.createObjectURL(blobFile);
     console.log("objural",objectURL);
    });
  });
}
// like FletchAsBlob("mykryp.js")

// posibly to disstribute to subworkers

globalThis.JWTurl = "";

// copy of same from worker.. mainly for dev purposess
// preobtainJWTshit("192.168.166.166")
function preobtainJWTshit(customIPhost)
{
   // http://192.168.166.166:8888/GJWT/crestron+9200
   // alternatively when on https 
   // https://192.168.166.166/cws/flags/get/getwebsocketokenNF
var compleTargetUrl = "";
if(globalThis.JWTurl.length < 1)
{   
if(customIPhost == undefined || customIPhost == null)
      customIPhost = "192.168.166.166";
compleTargetUrl = "http://"+customIPhost+":8888/GJWT/crestron+9200";
if(this.location.href.startsWith("https"))
   compleTargetUrl = "https://"+customIPhost+"/cws/flags/get/getwebsocketokenNF";
}
else
compleTargetUrl = globalThis.JWTurl;   
   
fetch(compleTargetUrl).then(pocem => {
  pocem.text().then(pxx => {
    //console.log("poceem", pxx)
    if(pxx !=null&& pxx.length > 1)
    {
       globalThis._LastJWT= pxx.trimStart();
    }
  });
})
}
// FletchAsBlob("file:///D:/WLOZ/HmltJQlz/gogleWEbdezideer/farking/clockGoingV2.js")

//  !!!   DONT forgeet that browser WONT allow the con unitl you manualy open eg ...  https://192.168.166.54:49200/  .. to add temporial exeption for cert  
// TaskWorkerWithEval(`StartWScon("192.168.166.166", "0x60","https://192.168.166.54/cws/flags/get/getwebsocketokenNF")`);

// SingleWrkerStart("192.168.166.166","0x60","https://192.168.166.166/cws/flags/get/getwebsocketokenNF")
// SingleWrkerStart("192.168.166.54","0x27","https://192.168.166.54/cws/flags/get/getwebsocketokenNF")
// ... MAIN starter....
function SingleWrkerStart(targetSystemIP, targetIPID, optionalExactJWTurl, debugHim, speciDyk)
{
   if(!targetSystemIP)
      targetSystemIP = "192.168.166.166";
   if(!targetIPID)
      targetIPID = "0x60";
   var targetJWTurl = "";
   if(optionalExactJWTurl != undefined && optionalExactJWTurl != null)
   {
      targetJWTurl = optionalExactJWTurl;
      if(!optionalExactJWTurl.includes("-nojwt-")) 
         globalThis.JWTurl = optionalExactJWTurl;
   }
   else
      targetJWTurl = globalThis.JWTurl;
      
    // ..preclearing valuees ..so it does not have do when dumping it ...  
    if(speciDyk != undefined && speciDyk != null)
    {
       ClearSigDykValues(speciDyk);
    } 
      
    var assumedKey =  targetIPID + "_mykryp.js";  // like 0x60_mykryp.js   ...should contain ip as well..
    if(!this.WokersRegistry)
      this.WokersRegistry = {};
      
      if(this.WokersRegistry[assumedKey])
      {
         // more sure and efective is close it from inside bye sending 
         // TaskWorkerWithEval("this.close()")
         // ..may need to send disconect to socket firstt !!  
          if(this.WokersRegistry[assumedKey].targetSystemIP)
          {
            if(this.WokersRegistry[assumedKey].targetSystemIP != targetSystemIP)
            {
                console.log("confict when create worker, same IPid diferent IP, IpIdKey:%o, newIP:%o, previousIp:%o ",assumedKey, targetSystemIP, this.WokersRegistry[assumedKey].targetSystemIP);
                // TODO:  what if there will be desire to connect two same IPID on diferent IP ?? 
                // ..for now do this.. move the previous worker aside under new key..while later this normal one will be replaced  
                var MovedAsideKey =  targetIPID + "_"+(""+Math.random()).slice(-6)+ "_mykryp.js";
                // if by chance hit existing anyway...
                 if(this.WokersRegistry[MovedAsideKey])this.WokersRegistry[MovedAsideKey].terminate();
                 
                 var betweenObInsta = this.WokersRegistry[assumedKey]; 
                 this.WokersRegistry[MovedAsideKey] = betweenObInsta;
                 
            }                                            
            else
            {
               // then its ok kill previous insta of same..
                this.WokersRegistry[assumedKey].terminate();
            }
          }
          else
          {       // then dont care ...just kill it..
                  this.WokersRegistry[assumedKey].terminate();
          }      
      }
    
    
    simpleWokerMuker("mykryp.js", targetIPID, targetSystemIP, debugHim, speciDyk);
    
    if(targetJWTurl.includes("-nojwt-"))
    {
      // then better make usre worker haave correct cp credentials..
      var znovaHromad = Object.values(SigDyk.connection);
      var hissockdef = znovaHromad.find(teho => teho.ip == targetSystemIP && teho.ipid == targetIPID);
      if(hissockdef)
      {
          if(hissockdef.cpuser && hissockdef.cppass)
          {
             TaskWorkerWithEval(`globalThis._hisCPuser = "${hissockdef.cpuser}"; globalThis._hisCPpass = "${hissockdef.cppass}";`, this.WokersRegistry[assumedKey]);
          }
      }
      else
      {
         TaskWorkerWithEval(`globalThis._hisCPuser = "crestron"; globalThis._hisCPpass = "crestron";`, this.WokersRegistry[assumedKey]);
      }      
    }
                                                                  
    TaskWorkerWithEval(`StartWScon("${targetSystemIP}", "${targetIPID}","${targetJWTurl}")`, this.WokersRegistry[assumedKey]);
    // or 
    // TaskWorkerWithEval(`StartWScon("${targetSystemIP}", "${targetIPID}","-nojwt-")`, this.WokersRegistry[assumedKey]); 
      
}

// simpleWokerMuker("mykryp.js","192.168.166.166");
function simpleWokerMuker(custoFile, hisIPid, targetSystemIP, debugHim, speciDyk)
{
if(custoFile == undefined || custoFile == null)
   custoFile = "mykryp.js"; 
if(hisIPid == undefined || hisIPid == null)
   hisIPid = "0x60"; 
if(debugHim == undefined || debugHim == null)
   debugHim = false;

   // master overide...only when true 
if(globalThis.DEBUG == true)
   debugHim = true; 

if(!this.WokersRegistry)
  this.WokersRegistry = {};
   
var comboWorkerKeyforLocalRegistry = hisIPid +"_"+ custoFile;
var mychWorker = new Worker(custoFile);
this.WokersRegistry[comboWorkerKeyforLocalRegistry] = mychWorker;
// for informative purpooses
if(targetSystemIP)
{
   this.WokersRegistry[comboWorkerKeyforLocalRegistry].targetSystemIP = targetSystemIP;
   this.WokersRegistry[comboWorkerKeyforLocalRegistry].hisIPhost = targetSystemIP;
}
// for possible later id
this.WokersRegistry[comboWorkerKeyforLocalRegistry].hisIPid = hisIPid;
this.WokersRegistry[comboWorkerKeyforLocalRegistry].debug = debugHim;


mychWorker.onmessage = (em) => {

  // console.log("incoming msg from worker:",em.data);
   HandleMSGfromWorker(em.data, speciDyk);
}

mychWorker.onerror = (erm) => {

   console.log("worker err",erm, hisIPid);
   if(dopsatTWA)
         dopsatTWA.value+="workerERR " + erm;        
}

mychWorker.postMessage({"type":"SET_PARAM_IPID", "payload":{"IPID":hisIPid, "DEBUG":debugHim }});

}

//simpleWokerMuker("mykryp.js")
// BrudcastMsgToAllWokers({"type":"SET_PARAM_IPID", "payload":{"IPID":hisIPid}})
function BrudcastMsgToAllWokers(desiredMSG) {
  if (!desiredMSG)
    desiredMSG = "eval('console.log(..nazdar bukvo)');";
  if (this.WokersRegistry) {
    var wukerslist = Object.values(this.WokersRegistry);
    wukerslist.forEach((tenWrk) => {
      tenWrk.postMessage(desiredMSG)
    });
  }
}

// TaskWorkerWithEval(`sendUpdateRequest()`,WokersRegistry["0x27_mykryp.js"])
// TaskWorkerWithEval(`sendUpdateRequest()`);
// TaskWorkerWithEval(`this.DEBUG = true`);
// TaskWorkerWithEval(`globalThis.JWTurl`)
// TaskWorkerWithEval(`globalThis.JWTurl="https://192.168.166.54/cws/flags/get/getwebsocketokenNF"`)
// TaskWorkerWithEval(`StartWScon("192.168.166.166", "0x60","https://192.168.166.54/cws/flags/get/getwebsocketokenNF")`);
function TaskWorkerWithEval(txtFormDataToEvalThere, specificWrk)
{
   //  CALLING THIS may call broudCAST !!!
   if(!txtFormDataToEvalThere)
      txtFormDataToEvalThere = "{}";
   var pakl = {"type":"EVAL", "payload":{"eval":txtFormDataToEvalThere}};
   if(specificWrk)
   {
      specificWrk.postMessage(pakl);
   }
   else
   {
      BrudcastMsgToAllWokers(pakl);
   }
}


// ActivateSig("b","333",true)
// ActivateSig("b","333",true, "0x60")
// ActivateSig("b","333",true, "0x27,0x26,0x29")
// ActivateSig("n",127,290,"0x60")
//ActivateSig("b", 4019, false, null, 107)
function ActivateSig(sigType, sigName, sigValue, specificIPid, smartObjectId)
{
      // if we just fuck around with the dom withou cip conection..
   if(!globalThis.WokersRegistry)return;
   
var sigData ={
    "type": "BRIDGE_SEND_BOOLEAN_TO_NATIVE",
    "payload": {
        "value": true,
        "signalName": "500"
        }
    };
     
   sigData.payload.signalName = sigName;
   sigData.payload.value = sigValue;
   if(smartObjectId != undefined && smartObjectId != null && smartObjectId > 0)
      sigData.payload.smartObjectId = smartObjectId;
   
   switch(sigType)
   {
   
      case "b":
      {
        sigData.type = "BRIDGE_SEND_BOOLEAN_TO_NATIVE";
        
      }break;
   
      case "a":
      case "n":
      {
         sigData.type = "BRIDGE_SEND_INTEGER_TO_NATIVE";
      }break;
      
      case "s":
      case "t":
      {
         sigData.type = "BRIDGE_SEND_STRING_TO_NATIVE";
      }break;
      
      case "o":
      case "smart":
      {
         sigData.type = "BRIDGE_SEND_OBJECT_TO_NATIVE";
      }break;
   
      default:
      console.log("undefined case for ActivateSig",sigType);
      break;
   }
   
   if(specificIPid)
   {
   
      var assumedKey ="";
         // if multi ip id  like "0x27,0x28,0x29"
      if(specificIPid.includes(","))
      {
         assumedKey = FindFirstAviableSocketIPID(specificIPid);
         if(assumedKey == null)
         {
            console.log("for multiIPIDof:%o, UNABLE TO LOCATE any WORKER key !!",specificIPid);
            BrudcastMsgToAllWokers(sigData);
         }
         else
         {
             WokersRegistry[assumedKey].postMessage(sigData);
         }           
      }
      else
      {
         assumedKey = specificIPid + "_mykryp.js";
         if(WokersRegistry[assumedKey])
         {
             WokersRegistry[assumedKey].postMessage(sigData);
         }
         else
         {
            console.log("desired ipid not in registry ", specificIPid, assumedKey, sigName);
            BrudcastMsgToAllWokers(sigData);
         }
      }
   }
   else
   {
        BrudcastMsgToAllWokers(sigData);
   }
}
// if dement have multiplet ipids likee "0x27,0x28,0x29"
// then atempt finding firt suitable in instantied workers
// rets the KEY in WokersRegistry
function FindFirstAviableSocketIPID(specificIPid)
{
   if(!specificIPid)return null;
   if(!this.WokersRegistry)return null;
   var aviableWokerKeys = Object.keys(WokersRegistry);
   var multiIPid = specificIPid.split(",");
   var posiblyy = null;
   for(ipi of multiIPid)
   {
     posiblyy = aviableWokerKeys.find(teho => teho.startsWith(ipi))
     if (posiblyy) break;
   }
   return posiblyy; 
}

// related to possible json reading of defined func in imaginary registry of sigs vs action to go for
function JasnejRypaakel(Kyhej, Fakule)
{
   // resolver for  TransforJasnel
   // for serializing functionsin badyked ..
  if(Fakule == null || Fakule == undefined)
      return '';
  if (typeof Fakule === 'string') {
    return Fakule;
  }
  else if(typeof Fakule === 'function') {
    return (Fakule + '');
  }
  else if(typeof Fakule === 'object') {
    return (Fakule);
  }
  else
  {
  // btw... arrays seems to be returng as typef object
  // should be done by ..  krutost["forEach"] == undefined
   return Fakule;
  }
}
// related to possible json reading of defined func in imaginary registry of sigs vs action to go for
function TransforJasnel(problematicObj)
{
   // for pre-transforming badyked for saving to file... with func text reprezentation as well..
   if(problematicObj == null)problematicObj = {};
   // for indend use either number for spaces 
   //  return JSON.stringify(problematicObj, JasnejRypaakel, 4);
   // or directly the " " or any other what to be used as indendd
   //    return JSON.stringify(problematicObj, JasnejRypaakel, " "); or "\x0D" or "\t"
   return JSON.stringify(problematicObj, JasnejRypaakel, 2); 
   //  no indend ..save space ...use it when done debug..
   // return JSON.stringify(problematicObj, JasnejRypaakel);
   
}
function JasnejReVyrvaal(Kyhej, Fakule)
{
   // resolver for  TransforJasnelBACKprase 
   // for back DEserializing textized functionsin from filized badyked ..back to function for use...
   // supposedly they say it may return 
   // The Object, Array, string, number, boolean, or null value corresponding to the given JSON text. 
   
  if(Fakule == null || Fakule == undefined)
      return '';
  if (typeof Fakule === 'string') {
    return Fakule;
  }
  else if(typeof Fakule === 'function') {
    return (Fakule + '');     // so here should be our actiton for back actioning...
  }
  else if(typeof Fakule === 'object') {
    return (Fakule);
  }
  else
  {
  // btw... arrays seems to be returng as typef object
  // should be done by ..  krutost["forEach"] == undefined
   return Fakule;
  }
}
// this one seems bad...useles...
function TransforJasnelBACKprase(HugerTextWaster)
{
   // for pre-transforming  during DE serializing of maimly badyked 
   // when LOADING from file... with func text reprezentation as well..
   var problematicObj = {};
   if(HugerTextWaster == null || HugerTextWaster == undefined || HugerTextWaster.length < 2)
      return null;

   if(problematicObj == null)problematicObj = {};
   
   return JSON.parse(HugerTextWaster, JasnejReVyrvaal);   
}
// perhaps will do.... if so ...place it to JesonFilButler inside expenziver..
function TransforJasnelBACKpraseLABMD(HugerTextWaster)
{
   // for pre-transforming  during DE serializing of maimly badyked 
   // when LOADING from file... with func text reprezentation as well..
  
   if(HugerTextWaster == null || HugerTextWaster == undefined || HugerTextWaster.length < 2)
   {
      console.log("EMPTy  HugerTextWaster !!!!");
      return null;
   }
      // ...vaginule.startsWith("function") || hyykej == "facha" 

   return JSON.parse(HugerTextWaster, (hyykej, vaginule)=>
   {
         if(vaginule != null && typeof(vaginule) == 'string' && vaginule.startsWith("function"))    
         {
            //return CreateFunctionX(vaginule);       BustyExeSexule 
          //  var globfunctishit = GlbScopeFuncCreator(vaginule);
            //return function(e){ globfunctishit(e); };
            // var kantoickabrcalata = CreateANONFunctionX(vaginule);
            
            return CreateNoooFunctionX(vaginule);
         }                                                       
         else
         {
         
           return vaginule;
         } 
   });   
}


function FetuchFailDEBAKANEJ(fileeetreskovee, RwritOtherwiseADD, goConnect) 
{
      
      if(fileeetreskovee == undefined || fileeetreskovee == null)
         fileeetreskovee = "SigDyk.json";
      // for geting the specific badyked with transformed functions as text .. for incomings ws events...
       //fetch(fileeetreskovee).then(paaze => paaze.blob().then(pukl => pukl.text().then(kaprex => {
     fetch(fileeetreskovee).then(paaze => paaze.text().then(kaprex => {
      
      // var bakuladylyna = JSON.parse(kaprex);
      var bakuladylyna = TransforJasnelBACKpraseLABMD(kaprex);
      
      if (bakuladylyna != null) 
      {
         
        // console.log("remaked SigDyk:", bakuladylyna);
      
        if (RwritOtherwiseADD) 
        {
             console.log("SigDyk WILL... be rewritet by:",fileeetreskovee);
             if(SigDyk.hasOwnProperty("length"))
             {
               var takdeflapropa =  Object.getOwnPropertyDescriptor(SigDyk,"length");
                 SigDyk = bakuladylyna;
                 Object.defineProperty(SigDyk, "length",takdeflapropa);            
             }
              else 
               SigDyk = bakuladylyna;

        } 
        else 
        {
          //  console.log("SigDyk Wont be rewritet by:",fileeetreskovee);
            
          // then is should be merge like...
          for(var tfujblee in bakuladylyna)
          {
               if(SigDyk[tfujblee] == null || SigDyk[tfujblee] == undefined)
               {
                    SigDyk[tfujblee] = bakuladylyna[tfujblee];
               }
               else
               {
                                     
                     if(bakuladylyna[tfujblee].facha !=null)
                       SigDyk[tfujblee].facha = bakuladylyna[tfujblee].facha;
                                            
                     if((SigDyk[tfujblee].id == undefined || SigDyk[tfujblee].id == null) &&  bakuladylyna[tfujblee].id !=null)
                       SigDyk[tfujblee].id = bakuladylyna[tfujblee].id;
                         
               }
          }
        }
        
        // consider some sorting ...
        // SigDyk = SygzSorting(SigDyk)
        if(goConnect && goConnect==true)
        {
           if(SigDyk.connection)
           {
                var sequenceCounter = 0;
                
                for (var opar in SigDyk.connection) {
                
                // console.log("o", opar)
                var socketDef = SigDyk.connection[opar];
                // under libovolne name of that socket ...should contain ip, ipid, jwturl
                // SingleWrkerStart("192.168.166.54","0x27","https://192.168.166.54/cws/flags/get/getwebsocketokenNF")
                // SingleWrkerStart("192.168.166.53", "0x15", "https://192.168.166.53/cws/flags/get/getwebsocketokenNF", true);
                if(socketDef.ip.length)
                {
                  var speciDyk = null;
                  // for firstt connection aka primary socket ..use primary dyk 
                  if(sequenceCounter < 1)
                  {
                      speciDyk = SigDyk;
                  }   
                  else
                  {
                     if(!socketDef.SigDyk)
                      SigDyk.connection[opar].SigDyk = {};
                      
                     speciDyk = SigDyk.connection[opar].SigDyk;  
                  }
    
                  SingleWrkerStart(socketDef.ip, socketDef.ipid, socketDef.jwturl, socketDef.debug, speciDyk);
                  sequenceCounter++;
                } 
                
               }
               
               // after timeout maybe enforcing wokers to tell their reached
               
           }
        }
        
      }
      
    }));
}

// this is ment for deebug testingg ...connectin aside from lane
// prepCustomWokr('192.168.166.54', '0x26')
function prepCustomWokr(hisIP, hisIPid, debugHim)
{
   if(!hisIP && !hisIPid)
   {
      return "prepCustomWokr('192.168.166.54','0x26',false)"
   }
   else if(hisIP && hisIP.includes("-nojwt-"))
   {
      return "SingleWrkerStart('192.168.166.54', '0x26', '-nojwt-', false, SigDyk)"
   }
   
   if(!debugHim)
      debugHim = false;
   
   var devisedJWTobtainURL = 'https://'+hisIP+'/cws/flags/get/getwebsocketokenNF';
   var assumedWokerKey = hisIPid + "_mykryp.js";
   if(globalThis.WokersRegistry)
   {
     if(WokersRegistry[assumedWokerKey] != null)
     {
       WokersRegistry[assumedWokerKey].terminate();
     } 
   }
   SingleWrkerStart(hisIP, hisIPid, devisedJWTobtainURL, debugHim, SigDyk);
   //SingleWrkerStart('192.168.166.54', '0x28','https://192.168.166.54/cws/flags/get/getwebsocketokenNF', false, SigDyk);  
   // SingleWrkerStart('192.168.166.54', '0x26','-nojwt-', false, SigDyk);   
   // example SingleWrkerStart(socketDef.ip, socketDef.ipid, socketDef.jwturl, socketDef.debug, speciDyk);
   return "";
}

// copy with sort, ment for sigdyk
function SygzSorting(someOBdyk)
{
if(someOBdyk == undefined || someOBdyk == null)
   someOBdyk = SigDyk;
   
var propdesky = Object.getOwnPropertyDescriptors(someOBdyk);
var kukeje = Object.keys(propdesky);
kukeje.sort();

var freshDyk = {};

  for(var prap in kukeje)
  {
     var ononame = kukeje[prap];
     Object.defineProperty(freshDyk, ononame, propdesky[ononame]) 
  }
  return freshDyk;
}
// SigREsort(true)
// sorts, preclear and offer save
function SigREsort(doPreClear)
{
   var defSocketsKeys = Object.keys(SigDyk.connection);
   if(defSocketsKeys.length > 1)
   {
         defSocketsKeys.forEach(skej => {
            if(SigDyk.connection[skej].SigDyk)
            {
               // seconday subdyks sorting..
              SigDyk.connection[skej].SigDyk = SygzSorting(SigDyk.connection[skej].SigDyk);
              // sub cleearinng
              if(doPreClear)
                ClearSigDykValues(SigDyk.connection[skej].SigDyk);
            }
      });
   }
   // main dyk sorting
   SigDyk = SygzSorting(SigDyk);
 // pre-nulling values befor saving..
  if(doPreClear)
   ClearSigDykValues(SigDyk);
 
 dumpSigDyk();  
}
function ClearSigDykValues(custSigDyk)
{
   if(custSigDyk)
   {
       var dlekaje = Object.keys(custSigDyk);
      dlekaje.forEach(kraj => {
        var some = custSigDyk[kraj];
        if(some.value === true)
      	 custSigDyk[kraj].value =false;
        else if((typeof some.value) == "number")
         custSigDyk[kraj].value = 0;
        else if((typeof some.value) == "string")
         custSigDyk[kraj].value = "";
      });      
   }
}

// this one seems promising
function CreateNoooFunctionX(madnesText) 
{

   if(madnesText == null || madnesText == undefined || madnesText.length < 1)
    madnesText = "";
    
    madnesText = madnesText.trim();
    
   if(madnesText.startsWith("(function"))
   {  
      var pseudoboody = '' + madnesText;
      var teploval = eval(pseudoboody);
      return teploval;
   } 
   else if(madnesText.startsWith("function"))
   {  
      var pseudoboody = '(' + madnesText + ')';
        // recaling self to be lvl higer...
      return CreateNoooFunctionX(pseudoboody);
   }    
   else
   {
       var docasar = CreateANONFunctionX(madnesText);
       return docasar;
   } 
}// this one seems promising

function CreateANONFunctionX(madnesText) 
{
// firstly cuts the function directive sadly with param also.. and then uses its body to create anonyfunc
   if(madnesText == null || madnesText == undefined || madnesText.length < 1)
    madnesText = "";
    
    madnesText = madnesText.trim();
    
   if(madnesText.startsWith("function"))
   {
      var posemporezat = madnesText.indexOf("{");
      if(posemporezat > -1)
      {
         madnesText = madnesText.slice(1 + posemporezat);
         madnesText = madnesText.slice(0,-1);
      }

   }
    var pseudoboody = '' + madnesText;
    
   return new Function(pseudoboody); 
}

function CreateFunctionX(madnesText) {
   // var x = 20;
   // return new Function('return x;'); // this |x| refers global |x|
   if(madnesText == null || madnesText == undefined || madnesText.length < 1)
    madnesText = "";
    
    var pseudoboody = ' ' + madnesText + ' ';
    
   return new Function(pseudoboody); 
}



function getCtorName(aObj) {
  if (aObj === null) {
    return "null";
  }
  if (aObj === undefined) {
    return "undefined";
  }
  if (aObj.constructor && aObj.constructor.name) {
    return aObj.constructor.name;
  }
  // If that fails, use Objects toString which sometimes gives something
  // better than 'Object', and at least defaults to Object if nothing better
  return Object.prototype.toString.call(aObj).slice(8, -1);
}
function tipe(obj){
    return Object.prototype.toString.call(obj).slice(8, -1);
}

function ElRypaakUgly(textualSome, maybeEx) {

  try {
    var zdalipaknecozhnilo = window.eval(textualSome);

    return zdalipaknecozhnilo;

  } catch (roor) {

    console.log("ElRypaakUgly err, fromtext:", textualSome, roor.message, roor);
    return roor.message;
  }
}

     // maybe for savving sigDyyk
function SarajeveClensed(rawTXTtoDumpSave, specFilenam)
{
var poserutup =  "";

if(rawTXTtoDumpSave != null && typeof(rawTXTtoDumpSave) == "string")
   poserutup = rawTXTtoDumpSave;
else
   poserutup = ("" + rawTXTtoDumpSave);

if(poserutup.length < 1)
   poserutup =  document.documentElement.outerHTML;

if(!specFilenam)
   specFilenam = "FileeNajme.txt";

var jouAbob = new Blob([poserutup],{ type: "text/plain;charset=utf-8" });
//var pseudofile = new Blob([poserutup], {type: "text/xml"});  // text/plain  // text/xml // application/xml
var aaa = document.createElement("a");
  aaa.href = URL.createObjectURL(jouAbob);
  aaa.download = specFilenam;// "FileeNajme.txt";
  aaa.click();
//console.log(jouAbob);
//saveAs(jouAbob, "dynamic.txt");  // .. it inavoidably offers save file dialog..
}

function dumpSigDyk()
{
//var textoSAvve = JSON.stringify(SigDyk);
var textoSAvve = TransforJasnel(SigDyk);

SarajeveClensed(textoSAvve, "SigDyk.json");
}




// Object.values(SigDyk).filter(ho => ho.smartObjectId)



var SigDyk = {};

Object.defineProperty(SigDyk, "length", {
  get() {
    return Object.keys(this).length - 2;
  },
  set(i){}
});

// Object.getPrototypeOf(SigDyk).values = function(){ return Object.values(this); };

function HandleMSGfromWorker(e, speciDyk)
{

  if(!e.payload)return;
  
  var cuSigDyk = null;
  if(speciDyk == undefined || speciDyk == null)
  {
      cuSigDyk = SigDyk;
      // this seems to provee NOT happend...OK
      console.log("--- SEEEMS THE reference to CustoSigDyk is Fucked ?? ",e);
  }
  else
      cuSigDyk = speciDyk; 
    
  switch (e.type) {

    case i.BRIDGE_RECEIVE_INTEGER_FROM_NATIVE: {
       //  var hysIPid = e.payload.hisIPID;
      //   var hysIPhost = e.hisIPhost;
        // SigDyk[e.payload.signalName] = e.payload;
        // methodic ..to update incomiing struc with predefined data from sigdyk .....THEN ..replace the sigdyk with updated struc
         /* 
         e.payload.facha = SigDyk[e.payload.signalName] ? SigDyk[e.payload.signalName].facha : void 0;
         if(SigDyk[e.payload.signalName] && SigDyk[e.payload.signalName].id)
            e.payload.id = SigDyk[e.payload.signalName].id;
            
         SigDyk[e.payload.signalName] = e.payload;    
           ...  seeems rather not ...*/  
            
       if(!cuSigDyk[e.payload.signalName])
           cuSigDyk[e.payload.signalName] = e.payload;
       else
       {
          cuSigDyk[e.payload.signalName].value = e.payload.value;
          cuSigDyk[e.payload.signalName].hisIPhost = e.payload.hisIPhost;
          cuSigDyk[e.payload.signalName].hisIPID = e.payload.hisIPID; 
          if(e.payload.smartObjectId)
               cuSigDyk[e.payload.signalName].smartObjectId = e.payload.smartObjectId;       
       }

         IncomingJoinsProsering(cuSigDyk[e.payload.signalName]);
    }
    break;

  case i.BRIDGE_RECEIVE_BOOLEAN_FROM_NATIVE: {

       
         // methodic ...if not present ..put replace there as wole...otherwise just updatee critical fields..what ever that is..
       if(!cuSigDyk[e.payload.signalName])
           cuSigDyk[e.payload.signalName] = e.payload;
       else
       {
          cuSigDyk[e.payload.signalName].value = e.payload.value;
          cuSigDyk[e.payload.signalName].hisIPhost = e.payload.hisIPhost;
          cuSigDyk[e.payload.signalName].hisIPID = e.payload.hisIPID; 
          if(e.payload.smartObjectId)
               cuSigDyk[e.payload.signalName].smartObjectId = e.payload.smartObjectId;
       }
       
       IncomingJoinsProsering(cuSigDyk[e.payload.signalName]);
  }
  break;

  case i.BRIDGE_RECEIVE_STRING_FROM_NATIVE: {
  
       if(!cuSigDyk[e.payload.signalName])
           cuSigDyk[e.payload.signalName] = e.payload;
       else
       {
          cuSigDyk[e.payload.signalName].value = e.payload.value;
          cuSigDyk[e.payload.signalName].hisIPhost = e.payload.hisIPhost;
          cuSigDyk[e.payload.signalName].hisIPID = e.payload.hisIPID; 
          if(e.payload.smartObjectId)
               cuSigDyk[e.payload.signalName].smartObjectId = e.payload.smartObjectId;
       }
        IncomingJoinsProsering(cuSigDyk[e.payload.signalName]); 
  }
  break;

  case i.BRIDGE_RECEIVE_OBJECT_FROM_NATIVE: {
  
       if(!cuSigDyk[e.payload.signalName])
           cuSigDyk[e.payload.signalName] = e.payload;
       else
       {
          cuSigDyk[e.payload.signalName].value = e.payload.value;
          cuSigDyk[e.payload.signalName].hisIPhost = e.payload.hisIPhost;
          cuSigDyk[e.payload.signalName].hisIPID = e.payload.hisIPID; 
          if(e.payload.smartObjectId)
               cuSigDyk[e.payload.signalName].smartObjectId = e.payload.smartObjectId;
       }
        
      IncomingJoinsProsering(cuSigDyk[e.payload.signalName]);
  }
  break;
 
    // other than joins msgs...
  case i.DISCONNECT_WS: {
    
     var aleeertMsg =`ws ciper recieved DISCONNECT IpID:${e.payload.hisIPID}, IPadr:${e.payload.hisIPhost} it will reconnect in 1min but... you may need to hit refresh !!`;
     console.log(aleeertMsg);  
     alert(aleeertMsg);   
  }                                                   
  break;
  
  case "WEBSOCKET_EVENT": {
    
     console.log("WS CIP Event:%s, of:%s id:%s",e.payload.eventName, e.payload.hisIPhost, e.payload.hisIPID);    
  }
  break;
  case i.REACHED: {
   // 1 after ws token obtain, 2 after websock insta conect, 4 after welcome msg recieved, 8 after con Acepted recieved,  16384 and 8192 is refused 
       console.log("Worker reporting ReachedState val:%s, ip:%s, id:%s ",e.payload.value, e.payload.hisIPhost, e.payload.hisIPID);
       var assumedWokerKey = e.payload.hisIPID + "_mykryp.js";
       if(WokersRegistry && WokersRegistry[assumedWokerKey])       
         WokersRegistry[assumedWokerKey].ReachedState = e.payload.value; 
         
       if(globalThis.dopsatTWA)
       {
         globalThis.dopsatTWA.value += "1 after ws token obtain, 2 after websock insta conect, \n 4 after welcome msg recieved, 8 after con Acepted recieved,\n  16384 and 8192 is refused \n";
         globalThis.dopsatTWA.value +="Worker reporting ReachedState val:"+e.payload.value+", ip:"+e.payload.hisIPhost+", id:" +e.payload.hisIPID + "\n";     
       }  
        
       if((e.payload.value & 1) != 1 || (e.payload.value & 2) < 1)
       {
            // now maybe force user to click throu critical url and allow exeption...
            if(globalThis.ShowOfferTheCriticalUrls)
                globalThis.ShowOfferTheCriticalUrls(assumedWokerKey);  
       }                               
  }
  break;
  
  case i.EVAL: {
       // it should bee EVAl results report from worker to main thread
       console.log("eval results of", e.payload.eval, e.payload.EVALresults);
       if(dopsatTWA)
       {
         dopsatTWA.value+="evalresu: " + e.payload.EVALresults + "\n";
       }       
  }
  break;
  
  
  default:
  console.log("undefined case for msg from worker.., type:%o, payload:%o",e.type, e);
    break;

  }
}


// for doing something with incoming joins events ..
// eg ..triger asigned funces in SigDyk, posible DOM changig etx..
function IncomingJoinsProsering(e)
{
  
    // .........check badunded.js for how to 
  if(e["facha"])
  {
    var desiredExeFuchtle = e["facha"];
    if(typeof desiredExeFuchtle =="function" || (desiredExeFuchtle["call"] != undefined))
    {
        desiredExeFuchtle(e.value, e);
    }
    else
    {
      if((typeof desiredExeFuchtle) == "string")
      {
         if(desiredExeFuchtle.startsWith("function"))
         {
            var temporialniTlupa = `(${desiredExeFuchtle})`;
            desiredExeFuchtle = temporialniTlupa;
         }
         
          var eitherCrajterORsexer = ElRypaakUgly(desiredExeFuchtle,desiredExeFuchtle);
          if(eitherCrajterORsexer != null)
          {
               // it actualy may be just corect results of executuion some instead of mistakenly passed halfbaked func...
               // ..cant be sure..guess better to sexing with something that with nothing...
               if(tipe(eitherCrajterORsexer) == "Function")
               {
                  eitherCrajterORsexer(e.value, e);
                  return;
               }
          }
      }
      
      this.eval(desiredExeFuchtle);

    }
  }
// set like SigDyk["UShort-62"].facha = function(e,t){ console.log("incoming temperature ?",e,t.hisIPID,t.signalName); } 
}

// this is deefined to call in sigdig  at sig name 
// Csig.State_Synchronization
function ONafterSyncSigs(hisIPID, data, cuSigDyk)
{
   if(data.value.includes("EndOfUpdate"))
   {
      setTimeout((slaamka,sgdyk) => {
        if(hisIPID == undefined || data == undefined)
            console.log("delayedONafterSyncSigs has NOT aviable passed DATA !!",slaamka, sgdyk);
            
        delayedONafterSyncSigs(hisIPID, data, cuSigDyk);
        
      }, 2500, hisIPID, cuSigDyk);
   }   
}
function delayedONafterSyncSigs(hisIPID, data, cuSigDyk)
{
   console.log("reforcing signals sync for",hisIPID);
   var relatedSigDyk = null;
   if(cuSigDyk != undefined && cuSigDyk != null)
      relatedSigDyk = cuSigDyk;
   else
      relatedSigDyk = SigDyk;
      
 var jenTYsameIPID = Object.values(relatedSigDyk).filter(kery => kery.hisIPID == hisIPID);
 var jenWithFuncs = jenTYsameIPID.filter(byfunc => byfunc.facha);  
 jenWithFuncs.forEach(strup => {
 if(strup.signalName != "Csig.State_Synchronization")
  strup.facha(strup.value, strup);
   });
}







function impresiveUselessUse()
{
   // when futile atempting to do somethinng with shitstron native https serv who has TERRIBL met content poliicy...
   // the dangerous url ..can be at least trigered by setting it as style background
   //    background: url("http://www.fillmurray.com/200/300")
   //    background: url("https://192.168.166.213/rawV/cums")
   sv69.style.background = "url(\"https://192.168.166.213/rawV/cums/\")";
}


function MemoHolder()
{


// ssuprisingly working solution !!


function uUu(e) {
    for (var t = "", n = e.length, i = 0; i < n; i++) {
      var o = e[i].toString(16);
      1 === o.length && (o = "0" + o),
        t += o + " "
    }
    return t
}

var ideo = Number.parseInt("0x27",16);

var cipws = new WebSocket("wss://192.168.166.54:49200")
cipws.onclose = function(proclos) {
  console.log("oncoleee", proclos);
}
cipws.onerror = function(rouror) {
  console.log("rouror", rouror);
}
cipws.onopen = function(skoupen) {
  console.log("on skoupen", skoupen);
}


cipws.onmessage = function(toto) {
  //console.log("toto", toto);
  if (toto.data["arrayBuffer"] == undefined || null) {
    console.log("pure txt rec?", toto.data);
  } else {
    toto.data.arrayBuffer().then(pp => {

      var txtrecivved = uUu(new Uint8Array(pp));
      txtrecivved = txtrecivved.trim();
      console.log("recived:", txtrecivved);
      if (txtrecivved == "0f 00 01 02") {
        var logginPack = new Uint8Array([0x01, 0x00, 0x0B, 0x00, 0x00, 0x00, 0x00, 0x00, ideo, 0x40, 0xFF, 0xFF, 0xF1, 0x01]);
        cipws.send(logginPack);
        console.log("logginPack sended..");
      } else if (txtrecivved == "0d 00 02 00 00") {
        // var t = Ne(14, new Uint8Array(), 0);
        var rspns = new Uint8Array([14, 0, 2, 0, 0]);
        cipws.send(rspns);
      } else if (txtrecivved == "0e 00 02 00 00") {
        //  var rspns = new Uint8Array([13,0,2,0,0]);
        //  nakedWss.send(rspns);
        console.log("incomingg heartbiit 0e ??");
      }else if (txtrecivved == "02 00 04 00 00 40 1f") {
        console.log("incominggquery for credentials ");
                                          // 0B-00-13-00-27-63-72-65-73-74-72-6F-6E-3A-63-72-65-73-74-72-6F-6E
         var credencpak = new Uint8Array([0x0B, 0x00, 0x13, 0x00, ideo, 0x63, 0x72, 0x65, 0x73, 0x74, 0x72, 0x6F, 0x6E, 0x3A, 0x63, 0x72, 0x65, 0x73, 0x74, 0x72, 0x6F, 0x6E]);
         cipws.send(credencpak);
         // should got  0C-00-03-00-27-01
      }
      else {
        console.log("recived:", txtrecivved);

      }
    });
  }
}   

}





// delayedInit

function delayedInit() {
  setTimeout((naco) => {
    //console.log("nacem")
    
    var gocon = false;
    
    FetuchFailDEBAKANEJ("SigDyk.json",false, gocon);
    var manuDemBut= document.getElementById("homebut_04");
    if(manuDemBut)
    {
     manuDemBut.classList.toggle("lehcePushd", gocon); 
    }
  }, 1000)
}
delayedInit();





