var J = {
  "0": "DUMMY",
  "1": "CONNECT",
  "2": "CONNECT_RESPONSE",
  "3": "DISCONNECT",
  "4": "DISCONNECT_RESPONSE",
  "5": "DATA",
  "10": "CONNECT_DHCP",
  "11": "AUTHENTICATE",
  "12": "AUTHENTICATE_RESPONSE",                                                                                                            
  "13": "HEARTBEAT",
  "14": "HEARTBEAT_RESPONSE",
  "15": "PROGRAM_READY",
  "16": "CRESNET_DATA",
  "18": "EXTENDED_DATA",
  "19": "CRPC_CONNECT",
  "20": "CRPC_DATA",
  "38": "DEVICE_ROUTER_CONNECT",
  "39": "DEVICE_ROUTER_CONNECT_RESPONSE",
  "42": "LICENSE_INFORMATION_RESPONSE",
  "DUMMY": 0,
  "CONNECT": 1,
  "CONNECT_RESPONSE": 2,
  "DISCONNECT": 3,
  "DISCONNECT_RESPONSE": 4,
  "DATA": 5,
  "CONNECT_DHCP": 10,
  "AUTHENTICATE": 11,
  "AUTHENTICATE_RESPONSE": 12,
  "HEARTBEAT": 13,
  "HEARTBEAT_RESPONSE": 14,
  "PROGRAM_READY": 15,
  "CRESNET_DATA": 16,
  "EXTENDED_DATA": 18,
  "DEVICE_ROUTER_CONNECT": 38,
  "DEVICE_ROUTER_CONNECT_RESPONSE": 39,
  "LICENSE_INFORMATION_RESPONSE": 42,
  "CRPC_CONNECT": 19,
  "CRPC_DATA": 20
};

var A = {
    "NUMERIC": "numeric",
    "BOOLEAN": "boolean",
    "STRING": "string",
    "REPEAT_DIGITAL": "repeatdigital"
};
var ourTransNam = {
   "numeric" : "UShort",
   "boolean" : "Bool",
   "string" : "String",
   "repeatdigital" : "repDigi"      
};

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

var I = {
    "0": "DIGITAL_IO",
    "1": "ANALOG_IO",
    "3": "COMMAND_PACKETS",
    "8": "TIME_AND_DATE",
    "20": "SYMMETRICAL_ANALOG_PACKETS",
    "21": "SERIAL_IO_INDIRECT_TEXT",
    "30": "GENERAL_RCB",
    "39": "REPEAT_DIGITAL_IO",
    "42": "UNMANGLED_INDIRECT_TEXT_SUPPORT",
    "52": "EXTENDED_LENGTH_SERIAL_INDIRECT_TEXT",
    "56": "SMART_OBJECT",
    "57": "EXTENDED_SMART_OBJECT",
    "DIGITAL_IO": 0,
    "ANALOG_IO": 1,
    "COMMAND_PACKETS": 3,
    "SYMMETRICAL_ANALOG_PACKETS": 20,
    "SERIAL_IO_INDIRECT_TEXT": 21,
    "REPEAT_DIGITAL_IO": 39,
    "GENERAL_RCB": 30,
    "EXTENDED_LENGTH_SERIAL_INDIRECT_TEXT": 52,
    "UNMANGLED_INDIRECT_TEXT_SUPPORT": 42,
    "SMART_OBJECT": 56,
    "EXTENDED_SMART_OBJECT": 57,
    "TIME_AND_DATE": 8
};

var a = {
  "IDLE": "IDLE",
  "WAIT_PROGRAM_READY": "WAIT_PROGRAM_READY",
  "WAIT_CONNECT_RESPONSE": "WAIT_CONNECT_RESPONSE",
  "WAIT_AUTHENTICATE_RESPONSE": "WAIT_AUTHENTICATE_RESPONSE",
  "RECONNECT_AFTER_DELAY": "RECONNECT_AFTER_DELAY",
  "WAIT_CLEAR_ALL": "WAIT_CLEAR_ALL",
  "CONNECTION_REFUSED": "CONNECTION_REFUSED",
  "CONNECTION_FAILED": "CONNECTION_FAILED",
  "SSL_HANDSHAKE_FAILED": "SSL_HANDSHAKE_FAILED",
  "READ_FAILED": "READ_FAILED",
  "AUTHENTICATION_FAILED": "AUTHENTICATION_FAILED",
  "IN_UPDATE": "IN_UPDATE",
  "HEARTBEAT_EXPIRED": "HEARTBEAT_EXPIRED",
  "CONNECTED": "CONNECTED",
  "DISCONNECT_PENDING": "DISCONNECT_PENDING",
  "DISCONNECT_REQUESTED": "DISCONNECT_REQUESTED"
}




// to easy the replacing ot their E for logging
globalThis.DEBUG = false;
globalThis._hisConWasAcepted = false;
globalThis.E = console;
globalThis.JWTurl = "";    // https://192.168.166.53/cws/flags/get/getwebsocketokenNF
globalThis._LastJWT = "";
globalThis._hisIPID = "0x60";
globalThis._hisIPhost = "";
globalThis._hisCPuser = "crestron";
globalThis._hisCPpass = "crestron";
// 1 after ws token obtain, 2 after websock insta conect, 4 after welcome msg recieved, 8 after con Acepted recieved(not happening),  16384 and 8192 is refused  
globalThis.ReachedState = 0;        // at normal state we reach 7

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

//var de = [20, 1, 10, 38];
var de =[J.CRPC_DATA, J.CONNECT, J.CONNECT_DHCP, J.DEVICE_ROUTER_CONNECT];

// some packet builder ..header attacher ?
function Ne(e, t, n) {

    void 0 === n && (n = 0);
    var i = de.includes(e) ? 0 : 2,
      o = (t ? t.length : 0) + i,
      r = new Uint8Array(o + 3),
      a = 0;
      
      r[a++] = e;
      r[a++] = o >> 8;
      r[a++] = 255 & o;
      de.includes(e) || (r[a++] = n >> 8, r[a++] = 255 & n);
      t && r.set(t, a);
      
      if(globalThis.DEBUG)  
        console.log("Built packet:",r.length);
      
      return r;
}

/* origo
function Ne(e, t, n) {

    void 0 === n && (n = 0);
    var i = de.includes(e) ? 0 : 2,
      o = (t ? t.length : 0) + i,
      r = new Uint8Array(o + 3),
      a = 0;
    return r[a++] = e,
      r[a++] = o >> 8,
      r[a++] = 255 & o,
      de.includes(e) || (r[a++] = n >> 8,
        r[a++] = 255 & n),
      t && r.set(t, a),
      console.log("Built packet:",r.length),
      r
}
*/



// kind of sendDeviceRouterConnect  
function comboseconnectpacket(customIpID, customWSip) {

   if(customWSip == undefined || customWSip == null)
      customWSip = "192.168.166.166";
      
   if(globalThis._LastJWT.length < 1)
   {
     preobtainJWTshit();
   }
   
   if(customIpID == undefined || customIpID == null)
   customIpID = "0x60";

   // now it may colide with globaly declared Ee !!
  var Ee = {
    "host": customWSip,
    "port": 49200,
    "roomId": "",
    "ipId": customIpID,
    "tokenSource": "CSSelf",
    "tokenUrl": "https://192.168.166.166/cws/websocket/getWebSocketToken",
    "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsIlNvdXJjZSI6IkNvbnRyb2wgU3lzdGVtIn0.eyJleHAiOjE3NDExNjcxODQsInVzZXJuYW1lIjoiY3Jlc3Ryb24iLCJPcHRpb25hbCI6Im9wdGlvbmFsIn0.EdLVy1RIqBuxU_GI94mHcBmjSggn7CrvaZbFlGlA_eU"
  };

  if(globalThis._LastJWT.length > 1)
    Ee.jwt =globalThis._LastJWT; 
    
   Ee.host = customWSip;
   Ee.tokenUrl = "https://"+customWSip+"/cws/websocket/getWebSocketToken";

  function he(e, t) {
    var n = new Uint8Array(t);
    return n.set(Ie(e)),
      n
  }

  function Ie(e) {
    for (var t = e.length, n = new Uint8Array(t), i = 0, o = 0; o < t; o++)
      n[i++] = Math.min(e.charCodeAt(o), 255);
    return n
  }

  function u(e) {
    for (var t = "", n = e.length, i = 0; i < n; i++) {
      var o = e[i].toString(16);
      1 === o.length && (o = "0" + o),
        t += o + " "
    }
    return t
  }

  var e = Ee.ipId,
    t = Ee.roomId,
    n = Ee.jwt,
    i = "Crestron:" + Ee.tokenSource + ":" + n,
    o = i.length,
    r = new Uint8Array(213 + o),
    a = 0;

  r[a++] = e >> 8,
    r[a++] = 255 & e,
    r[a++] = 64,
    r[a++] = 1 + 128 + 64 + 48,
    r[a++] = 1,
    r[a++] = 0,
    r[a++] = 0,
    r[a++] = 0;
  var s = 0 + 16 + 32;
  (null == t ? void 0 : t.length) > 0 && (s += $),
    o > 0 && (s += 64),
    r[a++] = s,
    r.set([0, 0, 0, 0, 0, 0], a),
    a += 6;
  r.set(he("Crestron", 50), a),
    a += 50;
  r.set(he("WebXPanel", 50), a),
    a += 50,
    r.set(he(t, 32), a),
    a += 32;
  r.set(he("Hostname", 64), a),
    a += 64,
    r[a++] = o >> 8,
    r[a++] = 255 & o,
    o > 0 && r.set(Ie(i), a),
    this._cipProgramIdentifier = "wss://"+customWSip+":49200/" + ":0x" + e.toString(16) + ":" + t;
  var c = Ne(38, r);

  this.cipProgramIdentifier = this._cipProgramIdentifier;
//  console.log("ee", c, c.length)
  return c;

}

function comboseconnectpacketNOjwtToken(customIpID)
{
// using this will connect and data recievee will work...
// however ...seems we are unable to send any signals to CP
// therefore unusable !!!
   if(customIpID == undefined || customIpID == null)
   customIpID = "0x60";
   var logginPack = new Uint8Array([0x01, 0x00, 0x0B, 0x00, 0x00, 0x00, 0x00, 0x00, 0x60, 0x40, 0xFF, 0xFF, 0xF1, 0x01]);
   
   var numericIPID = Number.parseInt(customIpID,16);
   logginPack.set([numericIPID],8);
   return logginPack;
}
function composeCredencPacker(customIpID, customUser, customPass) {
  if (customIpID == undefined || customIpID == null)
    customIpID = "0x27";
  if (customUser == undefined || customUser == null)
    customUser = "crestron";
  if (customPass == undefined || customPass == null)
    customPass = "crestron";

  var kokoder = new TextEncoder();
  var numIPid = Number.parseInt(customIpID, 16);
  var bytecredenc = kokoder.encode((customUser + ":" + customPass));
  // console.log("lenofcred",bytecredenc.length)
  var empt = new Uint8Array(5 + bytecredenc.length);

  var declaredLenOfpacket = bytecredenc.length + 2;
  //console.log("decl", declaredLenOfpacket)
  empt.set([0x0B], 0);
  empt.set([declaredLenOfpacket], 2);
  empt.set([numIPid], 4);
  empt.set(bytecredenc, 5)
  //var credencpak = new Uint8Array([0x0B, 0x00, 0x13, 0x00, numIPid, 0x63, 0x72, 0x65, 0x73, 0x74, 0x72, 0x6F, 0x6E, 0x3A, 0x63, 0x72, 0x65, 0x73, 0x74, 0x72, 0x6F, 0x6E]);
  return empt;
}
//var tyu = composeCredencPacker("0x28", "crestron", "crestron")


// some byte arr to text
function uUu(e) {
    for (var t = "", n = e.length, i = 0; i < n; i++) {
      var o = e[i].toString(16);
      1 === o.length && (o = "0" + o),
        t += o + " "
    }
    return t
}

// StartWScon("192.168.166.166", "0x60","https://192.168.166.54/cws/flags/get/getwebsocketokenNF")
//combo to first obtain jwt, then calback continue nooo sooner..
// ment to be called once at start
function StartWScon(customWSip, customIPid, JWTfullURLfromToget)
{
if(JWTfullURLfromToget != undefined && JWTfullURLfromToget != null && JWTfullURLfromToget.length > 2)
   globalThis.JWTurl=JWTfullURLfromToget;                                                             

if(customIPid == undefined || customIPid == null)
   customIPid = "0x60";
if(customWSip == undefined || customWSip == null)
   customWSip = "192.168.166.166";      

var compleTargetUrl = "";

if(globalThis.JWTurl.length < 1)
{        
   compleTargetUrl = "http://"+customWSip+":8888/GJWT/crestron+9200";
   if(this.location.href.startsWith("https"))
      compleTargetUrl = "https://"+customWSip+"/cws/flags/get/getwebsocketokenNF";
}
else
   compleTargetUrl = globalThis.JWTurl;   

   if(compleTargetUrl.includes("-nojwt-"))
   {
      globalThis.ReachedState |= 1;
      if(globalThis.InterValJWTid > 0)
         clearInterval(globalThis.InterValJWTid);
      WaskoMako(customWSip, customIPid);
   }
   else
   {
      fetch(compleTargetUrl).then(pocem => {
        pocem.text().then(pxx => {
      
          if(pxx !=null&& pxx.length > 1)
          {
             globalThis._LastJWT= pxx;
          }
          globalThis.ReachedState |= 1;
          WaskoMako(customWSip, customIPid);
                 
        });
      })
   }
}


var temporialCounter = 0;
                  
// WaskoMako(null,"0x60")
//WaskoMako("192.168.166.54","0x60")
// WaskoMako("192.168.166.166","0x60")   ..last time when chrome on our https://127.0.0.1/index.html it went 
//..but have to first manualy open https://192.168.166.166/cws/flags/get/getwebsocketokenNF
// non crestron just old-plain
function WaskoMako(customWSip, customIPid)
{
   if(customWSip == undefined || customWSip == null)
      customWSip = "192.168.166.166";
   
   if(customIPid == undefined || customIPid == null)
      customIPid = "0x60";
      
   globalThis._hisIPID = customIPid;
   globalThis._hisIPhost = customWSip;
      
   var targetUrl = ""; 
   if(this.location.href.startsWith("https"))
       targetUrl ="wss://"+customWSip+":49200";
    else
       targetUrl ="ws://"+customWSip+":54123/cip";    // experimentaaaal
   
   var nakedWss = new WebSocket(targetUrl);
   globalThis.ReachedState |=2;
 nakedWss.onmessage = function onmassager(dutaa) {
// globalThis._Dutaa = dutaa.data;
 dutaa.data.arrayBuffer().then(pp => {
 
      var txtrecivved = uUu(new Uint8Array(pp));
      txtrecivved = txtrecivved.trim();
      // console.log("recived:", txtrecivved);
       if(txtrecivved == "0f 00 01 02")
       {
          temporialCounter++;
          var logginPack = null;

          if(globalThis.JWTurl.includes("-nojwt-"))          
             logginPack = comboseconnectpacketNOjwtToken(customIPid);
          else 
             logginPack = comboseconnectpacket(customIPid, customWSip);
          
          nakedWss.send(logginPack);
          if(globalThis.DEBUG)
          console.log("on welcome logginPack sended, ip:%o id:%o, timesCounter:%o", globalThis._hisIPhost, globalThis._hisIPID, temporialCounter);
          globalThis.ReachedState |=4;
       }
       else if(txtrecivved == "0d 00 02 00 00")
       {                                               
          // var t = Ne(14, new Uint8Array(), 0);
          var rspns = new Uint8Array([14,0,2,0,0]);
           nakedWss.send(rspns);       
       }
       else if(txtrecivved == "0e 00 02 00 00")
       {
          //  var rspns = new Uint8Array([13,0,2,0,0]);
         //  nakedWss.send(rspns);
         console.log("incomingg heartbiit 0e ??");  
       }
       else if(txtrecivved == "04 00 04 ff ff 00 02")
       {
            console.log("refuuuse ?? ..from other reason .. ");
            globalThis.ReachedState |= 16384;
            globalThis._hisConWasAcepted = false;
                 Hundlle(pp);
       }
        else if(txtrecivved == "02 00 03 ff ff 02")
       {
            console.log("refuuuse ??  no desired ipID");
            globalThis.ReachedState |= 8192;
            globalThis._hisConWasAcepted = false;
                 Hundlle(pp);
       }
       else if(txtrecivved=="02 00 04 00 00 00 1f")
       {      
              // con acepted..  .. does not seems to be happening..
              globalThis.ReachedState |= 8;
               globalThis._hisConWasAcepted = true;
                Hundlle(pp);
                // maybe ..
              //  this._nakedWss.send(new Uint8Array([0x05, 0x00, 0x05, 0x00, 0x00, 0x02, 0x03, 0x00]))   refresh
       }
       else if(txtrecivved=="02 00 04 00 00 40 1f")
       {      
            // this should happen when -nojwt-  
            // if plain login used then this means query for credentials...
             console.log("incoming query for credentials ",globalThis._hisIPID, globalThis._hisIPhost);
             //var numIPid = Number.parseInt(globalThis._hisIPID,16);
               // 0B-00-13-00-27-63-72-65-73-74-72-6F-6E-3A-63-72-65-73-74-72-6F-6E    ... 0x27  crestron:crestron
            // var credencpak = new Uint8Array([0x0B, 0x00, 0x13, 0x00, numIPid, 0x63, 0x72, 0x65, 0x73, 0x74, 0x72, 0x6F, 0x6E, 0x3A, 0x63, 0x72, 0x65, 0x73, 0x74, 0x72, 0x6F, 0x6E]);
            // var credencpak = composeCredencPacker(globalThis._hisIPID, "crestron", "crestron");
             var credencpak = composeCredencPacker(globalThis._hisIPID, globalThis._hisCPuser, globalThis._hisCPpass);
             nakedWss.send(credencpak);
              // should got  0C-00-03-00-27-01 if ok
       }
       else
       {
           //  console.log("recived:", txtrecivved);
             Hundlle(pp);
       
       }
 }); 
  //  console.log("recived:", dutaa);
  }
  
  nakedWss.onerror = function onroura(roura) {
    console.log("ws:%o roura:%o", globalThis._hisIPID, roura);
  }
  nakedWss.onclose = function onClose(closu) {
    console.log("ws:%o on closee:%O", globalThis._hisIPID, closu);
  }
  nakedWss.onopen = function onPopen(opon) {
    reconectAtempts = 6;
    console.log("ws:%o %o, on pupen, radyState:%o",globalThis._hisIPhost, globalThis._hisIPID, nakedWss.readyState);
  }
  
  globalThis._nakedWss = nakedWss;
  

 if(nakedWss.readyState == 1)
 {                          // ..whhich is not ..its 0 ..connectinng
  var logginPacket = comboseconnectpacket(customIPid, customWSip);
 // var logginPack = comboseconnectpacketNOjwtToken(customIPid);
    nakedWss.send(logginPacket);
   // console.log("sended..");
 }
}



function Hundlle(e)
{
HandleIncoming(new Uint8Array(e));
}


function HandleIncoming(e)
{
      var t = e[0];
      switch(t)
      {
      case J.AUTHENTICATE_RESPONSE:
        //this._handleAuthenticateResponse(e);
        console.log("incoming auth response for:",globalThis._hisIPID, e);
          // like   0C-00-03-00-27-01 for 0x27
          setTimeout((ss) => {
               sendUpdateRequest();
            }, 1500);
        break;
      case J.DATA:
        //this._handleData(e);
        M(e);
        
        break;                       
      case J.CONNECT_RESPONSE:
        console.log("incoming CONNECT_RESPONSE, for:%o, data:%O",globalThis._hisIPID, e);
        break;         
      case J.DEVICE_ROUTER_CONNECT_RESPONSE:
        //this._receivedDeviceRouterConnectResponse = !0,
         if(globalThis.DEBUG)  
        console.log("incoming DEVICE_ROUTER_CONNECT_RESPONSE for:%o, ip:%o",this._hisIPID, this._hisIPhost);
      
      //  _handleDeviceRouterConnectResponse(e);
      _e(e);
        
        break;
      case J.DISCONNECT:
       // this._handleDisconnect(e);
      // console.log("ws ciper recieved DISCONNECT ipdi:%o data:%o ,, you need to hit refresh", globalThis._hisIPID, e);
            T({
                 type: i.DISCONNECT_WS,
                 payload: {
                   value: true
                 }
            });
            
            // TODO: SOME FUCKING RE-CONNECT DELAYED mechhanizm...
            // maybe like ..
            // delayedd ...StartWScon(globalThis._hisIPhost, globalThis._hisIPID, globalThis.JWTurl);
            prepareReconect();
            
        break;
      case J.DISCONNECT_RESPONSE:
       // this._handleDisconnectResponse(e);
        console.log("ws ciper recieved DISCONNECT_RESPONSE");
        break;
      case J.EXTENDED_DATA:
      // this seems incoming when serial data ??
      _handleExtendedData(e);
        //this._handleExtendedData(e);
        break;
      case J.HEARTBEAT_RESPONSE:
        //this._handleHeartbeatResponse(e),
        _handleHeartbeatResponse(e);
        //this.cipClient.resetHeartBeatOutgoing();
        break;
      case J.PROGRAM_READY:
       // this._handleProgramReady(e),
      //  2 === e[3] && this._startDeviceRouterConnectTimeout();
       console.log("incoming PROGRAM_READY for:",globalThis._hisIPID, e);
        break;
      case J.LICENSE_INFORMATION_RESPONSE:
        break;
      case J.HEARTBEAT:
      //  this._handleHeartbeat(e);
        _handleHeartbeat(e);
        break;
      case J.DUMMY:
        console.log("Received a dummy packet");
        break;

         default: 
         console.log("HandleIncoming undefined handle data ",t,e);
         break;
      }        
}



// should be this._handleData(e);
// when some Joing recived
 function M(e) {
// console.log("handling Received a DATA packet: " + uUu(e));
   switch (e[6]) {
     case I.DIGITAL_IO:
       L(e.slice(5));
       break;
     case I.ANALOG_IO:
       m(e.slice(5));
       break;
     case I.COMMAND_PACKETS:
     
      if(!this.cipClient)
         this.cipClient = {};
         
       !function(e, t) {
         switch (t[2]) {
           case 0:
             console.log("START OF UPDATE, for:", this._hisIPID, this._hisIPhost),
               k(e, "StartOfUpdate", {
                 excludePrefixes: ["Csig"]
               });
             break;
           case 22:
             console.log("END OF UPDATE"),
               k(e, "EndOfUpdate");
             break;
           case 25:
           case 26:
           case 27:
             break;
           case 28:
             console.log("End of join status query"),
              // e.initializeEndOfJoinStatusResponse()
               initializeEndOfJoinStatusResponse();
         }
       }(this.cipClient, e.slice(5));
       break;
     case I.SYMMETRICAL_ANALOG_PACKETS:
       B(e.slice(5));
       break;
     case I.SERIAL_IO_INDIRECT_TEXT:
       w(e.slice(5));
       break;
     case I.GENERAL_RCB:
       W(e.slice(5));
       break;
     case I.UNMANGLED_INDIRECT_TEXT_SUPPORT:
       ! function(e) {
         for (var t = "", n = P(e, !1), o = (e[2] << 8) + e[3] + 1, r = e[4], a = b.mapState(A.STRING, 0, o), s = 5; s <= n; s++)
           t += String.fromCharCode(e[s]);
         console.log("0x2A - unmangledIndirectTextSupport", {
             signalName: a,
             joinId: o,
             flags: r,
             extendedUnmangledIndirectText: t
           }),
           H[a] = 1 & r ? t : H[a] ? H[a] + t : t,
           T({
             type: i.BRIDGE_RECEIVE_STRING_FROM_NATIVE,
             payload: {
               signalName: a,
               value: H[a]
             }
           })
       }(e.slice(5));
       break;
     case I.SMART_OBJECT:
       ! function(e) {
       
         if(globalThis.DEBUG)       
         console.log("0x38 - Smart Object");
         
         for (var t = e[0], n = 2; n < t;) {
           var i = (e[n] << 24) + (e[n + 1] << 16) + (e[n + 2] << 8) + e[n + 3],
             o = e[n + 4],
             r = e[n + 5],
             a = n + 4,
             s = a + o + 1,
             c = e.slice(a, s);
           switch (r) {
             case I.DIGITAL_IO:
               L(c, i);
               break;
             case I.ANALOG_IO:
               m(c, i);
               break;
             case I.SYMMETRICAL_ANALOG_PACKETS:
               B(c, i);
               break;
             case I.SERIAL_IO_INDIRECT_TEXT:
               w(c, i);
               break;
             case I.GENERAL_RCB:
               W(c, i);
               break;
             default:
               console.log("err 0x38, unhandled packet " + uUu(e))
           }
           n += o + 4 + 1
         }
       }(e.slice(5));
       break;
     case I.TIME_AND_DATE:
       break;
     default:
     var theCaseEnum = I[e[6]] ? I[e[6]] : e[6];
       console.log("Unknown packet received in handleData, caseNum:%o, data:%o ",theCaseEnum, (e.length < 20 ? uUu(e) : ("length:" + e.length)));
       break;
   }
 }
 
 //     _handleHeartbeat
function _handleHeartbeat(e) {
        //E.debug("Received a HEARTBEAT packet: " + u(e)),
   sendHeartBeatResponse(e.slice(5));
}

// _handleHeartbeatResponse
function _handleHeartbeatResponse(e) {
  console.debug("Received a HEARTBEAT_RESPONSE packet: " + uUu(e))
}

function sendHeartBeatResponse(e)
{
if(this._virtualConnectionHandle == undefined || this._virtualConnectionHandle == null)
   this._virtualConnectionHandle = 0;
var t = Ne(J.HEARTBEAT_RESPONSE, e, this._virtualConnectionHandle);
globalThis._nakedWss.send(t);
}



 // needed for b.maaapsstate
var v = {
  boolean: {
    0: {
      18494: "Csig.All_Control_Systems_Online_fb",
      18495: "Csig.Control_Systems_Offline_fb"
    }
  }
}
var g = {
  string: {
    "Csig.Browser_URL": {
      joinId: 28601,
      smartObjectId: 0
    }
  }
}

 // pachtling this object ...but 
 // consider calling D

// var b =new D()
// or rather   ...    
//var b = D.getInstance();
/*
setTimeout( (potom)=>{ 

  var b = D.getInstance();
  globalThis.b = b;           
  // however since we dont want to bother with fucking contract file..
  // its nearly pointlesss tto use real ob...so lets rather fake iit..
 
},500);
*/
   // nameThatSig(A.NUMERIC, 77)
function nameThatSig(sigType, sigNumber, smartObjectId)
{
   if(smartObjectId < 1)
   {
      // should return Bool-74, UShort-99, String-1555
      return ourTransNam[sigType] + "-" + sigNumber;
   }
   else                   //  107-Bool-74,  17-String-1555
     return smartObjectId + "-" + ourTransNam[sigType] + "-" + sigNumber;
}

// eg origialy ...got for b.mapState(A.STRING, 0, 99)  got   fb99
var b = {"contract":{"signals":{"events":{},"states":{}}},"initialized":true};
b.mapState =function(e, t, n) {
               var i, o, r, a;
               if (void 0 === t && (t = 0),
               !this.initialized)
                   throw new Error("Contract file not loaded!");
               var s = (null === (o = null === (i = v[e]) || void 0 === i ? void 0 : i[t]) || void 0 === o ? void 0 : o[n]) || (null === (a = null === (r = this.contract.signals.states[e]) || void 0 === r ? void 0 : r[t]) || void 0 === a ? void 0 : a[n]);
               //return s || "fb" + n
               return s || nameThatSig(e,n,t);
           }
           
b.mapEvent = function(e,t) {
            var n, i;
            if (!this.initialized)
                throw new Error("Contract file not loaded!");
            var o = e === A.REPEAT_DIGITAL ? A.BOOLEAN : e
              , r = (null === (n = g[o]) || void 0 === n ? void 0 : n[t]) || (null === (i = this.contract.signals.events[o]) || void 0 === i ? void 0 : i[t]);
            if (!r) {
                var a = parseInt(t, 10);
                return isNaN(a) || a < 0 ? (E.debug("Event " + t + " not found in the contract file!"),
                null) : {
                    joinId: a,
                    smartObjectId: 0
                }
            }
            return r
}


// some shifter by bits
function P(e, t) {
  return t ? (e[0] << 8) + e[1] : e[0]
}
 // bolean incoming
function L(e, t) {

if(globalThis.DEBUG)
if(t)
   console.log("onenhle bolean incoming Does Have Smart Ob", t);
   
  void 0 === t && (t = 0);
  
  for (var n = P(e, !1), o = 2; o < n; o += 2) {
    var r = ((127 & e[o + 1]) << 8) + e[o] + 1,
      a = b.mapState(A.BOOLEAN, t, r);
    
     if(128 & e[o + 1])
     {
      if(globalThis.DEBUG)
        console.log("0x00 - handleDigitalIO.. smart ?", {
                       signalName: a,
                       value: !1,
                       joinId: r,
                       smartObjectId: t,
                       hisIPidAIP: _hisIPID+"_"+_hisIPhost
                     });

     T({
        type: i.BRIDGE_RECEIVE_BOOLEAN_FROM_NATIVE,
        payload: {
          signalName: a,
          value: !1,
          smartObjectId : t
        }
      })                
     
     }
     else
     {      
        if(globalThis.DEBUG)
           console.log("0x00 - handleDigitalIO", {
           signalName: a,
           value: !0,
           joinId: r,
           smartObjectId: t,
           hisIPidAIP: _hisIPID+"_"+_hisIPhost
         });
        
        T({
           type: i.BRIDGE_RECEIVE_BOOLEAN_FROM_NATIVE,
           payload: {
             signalName: a,
             value: !0,
             smartObjectId: t
           }
         });
     
     }   
  }
}


// symetrical analog incoming
function B(e, t) {

if(globalThis.DEBUG)
if(t)
   console.log("onenhle symetricalanalog incoming Does Have Smart Ob", t, e.length);

        void 0 === t && (t = 0);
        for (var n = P(e, !1), o = 2; o < n; o += 4) {
            var r = (e[o] << 8) + e[o + 1] + 1
              , a = (e[o + 2] << 8) + e[o + 3]
              , s = b.mapState(A.NUMERIC, t, r);
      
            if(globalThis.DEBUG) 
            console.log("0x14 - symmetricalAnalogPackets", {
                signalName: s,
                value: a,
                joinId: r,
                smartObjectId: t,
                hisIPidAIP: _hisIPID+"_"+_hisIPhost
            });
            
            if(t > 0)
            {
               T({
                   type: i.BRIDGE_RECEIVE_INTEGER_FROM_NATIVE,
                   payload: {
                       signalName: s,
                       value: a,
                       smartObjectId: t
                   }
               })            
            }
            else
            {
               T({
                   type: i.BRIDGE_RECEIVE_INTEGER_FROM_NATIVE,
                   payload: {
                       signalName: s,
                       value: a
                   }
               })
            }
        }
}
// handle analog incomiing
function m(e, t) {
if(globalThis.DEBUG)
if(t)
   console.log("onenhle analog incoming Does Have Smart Ob", t);

        void 0 === t && (t = 0);
        var n, o, r = P(e, !1), a = !1;
        switch (r) {
        case 3:
            n = e[3],
            o = e[2] + 1;
            break;
        case 4:
            n = (e[3] << 8) + e[4],
            o = e[2] + 1;
            break;
        case 5:
            n = (e[4] << 8) + e[5],
            o = (e[2] << 8) + e[3] + 1;
            break;
        default:
            a = !0;
            for (var s = 2; s < r; s += 4) {
                n = (e[s + 2] << 8) + e[s + 3],
                o = (e[s] << 8) + e[s + 1] + 1;
                var c = b.mapState(A.NUMERIC, t, o);
                
                if(globalThis.DEBUG)
                console.log("0x01 - handleAnalogIO with mysterious a true", {
                    signalName: c,
                    value: n,
                    joinId: o
                });
                
                T({
                    type: i.BRIDGE_RECEIVE_INTEGER_FROM_NATIVE,
                    payload: {
                        signalName: c,
                        value: n,
                        smartObjectId : t
                    }
                })
            }
   }
        if (!a) {
            c = b.mapState(A.NUMERIC, t, o);
            
            if(globalThis.DEBUG)
            console.log("0x01 - handleAnalogIO", {
                signalName: c,
                value: n,
                joinId: o,
                hisIPidAIP: _hisIPID+"_"+_hisIPhost
            });
            
            T({
                type: i.BRIDGE_RECEIVE_INTEGER_FROM_NATIVE,
                payload: {
                    signalName: c,
                    value: n,
                    smartObjectId : t
                }
            })
        }
}

   // pouze mozna kandidat natuto funkci
    // but donthave 'o'
    /* 
function y(e, t) {
      return e === o ? t : e
}
*/
//   'o' ...maybe 16
/* uncoment if needed.... but now is risk of overlaping with other 's'
var s = function() {
        for (var e = 0, t = 0, n = arguments.length; t < n; t++)
            e += arguments[t].length;
        var i = Array(e)
          , o = 0;
        for (t = 0; t < n; t++)
            for (var r = arguments[t], a = 0, s = r.length; a < s; a++,
            o++)
                i[o] = r[a];
        return i
};
*/
// or s nothing ..
var y = function() {
        for (var e = 0, t = 0, n = arguments.length; t < n; t++)
            e += arguments[t].length;
        var i = Array(e)
          , o = 0;
        for (t = 0; t < n; t++)
            for (var r = arguments[t], a = 0, s = r.length; a < s; a++,
            o++)
                i[o] = r[a];
        return i
};       
// SERIAL_IO_INDIRECT_TEXT
function w(e, t) {
if(t)
   console.log("onenhle SERIAL_IO_INDIRECT_TEXT Smart Ob", t);
   
        void 0 === t && (t = 0);
        console.log("0x15 - serialIOIndirecttext, handled by 0x34");
        G(new Uint8Array(y([0], e)), t);
}

// somee string joins disector ..
var U = {};
function G(e, t) {
  void 0 === t && (t = 0);
  for (var n = "", o = P(e, !0), r = (e[3] << 8) + e[4] + 1, a = e[5], s = b.mapState(A.STRING, t, r), c = 6; c < o + 2; c += 4 & a ? 2 : 1) {
    var E = void 0;
    E = 4 & a ? (e[c + 1] << 8) + e[c] : e[c],
      n += String.fromCharCode(E)
  }
  
  U[s] = 1 & a ? n : U[s] ? U[s] + n : n,
  
    2 & a && T({
      type: i.BRIDGE_RECEIVE_STRING_FROM_NATIVE,
      payload: {
        signalName: s,
        value: U[s],
        smartObjectId : t
        
      }
    });
    
    if(globalThis.DEBUG)
     console.log("..just after procesing of some string?", {
                signalName: s,
                value: U[s],
                joinId: r,
                smartObjectId : t,
                hisIPidAIP: _hisIPID+"_"+_hisIPhost
            });
}

// GENERAL_RCB incoming
function W(e, t) {
        void 0 === t && (t = 0);
        for (var n = P(e, !1), o = {
            0: "1",
            1: "0"
        }, r = 10 * ((e[2] << 24) + (e[3] << 16) + (e[4] << 8) + e[5]), a = 6; a < n; a += 5) {
            var s = (e[a] << 8) + e[a + 1] + 1
              , c = e[a + 4]
              , u = void 0;
            if (1 & c)
                u = (e[a + 2] << 8) + e[a + 3],
                "1" === ("0".repeat(16 - u.toString(2).length) + u.toString(2))[0] && (u = -1 * (parseInt(u.toString(2).replace(/0|1/gi, (function(e) {
                    return o[e]
                }
                )), 2) + 1));
            else
                u = (e[a + 2] << 8) + e[a + 3];
            var _ = b.mapState(A.NUMERIC, t, s);
            console.log("0x1E - handleGeneralRCB", {
                signalName: _,
                time: r,
                value: u,
                joinId: s,
                flags: c
            }),
            T({
                type: i.BRIDGE_RECEIVE_OBJECT_FROM_NATIVE,
                payload: {
                    signalName: _,
                    value: JSON.stringify({
                        rcb: {
                            value: u,
                            time: r
                        }
                    })
                }
            })
        }
}


// seeems here ends up most of the usual string signals..
// J.EXTENDED_DATA
// originaly named function x(e)
function _handleExtendedData(e) {
//console.debug("Received an EXTENDED_DATA packet: " + uUu(e),e[7]);
  switch (e[7]) {
    case I.EXTENDED_LENGTH_SERIAL_INDIRECT_TEXT:
    // this recently mostl incominigg
      G(e.slice(5));
      
      break;
    case I.EXTENDED_SMART_OBJECT:
      !function(e) {
      
       if(globalThis.DEBUG)  
        console.log("0x39 - Extended Smart Object");
        
        for (var t = P(e, !0), n = 3; n < t;) {
          var i = (e[n] << 24) + (e[n + 1] << 16) + (e[n + 2] << 8) + e[n + 3],
            o = (e[n + 4] << 8) + e[n + 5],
            r = e[n + 6],
            a = n + 4,
            s = a + o + 2,
            c = e.slice(a, s);
          switch (r) {
            case I.EXTENDED_LENGTH_SERIAL_INDIRECT_TEXT:
              G(c, i);
              break;
            default:
              console.log("0x39, unefined ExtendedData, unhandled packet " + uUu(e))
          }
          n += o + 6
        }
      }(e.slice(5));
      break;
    default:
      console.warn("Unknown packet received in EXTENDED DATA " + uUu(e))
  }
}



// some related to incoming command packet
function k(e, t, n) {
  console.log("handleStateSynchronization for:%s, id:%s", globalThis._hisIPhost, globalThis._hisIPID);
  if(!this.cipProgramIdentifier)
   this.cipProgramIdentifier = 'wss://${globalThis._hisIPhost}:49200/:${globalThis._hisIPID}:';  // wss://192.168.166.166:49200/:0x60:
   
   if(e == undefined || e == null)
      e = {cipProgramIdentifier:"wss://"+globalThis._hisIPhost+":49200/:"+globalThis._hisIPID+":"};  // wss://192.168.166.166:49200/:0x60:
   
  var o = {
    id: e.cipProgramIdentifier,
    state: t,
    value: n
  };
  T({
    type: i.BRIDGE_RECEIVE_OBJECT_FROM_NATIVE,
    payload: {
      signalName: "Csig.State_Synchronization",
      value: JSON.stringify(o)
    }
  })
}


function initializeEndOfJoinStatusResponse()
{
//this.cipClient.initializeEndOfJoinStatusResponse
sendEndOfJoinStatusResponse();
}
// in this.cipClient.initializeEndOfJoinStatusResponse calls this
function sendEndOfJoinStatusResponse()
{
   if(!this._virtualConnectionHandle)
      this._virtualConnectionHandle = 0;
      
            var e = new Uint8Array(3)
              , t = 0;
            e[t++] = 2,
            e[t++] = 3,
            e[t++] = 29;
            var n = Ne(J.DATA, e, this._virtualConnectionHandle);
            globalThis._nakedWss.send(n);
      //      this.webSocketClient.sendCIPPacketWithoutBuffer(n),
        //    this.connected = !0
}

// by initializeUpdateRequest  caalls
function sendUpdateRequest()
{
   if(!this._virtualConnectionHandle)
      this._virtualConnectionHandle = 0;
      
            var e = new Uint8Array(3)
              , t = 0;
            e[t++] = 2,
            e[t++] = 3,
            e[t++] = 0;
            var n = Ne(J.DATA, e, this._virtualConnectionHandle);
            globalThis._nakedWss.send(n);
        //    this.webSocketClient.sendCIPPacketWithoutBuffer(n)
   // or jus do this >> 
   //globalThis._nakedWss.send(new Uint8Array([0x05, 0x00, 0x05, 0x00, 0x00, 0x02, 0x03, 0x00]))

}


// who knonws used by methods sending joins to websocket.. eg ..publish event
function sendUpdateTemplatePacketBuilder(e, t, n) {
  var i = (n ? 2 : 1) + (t ? n ? 7 : 6 : 0) + e,
    o = new Uint8Array(i),
    r = 0;
  return n ? (o[r++] = i - 2 >> 8 & 255,
      o[r++] = i - 2 & 255) : o[r++] = i - 1,
    t && (o[r++] = n ? I.EXTENDED_SMART_OBJECT : I.SMART_OBJECT,
      o[r++] = t >> 24 & 255,
      o[r++] = t >> 16 & 255,
      o[r++] = t >> 8 & 255,
      o[r++] = 255 & t,
      n ? (o[r++] = i - 9 >> 8 & 255,
        o[r++] = i - 9 & 255) : o[r++] = i - 7 & 255), {
      packetData: o,
      offset: r
    }
}

this.isUnicodeSupported = true;
this.extendedLengthSupported = true;
this.virtualConnectionHandle = 0;

function sendUpdateString(t, n, i) {
  void 0 === i && (i = 0);
  var o = this.isUnicodeSupported ? 2 * t.length : t.length,
    r = sendUpdateTemplatePacketBuilder(o + 4, i, this.extendedLengthSupported),
    a = r.packetData,
    s = r.offset;
  a[s++] = this.extendedLengthSupported ? I.EXTENDED_LENGTH_SERIAL_INDIRECT_TEXT : I.SERIAL_IO_INDIRECT_TEXT,
    a[s++] = n >> 8 & 255,
    a[s++] = 255 & n,
    a[s++] = this.isUnicodeSupported ? 7 : 3;
  for (var c = 0; c < t.length; c++)
    if (this.isUnicodeSupported) {
      var E = t.codePointAt(c);
      a[s++] = 255 & E,
        a[s++] = E >> 8 & 255
    } else
      a[s++] = t.charCodeAt(c);
  var u = Ne(this.extendedLengthSupported ? J.EXTENDED_DATA : J.DATA, a, this.virtualConnectionHandle);
  globalThis._nakedWss.send(u);
  // this._webSocketClient.sendCIPPacketWithBuffer(u)

}

function sendUpdateNumber(t, n, i) {
  void 0 === i && (i = 0);
  var o = sendUpdateTemplatePacketBuilder(5, i, !1),
    r = o.packetData,
    a = o.offset;
  r[a++] = I.SYMMETRICAL_ANALOG_PACKETS,
    r[a++] = n >> 8 & 255,
    r[a++] = 255 & n,
    r[a++] = t >> 8 & 255,                        s
    r[a++] = 255 & t;
  var s = Ne(J.DATA, r, this.virtualConnectionHandle);
  //this._webSocketClient.sendCIPPacketWithBuffer(s)
  globalThis._nakedWss.send(s);
}
function sendUpdateBoolean(t, n, i, o) {
  void 0 === i && (i = 0),
    void 0 === o && (o = !1);
  var r = sendUpdateTemplatePacketBuilder(3, i, !1),
    a = r.packetData,
    s = r.offset;
  a[s++] = o ? I.REPEAT_DIGITAL_IO : I.DIGITAL_IO,
    !0 === t ? (a[s++] = 255 & n,
      a[s++] = n >> 8 & 255) : (a[s++] = 255 & n,
      a[s++] = 128 + (n >> 8 & 255));
  var c = Ne(J.DATA, a, this.virtualConnectionHandle);
  //this._webSocketClient.sendCIPPacketWithBuffer(c)
  globalThis._nakedWss.send(c);
}


function d(hovno)
{
   // purely fake func dummy
}
function transitionTo(hovno)
{
   // purely fake func dummy
}
function disconnect()
{
   // purely fake func dummy
}
function cancelExpectedResponseTimeouts()
{
 // purely fake func dummy
}
function tryReconnect()
{
}
function resetReconnectTimeout()
{
}
function initializeHeartBeat()
{
}

// should be >> _handleDeviceRouterConnectResponse
function _e(e) {
    if(globalThis.DEBUG)  
      console.log("Received a DEVICE_ROUTER_CONNECT_RESPONSE  for:%o packet: " + uUu(e), this._hisIPID);
    var t = e.length;
    
    this.state = a.WAIT_CONNECT_RESPONSE;
    
    if (this.state === a.WAIT_CONNECT_RESPONSE) {
      if (t < 41) throw new Error("Bad packet received!");
      var n, o = e[5],
        r = e[10],
        s = 31 & o,
        c = a.IDLE;
      if (this.virtualConnectionHandle = (e[3] << 8) + e[4], 128 & o)
      {
       E.log("Access is allowed for " + s + " days"), c = a.WAIT_CLEAR_ALL, n = s, p(i.CCS_DIAGNOSTICS, "CCS_TRIAL_PERIOD_DAYS", n);
       consol.log("change in virtualConnectionHandle? curval:%o hisIPiD:%o",this.virtualConnectionHandle, globalThis._hisIPID);
      }
      else switch (s) {
        case 0:
          E.log("Standard connection"), c = a.WAIT_CLEAR_ALL;
          break;
        case 1:
          E.log("Connected with master list entry"), c = a.WAIT_CLEAR_ALL;
          break;
        case 2:
        // ..may happend when prog not ready yet
          var txt_msg = "Connection refused! Rejected with master list entry. for:" + this._hisIPID + " ip:" + globalThis._hisIPhost;
          E.error(txt_msg);
          c = a.CONNECTION_REFUSED;
          d("CCS_OFFLINE");
          break;
        case 3:
          var txt_msg = "Connection refused! Connection timed out. for:" + this._hisIPID + " ip:" + globalThis._hisIPhost;
          E.error(txt_msg), c = a.CONNECTION_REFUSED, d("CCS_OFFLINE");
          break;
        case 4:
          var txt_msg = "Connection refused! Out of licenses.";
          E.error(txt_msg), c = a.CONNECTION_REFUSED, d("CCS_OFFLINE");
          break;
        case 5:
          var txt_msg = "Connection refused! No writer access.";
          E.error(txt_msg), c = a.CONNECTION_REFUSED, d("CCS_OFFLINE");
          break;
        case 6:
          var txt_msg = "Connection refused! User defined type is not licensed";
          E.error(txt_msg), c = a.CONNECTION_REFUSED, d("CCS_OFFLINE");
          break;
        case 7:
          E.log("Connection ok"), c = a.WAIT_CLEAR_ALL;
          break;
        case 8:
          break;
        case 9:
          E.log("License activation key detected"), c = a.WAIT_CLEAR_ALL;
          break;
        case 10:
          E.error("Connection refused! No license key."), c = a.CONNECTION_REFUSED, d("CCS_OFFLINE");
          break;
        case 11:
          txt_msg = "Connection refused! IPID is already allocated  for:" + this._hisIPID + " ip:" + globalThis._hisIPhost;
          E.error(txt_msg), c = a.CONNECTION_REFUSED, d("CCS_OFFLINE");
          break;
        default:
          txt_msg = "Connection refused! Bits 4-0 of the mode byte cannot be handled.";
          E.error(txt_msg), c = a.CONNECTION_REFUSED, d("CCS_OFFLINE")
      }
      var C = 1 & r;
      if (64 & o) return E.warn("Authentication is required"), void T({
        type: i.WEBSOCKET_EVENT,
        payload: {
          eventName: "AUTHENTICATION_REQUIRED"
        }
      });
      if (C) return E.warn("Authentication failed!"), transitionTo(a.AUTHENTICATION_FAILED), disconnect("AUTHENTICATION_FAILED"), void T({
        type: i.INTERNAL_EVENT,
        payload: {
          name: "AUTHENTICATION_FAILED"
        }
      });
      if (c === a.CONNECTION_REFUSED) return cancelExpectedResponseTimeouts(), transitionTo(c), void tryReconnect();
      c === a.WAIT_CLEAR_ALL && resetReconnectTimeout();
      var N = e[6];
      this.heartBeatSupported = 1 == (1 & N), this.isProgramReadySupported = 2 == (2 & N), thisisUnicodeSupported = 4 == (4 & N), this.extendedLengthSupported = 8 == (8 & N);
      var I = 48 & N;
      
      var ie = 1024;
      var oe = 2048;
      var re = 4096;
      
      16 === I ? this.serialSize = ie : 32 === I ? this.serialSize = oe : 48 === I && (this.serialSize = re);
      var h = 8 == (8 & r),
        f = 16 == (16 & r);
      if (d("CCS_LICENSE_SUPPORT_ON"), !h && !f) return E.warn("Licensing is not supported!"), void d("CCS_LICENSE_SUPPORT_OFF");
      E.debug("" + JSON.stringify({
        supportsHeartbeat: this.heartBeatSupported,
        supportsProgramReady: this.isProgramReadySupported,
        supportsUnicode: this.isUnicodeSupported,
        supportsExtendedLength: this.extendedLengthSupported,
        serialSize: this.serialSize
      })), c === a.WAIT_CLEAR_ALL && (T({
        type: i.WEBSOCKET_EVENT,
        payload: {
          eventName: "CONNECT_CIP",
          eventData: {
            url: Ee.url,
            ipId: Ee.ipId,
            roomId: Ee.roomId,
            tokenSource: Ee.tokenSource,
            tokenUrl: Ee.tokenUrl
          }
        }
      }), this.sendUpdateRequest(), this.initializeHeartBeat(), d("CCS_ONLINE")), this.transitionTo(c)
    } else E.error("Received DEVICE_ROUTER_CONNECT_RESPONSE in an invalid state")
  }

 // supa ctor for queue buffer ??  like ch5EventsBuffer
 // use like  var insaSe = new Se()
 var Se = function() {
        function e() {
            this._items = [],
            this._isProcessing = !1
        }
        return e.prototype.size = function() {
            return this._items.length
        }
        ,
        e.prototype.isEmpty = function() {
            return 0 === this._items.length
        }
        ,
        e.prototype.push = function(e) {
            this._items.push(e)
        }
        ,
        e.prototype.pop = function() {
            if (!this.isEmpty())
                return this._items.shift();
            this._isProcessing = !1
        }
        ,
        e.prototype.startProcessing = function() {
            this._isProcessing = !0
        }
        ,
        e.prototype.stopProcessing = function(e) {
            void 0 === e && (e = !0),
            this._isProcessing = !1,
            e && this.clear()
        }
        ,
        Object.defineProperty(e.prototype, "isProcessing", {
            get: function() {
                return this._isProcessing
            },
            enumerable: !1,
            configurable: !0
        }),
        e.prototype.clear = function() {
            this._items = []
        }
        ,
        e
}();


var cipPacketsBuffer = new Se();

function startCipBufferProcessing() {
  for (this.cipPacketsBuffer.startProcessing(); !this.cipPacketsBuffer.isEmpty();) {
    var e = this.cipPacketsBuffer.pop();
    if (!e)
      return;
      
   globalThis._nakedWss.send(e);
  }
}
// oppositee to sendCIPPacketWithoutBuffer which simply send to websocket
function sendCIPPacketWithBuffer(e) {
console.log("sendCIPPacketWithBuffer  queue sending NOT fully IMPLEMENTED may be faulty.. ");
/* origo 
        if (!this.connected || !this.cipClient.connected)
                return E.log("Not connected over CIP yet. Adding message to buffer..."),
                void this.cipPacketsBuffer.push(e);
            this.cipPacketsBuffer.isEmpty() ? this.socket.send(e) : this.cipPacketsBuffer.isProcessing ? (E.log("Buffer is processing. Adding message to the end of the queue..."),
            this.cipPacketsBuffer.push(e)) : this.startCipBufferProcessing()
   */ 
   if(!globalThis._nakedWss || globalThis._nakedWss.readyState > 1)
   {
       console.log("Not connected Ws for sencing.. CIP yet. Adding message to buffer...");
       void cipPacketsBuffer.push(e);
       return;
   }
   else
   {  
          
      this.cipPacketsBuffer.isEmpty() ?  globalThis._nakedWss.send(e) : this.cipPacketsBuffer.isProcessing ? (console.log("Buffer is processing. Adding message to the end of the queue..."),
      this.cipPacketsBuffer.push(e)) : startCipBufferProcessing()
   }
   // otherwwise just directly call folowing withou bullshits around....
//   globalThis._nakedWss.send(e);
}




// post from worker to main thread ..
function T(e) {
  //console.log("desire to post msg:", e);
  
  e.payload.hisIPID = globalThis._hisIPID;
  e.payload.hisIPhost = globalThis._hisIPhost;
  postMessage(e);
   
}



// in case this script is indeed a worker...
// may... will need this
self.onmessage = (e) => {

//chheck for case this file is regulary loaded in html NOT as woerker...
// then every time postMessage is called it delivers to mainthread back to seeelf
// while when from worker it seems not have origin, AND source is null
   if(this.window == undefined)
   {
       // alternative check >> if((e.origin == this.location.origing) || e.source === window) 
    //  console.log("worker incoming posted msg",e.data);
   
      AsiOnmessage(e);
   }
}


// requred for loadcontractt
var f = function(e, t) {
  var n, i, o, r, a = {
    label: 0,
    sent: function() {
      if (1 & o[0])
        throw o[1];
      return o[1]
    },
    trys: [],
    ops: []
  };
  return r = {
      next: s(0),
      throw: s(1),
      return: s(2)
    },
    "function" == typeof Symbol && (r[Symbol.iterator] = function() {
      return this
    }),
    r;

  function s(r) {
    return function(s) {
      return function(r) {
        if (n)
          throw new TypeError("Generator is already executing.");
        for (; a;)
          try {
            if (n = 1,
              i && (o = 2 & r[0] ? i.return : r[0] ? i.throw || ((o = i.return) && o.call(i),
                0) : i.next) && !(o = o.call(i, r[1])).done)
              return o;
            switch (i = 0,
              o && (r = [2 & r[0], o.value]),
              r[0]) {
              case 0:
              case 1:
                o = r;
                break;
              case 4:
                return a.label++, {
                  value: r[1],
                  done: !1
                };
              case 5:
                a.label++,
                  i = r[1],
                  r = [0];
                continue;
              case 7:
                r = a.ops.pop(),
                  a.trys.pop();
                continue;
              default:
                if (!(o = a.trys,
                    (o = o.length > 0 && o[o.length - 1]) || 6 !== r[0] && 2 !== r[0])) {
                  a = 0;
                  continue
                }
                if (3 === r[0] && (!o || r[1] > o[0] && r[1] < o[3])) {
                  a.label = r[1];
                  break
                }
                if (6 === r[0] && a.label < o[1]) {
                  a.label = o[1],
                    o = r;
                  break
                }
                if (o && a.label < o[2]) {
                  a.label = o[2],
                    a.ops.push(r);
                  break
                }
                o[2] && a.ops.pop(),
                  a.trys.pop();
                continue
            }
            r = t.call(e, a)
          } catch (e) {
            r = [6, e],
              i = 0
          } finally {
            n = o = 0
          }
        if (5 & r[0])
          throw r[1];
        return {
          value: r[0] ? r[1] : void 0,
          done: !0
        }
      }([r, s])
    }
  }
};

// requred for O and who knows..
var h = function(e, t, n, i) {
  return new(n || (n = Promise))((function(o, r) {
    function a(e) {
      try {
        c(i.next(e))
      } catch (e) {
        r(e)
      }
    }

    function s(e) {
      try {
        c(i.throw(e))
      } catch (e) {
        r(e)
      }
    }

    function c(e) {
      var t;
      e.done ? o(e.value) : (t = e.value,
        t instanceof n ? t : new n((function(e) {
          e(t)
        }))).then(a, s)
    }
    c((i = i.apply(e, t || [])).next())
  }))
}

 // related to contract loading and mapstate
var S = function(e, t, n, i) {
        return new (n || (n = Promise))((function(o, r) {
            function a(e) {
                try {
                    c(i.next(e))
                } catch (e) {
                    r(e)
                }
            }
            function s(e) {
                try {
                    c(i.throw(e))
                } catch (e) {
                    r(e)
                }
            }
            function c(e) {
                var t;
                e.done ? o(e.value) : (t = e.value,
                t instanceof n ? t : new n((function(e) {
                    e(t)
                }
                ))).then(a, s)
            }
            c((i = i.apply(e, t || [])).next())
        }
        ))
    }
    
// required for R
var O = function(e, t) {
  var n, i, o, r, a = {
    label: 0,
    sent: function() {
      if (1 & o[0])
        throw o[1];
      return o[1]
    },
    trys: [],
    ops: []
  };
  return r = {
      next: s(0),
      throw: s(1),
      return: s(2)
    },
    "function" == typeof Symbol && (r[Symbol.iterator] = function() {
      return this
    }),
    r;

  function s(r) {
    return function(s) {
      return function(r) {
        if (n)
          throw new TypeError("Generator is already executing.");
        for (; a;)
          try {
            if (n = 1,
              i && (o = 2 & r[0] ? i.return : r[0] ? i.throw || ((o = i.return) && o.call(i),
                0) : i.next) && !(o = o.call(i, r[1])).done)
              return o;
            switch (i = 0,
              o && (r = [2 & r[0], o.value]),
              r[0]) {
              case 0:
              case 1:
                o = r;
                break;
              case 4:
                return a.label++, {
                  value: r[1],
                  done: !1
                };
              case 5:
                a.label++,
                  i = r[1],
                  r = [0];
                continue;
              case 7:
                r = a.ops.pop(),
                  a.trys.pop();
                continue;
              default:
                if (!(o = a.trys,
                    (o = o.length > 0 && o[o.length - 1]) || 6 !== r[0] && 2 !== r[0])) {
                  a = 0;
                  continue
                }
                if (3 === r[0] && (!o || r[1] > o[0] && r[1] < o[3])) {
                  a.label = r[1];
                  break
                }
                if (6 === r[0] && a.label < o[1]) {
                  a.label = o[1],
                    o = r;
                  break
                }
                if (o && a.label < o[2]) {
                  a.label = o[2],
                    a.ops.push(r);
                  break
                }
                o[2] && a.ops.pop(),
                  a.trys.pop();
                continue
            }
            r = t.call(e, a)
          } catch (e) {
            r = [6, e],
              i = 0
          } finally {
            n = o = 0
          }
        if (5 & r[0])
          throw r[1];
        return {
          value: r[0] ? r[1] : void 0,
          done: !0
        }
      }([r, s])
    }
  }
};
 
 // required for D
function R(e) {
  return h(this, void 0, void 0, (function() {
    var t, n, i;
    return f(this, (function(o) {
      switch (o.label) {
        case 0:
          return t = e + "config/contract.cse2j",
            [4, fetch(t)];
        case 1:
          n = o.sent(),
            o.label = 2;
        case 2:
          return o.trys.push([2, 5, , 6]),
            n.ok ? [4, n.json()] : [3, 4];
        case 3:
          return i = o.sent(),
            E.log("Contract file loaded successfully."),
            [2, i];
        case 4:
          return [2, Promise.reject(new Error("Contract file not found at " + t + "."))];
        case 5:
          return o.sent(),
            [2, Promise.reject(new Error("Contract file contains invalid JSON."))];
        case 6:
          return [2]
      }
    }))
  }))
} 
 
 // what ever this is...
 // should be ob for contract, some sig registr and MAINLY some func  mapState   and mapEvent
 // ...use like new D()
 var D = function() {
   function e() {}
   return e.getInstance = function() {
       return this.instance || (this.instance = new e),
         this.instance
     },
     e.prototype.loadContractFile = function() {
       var e = this;
       this.setContractFile().catch((function(t) {
         console.warn(t.message, "Using empty contract file."),
           e.contract = {
             signals: {
               events: {},
               states: {}
             }
           }
       })).finally((function() {
         e.initialized = !0
       }))
     },
     e.prototype.setContractFile = function() {
       return S(this, void 0, void 0, (function() {
         var t;
         return O(this, (function(n) {
           switch (n.label) {
             case 0:
               return t = this,
                 [4, R(e.basePath)];
             case 1:
               return t.contract = n.sent(),
                 [2]
           }
         }))
       }))
     },
     e.prototype.mapEvent = function(e, t) {
       var n, i;
       if (!this.initialized)
         throw new Error("Contract file not loaded!");
       var o = e === A.REPEAT_DIGITAL ? A.BOOLEAN : e,
         r = (null === (n = g[o]) || void 0 === n ? void 0 : n[t]) || (null === (i = this.contract.signals.events[o]) || void 0 === i ? void 0 : i[t]);
       if (!r) {
         var a = parseInt(t, 10);
         return isNaN(a) || a < 0 ? (E.debug("Event " + t + " not found in the contract file!"),
           null) : {
           joinId: a,
           smartObjectId: 0
         }
       }
       return r
     },
     e.prototype.mapState = function(e, t, n) {
       var i, o, r, a;
       if (void 0 === t && (t = 0),
         !this.initialized)
         throw new Error("Contract file not loaded!");
       var s = (null === (o = null === (i = v[e]) || void 0 === i ? void 0 : i[t]) || void 0 === o ? void 0 : o[n]) || (null === (a = null === (r = this.contract.signals.states[e]) || void 0 === r ? void 0 : r[t]) || void 0 === a ? void 0 : a[n]);
       return s || "fb" + n
     },
     e
 }(); 

var ce = {
  host: location.hostname,
  ipId: "0x03",
  port: 49200,
  roomId: "",
  tokenUrl: location.origin + "/cws/websocket/getWebSocketToken",
  tokenSource: "CSSelf",
  authToken: ""
}
var Ee = function() {
  function e() {
    this.setParameters()
  }
  return e.prototype.setParameters = function(e) {
      this._url = null == e ? void 0 : e.url,
        this._ipId = function(e) {
          var t = e; -
          1 === t.indexOf("0x") && (t = "0x" + t);
          var n = parseInt(t, 16);
          if (isNaN(n))
            throw new Error(e + " is not a valid number!");
          return n
        }((null == e ? void 0 : e.ipId) || ce.ipId),
        this._roomId = (null == e ? void 0 : e.roomId) || ce.roomId,
        this._tokenSource = (null == e ? void 0 : e.tokenSource) || ce.tokenSource,
        this._tokenUrl = (null == e ? void 0 : e.tokenUrl) || ce.tokenUrl,
        this._authToken = (null == e ? void 0 : e.authToken) || ce.authToken
    },
    e.getInstance = function() {
      return void 0 === e._instance && (e._instance = new e),
        e._instance
    },
    Object.defineProperty(e.prototype, "url", {
      get: function() {
        var e;
        return null === (e = this._url) || void 0 === e ? void 0 : e.toString()
      },
      enumerable: !1,
      configurable: !0
    }),
    Object.defineProperty(e.prototype, "ipId", {
      get: function() {
        return this._ipId
      },
      enumerable: !1,
      configurable: !0
    }),
    Object.defineProperty(e.prototype, "roomId", {
      get: function() {
        return this._roomId
      },
      enumerable: !1,
      configurable: !0
    }),
    Object.defineProperty(e.prototype, "jwt", {
      get: function() {
        return this._jwt
      },
      set: function(e) {
        this._jwt = e
      },
      enumerable: !1,
      configurable: !0
    }),
    Object.defineProperty(e.prototype, "tokenSource", {
      get: function() {
        return this._tokenSource
      },
      enumerable: !1,
      configurable: !0
    }),
    Object.defineProperty(e.prototype, "tokenUrl", {
      get: function() {
        return this._tokenUrl
      },
      enumerable: !1,
      configurable: !0
    }),
    Object.defineProperty(e.prototype, "secureToken", {
      get: function() {
        return this._authToken
      },
      enumerable: !1,
      configurable: !0
    }),
    e
}().getInstance(); 

// ...omg
 var be = function() {
   try {
      // Oe seems to be mega hevy instanter setter ...for now neglecting his importing..
       console.log("curently not iplmemented for INITIALIZE_WS");
     //ve = new Oe(Ee.url)
     
   } catch (e) {
     console.log(e, "Could not initialize WebSocket!")
   }
 };


// when incoming msg from main thread 
// eg wehen CrComLib.publishEvent("b","500",true)
// originaly  named  De.onmessage
function AsiOnmessage(e)
{
        var t = e.data;
        switch (t.type) {
        case i.SET_BASE_PATH:
            var n = t.payload;
            D.basePath = n.value,
            D.getInstance().loadContractFile();
            break;
        case i.INITIALIZE_WS:
            var o = t.payload;
            Ee.setParameters(ge(ge({}, o), {
                url: new URL(o.url)
            })),
            be();
            s
            break;
        case i.CONNECT_WS:
            // ve.connect();
            console.log("not implemented ... i.CONNECT_WS desire to con ws.");
            break;
        case i.DISCONNECT_WS:
            var r = t.payload.value;
           // ve.disconnect(r);
            console.log("not implemented ... i.DISCONNECT_WS desire to con ws.");
            break;
        case i.SET_JWT:
            r = t.payload.value;
            Ee.jwt = r;
            break;
        case i.AUTHENTICATE:
         console.log("not implemented ... i.AUTHENTICATE desire to con ws.");
           // ve.authenticate();
            break;
        case i.LOGGER_EVENT:
         console.log("not implemented ... i.LOGGER_EVENT desire to con ws.");
            /*
            var a = t.payload
              , s = a.enabled
              , c = a.logLevel;
            s ? E.enableDebugging() : E.disableDebugging(),
            E.setLogLevel(c);
             */
            break;
        case i.BRIDGE_SEND_BOOLEAN_TO_NATIVE:
            if(t.payload.smartObjectId)
            {
               sendEventToNative({
                eventType: A.BOOLEAN,
                eventName: t.payload.signalName,
                value: t.payload.value,
                smartObjectId: t.payload.smartObjectId 
             });
            }
            else
            {
               sendEventToNative({
                eventType: A.BOOLEAN,
                eventName: t.payload.signalName,
                value: t.payload.value
             });
            }
           // console.debug("[WORKER] " + i.BRIDGE_SEND_BOOLEAN_TO_NATIVE, t.payload);
            break;
        case i.BRIDGE_SEND_INTEGER_TO_NATIVE:
         if(t.payload.smartObjectId)
         {
            sendEventToNative({
                eventType: A.NUMERIC,
                eventName: t.payload.signalName,
                value: t.payload.value,
                smartObjectId: t.payload.smartObjectId 
            });         
         }
         else
         {
            sendEventToNative({
                eventType: A.NUMERIC,
                eventName: t.payload.signalName,
                value: t.payload.value
            });
         }
            //E.debug("[WORKER] " + i.BRIDGE_SEND_INTEGER_TO_NATIVE, t.payload);
            break;
        case i.BRIDGE_SEND_STRING_TO_NATIVE:
        if(t.payload.smartObjectId)
        {
            sendEventToNative({
                eventType: A.STRING,
                eventName: t.payload.signalName,
                value: t.payload.value,
                smartObjectId: t.payload.smartObjectId 
            });        
        }
        else
        {
            sendEventToNative({
                eventType: A.STRING,
                eventName: t.payload.signalName,
                value: t.payload.value
            });
         }
          //  E.debug("[WORKER] " + i.BRIDGE_SEND_STRING_TO_NATIVE, t.payload);
            break;
        case i.BRIDGE_SEND_OBJECT_TO_NATIVE:
            console.debug("[WORKER] " + i.BRIDGE_SEND_OBJECT_TO_NATIVE, t.payload);
            if(!t.payload.smartObjectId)
            {
            var u = function(e) {
                try {
                    return JSON.parse(e)
                } catch (e) {
                    E.error(e)
                }
                return null
            }(t.payload.value);
            u.hasOwnProperty("repeatdigital") && sendEventToNative({
                eventType: A.REPEAT_DIGITAL,
                eventName: t.payload.signalName,
                value: u.repeatdigital
               });  
            }
            else
            {
              console.log("atempting send object ..", t.payload, t);
            }
            break;
            
            // our addition
        case i.SET_PARAM_IPID:
            
            if(Reflect.has(t.payload,"DEBUG"))
               globalThis.DEBUG = t.payload.DEBUG;
               
            if(globalThis.DEBUG)
                  console.log("incoming worker HIS IPID set:", t.payload.IPID);
            this._hisIPID = t.payload.IPID;
            break;
       case i.EVAL:
       
                 var txtToVyval = t.payload.eval;
                 var ybitek = self.eval(txtToVyval);
                 if(globalThis.DEBUG)
                     console.log("worker EVAL task for:%o done...result:%o",this._hisIPID, ybitek);
                 if(ybitek == null)
                     ybitek = "null";
                              
                 var reprOfResults = JSON.stringify(ybitek)
                 t.payload.EVALresults = reprOfResults; t.payload.EVALresults = reprOfResults;
                 postMessage(t);
                 
       
            break;
             
        default:
            console.log("Received " + t.type + " from main thread with payload: " + t.payload)
        }
}

function aboutPublish()
{
// example of incoming data msg from main thread
 //when CrComLib.publishEvent("b","500",true) then >>
var t ={
    "type": "BRIDGE_SEND_BOOLEAN_TO_NATIVE",
    "payload": {
        "value": true,
        "signalName": "500"
    }
};

sendEventToNative({
                eventType: A.BOOLEAN,
                eventName: "33",
                value: true
            })

}


function startCh5BufferProcessing() {
   if(this.ch5EventsBuffer == undefined || this.ch5EventsBuffer == null)   
      this.ch5EventsBuffer = new Se();
      
  for (this.ch5EventsBuffer.startProcessing(); !this.ch5EventsBuffer.isEmpty();) {
    var e = this.ch5EventsBuffer.pop(),
      t = b.mapEvent(e.eventType, e.eventName);
      
    if(e.smartObjectId)t.smartObjectId = e.smartObjectId;
    
    sendJoinEvent(e.eventType, t, e.value)
  }
}

//for sending from   CrComLib.publishEvent
// called by ve.sendEventToNative
function sendEventToNative(e)
{

   if(this.ch5EventsBuffer == undefined || this.ch5EventsBuffer == null)   
      this.ch5EventsBuffer = new Se();

            if (b.initialized)
                if (this.ch5EventsBuffer.isEmpty()) {
                    var t = b.mapEvent(e.eventType, e.eventName);
                   
                   if(e.smartObjectId)t.smartObjectId = e.smartObjectId;
                   
                    sendJoinEvent(e.eventType, t, e.value)
                } else
                    this.ch5EventsBuffer.push(e),
                    this.ch5EventsBuffer.isProcessing || this.startCh5BufferProcessing();
            else
                this.ch5EventsBuffer.push(e)
}


// function of cipclient ...for sendingg event ??
// sendUpdateBoolean(true,80,0);		// the last num is smartob which is always 0
// sendUpdateNumber(3666,80,0);
function sendJoinEvent(e, t, n) {
  if (t) {
    var i = t.joinId - 1;
    switch (e) {
      case A.BOOLEAN:
        this.sendUpdateBoolean(n, i, t.smartObjectId);
        break;
      case A.NUMERIC:
        this.sendUpdateNumber(n, i, t.smartObjectId);
        break;
      case A.STRING:
        this.sendUpdateString(n, i, t.smartObjectId);
        break;
      case A.REPEAT_DIGITAL:
        this.sendUpdateBoolean(n, i, t.smartObjectId, !0);
        break;
      default:
      console.log("undefined sendJoinEvent case ",e);
      break;
    }
  }
}

// sendimg smart like 
//var boha = b.mapEvent(A.BOOLEAN,4019)
//boha.smartObjectId = 107;
//sendJoinEvent(A.BOOLEAN,boha,true)




var reconectAtempts = 6;
function prepareReconect()
{
      if(--reconectAtempts < 0)
      {
        console.log("reconnect atempts delepted !! for:%o, id:%o ",globalThis._hisIPhost, globalThis._hisIPID);
        return; 
      }
      
   setTimeout((something) => {
      console.log("AUTOreconnecting  for:%o, id:%o ",globalThis._hisIPhost, globalThis._hisIPID);

       StartWScon(globalThis._hisIPhost, globalThis._hisIPID, globalThis.JWTurl);
      
   }, 55000, Date.now());
}




globalThis.InterValJWTid = 0;
globalThis._jwtDecounter = 1;
function IntrvaalNatamTom()
{
var uniqueTimePart = ((Math.random() * (80000) + 1000).toFixed() - 0) + 600000;

  globalThis.InterValJWTid = setInterval((hu)=>{ 
  
 // console.log("hhuhu",hu); 
  globalThis._jwtDecounter--;
  if((globalThis.ReachedState & 1) != 1)
  {
     ReportReachedState();
  }
  
  if(globalThis._jwtDecounter < 1)
  {
     globalThis._jwtDecounter = 5;
     preobtainJWTshit();
  }
  
  },uniqueTimePart);
}
IntrvaalNatamTom();

function ReportReachedState()
{
            T({
                 type: i.REACHED,
                 payload: {
                   value: globalThis.ReachedState 
                 }
            });
}

function MementoHolder()
{

// pretty much just saved code used for testing our cipbridge

// wfl cipBridgeHavocSend:\x0d\x00\x02\x00\x00


var cipws = new WebSocket("ws://192.168.166.166:54123/cip")
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
  console.log("toto", toto);
  if (toto.data["arrayBuffer"] == undefined || null) {
    console.log("pure txt rec?", toto.data);
  } else {
    toto.data.arrayBuffer().then(pp => {

      var txtrecivved = uUu(new Uint8Array(pp));
      txtrecivved = txtrecivved.trim();
      console.log("recived:", txtrecivved);
      
      if (txtrecivved == "0f 00 01 02") {
        var logginPack = new Uint8Array([0x01, 0x00, 0x0B, 0x00, 0x00, 0x00, 0x00, 0x00, 0x27, 0x40, 0xFF, 0xFF, 0xF1, 0x01]);
        cipws.send(logginPack);
        console.log("logginPack sended..");
        // maybe imediately force send credential packed withou waiting for query of it..
        var credentialsPack =  new Uint8Array([0x0B, 0x00, 0x13, 0x00, 0x27, 0x63, 0x72, 0x65, 0x73, 0x74, 0x72, 0x6F, 0x6E, 0x3A, 0x63, 0x72, 0x65, 0x73, 0x74, 0x72, 0x6F, 0x6E]);
        // that is .. ipid 0x27 withh crestron:crestron
       cipws.send(credentialsPack);
      }
      else if (txtrecivved == "02 00 04 00 00 40 1f") {
         // requestingg credentials ?? ...acording to reecent DUMPS of comunication.
         // it does require credeentials when connecting to some capp ipid.. 
         var credentialsPack =  new Uint8Array([0x0B, 0x00, 0x13, 0x00, 0x27, 0x63, 0x72, 0x65, 0x73, 0x74, 0x72, 0x6F, 0x6E, 0x3A, 0x63, 0x72, 0x65, 0x73, 0x74, 0x72, 0x6F, 0x6E]);
        cipws.send(credentialsPack);
        //  if ok.. it should be folowed by answar of  0C-00-03-00-27-01
      }
      else if(txtrecivved == "0c 00 03 00 27 01")
      {
            console.log("they accepted as as anoying bothering socket...")
      }    
      else if (txtrecivved == "0d 00 02 00 00") {
        // var t = Ne(14, new Uint8Array(), 0);
        var rspns = new Uint8Array([14, 0, 2, 0, 0]);
        cipws.send(rspns);
      } else if (txtrecivved == "0e 00 02 00 00") {
        //  var rspns = new Uint8Array([13,0,2,0,0]);
        //  nakedWss.send(rspns);
        console.log("incomingg heartbiit 0e ??");
      } else {
        console.log("recived:", txtrecivved);

      }
    });
  }
}                            
                              
 var rspns = new Uint8Array([14,0,2,0,0]);
 var hey = new Uint8Array([13,0,2,0,0]);
//ipid 04
// new Uint8Array([0x01, 0x00, 0x0B, 0x00, 0x00, 0x00, 0x00, 0x00, 0x04, 0x40, 0xFF, 0xFF, 0xF1, 0x01]);
//ipid 60
// new Uint8Array([0x01, 0x00, 0x0B, 0x00, 0x00, 0x00, 0x00, 0x00, 0x60, 0x40, 0xFF, 0xFF, 0xF1, 0x01]);
// update request
cipws.send(new Uint8Array([0x05, 0x00, 0x05, 0x00, 0x00, 0x02, 0x03, 0x00]))
//cipws.send(hey)


}

