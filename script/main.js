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
select.setAttribute("id", "select");
let blank = document.createElement('option');
blank.setAttribute('value', "empty");
blank.appendChild(document.createTextNode(" "));
select.appendChild(blank);

for(; i < liquorType.length; i++){
  option = document.createElement('option');
  option.setAttribute('value', liquorType[i]);
  option.appendChild(document.createTextNode(liquorType[i]));
  select.appendChild(option);
}

select.setAttribute('class', 'list');
document.body.appendChild(select);

select.addEventListener('change', function(){
  let e = document.getElementById('select');
  let choice = e.options[e.selectedIndex].value;
  console.log(choice);
  if(choice === 'empty'){
    console.log(' ');
  } else {
    for(let i = 0; i < parsedJSON.result.length; i++){
      if(parsedJSON.result[i].primary_category === choice){
        let value = parsedJSON.result[i];
        let price = (value.price_in_cents/100).toFixed(2);
        let name = value.name;
        let container = value.package_unit_type;
        let amount = value.total_package_units;
        document.writeln(price + " " + name + " " + container + " " + amount + "<br/>");
      }
    }
  }
});
