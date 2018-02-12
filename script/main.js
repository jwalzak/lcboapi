/* eslint-disable */
const ACCESS_KEY =
  'MDo2MDQ2OTliNi02MTI4LTExZTctOGZhMC0zZjZkYzIzMjRjNWY6Z3hFMlp2RGhNQzRGdGVzakZPRTE1STJteDRVVWdkTTU3Y2tx'
let nextPage, liquorTypes

// Changing to fetch rather than XMLHttpRequest
fetch(`https://lcboapi.com/products?access_key=${ACCESS_KEY}&per_page=100`, {
  method: 'GET',
})
  .then(res => {
    // Convert to JSON
    return res.json()
  })
  .then(res => {
    liquorTypes = res.result
    liquorTypes = [
      ...new Set(liquorTypes.map(single => single.primary_category)),
    ] // Gets unique array values
    nextPage = res.pager.next_page //This one changes, don't unlet it
    liquorTypes.sort()
    createSelect()
    return res
  })
  .then(res => {
    console.log(res)
    populatePage(res)
  })
  .catch(e => {
    console.log(`Something went wrong`, e)
  })

function createSelect() {
  let select = document.createElement('select'),
    option,
    i = 0
  select.setAttribute('id', 'select')
  console.log(nextPage)
  const blank = document.createElement('option')
  blank.setAttribute('value', 'empty')
  blank.appendChild(document.createTextNode(' '))
  select.appendChild(blank)

  // Takes the array liquorType and assigns it to the dropdown menu.

  for (i = 0; i < liquorTypes.length; i++) {
    option = document.createElement('option')
    option.setAttribute('value', liquorTypes[i])
    option.appendChild(document.createTextNode(liquorTypes[i]))
    select.appendChild(option)
  } //End for

  select.setAttribute('class', 'list')
  const slct = document.querySelector('.slct')
  slct.appendChild(select)
}

function populatePage(res) {
  //This will append all the desired data to the site.
  select.addEventListener('change', () => {
    const e = document.getElementById('select')
    const choice = e.options[e.selectedIndex].value

    if (choice !== 'empty') {
      const jsonDiv = document.querySelector('.json')
      jsonDiv.innerHTML = ''

      for (let i = 0; i < res.result.length; i++) {
        if (res.result[i].primary_category === choice) {
          const value = res.result[i] // added for readability
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
}

function newPage(next) {
  const newData = getJSON(
    `https://lcboapi.com/products?access_key=${ACCESS_KEY}&per_page=100&page=${next}`
  )
  const nextData = JSON.parse(newData)
  console.log(nextData)
}
