const ACCESS_KEY = 'MDo2MDQ2OTliNi02MTI4LTExZTctOGZhMC0zZjZkYzIzMjRjNWY6Z3hFMlp2RGhNQzRGdGVzakZPRTE1STJteDRVVWdkTTU3Y2tx';

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
let parsedJSON = JSON.parse(data);


for(let i = 0; i<parsedJSON.result.length; i++){
  if(parsedJSON.result[i].primary_category == "Beer"){
    let value = parsedJSON.result[i].primary_category;
  }
}