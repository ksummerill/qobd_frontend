const endPoint = "http://localhost:3000/api/v1/businesses"

document.addEventListener('DOMContentLoaded', () => {
  console.log("DOM is loaded");
  getBusinesses()

  const createBusinessForm = document.querySelector("#create-business-form")

  createBusinessForm.addEventListener("submit", (e) => createFormHandler(e))
})
  // initial fetch to grab all businesses from index controller
  function getBusinesses() {
    fetch(endPoint)
    .then(r => r.json())
    .then(businesses => {
      businesses.data.forEach(business => {
        const newBusiness = new Business(business.id, business.attributes)

        document.querySelector('#business-container').innerHTML += newBusiness.renderBusinessCard();

      })
    })
  }

  function createFormHandler(e) {
    e.preventDefault()
    const nameInput = document.querySelector('#input-name').value
    const descriptionInput = document.querySelector('#input-description').value
    const websiteInput = document.querySelector('#input-website').value
    const streetAddressInput = document.querySelector('#input-street_address').value
    const cityInput = document.querySelector('#input-city').value
    const stateInput = document.querySelector('#input-state').value
    const zipcodeInput = document.querySelector('#input-zipcode').value
    const categoryId = parseInt(document.querySelector('#categories').value)
    postFetch(nameInput, descriptionInput, websiteInput, streetAddressInput, cityInput, stateInput, zipcodeInput, categoryId)
  }

  function postFetch(name, description, website, street_address, city, state, zipcode, category_id) {
    // console.log(name, description, website, street_address, city, state, zipcode, category_id)

    const bodyData = {name, description, website, street_address, city, state, zipcode, category_id}

    fetch(endPoint, {
      // POST request
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(bodyData)
    })
    .then(response => response.json())
    .then(business => {

      const newBusiness = new Business(business.data.id, business.data.attributes)

      document.querySelector('#business-container').innerHTML += newBusiness.renderBusinessCard();

    })
  }


    // event listener for create form action
    // document.addEventListener('DOMContentLoaded', () => {
    //   // fetch and load syllabi
    //   getBusinesses()
    //   // listen for 'submit' event on form and handle data
    //   const createBusinessForm = document.querySelector("#create-button")
    //   createBusinessForm.addEventListener("submit", (e) => createFormHandler(e))
    //   // listen for 'click' event on syllabus container
    //   const businessContainer = document.querySelector('#business-container')
    //   businessContainer.addEventListener('click', e => {
    //     console.log('clicked');
    //   });
    // })
