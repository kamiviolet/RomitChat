function TanglesDRAG_Atacher(demendToDrugemake,optionalTRUtoDetach)
{
    var sybodiv = demendToDrugemake;
   if(sybodiv == null)return;
   if(optionalTRUtoDetach)
   {
      sybodiv.ondragstart = null;
      sybodiv.ondragend = null;
      sybodiv.classList.toggle("TanglesShowaales",false);
      sybodiv.draggable = false;   
      return;
   }
   sybodiv.draggable = true;
   sybodiv.classList.toggle("TanglesShowaales",true);
   sybodiv.ondragstart=function(e)
   {
      TanglesDRAG_Handler(e); 
        // TanglesDRAG_Handler_V2(e);  // by translating
   };
   
   sybodiv.ondragend=function(e)
   {
      TanglesDRAG_Handler(e);
      // TanglesDRAG_Handler_V2(e);
   };
      
   //sybodiv.style.position = "absolute"; // or..fixed

} 


//document["vatangelXY"] = {x:0, y:0};
var UkundusVaagus ={

    LastActionWAS : "DragMemUkundusMEM",
    DragMemUkundusMEM : {}, 
    DeletusMemUkundusMEM : {},
   
   };
   
// by ABSolut repositioning   
function TanglesDRAG_Handler(e)
{
      var cohandl = e.type;
      
      if(cohandl == "dragstart")
      {
     //   CO_SOMEisDRAGING = true;
     //   CO_SOMEisDRAGINGWAS = true;
     //   CO_LASTIMEDRAGED = Date.now(); // eg like 1655420374589
        //console.log(e);
        e.target.mouseStartX = e.screenX;
        e.target.mouseStartY = e.screenY;
        //e.originalTarget.mouseStartX = e.screenX;
      //  e.originalTarget.mouseStartY = e.screenY;
        //if(e.originalTarget.tagName == "TEXTAREA" || e.originalTarget.tagName == "INPUT")        
            // e.preventDefault();
        //DeselResetVymel();
        

      }   
      else if(cohandl == "dragend")
      {
      
        // CO_SOMEisDRAGING = false;
         //CO_SOMEisDRAGING = true;
       //  CO_SOMEisDRAGINGWAS = true;
       //  CO_LASTIMEDRAGED = Date.now(); // eg like 1655420374589
         var parentdement = (e.srcElement.offsetParent ? e.srcElement.offsetParent : e.srcElement.parentElement);
         var srdement = (e.srcElement ? e.srcElement : e.originalTarget);

         var difrX = e.screenX - srdement.mouseStartX;
         var difrY = e.screenY - srdement.mouseStartY;
         
         if(srdement.classList.contains("drawedTangles"))
                parentdement = srdement;
        
         if(parentdement.tagName == "BODY")         
               parentdement = srdement;                    
         
         var targetPozYY = parentdement.offsetTop + (difrY); 
         var targetPozXX = parentdement.offsetLeft + (difrX); 
         targetPozXX = targetPozXX < 0 ? 0 : targetPozXX;   
         targetPozYY = targetPozYY < 0 ? 0 : targetPozYY;
         
         if(lastObtainedLowLifeTopPoz < 0)lastObtainedLowLifeTopPoz =FoundMostBottomestDement();
         
         var mostBotomestPOZyy = (visualViewport.height - parentdement.clientHeight) + 200;
         var mostLefttestPOZxx = (visualViewport.width - parentdement.clientWidth) + 200;
         
         if(lastObtainedLowLifeTopPoz > visualViewport.height)
             mostBotomestPOZyy = (lastObtainedLowLifeTopPoz - parentdement.clientHeight) + 200;
         
         // ..+200 tolerated behin screen..
         if(GL_DragPlacingGRIDparams.USEgridSnapIluzion)
         {
            if(targetPozXX > GL_DragPlacingGRIDparams.Xsqr && !GL_DragPlacingGRIDparams.OSA_X.includes(targetPozXX))
            {
               var dlestepu = 3 + GL_DragPlacingGRIDparams.Xsqr;
               while (--dlestepu > 1) {
                   targetPozXX--;
                  if(GL_DragPlacingGRIDparams.OSA_X.includes(targetPozXX))
                  break;
               }
            }
            else if(targetPozXX < GL_DragPlacingGRIDparams.Xsqr)
               targetPozXX = 0;  
         
            if(targetPozYY > GL_DragPlacingGRIDparams.Ysqr && !GL_DragPlacingGRIDparams.OSA_Y.includes(targetPozYY))
            {
               var dlestepu = 3 + GL_DragPlacingGRIDparams.Ysqr;
               while (--dlestepu > 1) {
                   targetPozYY--;
                  if(GL_DragPlacingGRIDparams.OSA_Y.includes(targetPozYY))
                  break;
               }
            }
            else if(targetPozYY < GL_DragPlacingGRIDparams.Ysqr)
               targetPozYY = 0;  
            
            // console.log("gridsnaped to target pozs... X:%o  Y:%o ",targetPozXX,targetPozYY)                      
         }
           
         targetPozXX = targetPozXX > mostLefttestPOZxx ? mostLefttestPOZxx : targetPozXX;  
         targetPozYY = targetPozYY > mostBotomestPOZyy ? mostBotomestPOZyy : targetPozYY;   
         var resuLeft = `${targetPozXX}px`;
         var resuTop = `${targetPozYY}px`;
        
         // for at least one posible undo...
         UkundusVaagus.DragMemUkundusMEM.LastDragedDement = parentdement;
         UkundusVaagus.DragMemUkundusMEM.PrevTOP = ("" + parentdement.style.top); 
         UkundusVaagus.DragMemUkundusMEM.PrevLEFT = ("" + parentdement.style.left);
         UkundusVaagus.LastActionWAS = "DragMemUkundusMEM"; 
                  
         if(!parentdement.style.position)
         {
            parentdement.style.position = "absolute";
         }
         //else if(parentdement.style.position != "fixed")     
           // parentdement.style.position = "absolute";
    // ..so if fixed leave it alone.. if absolute..then set it to absolute inocencly..                 
                  
         parentdement.style.top = resuTop;
         parentdement.style.left = resuLeft;
         parentdement.style.right = "auto";
         
      }
}
var lastObtainedLowLifeTopPoz = -1;
function FoundMostBottomestDement() {
  // since getting the maximum height can be tricky... getting the most top shiftted dement and returns his offsetTop
  var highestdmnt = null;
  document.querySelectorAll("*").forEach(mrk => {
    if (mrk.offsetTop) {
      //console.log("mr", mrk.offsetTop)
      if (highestdmnt == null || highestdmnt.offsetTop < mrk.offsetTop)
        highestdmnt = mrk;
    }
  });
  return (highestdmnt ? highestdmnt.offsetTop : visualViewport.height);
}

// by translating
function TanglesDRAG_Atacher_V2(demendToDrugemake, optionalTRUtoDetach) {
  var sybodiv = demendToDrugemake;
  if (sybodiv == null) return;
  if (optionalTRUtoDetach) {
    sybodiv.ondragstart = null;
    sybodiv.ondragend = null;
    sybodiv.classList.toggle("TanglesShowaales", false);
    sybodiv.draggable = false;
    return;
  }
  sybodiv.draggable = true;
  sybodiv.classList.toggle("TanglesShowaales", true);
  sybodiv.style.transformOrigin = "0% 0% 0px";

  sybodiv.ondragstart = function(e) {
    TanglesDRAG_Handler_V2(e); // by translating
  };

  sybodiv.ondragend = function(e) {
    TanglesDRAG_Handler_V2(e);
  };
}
// by translating
function TanglesDRAG_Handler_V2(e) {
  var cohandl = e.type;

  if (cohandl == "dragstart") {
    //console.log(e);
    e.target.mouseStartX = e.screenX;
    e.target.mouseStartY = e.screenY;
  } else if (cohandl == "dragend") {
    var srdement = (e.srcElement ? e.srcElement : e.originalTarget);

    var difrX = e.screenX - srdement.mouseStartX;
    var difrY = e.screenY - srdement.mouseStartY;
    var XtotoN = srdement.getClientRects()[0].x + difrX;
    var YtotoN = srdement.getClientRects()[0].y + difrY;

    srdement.style.transform = `translate(${XtotoN}px, ${YtotoN}px)`;
  }
}

// for additional wide multi class adaal for feedbuckings dements that are dragable..
// ...also does the hevy work of clensing the mentioned claass fromm everybody who does NOT
// have dragging attr
function MultiShowAalesDraages(optionalCustomCSSClassNam = "TanglesShowaales")
{
/*document.body.querySelectorAll("*[draggable]").forEach(dareba => {
  dareba.classList.toggle("TanglesShowaales",true);  
});
document.body.querySelectorAll("*:not([draggable])").forEach(drba => {
  drba.classList.toggle("TanglesShowaales",false);  
}); */
 // ..or....just
document.body.querySelectorAll("*").forEach(dareba => {
  dareba.classList.toggle("TanglesShowaales",dareba.draggable);  
});
}


// for now just tmemo to posible functionality...
// ..idea is to be able of beter protection of mouse sudden moves during draagin..
// ...this seems to be posible solution...
function aboutMEMpointerCaptureANDpointerLOCK()
{

// functionality of PointerLock  ... only .raw pices off puzle...
// ..eg like >>
/*
onclick = () => {
  canvas.requestPointerLock();
}
document.exitPointerLock = document.exitPointerLock ||
                           document.mozExitPointerLock;
                           
document.exitPointerLock();                           
                           */

// functionality of PointerCapture  ...seems to be less severe than mechanic mentioned above.

var relastylaandhatamala =`
<style>
div {
  width: 140px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fbe;
}
</style>

<div id="slider">SLIDE ME</div>
<script>
 
function beginSliding(e) {
  slider.onpointermove = slide;
  slider.setPointerCapture(e.pointerId);
}

function stopSliding(e) {
  slider.onpointermove = null;
  slider.releasePointerCapture(e.pointerId);
}

function slide(e) {
  slider.style.transform = \`translate(${e.clientX - 70}px)\`;
}

const slider = document.getElementById('slider');

slider.onpointerdown = beginSliding;
slider.onpointerup = stopSliding;

</script>
`;

var frgaal = document.createElement("template");
frgaal.innerHTML = relastylaandhatamala; 
var hajzlovakolekce = frgaal.content.children;
Array.prototype.forEach.call(hajzlovakolekce, (bee) => {

if(bee.tagName == "SCRIPT")
{
   try
   {
      window.eval(bee.innerHTML);
   }
   catch
   {
   }
}
  document.body.append(bee.cloneNode(true));
  console.log(bee.tagName);
});

}


// btw...WHen need HARD copy of arr... (since they admitet usual funces creates 'SHALOW' copy)  u may use
// ..function ARRhardCopyBYjasan(someARRlikeToCopy)
// ..func moved to expziver.js ...   
//globalThis.ArDeepCP = ARRhardCopyBYjasan;


// #########################   ABOUT snap to grid pseudodefekt...

function isOdd(thatNumbero = 0)
{
   // liiiichyyyy
 var hudro = thatNumbero % 2;
 return (hudro > 0.9);     // some remanent is...nod sudyy..
}
function isEven(thatNumbero = 0)
{
   // suuudyyyyy 
   var hudro = thatNumbero % 2;
   return (hudro < 0.7);     // pointles size of remanent .. considered as NONE ..is... sudyy..(not lichy)
}


GL_DragPlacingGRIDparams = { 
   
   USEgridSnapIluzion: false,

   Xsqr: 32, 
   Ysqr: 32,
   
   OSA_X: [],
   OSA_Y: [], 
 
  PrepareCachedGridLids(XSize,YSize) {
           
    //  this.USEgridSnapIluzion = !(this.USEgridSnapIluzion);
    //  console.log("jeto",this.USEgridSnapIluzion,rangegen);
      if(!this.USEgridSnapIluzion)
         return false;
        
         // for now ...counting wiht hevy rezerves...
      var pseudomaxHeigh = globalThis.window.visualViewport.height * 2;
      var pseudomaxWidth = globalThis.window.visualViewport.width * 2;
      
      if(!XSize)
         XSize = this.Xsqr;
      if(!YSize)
         YSize = this.Ysqr;
      
      this.Xsqr = (XSize > 0 ? XSize : 2);  
      this.Ysqr = (YSize > 0 ? YSize : 2);
            
      // in expenziver is fance arrow range funcgen from mozilas...
      this.OSA_X = rangegen(0,pseudomaxWidth,XSize);
      
      if(XSize != YSize)
      {
         // there are diferens ...so each will have to gener theyr own...
         this.OSA_Y = rangegen(0,pseudomaxHeigh,YSize);
      }
      else
      {
         // since same X and Y .. make shallow copy.. to hopefuly... save little bit.....(hevyli doubt about so..)
         this.OSA_Y = Array.from(this.OSA_X);                     
      }
      
      this.USEgridSnapIluzion = true;
      
      return this.USEgridSnapIluzion;  
  }
     
};


function GivmeClosestPOZtoGrid()
{

   //GL_DragPlacingGRIDparams.Xsqr
   


}

   
   
  
   