// Set a Cookie
export function setCookie(nameCookie, valueCookie, numberDays = 0) {
    let date = new Date();
    date.setTime(date.getTime() + numberDays * 24 * 60 * 60 * 1000);
    const expires = "expires=" + date.toUTCString();
    document.cookie =
      nameCookie + "=" + valueCookie + "; " + expires + "; path=/";
  }
  
  //Get a Cookie
  export function getCookie(cname) {
      let name = cname + "=";
      let decodedCookie = decodeURIComponent(document.cookie);
      let ca = decodedCookie.split(';');
      for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    }