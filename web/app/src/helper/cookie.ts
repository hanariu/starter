// Set cookie.

const setCookie = (name: string, value: string, expires: string, path?: string, domain?: string, secure?: boolean) => {
  document.cookie = name + "=" + value +
    ((expires) ? "; expires=" + expires : "") +
    ((path) ? "; path=" + path : "") +
    ((domain) ? "; domain=" + domain : "") +
    ((secure) ? "; secure" : "");
}

// Set cookie for 1 hour:
// date = new Date();
// date.setHours(date.getHours() + 1);
// setCookie('name', 'value', date.toUTCString());

// Get cookie.
const getCookie = (name: string) =>{
  var cookie = " " + document.cookie
  var search = " " + name + "="
  var setStr = null
  var offset = 0
  var end = 0
  if (cookie.length > 0) {
    offset = cookie.indexOf(search)
    if (offset != -1) {
      offset += search.length
      end = cookie.indexOf(";", offset)
      if (end == -1) {
        end = cookie.length
      }
      setStr = cookie.substring(offset, end)
    }
  }
  return(setStr);
}


// Delete cookie.
const delCookie = (name: string) => {
  document.cookie = name + "=" + "; expires=Thu, 01 Jan 1970 00:00:01 GMT"
}

export { setCookie, getCookie, delCookie }