const ACCESS_KEY = ;

function getJSON(url) {
  var resp;
  var xmlHttp;

  resp = '';
  xmlHttp = new XMLHttpRequest();

  if (xmlHttp !== null) {
    xmlHttp.open("GET", url, false);
    xmlHttp.send(null);
    resp = xmlHttp.responseText;
  }

  return resp;
}

let data = getJSON(`https://lcboapi.com/products?access_key=${ ACCESS_KEY }`);

document.addEventListener("DOMContentLoaded", document.querySelector(".json").innerHTML = data);
