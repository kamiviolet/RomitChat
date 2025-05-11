let playBtn = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path d="M8.0175 19.3984C8.36906 19.3984 8.67375 19.2891 9.07219 19.0547L18.3769 13.6641C19.0722 13.2578 19.3925 12.9141 19.3925 12.3672C19.3925 11.8203 19.0722 11.4766 18.3769 11.0703L9.07219 5.67969C8.67375 5.45312 8.36906 5.33594 8.0175 5.33594C7.33 5.33594 6.80656 5.85938 6.80656 6.71875V18.0234C6.80656 18.875 7.33 19.3984 8.0175 19.3984Z" />
</svg>`

let pauseBtn = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path d="M8.19719 18.9688H10.08C10.8691 18.9688 11.2675 18.5625 11.2675 17.7812V6.94531C11.2675 6.14844 10.8691 5.77344 10.08 5.75781H8.19719C7.40812 5.75781 7.00969 6.15625 7.00969 6.94531V17.7812C7.00187 18.5625 7.40031 18.9688 8.19719 18.9688ZM14.33 18.9688H16.2128C16.9941 18.9688 17.4003 18.5625 17.4003 17.7812V6.94531C17.4003 6.14844 16.9941 5.75781 16.2128 5.75781H14.33C13.5409 5.75781 13.1425 6.15625 13.1425 6.94531V17.7812C13.1425 18.5625 13.5331 18.9688 14.33 18.9688Z" />
</svg>
`;

let backBtn = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M205 34.8c11.5 5.1 19 16.6 19 29.2v64H336c97.2 0 176 78.8 176 176c0 113.3-81.5 163.9-100.2 174.1c-2.5 1.4-5.3 1.9-8.1 1.9c-10.9 0-19.7-8.9-19.7-19.7c0-7.5 4.3-14.4 9.8-19.5c9.4-8.8 22.2-26.4 22.2-56.7c0-53-43-96-96-96H224v64c0 12.6-7.4 24.1-19 29.2s-25 3-34.4-5.4l-160-144C3.9 225.7 0 217.1 0 208s3.9-17.7 10.6-23.8l160-144c9.4-8.5 22.9-10.6 34.4-5.4z"/></svg>`;

let homeBtn = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M575.8 255.5c0 18-15 32.1-32 32.1l-32 0 .7 160.2c0 2.7-.2 5.4-.5 8.1l0 16.2c0 22.1-17.9 40-40 40l-16 0c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1L416 512l-24 0c-22.1 0-40-17.9-40-40l0-24 0-64c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32 14.3-32 32l0 64 0 24c0 22.1-17.9 40-40 40l-24 0-31.9 0c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2l-16 0c-22.1 0-40-17.9-40-40l0-112c0-.9 0-1.9 .1-2.8l0-69.7-32 0c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/></svg>`;

let heartBtn = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/></svg>
`;

function createPlayerModal() {
  let modalContainer = document.createElement("div");
  modalContainer.setAttribute("id", "audio_player_modal");
  modalContainer.classList.add("modal");
  modalContainer.classList.add("audio_modal");

  let closeBtn = `
    <div class="close_btn">
      <button onclick="toggleMediaPlayerW(this);">X</button>
    </div>`
  modalContainer.insertAdjacentHTML("afterbegin", closeBtn);

  let wrapper = createPlayerModalInner();
  modalContainer.append(wrapper);

  if(globalThis.TanglesDRAG_Atacher)
    globalThis.TanglesDRAG_Atacher(modalContainer);

  return modalContainer;
}

function createPlayerModalInner() {
  let wrapper = document.createElement("div");
  wrapper.classList.add('modal_inner');


  var staate = document.createElement('div');
  staate.classList.add('audio_state');
  staate.id="al-state";
  staate.textContent = "N/A";

  let dropdownWrapper = makeDropdowns();

  let cover = document.createElement('img');
  cover.src = "/cip-ddum/images/album_cover_placeholder.webp"
  cover.classList.add('album_cover');
  cover.id="al-bamba";
  

  let description = document.createElement('div');
  description.classList.add('audio_description');
  description.id="al-descr";

  let p = document.createElement('p');
  p.textContent = "Waiting for music...";
  description.append(p);
  

  let controlPanel = document.createElement('div');
  controlPanel.classList.add('audio_control');
  controlPanel.innerHTML += playBtn;
  controlPanel.innerHTML += pauseBtn;
  
    // hopefully play
  controlPanel.children[0].onclick=function(whuwhu){ CrpcObtainSequentialy(globalThis.MediaPlayerSelected, ["play+1","textlines+1", "streamstate+1"],1600); };
  // hopefuly pause
  controlPanel.children[1].onclick=function(whuwhu){ CrpcObtainSequentialy(globalThis.MediaPlayerSelected, ["pause+1","textlines+1", "streamstate+1"],1000); };


  let playlistWrapper = makePlaylist();

  wrapper.append(cover, dropdownWrapper, description, staate, controlPanel, playlistWrapper);

  return wrapper;
}
function makeDropdowns() {
  let wrapper = document.createElement('div');
  wrapper.classList.add('dropdown_wrapper');

  let firstList = [...Array(8).keys()].map(i => `zone ${i+1}`);
  let firstDropdown = makeSingleDropdown(firstList);
  firstDropdown.id = "zones";
  firstDropdown.value = "";
 // firstDropdown.onchange = function(eve){ OnDropDownChange(eve); };
  //firstDropdown.onclick = function(eve){ OnDropDownClick(eve); };
  // seems onclick is not fired on mobile devices. !!!
 // firstDropdown.onpointerdown = function(eve){ OnDropDownClick(eve); };

  let secondList = [...Array(18).keys()].map(i => `source ${i+1}`);
  let secondDropdown = makeSingleDropdown(secondList);
  secondDropdown.id="sources";
  secondDropdown.value = "";
 // secondDropdown.onchange = function(eve){ OnDropDownChange(eve); };
 // secondDropdown.onclick = function(eve){ OnDropDownClick(eve); };
//  secondDropdown.onpointerdown = function(eve){ OnDropDownClick(eve); };
// ..realaying on opptions clickeds..

  wrapper.append(firstDropdown, secondDropdown);
  
  firstDropdown.onclick=function(eve){ OnDropDownClick(eve); };
  secondDropdown.onclick=function(eve){ OnDropDownClick(eve); };

  return wrapper;
}
var hardnames = {
   "source 1":"src 1 TOS",
   "source 2":"src 2 TOS",
   "source 3":"src 3 SPDIF",
   "source 4":"src 4 SPDIF",
   "source 5":"src 5 RCA",
   "source 6":"src 6 RCA",
   "source 7":"src 7 RCA",   
   "source 8":"src 8 RCA",  
   "source 9":"Media Player 1",                               
   "source 10":"Media Player 2",                              
   "source 11":"Media Player 3",                                 
   "source 12":"Media Player 4",                                 
   "source 13":"Media Player 5",                                 
   "source 14":"Media Player 6",                                 
   "source 15":"Media Player 7",                                 
   "source 16":"Media Player 8",
   "source 17":"Aes67",
   "source 18":"OFF"                                                              
};                                  
function makeSingleDropdown(items) {
  let dropdown = document.createElement('select');
  for (item of items) {
   let itemEl = document.createElement('option');
   itemEl.innerHTML = hardnames[item] ? hardnames[item] : item;
   itemEl.value=item;
   itemEl.id=item.replaceAll(" ","_");
  // itemEl.onpointerdown = function(event){ OnSingleDrpDwnOptionTouched(event);  };   // ..seems not firing.. 
  // itemEl.onclick = function(event){  OnSingleDrpDwnOptionTouched(event);  }; 
   
   dropdown.append(itemEl);
  }
 
  return dropdown;
}
function makePlaylist() {
  // Playlist
  let playlistWrapper = document.createElement('div');
  playlistWrapper.classList.add('playlist_wrapper');

  var naxVolume = CreeAteDement(`<div id="exvol" style="grid-row: 2/6;grid-column: 1/2;max-width: 100%;height: 100%;padding: 0px;margin: 0px;display: flex;flex-flow: column;align-items: end;">
<input type="range" id="naxExVol" name="naxExVol" min="0" max="65535" step="100" style="margin: 0.0rem; width: 92%;writing-mode: horizontal-tb;display: block;transform: rotate(-0.5turn);" oninput="naxExVolSet(this)" ushortjoin="UShort-14" ipid="0x27,0x26,0x28,0x29,0x30">
</div>`);

  playlistWrapper.append(naxVolume);

  let playlistHead = document.createElement('div');
  playlistHead.innerHTML += backBtn;
  playlistHead.innerHTML += `<p>Local stations</p>`
  playlistHead.classList.add('playlist_head');
  
  playlistHead.children[0].onclick=function(whuwhu){ CrpcGetSome(globalThis.MediaPlayerSelected, "back+1", CrpcObtainInfoAfterSelectingItem);  };

  let playlistTail = document.createElement('div');
  playlistTail.innerHTML += homeBtn;
  playlistTail.innerHTML += heartBtn;
  playlistTail.classList.add('playlist_tail');
  
  playlistTail.children[0].onclick=function(whuwhu){ CrpcObtainSequentialy(globalThis.MediaPlayerSelected, ["backtotop+1","getdata+1","streamstate+1"],1100); };
  playlistTail.children[1].onclick=function(whuwhu){ CrpcObtainSequentialy(globalThis.MediaPlayerSelected, ["favorites+read","textlines+1","streamstate+1"],1000); };

  let playlist = document.createElement('div');
  playlist.classList.add('playlist');

  let playlistInner = document.createElement('ul');
  playlistInner.id = "mediaPlayerList";

  playlist.append(playlistInner);

  playlistWrapper.append(playlistHead, playlist, playlistTail);

  return playlistWrapper;
}


function toggleMediaPlayerW(whoo) {
  var playerModalExists = document.querySelector('#audio_player_modal');
  if (!playerModalExists) {
    playerModalExists = createPlayerModal();
    document.body.append(playerModalExists);
  } 
  else 
  {
    playerModalExists.classList.toggle("hide");
  }
  
  if(playerModalExists.classList.contains("hide"))
  {
   // maybe some clearing..
  }
  else
  {
   // then lets relaoad
  // CrpcGetSome(MediaPlayerSelected,"getdata+1",CrpcFillTheListWithRecivedResults)
     CrpcObtainInfoAfterSelectingItem(null,globalThis.MediaPlayerSelected); 
     
     // ..first check if we are possibly connected..
    //  if(globalThis.WokersRegistry)
         // ...just by local variable 
         if(globalThis.ZoneSelected != "")
         {
            var numericZone= Number.parseInt(globalThis.ZoneSelected);
            var drupZoneDex =numericZone-1;
            var elzones = document.getElementById("zones");
            if(elzones)
               elzones.selectedIndex = drupZoneDex;
               
           readZoneRouteFromWsock(globalThis.ZoneSelected);
           
         }
         
         if(globalThis.MediaPlayerSelected != "")
         {
            var mediaPlajerex = Number.parseInt(globalThis.MediaPlayerSelected);
            // letsay negative number meanss some of the non-mediaplayers sources ..aka anal input ..
            // 0 is NA, -1 = src TOS 1, -2 = TOS 2, and etc...
            if(mediaPlajerex == 0)
            {
                 console.log("...no sourcee for ",globalThis.ZoneSelected );
            }
            else if(mediaPlajerex < 0)
            {
               // some anal source ..
               var nonMediaSrc = Math.abs(mediaPlajerex);
               // TODO ...show SOURCE ...!!
            }
            if(mediaPlajerex > 0)
            {
               var drupSourceDex = 7 + mediaPlajerex;    // eg player 4 + 7 = 11 >> mediaplayer 4 in sources drpdown  
             //  var drupSourceDex =numericSource-1;
               var elsources = document.getElementById("sources");
               if(elsources)
                  elsources.selectedIndex = drupSourceDex;
            } 
         }         
        
     
  }
}

function naxExVolSet(whoo)
{
   //console.log("nax vol moving.. while zone:%o, player:%o",globalThis.ZoneSelected,globalThis.MediaPlayerSelected, whoo);
   // joins 221-228
   var numericZone = Number.parseInt(globalThis.ZoneSelected);
   if(numericZone > 0 && numericZone < 9)
   {
      var targetJoin = 220 + numericZone;
      var targetVal = whoo.value;
      if(targetVal < 500)
         targetVal = 0;
      else if(targetVal > 65400)
         targetVal = 65535;
      whoo.value = targetVal;
      ActivateSig("n", targetJoin, targetVal, "0x26,0x27,0x28,0x29,0x30");   
   }
}
function OnVolumeFromNAXzones(e,data)
{
// "UShort-221"  - 228
 var incominngJoin = Number.parseInt(data.signalName.substring(7));
 var toZoneIndex =incominngJoin - 220;
 if(globalThis.ZoneSelected == toZoneIndex.toString())
 {
    if(data.id)
    {
      // should be abouut id "naxExVol"
      document.querySelectorAll("#" + data.id).forEach(vuul => vuul.value = e);
    }
 } 
}









// ..from which cp will be the http-tcp crpc bridge taken..
var CrpcCP_ip = "192.168.166.54";     // it will be 192.168.166.54  

// which audio src was last time clicked, therefore which media player to resolve
var MediaPlayerSelected = "4";   
var ZoneSelected = "4";
var crpcLastRecivedResults =null;

function JsanPrase(txtToPrasAtempt)
{
   if(!txtToPrasAtempt)return null;
   try
   {
      var maybeSomeResults = JSON.parse(txtToPrasAtempt);
      return maybeSomeResults;
   }
   catch(jeror)
   {
      console.log("JsanPrase failed >> ",jeror);
      return null;
   }
}
// CrpcGetSome("1","getdata+1",CrpcFillTheListWithRecivedResults)
function CrpcGetSome(targPlayer, whatGet, whatToDoWithRespons)
{
// like https://192.168.166.54/cws/flags/CRPC/1/getdata+1
  if (!targPlayer) targPlayer = "1";
  if (!whatGet) whatGet = "getdata+1";
  var targUrl = "https://"+CrpcCP_ip+"/cws/flags/CRPC/"+targPlayer+"/"+whatGet;
 fetch(targUrl).then(obalen =>{
  obalen.text().then(jaseren => {
    //    console.log("j",jaseren)
    //var jsonOb = JsanPrase(jaseren);
    CrpcResolveResponsBag(jaseren, whatToDoWithRespons, targPlayer);    
  });
}); 
}
function CrpcResolveResponsBag(jasnedTXT, whatToDoWithRespons,targPlayer)
{
if(!jasnedTXT)return;   
var jasanedOB = JsanPrase(jasnedTXT);
if(!jasanedOB)return;
//console.log("crpc respons bag:",jasanedOB);
   if(jasanedOB.error != null)
   {
      console.log("response bag reporting ERROR ", jasanedOB.error);
      return;
   }
   if(jasanedOB.result)
   {
     if(whatToDoWithRespons)
     {
      if(typeof whatToDoWithRespons)
      {
        whatToDoWithRespons(jasanedOB,targPlayer);
      }
      else
      {
         console.log("CrpcResolveResponsBag not implemented whatToDoWithRespons of:",whatToDoWithRespons);
      }
     }
   }
}

function CrpcFillTheListWithRecivedResults(jasanedOB,targPlayer)
{
if(!jasanedOB)return;
if(!targPlayer)
{ 
   if(globalThis.MediaPlayerSelected)
      targPlayer = globalThis.MediaPlayerSelected;
   else
      targPlayer = "1";
} 
   if(jasanedOB.error != null)
   {
      console.log("response bag for CrpcFillTheListWithRecivedResults reporting ERROR ", jasanedOB.error);
   }
   if(jasanedOB.result)
   {
   var LystDement = document.getElementById("mediaPlayerList");
   if(!LystDement)return;
   // resolving if inlined style ..
   var posibleLiStyle = "";
   if(LystDement.children.length > 0)
   {
     posibleLiStyle = "" + LystDement.children[0].style.cssText; 
   }
   LystDement.innerHTML = "";
    if(Array.isArray(jasanedOB.result))
    {
      globalThis.crpcLastRecivedResults = jasanedOB;
                    
      for(var kindex = 0; kindex < jasanedOB.result.length; kindex++)
      {
       var Ytem = jasanedOB.result[kindex];
       if(Ytem)
       {
         var listItem = document.createElement('li');
         if(Ytem.L1)
         {
            listItem.textContent = Ytem.L1;
         }
         else
         {
            listItem.textContent = "-UKNOWN NAME-";
         }
         listItem.setAttribute("selindex",1+kindex);
         //listItem.onclick = CrpcListItemClicked(listItem);
         listItem.setAttribute("onclick","CrpcListItemClicked(this);");
         listItem.setAttribute("mediaPlayerIndex", targPlayer);
         var picturePico = "";
         picturePico = (Ytem.URL != "") ? Ytem.URL : (Ytem.URLNAT != "") ? Ytem.URLNAT : "";   
         listItem.setAttribute("url", picturePico);  
         
         // if inlined case of listitems ..
         if(posibleLiStyle != "")
           listItem.style.cssText = posibleLiStyle; 
         
         LystDement.append(listItem);
       }
      }
    }
            
   }
}

function CrpcShowStreamStateFromRecivedResults(jasanedOB,targPlayer)
{
      // processing results of   streamstate+1   and also textlines+1
    if(jasanedOB)
    {
      if(jasanedOB.result)
      {
      // mostly is  jasanedOB.result  streaming  or  idle
         var currentState = jasanedOB.result.StreamState;
         if(currentState)
         {
            var alState = document.getElementById("al-state");
            if(alState)
               alState.innerHTML = currentState;
         }
         var textLajns = jasanedOB.result.TextLines;
         if(textLajns)
         {
            // should be array of 3 .. or 4 ... and it may be [" "," "," "," "]
            // ..if nothing is playing
             var deescrDement = document.querySelector("#al-descr > p");
             if(deescrDement)
             {             
                  var oneLineText = textLajns.join("\n"); 
                  // or just textLajns.toString();
                  deescrDement.innerHTML = oneLineText;
                   // seems even when delimiter is \n .. it rets "" in case nothing is playing...
                  if(oneLineText.trim() == "")   
                  {
                      // ..forgot where i was heading with this..  :(
                  }
             }
         }
                                // response to albumarturl+1
         var posiblePicture = jasanedOB.result.AlbumArtUrl;
         if(posiblePicture)
         {
           posiblePicture = posiblePicture.trim();
            if(posiblePicture != "")
            {
               var elbamba = document.getElementById("al-bamba");
               if(elbamba)
                  elbamba.src = posiblePicture;
            } 
         }
         var posibleStationName = jasanedOB.result.StationName;
         if(posibleStationName != null && posibleStationName!="")
         {
            document.querySelector("#al-descr > p").innerHTML = posibleStationName;
         }
      }
    }  
}
                                                               
function CrpcObtainInfoAfterSelectingItem(jasanedOB,targPlayer)
{
   // we most likely will need little while before the player actualy load the data in the first place
   // then request it from player...
   if(jasanedOB)
   {
      if(jasanedOB.result != "success" || jasanedOB.error != null)
      {
         console.log("some wrong after item selecting...");
      }
   }
      // probbably better to do the fetch here ....!!!  
   // for now ...lets do folowin shameful shitty way.
   
   setTimeout((papok) => {   
         // that command can be always extensive !!!
        CrpcGetSome(targPlayer,"getdata+1",CrpcFillTheListWithRecivedResults);                      
             setTimeout((pakpak) => {
             
                     CrpcGetSome(targPlayer, "textlines+1", CrpcShowStreamStateFromRecivedResults);          
                        setTimeout((tupak) => {
                                                  
                           CrpcGetSome(targPlayer, "streamstate+1", CrpcShowStreamStateFromRecivedResults);
                              setTimeout((obrsupaak) => {
                                   CrpcGetSome(targPlayer, "albumarturl+1", CrpcShowStreamStateFromRecivedResults);
                              },500,targPlayer);
                                                    
                        },1100,targPlayer);
        
            }, 2600,targPlayer);                 
        
   }, 1000,targPlayer);
}
// CrpcObtainInfoAfterSelectingItem(null,MediaPlayerSelected)

function CrpcListItemClicked(thatItem)
{
   var selindex = thatItem.attributes.selindex ?  thatItem.attributes.selindex.value : "";
   var mediaPlayerIndex = thatItem.attributes.mediaPlayerIndex ? thatItem.attributes.mediaPlayerIndex.value : "";
   var itemUrlpicture = thatItem.attributes.url ? thatItem.attributes.url.value : "";
   
   console.log("listitemClicked selindex:%s, playerindex:%s ",selindex, mediaPlayerIndex)
   
   CrpcGetSome(mediaPlayerIndex, "select+"+selindex, CrpcObtainInfoAfterSelectingItem);
   
   setTimeout((recheck) => {
   
      var strikeStaadoDementovo = document.getElementById("al-state");
      if(strikeStaadoDementovo)
      {
         var txtAboutState = strikeStaadoDementovo.innerHTML;
         if(txtAboutState = "" || txtAboutState.includes("idle"))       // ..case insensitive rgx index search>> txtAboutState.search(/idle/i)
         {
             CrpcObtainSequentialy(mediaPlayerIndex,["textlines+1","streamstate+1", "albumarturl+1"], 700);
         }
      }
   }, 8000, mediaPlayerIndex);
   
   if(itemUrlpicture != "")
   {          
      var elbamba = document.getElementById("al-bamba");
      if(elbamba)
         elbamba.src = itemUrlpicture; 
   }
}
function AudioSrcWasSelected(whoo)
{
   var targetPlayer = whoo.attributes.mediaPlayerIndex;
   if(targetPlayer != null)                                                                          
   {
      globalThis.MediaPlayerSelected = targetPlayer.value; 
      
      // if its curently active ..means next click will be declick  as this function is caled BEFORE the join to CP seending one..!!
      if(!whoo.classList.contains("VystuuplyPraslyBut"))
      {
         if(globalThis.audio_player_modal)
         {
            if(!audio_player_modal.classList.contains("hide"))
            {
              //CrpcGetSome(globalThis.MediaPlayerSelected,"getdata+1",CrpcFillTheListWithRecivedResults);
              CrpcObtainInfoAfterSelectingItem(null,globalThis.MediaPlayerSelected);
              // or
              //CrpcObtainSequentialy(globalThis.MediaPlayerSelected,["getdata+1","textlines+1","streamstate+1"], 800); 
            }
         }
      }      
   }
   // dont forget on EvenixAudioZoneAdvaSel(4) 
}

function CrpcObtainSequentialy(targPlayer, arrOfCmds, delayBetween)
{
// like https://192.168.166.54/cws/flags/CRPC/1/getdata+1
  if(!targPlayer) targPlayer = "1";
  if(!arrOfCmds) arrOfCmds = ["getdata+1","textlines+1","streamstate+1","albumarturl+1"];
  if(!delayBetween)delayBetween = 500;
  
  var curentCmd = arrOfCmds.splice(0,1);
  if(curentCmd.length > 0)
  {
   var targUrl = "https://"+CrpcCP_ip+"/cws/flags/CRPC/"+targPlayer+"/"+curentCmd[0];
   fetch(targUrl).then(obalen =>{
     obalen.text().then(jaseren => {
       
       // console.log("sequenti respons:",jaseren);
                    
        if(arrOfCmds.length > 0)
        {
           if(delayBetween > 0)
           {
               setTimeout((polom) => {
                    
                    CrpcObtainSequentialy(targPlayer, arrOfCmds, delayBetween);
                    
               }, delayBetween, arrOfCmds);
           }
           else
             CrpcObtainSequentialy(targPlayer, arrOfCmds, delayBetween);
        }
        
        onSequentiCrapProduce(jaseren, curentCmd[0], targPlayer);
            
       });
   });
  }
}
// CrpcObtainSequentialy(globalThis.MediaPlayerSelected, ["getdata+1","streamstate+1"],1000);
// CrpcObtainSequentialy("3",["textlines+1","streamstate+1", "albumarturl+1"], 400);
// CrpcObtainSequentialy("3",["getdata+1","textlines+1","streamstate+1"], 200)
// CrpcObtainSequentialy("3",["select+1","getdata+1", "textlines+1","streamstate+1"], 200)
// CrpcObtainSequentialy("3",["getdata+1","textlines+1","streamstate+1"], 200)
// CrpcObtainSequentialy("3",["albumarturl+1","playerstate+1","textlines+1","streamstate+1"],10000)
// CrpcObtainSequentialy("3",["favorites+read", "textlines+1", "streamstate+1", "albumarturl+1"], 1000);

function onSequentiCrapProduce(txtCrap, originalCMD, targPlayer)
{
   if(!txtCrap)return;
   var jasanedOB = JsanPrase(txtCrap);
   if(!jasanedOB)return;
   if(!originalCMD)return;
   
   var cleanedCMD =originalCMD.split("+").slice(0,1)[0]; 
   switch(cleanedCMD)
   {
      case "favorites":
      case "getdata":      
      CrpcFillTheListWithRecivedResults(jasanedOB,targPlayer);
      break;
      
      case "stationname":
      case "playerstate":
      case "streamstate":
      case "textlines":
      case "stationname":
      case "albumarturl":      
         CrpcShowStreamStateFromRecivedResults(jasanedOB,targPlayer);      
      break;
            
   
      default:break;
   }   
}





function OnSingleDrpDwnOptionTouched(eve)
{
   //console.log("option activated ..: ",eve,eve.tagName);
   OnDropDownClick(eve);
}

function OnDropDownClick(eve)
{

   // ...Fuck ...it seems on mobile ..the onlick wont shoot at all !!!
   // shoots first when dropdown menu opens carrying the seleect element, 
   // second when option is selected ..carying that option
   var whoo = eve.target ? eve.target : eve.srcElement ? eve.srcElement : eve.originalTarget;
   
  // console.log("veve",eve, whoo.tagName, whoo.value);
   
   // OPTION or SELECT
   if(whoo.tagName == "OPTION") 
   {
      //eve.target = whoo.parentElement; // not writable prop :(((
      OnDropDownChange(eve);
   }
   else if(whoo.tagName == "SELECT")
   {
      // consiering we going from onpointer down.
      if(window.navigator.userAgent.includes("Chrome/"))
       OnDropDownChange(eve);
   }
}

function OnDropDownChange(eve)
{
      // originalTarget target  srcElement
var whoo = eve.target ? eve.target : eve.srcElement ? eve.srcElement : eve.originalTarget;
if(!whoo)return;

if(whoo.tagName == "OPTION")
   whoo = whoo.parentElement;

var chromePointerId = eve.pointerId;  // aviable oly in chrome ??
// ...sems zero when menuu is colepsed..and various +15 numbeer when opened.. 
if(chromePointerId > 0)return;

var whichDropDun = "" + whoo.id;
if(whichDropDun == "")return;

   var currentVal = whoo.value;
       
   if(whichDropDun == "zones")
   {
     if(currentVal != "")
     {
       var zoneNumTXT = currentVal.slice(-1)[0];
       globalThis.ZoneSelected = zoneNumTXT; 
       console.log("dropdown selected Zooone: ", globalThis.ZoneSelected); 

        // ...but definitely read curent source in that selected zone ... the cip has to be connected ...
         // zones joins 231-238
         // if seemingly connected.. 
      if (globalThis.WokersRegistry)     
       readZoneRouteFromWsock(zoneNumTXT);       
     }   
   }
   else if(whichDropDun == "sources")
   {
     if(currentVal != "")
     {
       var sourceNumTXT = currentVal.split(" ").slice(-1)[0];
       var sourceNum = Number.parseInt(sourceNumTXT);
      
       if(sourceNum > 17)
       {
            // 17 is aes67    ,, 18 is considered off 
            // for nax 8 it actualy means some extended reoutting with streeams....
            //  but for now we will take it ass OFF signal ..!!!
            console.log("src dropdown selected OFF, for zone", globalThis.ZoneSelected);
            if(globalThis.ZoneSelected !="")
            {
                  // zones joins 231-238
                 var curzoneNum = Number.parseInt(globalThis.ZoneSelected);
                 if(curzoneNum > 0)
                 {
                    var joinNumForZone = 230 + curzoneNum;
                    ActivateSig("n", joinNumForZone, 0, "0x26,0x27,0x28,0x29,0x30");
                    // we could actualy define some action in sigdyk when this signal fb back to us with zero...
                    // but lets make it more independand on it !!
                 }                
            }
            
            document.getElementById("al-state").innerHTML = "";
            document.querySelector("#al-descr > p").innerHTML = "";
               
            return;     
       }       
       else if(sourceNum > 8)
       {
         // if some of media players.... eg not aes67
         if(sourceNum < 17)
         {
            var medyaPlaierNum = sourceNum - 8;
            globalThis.MediaPlayerSelected = ("" + medyaPlaierNum);
            console.log("dropdown selected medyaplayer: ", globalThis.MediaPlayerSelected);
            
            CrpcObtainSequentialy(globalThis.MediaPlayerSelected, ["getdata+1","textlines+1","streamstate+1", "albumarturl+1"],1100);
         }
         
         if(globalThis.ZoneSelected !="")
         {
              // TODO:  route that to selected zone  ...fuck whatever was there before..
               // zones joins 231-238
              var curzoneNum = Number.parseInt(globalThis.ZoneSelected);
              if(curzoneNum > 0)
              {
                 var joinNumForZone = 230 + curzoneNum;
                 ActivateSig("n", joinNumForZone, sourceNum, "0x26,0x27,0x28,0x29,0x30");
              }                
         }
       }
       else
       {
          console.log("dropdown selected NON player source : ", sourceNum);
          // TODO: route that to selectedd zone anyway ???  to clear the output asiged mess maybe..
         if(globalThis.ZoneSelected !="")
         {
              // TODO:  route that to selected zone     ...fuck whatever was there before..
                             // zones joins 231-238
              var curzoneNum = Number.parseInt(globalThis.ZoneSelected);
              if(curzoneNum > 0)
              {
                 var joinNumForZone = 230 + curzoneNum;
                 ActivateSig("n", joinNumForZone, sourceNum, "0x26,0x27,0x28,0x29,0x30");
              }
         }
       }
     }      
   }
   
}

function readZoneRouteFromWsock(zoneNumTXT) {
  if (!zoneNumTXT) zoneNumTXT = globalThis.ZoneSelected;
  if (zoneNumTXT == "" || zoneNumTXT == "0") return;
  
  // if there is chance we are conectd..
  if (globalThis.WokersRegistry) {
    var zoneNum = Number.parseInt(zoneNumTXT);
    var zoneJoinNum = 230 + zoneNum;
    var zoneJoinVol = 220 + zoneNum;
    // like SigDyk["UShort-231"]
    var sinName = "UShort-" + zoneJoinNum;
    var volsigName = "UShort-" + zoneJoinVol;
    if (SigDyk[volsigName] && globalThis.naxExVol) {
      naxExVol.value = SigDyk[volsigName].value; // naprudko..
    }

    if (SigDyk[sinName]) {
      var routedInputToThatZone = SigDyk[sinName].value;
      if ((typeof routedInputToThatZone) == "number") {
        var suurcesDrupDuw = document.getElementById("sources");

        // because the select list is arr zero based.. while we get value from system 0-16 
        var dropTargIndex = routedInputToThatZone - 1;
        // -1 to select element will server as clearing it
        if(suurcesDrupDuw)
         suurcesDrupDuw.selectedIndex = dropTargIndex;
        if (routedInputToThatZone > 8 && routedInputToThatZone < 17) 
        {
          // ..then load the related player data...
          var targetPlayer = "" + (routedInputToThatZone - 8);

          CrpcObtainSequentialy(targetPlayer, ["getdata+1", "textlines+1", "streamstate+1", "albumarturl+1"], 1000);
        } 
        else 
        {
          document.getElementById("al-state").innerHTML = "";
          document.querySelector("#al-descr > p").innerHTML = "";
          // ..and for now lets keep the picture ...
        }
      }
    }
  }
}









// by post msgs... only entry sketch of it... for now using get requests and predefined jsons in c# part

function CrpcPostSome(targPlayer, megaBloody) {
  if (!targPlayer) targPlayer = "1";
  if (!megaBloody)
    megaBloody = JSON.stringify({
      "method": "MediaPlayer1.GetProperty",
      "id": 6505,
      "jsonrpc": "2.0",
      "params": {
        "propName": "StreamState"
      }
    })

  if (typeof megaBloody != "string")
    megaBloody = JSON.stringify(megaBloody);

  fetch("https://" + CrpcCP_ip + "/cws/flags/CRPC/" + targPlayer + "/streamstate", {
    method: "POST",
    body: megaBloody
  }).then(postn => {
    //console.log("po",postn)a
    postn.text().then(toxen => {
      //  console.log("toxa:", toxen)
      if (toxen) {
        var najeba = JSON.parse(toxen);
        console.log("najeba", najeba)
      }
    });
  });
}




function CrpcEnsureInstanceNames(targPlayer, preimaginedBullshits)
{
   if(!targPlayer)targPlayer = "1";
   var menulike ="MediaPlayerMenu" + targPlayer;
   var playerlike ="MediaPlayer" +targPlayer;
  
  if(preimaginedBullshits.includes("MediaPlayerMenu"))
  {
      if(!preimaginedBullshits.includes(menulike))
      {
         // TODO regex reepatch..
      }
  }
  if(preimaginedBullshits.includes("MediaPlayer"))
  {
      if(!preimaginedBullshits.includes(playerlike))
      {
         // TODO regex reepatch..
      }
  }
  return preimaginedBullshits; 
}

function prepCMDbyName(predefinedCMDname, targPlayer)
{
   if(CRPCcmds[predefinedCMDname])
   {
     var textual = JSON.stringify(CRPCcmds[predefinedCMDname]);
     return CrpcEnsureInstanceNames(targPlayer, textual);
      
   }
}

var CRPCcmds = {
   "StreamState": {"method":"MediaPlayer1.GetProperty","id":6505,"jsonrpc":"2.0","params":{"propName":"StreamState"}},
   "TextLines":  {"method":"MediaPlayer1.GetProperty","id":6499,"jsonrpc":"2.0","params":{"propName":"TextLines"}},
   "GetData": {"method":"MediaPlayerMenu1.GetData","id":6557,"jsonrpc":"2.0","params":{"count":100,"item":1}}

};
// to remember how it looks because soon or later we will have to implement resolving if by chance this came..
// ...as it may come from time to time when socket timeout, disconect or need recconect from what ever reason
// the id in this packet as well as GUID  ..is generated ...shifting dont relly on it !!!
// fastes method to detect this will be doing .includes("connectionslist") on incoming packet ..befor jsonParsing..
var registeringRespons = {
  "jsonrpc": "2.0",
  "result": {
    "ver": "2.0",
    "name": "DM-NAX-8ZSA",
    "uuid": "0829abc9-974f-4e71-a793-866657c6eaa4",
    "connectionslist": [{
      "type": "symbol/json-rpc",
      "ip": "192.168.166.242",
      "subnet": "255.255.255.0",
      "port": 41794,
      "slot": "5.3.1",
      "join": 55
    }, {
      "type": "cip-direct/json-rpc",
      "ip": "192.168.166.242",
      "subnet": "255.255.255.0",
      "port": 50013
    }],
    "maxPacketSize": 1048576,
    "encoding": "UTF-8",
    "format": "JSON"
  },
  "error": null,
  "id": 90002
};

