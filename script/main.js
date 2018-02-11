/* eslint-disable */
const ACCESS_KEY =
  'MDo2MDQ2OTliNi02MTI4LTExZTctOGZhMC0zZjZkYzIzMjRjNWY6Z3hFMlp2RGhNQzRGdGVzakZPRTE1STJteDRVVWdkTTU3Y2tx'

// AJAX call -- Change to fetch
const getJSON = url => {
  let resp
  let xmlHttp

  resp = ''
  xmlHttp = new XMLHttpRequest()

  if (xmlHttp !== null) {
    xmlHttp.open('GET', url, false)
    xmlHttp.send(null)
    resp = xmlHttp.responseText
  }

  return resp
} //end getJSON

const data = getJSON(
  `https://lcboapi.com/products?access_key=${ACCESS_KEY}&per_page=100`
)
const parsedJSON = JSON.parse(data)
const types = parsedJSON.result // Not sure why I'm assigning this variable, for readability, it needs a new name
const liquorType = [...new Set(types.map(item => item.primary_category))] //To get unique liquor categories.
let select = document.createElement('select'),
  option,
  i = 0
select.setAttribute('id', 'select')
const blank = document.createElement('option')
blank.setAttribute('value', 'empty')
blank.appendChild(document.createTextNode(' '))
select.appendChild(blank)

// Takes the array liquorType and assigns it to the dropdown menu.
for (i = 0; i < liquorType.length; i++) {
  option = document.createElement('option')
  option.setAttribute('value', liquorType[i])
  option.appendChild(document.createTextNode(liquorType[i]))
  select.appendChild(option)
} //End for

select.setAttribute('class', 'list')
const slct = document.querySelector('.slct')
slct.appendChild(select)

//This will append all the desired data to the site.
select.addEventListener('change', () => {
  const e = document.getElementById('select')
  const choice = e.options[e.selectedIndex].value

  if (choice !== 'empty') {
    const jsonDiv = document.querySelector('.json')
    jsonDiv.innerHTML = ''

    for (let i = 0; i < parsedJSON.result.length; i++) {
      if (parsedJSON.result[i].primary_category === choice) {
        const value = parsedJSON.result[i] // added for readability
        const price = (value.price_in_cents / 100).toFixed(2) // Convert to dollars and cents
        jsonDiv.innerHTML += `<div class='result'><h3>${value.name}</h3>
                              <p>Price: ${price}</p>
                              <p>Container Type: ${value.package_unit_type}</p>
                              <p>Volume: ${value.volume_in_milliliters}  ml</p>
                              <p>Amount of containers: ${
                                value.total_package_units
                              }</p>
                              <img src="${
                                value.image_thumb_url
                              }" alt="Image of ${value.name}" />
                              </div>`
      }
    }
  }
}) //End eventListener
