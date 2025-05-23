const Frontend = new function() {
  this.expandSectionViaButton = function(e) {
    if (e.target.nodeName !== 'button' && e.target.nodeName !== 'BUTTON') return;

    document.querySelector('.expand').classList.remove('expand');
    document.querySelector('.maximise')?.classList.remove('maximise');

    document.querySelectorAll('#responsive_menu > button')?.forEach(btn => btn.disabled = "");
    
    let section = e.target.dataset.link;
    document.getElementById(section)?.classList.add('expand');
    document.querySelector(`button[data-link="${section}"]`).disabled = true;

   // document.getElementById("user_profile")?.classList.toggle("hide",("podium_inner_cam" == section));
   document.getElementById("statusRowInfo")?.classList.toggle("hide",("podium_inner_cam" == section));
  }

  this.setDefaultLayoutForMobile = function() {
    let defaultSectionId = 'podium_inner_text';
    
    let defaultSection = document.getElementById(defaultSectionId);
    let currentExpanded = document.querySelector('.expand');

     let isMaximised = document.querySelector('.maximise');
    
    if (window.innerWidth < 960) {
      if (currentExpanded) return;

      if (isMaximised) {
        defaultSectionId = 'podium_inner_cam';
        defaultSection = document.getElementById(defaultSectionId);
      }

      defaultSection?.classList.add('expand');

      let defaultBtn = document.querySelector(`button[data-link="${defaultSectionId}"]`);
      if (defaultBtn) defaultBtn.disabled = true;

    } else {
      if (!currentExpanded) return;
      
      currentExpanded.classList.remove('expand');

      let currentBtn = document.querySelector(`button[data-link="${currentExpanded.id}"]`);
      if (currentBtn) currentBtn.disabled = "";
    }

    // check if resizee by css media result in hidding the responsive bottom meenu.. 
    // if so ..then make sure the top status div is NOT remained hidden.. as it happens when in videomeeting tab
    if(getComputedStyle(responsive_menu).display == "none")
       document.getElementById("statusRowInfo")?.classList.toggle("hide",false);

  }
}
// little diag around on mobile...
//document.querySelector("#podium_inner_common_table tbody").innerHTML =  "w:" + window.visualViewport.width + " h:" + window.visualViewport.height;
