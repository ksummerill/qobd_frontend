class Business {
  constructor(business, businessAttributes) {
    this.id = business.id;
    this.name = businessAttributes.name;
    this.description = businessAttributes.description;
    this.category = businessAttributes.category;
    this.website = businessAttributes.website;
    Business.all.push(this);
  }

  // this will eventually need to be called only when a business object is found by searching
  // right now, each new business added gets added to the homepage
  renderBusinessCard() {
    return `
      <div data-id=${this.id}>
        <h3>${this.name}</h3>
        <p>${this.description}</p>
        <p>${this.category.name}</p>
        <p>${this.website}</p>
        <button data-id=${this.id}>edit</button>
      </div>
      <br><br>`;
  }

  // static findBusinessByName(name) {
  //   return this.all.find(business => business.name === name);
  // }

}

Business.all = [];
