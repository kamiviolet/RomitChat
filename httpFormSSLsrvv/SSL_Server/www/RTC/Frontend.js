const Frontend = new function() {
  this.expandSectionViaButton = function(e) {
    if (e.target.nodeName !== 'button' && e.target.nodeName !== 'BUTTON') return;

    document.querySelector('.expand').classList.remove('expand');

    document.querySelectorAll('#responsive_menu > button')?.forEach(btn => btn.disabled = "");
    
    let section = e.target.dataset.link;
    document.getElementById(section)?.classList.add('expand');
    document.querySelector(`button[data-link="${section}"]`).disabled = true;
  }

  this.setDefaultLayoutForMobile = function() {
    let defaultSectionId = 'podium_inner_text';
    
    let defaultSection = document.getElementById(defaultSectionId);
    let currentExpanded = document.querySelector('.expand');
    
    if (window.innerWidth < 960) {
      if (currentExpanded) return;

      defaultSection?.classList.add('expand');

      let defaultBtn = document.querySelector(`button[data-link="${defaultSectionId}"]`);
      if (defaultBtn) defaultBtn.disabled = true;

    } else {
      if (!currentExpanded) return;
      
      currentExpanded.classList.remove('expand');

      let currentBtn = document.querySelector(`button[data-link="${currentExpanded.id}"]`);
      if (currentBtn) currentBtn.disabled = "";
    }
  }
}