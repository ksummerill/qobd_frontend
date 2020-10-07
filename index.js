const endPoint = "http://localhost:3000/api/v1/businesses"

document.addEventListener('DOMContentLoaded', () => {
  getBusinesses()

  const createBusinessForm = document.querySelector("#create-syllabus-form")

  createBusinessForm.addEventListener("submit", (e) => createFormHandler(e))
})
  // initial fetch to grab all businesses from index controller
  function getBusinesses() {
    fetch(endPoint)
    .then(r => r.json())
    .then(businesses => {
      businesses.data.forEach(business => {
        const businessMarkup = `
          <div data-id=${business.id}>
            <h3>${business.attributes.name}</h3>
            <p>${business.attributes.category.name}</p>
            <p>${business.attributes.website}</p>
            </div>`;

          document.querySelector('#business-container').innerHTML += businessMarkup

      });

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
