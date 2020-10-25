const endPoint = "http://localhost:3000/api/v1/businesses"

document.addEventListener('DOMContentLoaded', () => {
  console.log("DOM is loaded");
  // getBusinesses();

  // fetch business from user inputted search; listen to search bar submit

    const searchBar = document.querySelector('#mySearch')
    searchBar.addEventListener('click', e => {
    })

    searchBar.addEventListener('change', e => {
      submitSearch(e.target.value);
    })

    function submitSearch(searchValue) {
      searchValue = searchValue.toLowerCase()
    fetch(endPoint)
    .then(r => r.json())
    .then(businesses => {
      // businesses.data is an array of objects - businesses.data[0].attributes.name gets me the name of
      // the first business in my array of business objects
      const searchedBusiness = businesses.data.find(b => {
          if (b.attributes.name.toLowerCase() === searchValue) {
            return true
          }
        })
        // console.log(searchedBusiness)
        showBusiness(searchedBusiness);
      })
    }

    // shows modal with found business data
    function showBusiness(b) {
      let data = b
      $(".modal-header").html(`<h4>${data.attributes.name}</h4>`)
      $(".modal-body").html(
        `
          <p>${data.attributes.description}</p>
          <p>${data.attributes.category.name}</p>
          <a href="${data.attributes.website}" class="btn btn-primary">${data.attributes.website}</a>
        `
      );
      $("#my_modal").modal("show")
      };

      // event listener for category search buttons
      // listen for all category buttons. When one is selected, grab that div id and pass to fetch (not sure on this last part)
      const categoryButton = document.querySelector('#category-buttons')
      categoryButton.addEventListener('click', e => {
        console.log('clicked');
        const categorySelected = e.target.id
        getBusinessByCategory(categorySelected);
        // This is passing the correct id to the fetch function
      })

      // fetch to grab all businesses by category
      function getBusinessByCategory(selectedCategory) {
        console.log(selectedCategory)
        fetch(endPoint)
        // fetch(`http://localhost:3000/api/v1/categories/${selectedCategoryId}/businesses`)
        .then(r => r.json())
        .then(businesses => {
          console.log(businesses)

          // find all businesses that match the passed-in category
          // businesses.data[0].attributes.category.id gives me the correct category_id
          let filteredArray = businesses.data.filter(b => b.attributes.category.name === "Restaurants");

          console.log(selectedCategory);
          // displayBusinessesByCategory(searchedCategory)
          console.log(filteredArray);
// debugger
        })
      }

      function displayBusinessesByCategory(category) {
        console.log(category);
        $(".category-modal-header").html(`<h4>${category.attributes.category.name}</h4>`)
        $(".category-modal-body").html(
          `
            <p>${category.attributes.name}</p>
            <p>${category.attributes.description}</p>
            <a href="${category.attributes.website}" class="btn btn-primary">${category.attributes.website}</a>
          `
        );
        $("#category-modal").modal("show")
      };

})



        // // what if I... take the businesses
        //   let filteredArray = businesses.data.filter(b => b.attributes.category.name === "Restaurants")
        //   // showAllCategoriedBusinesses(filteredArray);
        //   console.log(filteredArray)
        //
        //   filteredArray.forEach(b => {
        //     // debugger
        //
        //     $(".category-modal-header").html(`<h4>${b.attributes.category.name}</h4>`)
        //     $(".category-modal-body").html(
        //       `
        //         <p>${b.attributes.name}</p>
        //         <p>${b.attributes.description}</p>
        //         <a href="${b.attributes.website}" class="btn btn-primary">${b.attributes.website}</a>
        //       `
        //     );
        //     $("#category-modal").modal("show")
        //     })
        //
        // })

      // function showAllCategoriedBusinesses(businesses) {
      //   businesses.data.forEach(b => {
      //
      //     $(".category-modal-header").html(`<h4>${b.attributes.category.name}</h4>`)
      //     $(".category-modal-body").html(
      //       `
      //         <p>${b.attributes.name}</p>
      //         <p>${b.attributes.description}</p>
      //         <a href="${b.attributes.website}" class="btn btn-primary">${b.attributes.website}</a>
      //       `
      //     );
      //     $("#category-modal").modal("show")
      //     })
      //     // debugger
      //   };




  // fetch to grab all businesses from index controller
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

  // function gets fired on submit of the form to save a new business, passing the entered data to createFormHandler
  function saveNewBusiness() {
    // event listener and handler for create business form
    const createBusinessForm = document.querySelector("#create-business-form")
    createBusinessForm.addEventListener("click", (e) => createFormHandler(e))
  }
