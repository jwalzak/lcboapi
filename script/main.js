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
    createSelect()
    createButton(nextPage)
    return res
  })
  .then(res => populatePage(res))
  .catch(e => console.error(`Something went wrong`, e)) // End Fetch

function createSelect() {
  let select = document.createElement('select'),
    option,
    i = 0
  select.setAttribute('id', 'select')
  const blank = document.createElement('option')
  blank.setAttribute('value', 'empty')
  blank.appendChild(document.createTextNode(' '))
  select.appendChild(blank)

  // Convert to .map array method
  liquorTypes.map(type => {
    option = document.createElement('option')
    option.setAttribute('value', type)
    option.appendChild(document.createTextNode(type))
    select.appendChild(option)
  })

  select.setAttribute('class', 'list')
  const slct = document.querySelector('.slct')
  slct.appendChild(select)
} // End createSelect()

function populatePage(res) {
  //This will append all the desired data to the site.
  select.addEventListener('change', () => {
    const e = document.getElementById('select')
    const choice = e.options[e.selectedIndex].value

    if (choice !== 'empty') {
      const jsonDiv = document.querySelector('.json')
      jsonDiv.innerHTML = ''

      // Map res.result to get all values that are the chosen liquorType
      res.result.map(value => {
        if (value.primary_category === choice) {
          const price = (value.price_in_cents / 100).toFixed(2) // Convert to dollars and cents
          jsonDiv.innerHTML += `<div class='result'><h3>${value.name}</h3>
            <p>Price: ${price}</p>
            <p>Container Type: ${value.package_unit_type}</p>
            <p>Volume: ${value.volume_in_milliliters}  ml</p>
            <p>Amount of containers: ${value.total_package_units}</p>
            <img src="${value.image_thumb_url}" alt="Image of ${value.name}" />
            </div>`
        }
      })
    }
  }) //End eventListener
} // End populatePage()

function createButton(nextPage) {
  const selectDiv = document.querySelector('.slct')
  const button = document.createElement('button')
  const jsonDiv = document.querySelector('.json')
  button.addEventListener('click', function() {
    fetch(
      `https://lcboapi.com/products?access_key=${ACCESS_KEY}&per_page=100&page=${nextPage}`,
      { method: 'GET' }
    )
      .then(res => (res = res.json()))
      .then(res => {
        return (nextPage = res.pager.next_page), res
      })
      .then(res => populatePage(res))
      .catch(e => console.error('There was an error', e))
  })
  button.innerHTML = 'Next Page'
  selectDiv.appendChild(button)
} // End createButton()
