const endPoint = "http://localhost:3000/api/v1/businesses"

document.addEventListener('DOMContentLoaded', () => {
  getBusinesses()
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
