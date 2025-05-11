document.addEventListener('DOMContentLoaded', function () {

console.log("------DOMContentLoaded------");  
// ... in this case ...where the script is loaded side-like...
//....is this NOT TRIGERED
//PreplacniHTTPSofHTTPinAhrefs();
//ProhnileSmrduteDoupeZradnychZmiji();

 //  HadovaVychazka();
 //DistributeHCbutanes();
   
});

setTimeout(() => {
  //console.log("poo")
  apakterpvevyjebat();
}, 2000);

var StreamMedianSRVip = "192.168.166.213";


/*
DONT FORGET TO IMPLEMENT AUTO GEN RELATIVe TO 
await fetch("http://192.168.166.213:8083/streams",{    "headers": {"Authorization": "Basic ZGVtbzpkZW1v"} })
*/

function PreplacniHTTPSofHTTPinAhrefs()
{
   if(globalThis.location.href.startsWith("https"))
   {
      document.querySelectorAll("a").forEach(aaau => { 
         if(aaau.href.startsWith("http:"))
         {  
         aaau.href = aaau.href.replace("http:","https:"); 
         }
         if(aaau.href.includes("213:8083"))
         {  
         aaau.href = aaau.href.replace("213:8083","213:8084"); 
         } 
      });
   }
}

var WeAreOnHttps = null;
function RslvHTTPS(someUralTofetch)
{
   // expecting incomings like 
   // http://192.168.166.54:8888/TRIG/ZasraniGaraznici
   // to return https://192.168.166.54/cws/flags/TRIG/ZasraniGaraznici
   
   if(WeAreOnHttps == null)
     WeAreOnHttps = globalThis.location.href.startsWith("https");
     
   if(WeAreOnHttps)
   {
      if(someUralTofetch.startsWith("http:"))
      {
        someUralTofetch = someUralTofetch.replace("http:","https:");
      }
      if(someUralTofetch.includes(":8888/TRIG"))
      {
         someUralTofetch = someUralTofetch.replace(":8888/TRIG","/cws/flags/TRIG");
      }
      if(someUralTofetch.includes(":8888/trig"))
      {
         someUralTofetch = someUralTofetch.replace(":8888/trig","/cws/flags/TRIG");
      }   
   }
   return someUralTofetch; 
}

async function FuckFetch(txtFullUral)
{
   try
   {
      var nicnazpet =await fetch(RslvHTTPS(txtFullUral)); return nicnazpet;
   }
   catch(euror)
   {
      console.log("fetch euror:",euror, euror.stack);
   }
}


function fewBuchtons(theBuchTon, parentingUsleher)
{
   //console.log(theBuchTon);
   
  var blb = theBuchTon.target != null ? theBuchTon.target : theBuchTon.srcElement;
  if(blb)
  {
   var jehoBlbeejmeno = blb.name;   // eg  b1-02   b2-02 
   jehoBlbeejmeno = jehoBlbeejmeno.split("-")[0];
   var relatedPrudent = blb.parentElement.parentElement;
     console.log("the blb: ",  jehoBlbeejmeno, relatedPrudent, parentingUsleher);
    
    // ..eg .  
    // "ws://192.168.166.213:8083/stream/27aec28e-6181-4753-9acd-0456a75f0289/channel/0/mse?uuid=27aec28e-6181-4753-9acd-0456a75f0289&channel=0"
  //  var relatedUniqeURalfromWSpath = relatedPrudent.querySelector("input").value;
  var relatedUniqeURalfromWSpath  = (parentingUsleher != null ? parentingUsleher : relatedPrudent.querySelector("input").value);  // .. eg   // c0522105-b127-4da7-a0c9-04af8d700a6a
   
   if(relatedUniqeURalfromWSpath.startsWith("ws"))
   {
    /// if like ws://192.168.166.213:8083/stream/18bede75-480b-44f8-b847-9a02a46e4f63/channel/0/mse?uuid=18bede75-480b-44f8-b847-9a02a46e4f63&channel=0
    var stepOne = relatedUniqeURalfromWSpath.split("=")[1]; // like 18bede75-480b-44f8-b847-9a02a46e4f63&channel
    relatedUniqeURalfromWSpath = stepOne.split("&")[0];
   }
    // dont forget on >>>>>>>>      http://192.168.166.213:8083/streams  ...where the clues about what  '27aec28e-6181-4753-9acd-0456a75f0289'  .,, us what place and his rleated 
    // functionality...aka garage doors... related to  : c0522105-b127-4da7-a0c9-04af8d700a6a
   switch(relatedUniqeURalfromWSpath)
   {
            //  Bxx garaging....
         case "c0522105-b127-4da7-a0c9-04af8d700a6a":
         {
               switch(jehoBlbeejmeno)
               {
                  case "b1":{
                           //fetch(RslvHTTPS("http://192.168.166.54:8888/TRIG/ZasraniGaraznici"));
                           FuckFetch("http://192.168.166.54:8888/TRIG/ZasraniGaraznici");
                  }
                  break;
                  
                  case "b2":{
                           FuckFetch("http://192.168.166.54:8888/TRIG/OtevreneZasraniGaraznici");
                             //fetch("http://192.168.166.54:8888/TRIG/VyjebaniZasraniGaraznici");
                  }
                  break;
                  
                 case "b3":{
                           //fetch("http://192.168.166.54:8888/TRIG/OtevreneZasraniGaraznici");
                             fetch(RslvHTTPS("http://192.168.166.54:8888/TRIG/VyjebaniZasraniGaraznici"));
                  }
                  break;
                  
                  
                 case "b4":{
                        // shoould be garage ligs some...
                        if(!globalThis.location.href.startsWith("https"))
                            TgSWByOnJoin(323);
                        else
                            fetch("https://192.168.166.54/cws/flags/TRIG/Toggle_323_Garage");
                  }
                  break;
                 case "b5":{
                        // shoould be garage ligs some...
                        //   fetch("http://192.168.166.54:8888/SRCHDYN/SIGNALHELPALS");
                  }
                  break;  
               
                  default:{
                    // fetch("http://192.168.166.54:8888/TRIG/ZasraniGaraznici");
                    executecode();
                  } 
                  break;
               }
                           
         }break;
         
            //  Bxx schoudy....
         case "ad64db5a-4196-4b31-a93d-90bad7d37670":
         {
               switch(jehoBlbeejmeno)
               {
                  case "b1":{
                                fetch(RslvHTTPS("http://192.168.166.53:8888/TRIG/GLASSshoot"));
                              
                  }
                  break;
                  
                  case "b2":{
                                 fetch(RslvHTTPS("http://192.168.166.54:8888/TRIG/ShodneShorneOFFFSvetlo")); 
                                   
                  }
                  break;
                  
               case "b3":{
                                 // kill toge ligts...
                          fetch(RslvHTTPS("http://192.168.166.54:8888/TRIG/TotalZatmavoval"));
                                      
                  }
                  break;
                  
                  case "b4":{
                           fetch(RslvHTTPS("http://192.168.166.54:8888/TRIG/ShodneShorneOFFFSvetlo")); 
                                    
                  }
                  break;
                  
                   case "b5":{
                        // shoould be garage ligs some...
                          // fetch("http://192.168.166.54:8888/SRCHDYN/SIGNALHELPALS");
                  }
                  break;
               case "b5":{
                        // shoould be garage ligs some...
                        //   fetch("http://192.168.166.54:8888/SRCHDYN/SIGNALHELPALS");
                  }
                  break;
                  
                  case "b6":
                  {
                                                     //   fetch("http://192.168.166.54:8888/TRIG/ShodneShorneOFFFSvetlo"); 
                  if(this.__REconfig == null)
                      GETandProserMSEstreams();
                  executecode();
                  
                  }break;
               
                  default:{
                 //   fetch("http://192.168.166.54:8888/TRIG/TotalZatmavoval");
                 executecode();
                  } 
                  break;
               }         
               
              
             
         }break; 
         
         
         // outside parkinse
         case "b28dc461-287d-44ed-b89b-3dbe4232fddb":
              //  Bxx fenku...
         case "27aec28e-6181-4753-9acd-0456a75f0289":
         // DoleVole
         case "8b736fb5-0d24-45ae-8837-f1fb8c82f8f7":
         {
 
                switch(jehoBlbeejmeno)
               {
                  case "b1":{  
                     // sv across the parking exit for runaway....after what seen here...
                        // fetch("http://192.168.166.54:8888/sig/ac/324/(p>10");    ... just on
                        //fetch("http://192.168.166.54:8888/trig/Toggle_324_parkSV");    //...tg
                        //fetch("http://192.168.166.54:8888/TRIG/Toggle_317_LobySV");
                        fetch(RslvHTTPS("http://192.168.166.54:8888/TRIG/Toggle_SV_lobyApark"));
                  }
                  break;
                  
                  case "b2":{
                        fetch(RslvHTTPS("http://192.168.166.54:8888/TRIG/DarovaneDvere"));
                
                  }break;
                  
                  
                  case "b3":{

             
                  // cam prset...
                  if(document.PrevCAMPRsetMEM == undefined || document.PrevCAMPRsetMEM == null)
                  {
                     document.PrevCAMPRsetMEM = {};
                     document.PrevCAMPRsetMEM.PrasoPrsets = [2,3,33,34,35,36,37,38,39];
                     document.PrevCAMPRsetMEM.Shiftex = 1;
                  }
                  else
                  {
                     document.PrevCAMPRsetMEM.Shiftex++                  
                  }
                     if(document.PrevCAMPRsetMEM.PrasoPrsets.length <= document.PrevCAMPRsetMEM.Shiftex)
                        document.PrevCAMPRsetMEM.Shiftex = 0;    
                     
                     var tragex = document.PrevCAMPRsetMEM.PrasoPrsets[document.PrevCAMPRsetMEM.Shiftex];
                        
                     fetch(RslvHTTPS("http://192.168.166.54:8888/TRIG/ACanalogX5/nul/290/"+tragex));
                        
                  }
                  break;
                  
                case "b4":{
                     fetch(RslvHTTPS("http://192.168.166.54:8888/TRIG/Toggle_317_LobySV"));
                
                  }break;
                  
               case "b5":{
                     fetch(RslvHTTPS("http://192.168.166.54:8888/TRIG/Toggle_324_parkSV"));
                
                  }break;
                                   
               case "b6":{
                   fetch(RslvHTTPS("http://192.168.166.54:8888/TRIG/ACanalogX5/nul/290/2"));
                
                  }break;
               
                  default:{
                 //    fetch("http://192.168.166.54:8888/TRIG/TotalZatmavoval");
                   //            fetch("http://192.168.166.54:8888/TRIG/ShodneShorneOFFFSvetlo"); 
                   executecode();
                  } 
                  break;
               }        
    
               
         }break;
         
            // storagy + malySkladMensi
         case "51fbee62-2e9a-4c52-99af-49c0bc78039f":
         case "c0d53034-61fb-41ea-a6c9-160d7ea8215b":         
         {
 
                switch(jehoBlbeejmeno)
               {
                  case "b1":{  
                     // sv across the parking exit for runaway....after what seen here...
                        // fetch("http://192.168.166.54:8888/sig/ac/324/(p>10");    ... just on
                        //fetch("http://192.168.166.54:8888/trig/Toggle_324_parkSV");    //...tg
                        //fetch("http://192.168.166.54:8888/TRIG/Toggle_317_LobySV");
                        fetch(RslvHTTPS("http://192.168.166.54:8888/TRIG/Toggle_SV_lobyApark"));
                  }
                  break;
                  
                  case "b2":{
                        fetch(RslvHTTPS("http://192.168.166.54:8888/TRIG/DarovaneDvere"));
                
                  }break;
                  
                           // SVstor
                  case "b3":{
                           // off
                             // http://192.168.166.54:8888/sig/ac/331/(p%3E10 
                             // on
                             //http://192.168.166.54:8888/sig/ac/323/(p%3E10
                             // read  http://192.168.166.54:8888/brigsig/ac/1/out+323+331
                          // TgSWByOnJoin(323);
                        if(!globalThis.location.href.startsWith("https"))
                            TgSWByOnJoin(323);
                        else
                            fetch("https://192.168.166.54/cws/flags/TRIG/Toggle_323_Garage");     
                  }
                  break;
                  
                case "b4":{
                        fetch(RslvHTTPS("http://192.168.166.54:8888/TRIG/Toggle_317_LobySV"));
                
                  }break;
                  
               case "b5":{
                        fetch(RslvHTTPS("http://192.168.166.54:8888/TRIG/Toggle_324_parkSV"));
                
                  }break;
               
                  default:{
                 //    fetch("http://192.168.166.54:8888/TRIG/TotalZatmavoval");
                   //            fetch("http://192.168.166.54:8888/TRIG/ShodneShorneOFFFSvetlo"); 
                   executecode();
                  } 
                  break;
               }        
    
               
         }break;
         
                       //  Bxx  3np coridor...
         case "e39b2a8d-83c6-48c7-ab85-5f1df2c63ddd":
         {
 
                switch(jehoBlbeejmeno)
               {
                  case "b1":{
                     // kill toge ligts...
                          fetch(RslvHTTPS("http://192.168.166.54:8888/TRIG/TotalZatmavoval"));
      
                  }
                  break;
                  
                  case "b2":{
                        
                        // open and toge lilght....scaaary...
                      //  fetch("http://192.168.166.54:8888/TRIG/DarovaneDvere");
                        fetch(RslvHTTPS("http://192.168.166.53:8888/TRIG/GLASSshoot"));
                        }
                  break;
                  
                  case "b3":{
                        
                            fetch(RslvHTTPS("http://192.168.166.54:8888/TRIG/TOGGeDARKmode"));
                       }
                  break;
                  
                      case "b4":{
                        
                            fetch(RslvHTTPS("http://192.168.166.54:8888/TRIG/ShutOFFmonosZonos"));
                       }
                  break;
                  
                      case "b5":{
                        
                            fetch(RslvHTTPS("http://192.168.166.54:8888/TRIG/TOGGeDARKmode"));
                       }
                  break;
                  
                  case "b5":{
                        
                            fetch(RslvHTTPS("http://192.168.166.54:8888/TRIG/ShodneShorneOFFFSvetlo"));
                       }
                  break;
                  
                      case "b6":{
                        
                            executecode();
                       }
                  break;
               
                  default:{
       var tamural = "http://192.168.166.213:8083/streams"; 
       if(globalThis.location.href.startsWith("https"))
           tamural = "https://192.168.166.213:8084/streams";
                                                                
 fetch(tamural,{    "headers": {"Authorization": "Basic ZGVtbzpkZW1v"} }).then(pocem =>{
  pocem.blob().then(zob => { 
  	zob.text().then(xex => {
      var praselized = JSON.parse(xex);
      this._STREAMSCFG = praselized;
      console.log("strim dw config:",praselized);
      
    });
  });
  
});
                  } 
                  break;
               }        
    
               
         }break;    
   
   
                 
   
      default:
         break;
   }
       
  }
}

function Docpytamhnus(uuaaaiiideee, streamMedianIP)
{
   // composte from    51fbee62-2e9a-4c52-99af-49c0bc78039f
   // to ws://192.168.166.213:8083/stream/51fbee62-2e9a-4c52-99af-49c0bc78039f/channel/0/mse?uuid=51fbee62-2e9a-4c52-99af-49c0bc78039f&channel=0
   
  if(!uuaaaiiideee)
    uuaaaiiideee = "8b736fb5-0d24-45ae-8837-f1fb8c82f8f7";

    // if we suplyed full link ....atleastwe will belived to when that...
    if(uuaaaiiideee.startsWith("ws") || uuaaaiiideee.startsWith("WS"))
     {
         return uuaaaiiideee;
    }
    else
    {

    var targetPort = "8083";
    var wesORwess = "ws";
    var targetIP = "192.168.166.213";
    if(globalThis.location.href.startsWith("https"))
    {
     targetPort = "8084";
     wesORwess = "wss";
    }
    
    var pseudoHovnohost = "";
    if(streamMedianIP)
      pseudoHovnohost = streamMedianIP + ":" + targetPort;
    else 
      pseudoHovnohost = window.location.host.split(":")[0] + ":" + targetPort;
    if(pseudoHovnohost == null || pseudoHovnohost == "" || pseudoHovnohost == (":" + targetPort))
    pseudoHovnohost = "192.168.166.213:8083";
    
  var trumpeta =`
  ${wesORwess}://${pseudoHovnohost}/stream/${uuaaaiiideee}/channel/0/mse?uuid=${uuaaaiiideee}&channel=0
  `;
  return trumpeta.trim();
  }   
}

function ludranan(uniquizeerinkvizice, UplnUchozeneIchtiloJde)
{
  var shitID = "oneochner-" + uniquizeerinkvizice;

  var SeluKarasu = "c" + uniquizeerinkvizice + " framedOchen QuaadroKabater";
  var asignedDural = Docpytamhnus(UplnUchozeneIchtiloJde);      //51fbee62-2e9a-4c52-99af-49c0bc78039f     Docpytamhnus("51fbee62-2e9a-4c52-99af-49c0bc78039f")
  
  var MajFaratherWasAssholer = "" + UplnUchozeneIchtiloJde;             //'${MajFaratherWasAssholer}'
       
  var hmota = `
  <div id="${shitID}"  class="${SeluKarasu}" style="display: block;position: relative;">
    <span  style="display: block;" >
    <input type="hidden" name="mse-url" id="mse-url" style="min-width:75%"
        value="${asignedDural}">
        <button name="b1-${uniquizeerinkvizice}" onclick="fewBuchtons(event, '${MajFaratherWasAssholer}' )" style="padding: 5px;" class="CamlistButl">func1</button>
        <button name="b2-${uniquizeerinkvizice}" onclick="fewBuchtons(event, '${MajFaratherWasAssholer}' )" style="padding: 5px;" class="CamlistButl">func2</button>
        <button name="b3-${uniquizeerinkvizice}" onclick="fewBuchtons(event, '${MajFaratherWasAssholer}' )" style="padding: 5px;" class="CamlistButl">func3</button>
        <button name="b4-${uniquizeerinkvizice}" onclick="fewBuchtons(event, '${MajFaratherWasAssholer}' )" style="padding: 5px;" class="CamlistButl">func4</button>
        <button name="b5-${uniquizeerinkvizice}" onclick="fewBuchtons(event, '${MajFaratherWasAssholer}' )" style="padding: 5px;" class="CamlistButl">func5</button> 
        <button name="b6-${uniquizeerinkvizice}" onclick="fewBuchtons(event, '${MajFaratherWasAssholer}' )" style="padding: 5px;" class="CamlistButl">func6</button>    
     </span>
     
    <video id="mse-video" autoplay muted playsinline controls
        style="max-width: 100%; max-height: 100%;"></video>
    </div>
  `;
  return hmota.trim();
}


var HCBUTnames ={
"b1-01" : "sv lobby + park",
"b2-01" : "DOORS",
"b3-01" : "camPrst",
"b4-01" : "Lobby",
"b5-01" : "svPark",
"b6-01" : "camZERO",

"b1-02" : "sv lobby + park",
"b2-02" : "DOORS",
"b3-02" : "camPrst",
"b4-02" : "Lobby",
"b5-02" : "svPark",
"b6-02" : "camZERO",

"b1-03" : "OFFall",
"b2-03" : "GlassShot",
"b3-03" : "DarkModeTg",
"b4-03" : "SonosOFF",
"b5-03" : "",
"b6-03" : "",

"b1-04" : "glass",
"b2-04" : "SV schody",
"b3-04" : "AllOFF",
"b4-04" : "",
"b5-04" : "",
"b6-04" : "",

"b1-05" : "tgGAR",
"b2-05" : "clGAR",
"b3-05" : "opGAR",
"b4-05" : "SVstor",
"b5-05" : "Func5",
"b6-05" : "Func6",

"b1-06" : "sv lobby + park",
"b2-06" : "DOORS",
"b3-06" : "SVstor",
"b4-06" : "Lobby",
"b5-06" : "svPark",
"b6-06" : "camZERO",
};


function DistributeHCbutanes() {
// if conviniet.. use 
//    ./solobuts.TXT  to push the butons tags.....
  /*
  var prehnetlly = document.getElementById("patons");
  if (prehnetlly)
    prehnetlly.remove();
  var diifka = document.createElement("div");
  diifka.id = "patons";
  diifka.innerHTML = testpatons;
  document.body.append(diifka);
  */

  document.querySelectorAll(".CamlistButl").forEach(bleju => {

    if (HCBUTnames[bleju.name])
      bleju.innerHTML = HCBUTnames[bleju.name];

  });

}

function ensureUNIqeIDeByCountingUP(staticPartOFideNAme, startingNUM)
{
  var prefabuledIdename = "";
  var shiftingBengaal = (0 + startingNUM);
  var insurchcance = 100;
  do
  {
     prefabuledIdename = staticPartOFideNAme +"-" + shiftingBengaal;
     if(!document.getElementById(prefabuledIdename))
     {
         break;   // ...we did found ...that is unused and we can rape then..
     }
     else
     {      
         shiftingBengaal++;
         // then shift count up until unused founed...
     }
  }
  while(--insurchcance > 0);

  return prefabuledIdename;
}


// eg... when have one window.. may be 100% , when 2 = 50 ,, an so on...
function ReReslobeRelativePortion() {
  var kurwntlyPlebescent = document.querySelectorAll(".QuaadroKabater");
  if (kurwntlyPlebescent.length) {
    // folowing MAY firstly require some caching hevy bustting....by 
    //   GadherShiiitRuulses         ...if neede...
    var multireziizovacirefabrikaat = GetSpecificCSSrule("QuaadroKabater");
    if (multireziizovacirefabrikaat) {
      var coldlyCalculeDprsent = (100.0 / kurwntlyPlebescent.length) - 2;
      if(coldlyCalculeDprsent < 33.0)
            coldlyCalculeDprsent = 33.0;
      console.log("letfuckfor:",coldlyCalculeDprsent);
      
      multireziizovacirefabrikaat.style.maxWidth = "" + coldlyCalculeDprsent + "%";
      if(kurwntlyPlebescent.length < 4)
      document.getElementById("multikrochna").style.justifyContent = "stretch"; //center   // space-evenly;   space-around    //  space-between;
      else
            document.getElementById("multikrochna").style.justifyContent = "space-between";
    }
  }
}
 
 // ... like SingleHniling("02","27aec28e-6181-4753-9acd-0456a75f0289");
 //   SingleHniling("03","e39b2a8d-83c6-48c7-ab85-5f1df2c63ddd");
function SingleHniling(uniwizerNumber, GangsterIDE)
{
// SingleHniling("02","27aec28e-6181-4753-9acd-0456a75f0289");
   if(!uniwizerNumber)
      uniwizerNumber = "99";
   if(!GangsterIDE)
         GangsterIDE ="c0522105-b127-4da7-a0c9-04af8d700a6a"; 
         
if(uniwizerNumber.includes("-") && uniwizerNumber.length > GangsterIDE.length)
{
   // corecting common error..
   var corectGangsterIDE = ("" + uniwizerNumber);    // by thath time probably  27aec28e-6181-4753-9acd-0456a75f0289
   var corectuniwizerNumber = ("" + GangsterIDE);      // by thath time probably  "02"
   GangsterIDE = "" + corectGangsterIDE;
   uniwizerNumber = "" + corectuniwizerNumber;   
}
      
 var textToBitcher = document.createElement("div");
 var PimOFthatBitches = document.getElementById("multikrochna");
 
 var dementTextem = ludranan(uniwizerNumber,GangsterIDE);
textToBitcher.innerHTML = ("" + dementTextem);
var extralargeAssholeBitch = textToBitcher.firstElementChild;
PimOFthatBitches.append(extralargeAssholeBitch);

   var relatedVideoDement = extralargeAssholeBitch.querySelector("#mse-video");
  

   var relatedUralHloder = extralargeAssholeBitch.querySelector("#mse-url");
                
   var pointlesrowural = relatedUralHloder.value;
    
  var celkemVychcajii = document.querySelectorAll("#mse-video").length;
  var celkemUSRALY = document.querySelectorAll("#mse-url").length;
  
  var prefabuledIdenameForVID = "" + ensureUNIqeIDeByCountingUP("mse-video",celkemVychcajii);
  var prefabuledIdenameForURA = "" + ensureUNIqeIDeByCountingUP("mse-url",celkemUSRALY);
  
  relatedVideoDement.id = prefabuledIdenameForVID;
  relatedUralHloder.id = prefabuledIdenameForURA;
   
 // console.log("",prefabuledIdenameForVID, pointlesrowural);
  HadovaVychazka(pointlesrowural, relatedVideoDement.id); 
  
  DistributeHCbutanes();
  
  ReReslobeRelativePortion();

}
// SingleHniling("02","27aec28e-6181-4753-9acd-0456a75f0289");

// ... like SingleHniling("02","27aec28e-6181-4753-9acd-0456a75f0289");


function ProhnileSmrduteDoupeZradnychZmiji()
{
   // document.querySelectorAll("#mse-video")
   var tytoZmrdaneZmije = document.querySelectorAll("#mse-video");
 //  var KolenelKlonel = tytoZmrdaneZmije[0].outerHTML;
 var cirkevniBuznaBRatri = document.getElementById("multikrochna");
 var pussylicker = document.createElement("div");
 
 var pozipredef = document.getElementById("predef");
 if(pozipredef!= null)
 {
   var kajuleUNQ = pozipredef.attributes["uniqn"].value;
   var grubide = pozipredef.attributes["gouda"].value;
   console.log("prejpredef:",kajuleUNQ,grubide,pozipredef);
   var dementTextem = ludranan(kajuleUNQ,grubide);
   pussylicker.innerHTML = ("" + dementTextem);
   cirkevniBuznaBRatri.append(pussylicker.firstElementChild);
 
 }
 else
 {
 
  if(tytoZmrdaneZmije.length < 1)
  {

  /*
var dementTextem = ludranan("01","27aec28e-6181-4753-9acd-0456a75f0289");
pussylicker.innerHTML = ("" + dementTextem);
cirkevniBuznaBRatri.append(pussylicker.firstElementChild);


dementTextem = ludranan("02","8b736fb5-0d24-45ae-8837-f1fb8c82f8f7");
pussylicker.innerHTML = ("" + dementTextem);
cirkevniBuznaBRatri.append(pussylicker.firstElementChild);


dementTextem = ludranan("03","e39b2a8d-83c6-48c7-ab85-5f1df2c63ddd");
pussylicker.innerHTML = ("" + dementTextem);
cirkevniBuznaBRatri.append(pussylicker.firstElementChild);

                     //Storgay

   dementTextem = ludranan("04","51fbee62-2e9a-4c52-99af-49c0bc78039f");
pussylicker.innerHTML = ("" + dementTextem);
cirkevniBuznaBRatri.append(pussylicker.firstElementChild);
*/
// schody
if(window.location.href != null && window.location.href.includes("/mses"))
{
  
   var responzivyblytejblud = document.querySelector("button[onclick='OfferingToAdd(this)']");
   if(responzivyblytejblud)
   {
       //setTimeout(function(){   OfferingToAdd(responzivyblytejblud); },2200);
      setTimeout(function(){   OfferingToAddMarkII(responzivyblytejblud); },2200);
   }

   GETandProserMSEstreams();
 
}
else
{
var dementTextem = ludranan("04","ad64db5a-4196-4b31-a93d-90bad7d37670");
pussylicker.innerHTML = ("" + dementTextem);
cirkevniBuznaBRatri.append(pussylicker.firstElementChild);
}
                                                         //     c0522105-b127-4da7-a0c9-04af8d700a6a
/*                                                         //Garague
var dementTextem = ludranan("05","c0522105-b127-4da7-a0c9-04af8d700a6a");
pussylicker.innerHTML = ("" + dementTextem);
cirkevniBuznaBRatri.append(pussylicker.firstElementChild);
*/



// e39b2a8d-83c6-48c7-ab85-5f1df2c63ddd   3np
// c0522105-b127-4da7-a0c9-04af8d700a6a -- garage
// 51fbee62-2e9a-4c52-99af-49c0bc78039f      storagey..
// "27aec28e-6181-4753-9acd-0456a75f0289"   fenku

//ludranan("02","27aec28e-6181-4753-9acd-0456a75f0289");
  }
  
}
 // tytoZmrdaneZmije = document.querySelectorAll("#mse-video");
 
 apakterpvevyjebat(); 
                          
}

function apakterpvevyjebat() {
  tytoZmrdaneZmije = document.querySelectorAll("#mse-video");
  var celkem = tytoZmrdaneZmije.length;

  while (--celkem >= 0) 
  {

    var pointlesrowural = tytoZmrdaneZmije[celkem].parentElement.querySelector("input");
    
    tytoZmrdaneZmije[celkem].id += "-" + celkem;
    pointlesrowural.id+="-" + celkem;
    
    HadovaVychazka(pointlesrowural.value, tytoZmrdaneZmije[celkem].id); 
  }
}


// HadovaVychazka("27aec28e-6181-4753-9acd-0456a75f0289","mse-vide-0")
// HadovaVychazka("ws://192.168.166.213:8083/stream/8816eac5-f22f-4931-80bf-33198ed9a10c/channel/0/mse?uuid=8816eac5-f22f-4931-80bf-33198ed9a10c&channel=0","mse-video-0")
function HadovaVychazka(vyhubedIDural, specifuckalDementIDonly, startPlayingAtOnce) 
{
// HadovaVychazka("27aec28e-6181-4753-9acd-0456a75f0289","mse-vide-0")

  const mseQueue = [];
  let mseSourceBuffer;
  let mseStreamingStarted = false;
  
  if(!specifuckalDementIDonly)
   specifuckalDementIDonly = "#mse-video";
   
  if(!specifuckalDementIDonly.startsWith("#"))  
    specifuckalDementIDonly = ("#" + specifuckalDementIDonly);
    
   if(!document.querySelector(specifuckalDementIDonly))
   {
       var teststoupnosti = document.querySelectorAll("video");
      if(teststoupnosti != null && teststoupnosti.length > 0)
      {
         if(teststoupnosti[0].id == "")
            teststoupnosti[0].id = "mse-video";
         specifuckalDementIDonly = "#" + teststoupnosti.id;
      }
   }
   
   function watachaBufra(tohoBufra)
   {
     if(!tohoBufra)
       tohoBufra = document.getElementById("mse-video").mseSourceBuffer;     
   //tohoBufra.onabort = function(rb){ console.log("aburded...",rb); }; 
   //  tohoBufra.onerror = function(rb){ console.log("erkurwed...",rb); }; 
       //tohoBufra.onupdate = function(rb){ console.log("ufacked...",rb); }; 
     //tohoBufra.onupdateend = function(rb){ console.log("ufackedend...",rb); }; 
       //tohoBufra.onupdatestart = function(rb){ console.log("ufackedstart...",rb); };   
   }   
    
   function startPlay (videoEl, url) {
     
      videoEl.PlyvadByslo = true;
     
       const mse = new MediaSource()
       videoEl.src = window.URL.createObjectURL(mse)
       videoEl.dbgUrl = url;
       // ... WS conection chumel...
         mse.addEventListener('sourceopen', function () {

       //  var dbgural = document.getElementById("dbgUrl");
       //  if(dbgural)dbgural.href = url.startsWith("wss") ? url.replace("wss:/","https:/") : url.replace("ws:/","http:/");
         const ws = new WebSocket(url);

          if(!ws)return;
         
         if(ws.readyState == 3)
         {
               console.log("unable to open:",url);
         
         }
         videoEl._WS = ws;
         videoEl._MSERE = mse;
         ws.onclose = function(event){ console.log("video stream ws closed...",event.currentTarget.url); };
       //  ws.onerror = function(event){ console.log("ws poseror...",event); };
         
         ws.binaryType = 'arraybuffer';
         ws.onopen = function (event) {
        //   console.log('Connect to ws',url);
           
           videoEl._WS = ws;
         }
         
   //      videoEl.addEventListener('canplaythrough', function() {
       //  console.log("canplaythrough",videoEl.currentTime);
     //          videoEl.currentTime = 570;
       //  }, false);
         
         ws.onmessage = function (event) {
           const data = new Uint8Array(event.data)
           if (data[0] === 9) {
             let mimeCodec
             const decodedArr = data.slice(1)
             if (window.TextDecoder) {
               mimeCodec = new TextDecoder('utf-8').decode(decodedArr)
             } else {
               mimeCodec = Utf8ArrayToStr(decodedArr)
             }
             mseSourceBuffer = mse.addSourceBuffer('video/mp4; codecs="' + mimeCodec + '"');
             mseSourceBuffer.mode = 'segments';
             mseSourceBuffer.addEventListener('updateend', pushPacket);
             videoEl.mseSourceBuffer = mseSourceBuffer; 
            // watachaBufra(mseSourceBuffer);
           } else {
             readPacket(event.data,videoEl);
           }
         }
       }, false);
   }
  


  function pushPacket () {
    const videoEl = document.querySelector(specifuckalDementIDonly);
    let packet

    if (!mseSourceBuffer.updating) {
      if (mseQueue.length > 0) {
        packet = mseQueue.shift();
        mseSourceBuffer.appendBuffer(packet);
      } else {
        mseStreamingStarted = false;
      }
    }
    if (videoEl != null && videoEl.buffered.length > 0) {
      if (typeof document.hidden !== 'undefined' && document.hidden) {
      // no sound, browser paused video without sound in background
        videoEl.currentTime = videoEl.buffered.end((videoEl.buffered.length - 1)) - 0.5;
      }
    }
  }

  function readPacket (packet,PassedVideoEl) {
  
    if (!mseStreamingStarted) {
    
      try
      {
      mseSourceBuffer.appendBuffer(packet)
      mseStreamingStarted = true
      return
         }
         catch(buzor)
         {
         // console.log("buznor:",buzor,PassedVideoEl.currentTime);
          if(PassedVideoEl._WS)
          {
               if(!PassedVideoEl.PlyvadByslo)
                     PassedVideoEl._WS.close(); 
          
          }   
          return;
         }
    }
    mseQueue.push(packet)
    if (!mseSourceBuffer.updating) {
      pushPacket()
    }  
  }
  
  var preVadnej =document.querySelector(specifuckalDementIDonly);
  if(preVadnej == null)
   preVadnej = document.getElementById(specifuckalDementIDonly);
  
  const videoEl = preVadnej; //document.querySelector(specifuckalDementIDonly);
  const mseUrl = Docpytamhnus(vyhubedIDural, StreamMedianSRVip);
//  Docpytamhnus(vyhubedID); // eg.. Docpytamhnus("8b736fb5-0d24-45ae-8837-f1fb8c82f8f7")

 //  console.log(" dhave : ",specifuckalDementIDonly,vyhubedIDural,mseUrl);

  // fix stalled video in safari
  videoEl.addEventListener('pause', () => {
    if (videoEl.currentTime > videoEl.buffered.end(videoEl.buffered.length - 1)) {
      videoEl.currentTime = videoEl.buffered.end(videoEl.buffered.length - 1) - 0.1;
      videoEl.play();
    }
  });  
 // btw....   videoEl = document.getElementById("mse-video-0")
 
  if(videoEl.id=="mse-video-0")
  {
      // if relatd to main video page ...on cameras menu
     globalThis.StartPlay = function(custWSurl){ 
         var targMseUrl = (!custWSurl ? mseUrl: custWSurl);
         if(globalThis.DEBUG)
            console.log("atemptingg Play at:%o with url:%o",videoEl, targMseUrl);
         startPlay(videoEl, targMseUrl);      
      }
      
      globalThis.StopPlay = function(uu){
         if(videoEl._WS)
         {
            //console.log("stoping stream wsock...");         
            videoEl.PlyvadByslo = false;
            if(videoEl._MSERE.readyState != "ended")
                  videoEl._MSERE.endOfStream();
            globalThis.URL.revokeObjectURL(videoEl.src);
            videoEl._WS.close();
         }
      }
      
      var dbgural = document.getElementById("dbgUrl");
      if(dbgural)dbgural.href = mseUrl.startsWith("wss") ? mseUrl.replace("wss:/","https:/") : mseUrl.replace("ws:/","http:/");
   }
   else
   {
      // then probably for miniVideo wokno or similar...
      // ..maybe attaching start and stop to the video dement ??
     //  videoEl.StartPlay = ... 
   
   }
   if(startPlayingAtOnce)
         startPlay(videoEl, mseUrl);
 // console.log("atempted at dement:%o with url:%o",videoEl,mseUrl);
  //globalThis.document.STRPL  = function(v,msur){ startPlay(v,msur); };  
}
//HadovaVychazka("8b736fb5-0d24-45ae-8837-f1fb8c82f8f7");

// for otherwordly created video dements..
function closeVideoStream(relatedVideoDmntID)
{
   if(!relatedVideoDmntID)return;
   var prevVideo = document.getElementById(relatedVideoDmntID);
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
}

function GETandProserMSEstreams(optionalycustomUal)
{
 if(!optionalycustomUal)
    optionalycustomUal = "http://"+StreamMedianSRVip+":8083/streams";   // ... aka ...  http://demo:demo@192.168.166.213:8083/streams    
    // which encoded is  ZGVtbzpkZW1v
 if(globalThis.location.href.startsWith("https") && !optionalycustomUal.startsWith("https"))
 {
   optionalycustomUal = "https://"+StreamMedianSRVip+":8084/streams";   
 }      

                                            
 fetch(optionalycustomUal,{  "headers": {"Authorization": "Basic ZGVtbzpkZW1v"} }).then(pocem =>{
  pocem.blob().then(zob => { 
  	zob.text().then(xex => {
      var praselized = JSON.parse(xex);
      this._STREAMSCFG = praselized;
    //  console.log("strim dw config:",praselized);
      if(_STREAMSCFG.payload)
      {
        this._REconfig = {};
       Object.entries(_STREAMSCFG.payload).forEach(pyzdalod => {
         this._REconfig["" + pyzdalod[1].name] = pyzdalod;
      });
        console.log("REconfig done ... this._REconfig ",this._REconfig);
       this._CAMNAMES = Object.entries(_REconfig);
      }
      
    });
  });
      //   fetch("http://192.168.166.54:8888/TRIG/ShodneShorneOFFFSvetlo"); 
});
}
function ReadMSEstreamsFromLocalJson()
{
fetch("/Cams/streams.json").then(rsp => {
  rsp.text().then(jasen => {
   // console.log("jas", jasen)
      var praselized = JSON.parse(jasen);
      this._STREAMSCFG = praselized;
    //  console.log("strim dw config:",praselized);
      if(_STREAMSCFG.payload)
      {
        this._REconfig = {};
       Object.entries(_STREAMSCFG.payload).forEach(pyzdalod => {
         this._REconfig["" + pyzdalod[1].name] = pyzdalod;
      });
        console.log("REconfig done ... this._REconfig ",this._REconfig);
       this._CAMNAMES = Object.entries(_REconfig);
      }   
  })
});
}
function ThirdJsonObtain() {
  var previslyy = document.getElementById("jsonLoader");
  if (!previslyy) {
    var zaabej = document.createElement("object");
    zaabej.id = "jsonLoader";
    zaabej.type = "application/json";
    zaabej.style.display = "none";
    zaabej.data = "/Cams/streams.json";
    document.body.append(zaabej);
    previslyy = zaabej;
  }

  previslyy.onload = function(ehm) {
    if (ehm.target.contentDocument) {
      var txtToprase = ehm.target.contentDocument.body.firstElementChild.innerHTML;
      var jsjob = JSON.parse(txtToprase);
      //console.log("ehm", jsjob)
      this._STREAMSCFG = jsjob;
      if (_STREAMSCFG.payload) {
        this._REconfig = {};
        Object.entries(_STREAMSCFG.payload).forEach(pyzdalod => {
          this._REconfig["" + pyzdalod[1].name] = pyzdalod;
        });
        console.log("REconfig done ... this._REconfig ", this._REconfig);
        this._CAMNAMES = Object.entries(_REconfig);
        document.getElementById("jsonLoader").remove();

      }
    }
  }
  previslyy.data = "/Cams/streams.json";
}


function INSTAkamsBycfg()
{
if(this._REconfig == null)
{
   GETandProserMSEstreams();
}


setTimeout(function() {
 if(this._REconfig == null)return;
 
    multikrochna.innerHTML = "";
var dopicokolika = 1;
Object.entries(_REconfig).forEach(ggg => {
  var txtnum = "0" + dopicokolika;
  var theyrGuidejthivej = ggg[1][0];
 SingleHniling(txtnum,theyrGuidejthivej);
  //console.log(ggg[0],theyrGuidejthivej);
  
});

  ReReslobeRelativePortion();
}, 3500);

}


function LahaveLokalRconfiga()
{
if(this._REconfig)
{
var aktaText = JSON
 function WhenRemakejDoohone()
{
  // var text = aboutNAsertemiZmrdizer(globalThis.gxmlDoc);
   // or  .... from tests it seems both are same...same length at least
  var aaa = document.createElement("a");
// var aaa = document.getElementById("a");

  var text = globalThis.gxmlDoc.documentElement.outerHTML; 
  var pseudofile = new Blob([text], {type: "text/xml"});  // text/plain  // text/xml // application/xml
  
  aaa.href = URL.createObjectURL(pseudofile);
  aaa.download = "Environment_R.xml";
  aaa.click();

}
}


}




function OfferingToAdd(butonOforigin)
{
   if(this._REconfig == null)
   {
      GETandProserMSEstreams();
   }
   if(butonOforigin)
   {
      var hisFather = butonOforigin.ownerDocument.documentElement;
      // c04 framedOchen QuaadroKabater
      var curentlSpawned = hisFather.querySelectorAll(".framedOchen");
      if(curentlSpawned.length < 1)
            curentlSpawned = hisFather.querySelectorAll(".QuaadroKabater");
            
             //this._STREAMSCFG.payload  // this._CAMNAMES   // this._REconfig
       if(this._CAMNAMES)
       {
          var prepask = this._CAMNAMES.map( jj => {return jj[0] }).join();
          var answr = prompt("which one? ",prepask);
          if(answr)
          {
            var totone = answr.split(',').filter(ex => ex.length > 0);
            if(totone)
            {
               var kurvafixtener = 1;
               totone.forEach(chosen => {  
                     if(this._REconfig.hasOwnProperty(chosen))
                     {
                             //this._REconfig["Fenku"][0]
                           var theGude = this._REconfig[chosen][0];
                           if(theGude)
                           {
                              var posibler = "oneochner-0" + kurvafixtener;
                              var presler = document.getElementById(posibler);
                              if(presler != null)
                                 presler.remove();
                                 
                              SingleHniling(("0" + kurvafixtener),theGude);
                              kurvafixtener++;
                           }
                     
                     }
           
                            });
              
            }
          
          }
       }
   }
}

function OfferingToAddMarkII(butonOforigin)
{
   if(this._REconfig == null)
   {
      GETandProserMSEstreams();
   }
   if(butonOforigin)
   {
      var hisFather = butonOforigin.ownerDocument.documentElement;
      // c04 framedOchen QuaadroKabater
      var curentlSpawned = hisFather.querySelectorAll(".framedOchen");
      if(curentlSpawned.length < 1)
            curentlSpawned = hisFather.querySelectorAll(".QuaadroKabater");
            
             //this._STREAMSCFG.payload  // this._CAMNAMES   // this._REconfig
       if(this._CAMNAMES)
       {
          var prepask = this._CAMNAMES.map( jj => {return jj[0] }).join();
          
          var chlbaboxesFrame = chosingPopCupka();
          var dohoditsem = chlbaboxesFrame.querySelector("#inergrgboxes");
          
          this._CAMNAMES.forEach(nachleba => {
          
                  dohoditsem.append(oneHrdloBOx(nachleba[0]));
          });
          
          document.body.append(chlbaboxesFrame);
          if(globalThis.TanglesDRAG_Atacher != null)
            TanglesDRAG_Atacher(chlbaboxesFrame);
          
          //.... rest will be procesed adter selecting some..if any... and clicking on OK but...by
        //   RozporuplneChosedChrbloxes
       }
   }
}

function RozporuplneChosedChrbloxes(heeTheBubnon) {

  var potentPanicboxy = inergrgboxes.querySelectorAll("input[type=checkbox]");
  if (!potentPanicboxy || potentPanicboxy.length < 1) return;

  var jentyCoodpanil = Array.prototype.filter.call(potentPanicboxy, function(vyfiltr) {
    return vyfiltr.checked
  });
  if (jentyCoodpanil.length) {
    var zimplednamezed = Array.prototype.map.call(jentyCoodpanil, function(tifowe) {
      return tifowe.name
    })
    if (zimplednamezed && zimplednamezed.length > 0) {
      var kurvafixtener = 1;
      zimplednamezed.forEach(chosen => {
        if (this._REconfig.hasOwnProperty(chosen)) {
          //this._REconfig["Fenku"][0]
          var theGude = this._REconfig[chosen][0];
          if (theGude) {
            var posibler = "oneochner-0" + kurvafixtener;
            var presler = document.getElementById(posibler);
            if (presler != null)
              presler.remove();

            SingleHniling(("0" + kurvafixtener), theGude);
            kurvafixtener++;
          }

        }

      });
    }
  }

  if (heeTheBubnon != null) {
    heeTheBubnon.parentElement.parentElement.remove()
  }
}

function chosingPopCupka()
{
var txtmodl = `
<div id="g_63956" 
style="display: block; position: absolute; border: 1px dotted rgb(249, 17, 249); top: 50px; left: 25px; width: 250px; height:auto; background-color: rgba(4, 4, 4, 0.45); color: rgb(173, 255, 47); font-size: 15px !important;padding-top: 15px;" 
class="drawedTangles TanglesShowaales" 
draggable="true">
<span style="display: block;position: absolute;right: 1px;top: 0px;">
<button onclick="this.parentElement.parentElement.remove()" style="font-weight: bold;color: red;padding-inline: 15px;background: #1e3751;border: outset 2px #01020300;border-radius: 5px;">X</button>
</span>
<span style="display: block;position: absolute;left: 1px;top: 0px;">
<button onclick="RozporuplneChosedChrbloxes(this)" style="font-weight: bold;color: red;padding-inline: 15px;background: #1e3751;border: outset 2px #01020300;border-radius: 5px;">OK</button>
</span>
<fieldset id="inergrgboxes" style="padding: 15px;position: relative;display: block;">
    <legend>Choose your cameras:</legend>
<div style="display: flex;justify-content: center;">
  <input type="button" onclick="ChlebedLUXurySELnoneOrALLtg(this)" style="font-weight: bold;color: red;padding-inline: 15px;background: #1e3751;border: outset 2px #01020300;border-radius: 5px;" value="all / none">
  </div>

</fieldset>
<style type="text/css">
.drawedTangles > span > button:hover {
    background: white !important;
}
#inergrgboxes > div:nth-child(2) > input:nth-child(1):hover
{
    background: white !important;
}
</style>
</div>

`;

return LyeCreateNEparente(txtmodl);

}

function oneHrdloBOx(labeling)
{
   if(!labeling)
      labeling = "XXkox";
var hrdlobox = `
    <div>
      <input type="checkbox" id="${labeling}" name="${labeling}" checked>
      <label for="${labeling}">${labeling}</label>
    </div>
    `;
return LyeCreateNEparente(hrdlobox);
}

function ChlebedLUXurySELnoneOrALLtg(infakingDement)
{
   if(!infakingDement)
   {
      infakingDement=inergrgboxes.querySelectorAll("input[type=button]");
      if(!infakingDement)return;
   }
   
   if(infakingDement)
   {
       var plebsyaround = infakingDement.parentElement.parentElement.querySelectorAll("input[type=checkbox]");
       if(plebsyaround)
       {
         var someWeCanWorkWith = Array.from(plebsyaround);
         var anyHornyChlebedboxes = someWeCanWorkWith.filter(zingleselechta  => zingleselechta.checked);
         if(anyHornyChlebedboxes && anyHornyChlebedboxes.length > 0)
         {
           anyHornyChlebedboxes.forEach(pachleba => pachleba.checked = false);
         }
         else
         {
            someWeCanWorkWith.forEach(pachleba => pachleba.checked = true);
         }  
       }
   }
}

function AdjustCSSwidthRule(howDWorUP) {
  var tacriticruura = GetSpecificCSSrule("QuaadroKabater");

  if (tacriticruura != null) {
    var previwidht = ("" + tacriticruura.style.maxWidth).replace("%", "");
    var humeric = Number.parseInt(previwidht);
    if (howDWorUP)
      humeric += 1;
    else
      humeric -= 1;

    humeric = (humeric > 3 && humeric < 101) ? humeric : 100;

    tacriticruura.style.maxWidth = `${humeric}%`;
    //console.log(tacriticruura.style.maxWidth);
  }
}
//AdjustCSSwidthRule(false)





var HoldingGumingInsurance = 666;
var holdingPeriod = 45;

function whichWhich(event)
{
var trageed = event.target || event.originalTarget || event.srcElement;
if(!trageed)return;
var isZumPLUS = trageed.innerHTML.includes("+");

//console.log("advaplk: ",event);
 var tripek = event.type;     // mouseup mousedown

 if(tripek == "mousedown")
 {
   HoldingGumingInsurance = 666;
   trageed._LETSgo = true;
   AdjustCSSwidthRule(isZumPLUS);
      
   setTimeout(RepetableCusking,500,isZumPLUS,trageed);
 }
 else
 {
   trageed._LETSgo = false;
 } 
 // AdjustCSSwidthRule(true)"
}


function RepetableCusking(isZumPLUS,HoldedTrageed)
{
   if(!HoldedTrageed)return;
   if(HoldedTrageed._LETSgo == true && HoldingGumingInsurance > 0)
   {
      HoldingGumingInsurance--;
      AdjustCSSwidthRule(isZumPLUS);
      setTimeout(RepetableCusking,holdingPeriod,isZumPLUS,HoldedTrageed);
   }
}


