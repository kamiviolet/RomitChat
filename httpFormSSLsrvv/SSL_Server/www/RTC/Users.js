const Users = new function() {
  
  this.LoginSubmitButonEvent = async function(e)
  {
    e.preventDefault();
    // var logINorLOGout = !document.querySelector('.user_registration_form').classList.contains("hide")
    //var logINorLOGout = true;   
    //Users.anouseAliasName(logINorLOGout);
    let name = document.querySelector('#usernamebox').value;
    if (name.includes("<") || name.includes(">")) 
        name = getRidOfElementChars(name);
    Users.userLogin(name);
  }

  this.LogOutSubmitButonEvent = async function(e)
  {
    e.preventDefault();
    //Users.anouseAliasName(false);
    var curentDryedName = Users.getCookie("username")
    if(gl_lastUsedName == curentDryedName) 
        document.cookie = 'username=';
        
    Users.userLogout();
  }

  // this.anouseAliasName = async function(logYnOrLogOut) {    
  //   let username = document.querySelector('#usernamebox').value;

  //   if(logYnOrLogOut == true)
  //   {
  //     if (username && username !== "") {
  //       document.querySelector('.user_registration_form').classList.add('hide');
  //       document.querySelector('.user_profile_wrapper > div').classList.remove('hide');
  //     } else {
  //       document.querySelector('.user_registration_form').classList.remove('hide');
  //     }
  //     document.querySelector('.user_profile_wrapper > div > p').innerHTML = username;
  //   }
  //   else
  //   {
  //     document.querySelector('.user_profile_wrapper > div').classList.add('hide');
  //     document.querySelector('.user_registration_form').classList.remove('hide');
  //   }
  //   if(logYnOrLogOut == true)  
  //     WsAnouceLoginAliasName();
  //   else
  //     WsAnouceLogOUTbyAliasName();
  // } 

  this.userLogin = function(name) {
    let username = name;

    if (username && username !== "") {
      document.querySelector('.user_registration_form').classList.add('hide');
      document.querySelector('.user_profile_wrapper > div').classList.remove('hide');
    } else {
      return;
    }

    document.querySelector('.user_profile_wrapper > div > p').innerHTML = "Hello, " + username + "!";

    WsAnouceLoginAliasName(username);

    Users.setCookie('username',username);
  }

  this.userLogout = function() {
    document.querySelector('.user_profile_wrapper > div').classList.add('hide');
    document.querySelector('.user_registration_form').classList.remove('hide');

    WsAnouceLogOUTbyAliasName(gl_lastUsedName);
  }

  this.setCookie = function(key, value) {
    var now = new Date();
    now.setTime(now.getTime() + 3 * 3600 * 1000);

    document.cookie = key + "=" + value;
    document.cookie = "expires=" + now.toUTCString() + ";"
  }

  this.getCookie = function(key) {
    let cookies = document.cookie.split(';');

    for (let pair of cookies) {
      let trimmed = pair.trim();
      let [k, v] = trimmed.split('=');
      if (key === k) return v;
    };
  }
}