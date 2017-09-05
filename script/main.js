const ACCESS_KEY = 'MDo2MDQ2OTliNi02MTI4LTExZTctOGZhMC0zZjZkYzIzMjRjNWY6Z3hFMlp2RGhNQzRGdGVzakZPRTE1STJteDRVVWdkTTU3Y2tx';

function getJSON(url) {
  let resp;
  let xmlHttp;

  resp = '';
  xmlHttp = new XMLHttpRequest();

  if (xmlHttp !== null) {
    xmlHttp.open("GET", url, false);
    xmlHttp.send(null);
    resp = xmlHttp.responseText;
  }

  return resp;
}//end getJSON

let data = getJSON(`https://lcboapi.com/products?access_key=${ ACCESS_KEY }&per_page=100`);
let parsedJSON = JSON.parse(data);
const types = parsedJSON.result;
const liquorType = [...new Set(types.map(item => item.primary_category))];//To get unique liquor categories.
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
}//End for

select.setAttribute('class', 'list');
let slct = document.querySelector('.slct');
slct.appendChild(select);

//This will append all the desired data to the site.
select.addEventListener('change', function(){
  let e = document.getElementById('select');
  let choice = e.options[e.selectedIndex].value;

  if(choice !== 'empty'){
    for(let i = 0; i < parsedJSON.result.length; i++){
      if(parsedJSON.result[i].primary_category === choice){
        let value = parsedJSON.result[i];
        let price = (value.price_in_cents/100).toFixed(2);
        let name = value.name;
        let container = value.package_unit_type;
        let amount = value.total_package_units;
        let volume = value.volume_in_milliliters;
        let jsonDiv = document.querySelector('.json');
        jsonDiv.innerHTML = `<div class='result'><h3>${ name }</h3>
                              <p>Price: ${ price }</p>
                              <p>Container Type: ${ container }</p>
                              <p>Volume: ${ volume }  ml</p>
                              <p>Amount of containers: ${ amount }</p></div>`
      }
    }
  }
});//End eventListener
