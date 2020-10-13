const endPoint = "http://localhost:3000/api/v1/businesses"

document.addEventListener('DOMContentLoaded', () => {
  console.log("DOM is loaded");
  // choosing not to call getBusinesses() since I don't want those to load on the homepage
  // // getBusinesses()

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

  // createFormHandler and postFetch both happen in the modal

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
    // debugger
    postFetch(nameInput, descriptionInput, websiteInput, streetAddressInput, cityInput, stateInput, zipcodeInput, categoryId)
  }

  function postFetch(name, description, website, street_address, city, state, zipcode, category_id) {

    const bodyData = {name, description, website, street_address, city, state, zipcode, category_id}

    fetch(endPoint, {
      // POST request
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(bodyData)
    })
    .then(response => response.json())
    .then(business => {

      // render JSON response
      const newBusiness = new Business(business.data.id, business.data.attributes)
      document.querySelector('#business-container').innerHTML += newBusiness.renderBusinessCard();

    })
  }

  // function gets fired on submit of the form to save a new business
  function saveNewBusiness() {
    // event listener and handler for create business form
    const createBusinessForm = document.querySelector("#create-business-form")
    createBusinessForm.addEventListener("click", (e) => createFormHandler(e))
  }
