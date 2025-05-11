function toggleMenu() {
  let button = document.querySelector("#navbar > button");
  let navlinkWrapper = document.querySelector(".navlink_wrapper");

  if (!button || !navlinkWrapper) return;

  if (navlinkWrapper.classList.contains("hidden")) {
    openMenu();
  } else {
    closeMenu();
  }
};

function closeMenu() {
  let button = document.querySelector("#navbar > button");
  let navlinkWrapper = document.querySelector(".navlink_wrapper");

  button.textContent = "MENU";
  navlinkWrapper.classList.add("hidden");   
}

function openMenu() {
  let button = document.querySelector("#navbar > button");
  let navlinkWrapper = document.querySelector(".navlink_wrapper");

  button.textContent = "CLOSE";
  navlinkWrapper.classList.remove("hidden");
}