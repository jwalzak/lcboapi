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
const types = parsedJSON.result;
const liquorType = [...new Set(types.map(item => item.primary_category))];
let select = document.createElement('select'),
    option,
    i = 0;

for(; i < liquorType.length; i++){
  option = document.createElement('option');
  option.setAttribute('value', liquorType[i]);
  option.appendChild(document.createTextNode(liquorType[i]));
  select.appendChild(option);
}

document.body.appendChild(select);

// for(let i = 0; i<parsedJSON.result.length; i++){
//   if(parsedJSON.result[i].primary_category == "Beer"){
//     let value = parsedJSON.result[i];
//     let price = (value.price_in_cents/100).toFixed(2);
//     let name = value.name;
//     let container = value.package_unit_type;
//     let amount = value.total_package_units;
//     document.writeln(price + " " + name + " " + container + " " + amount + "<br/>");
//   }
// }
