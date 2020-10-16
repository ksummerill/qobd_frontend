class Business {
  constructor(business, businessAttributes) {
    this.id = business.id;
    this.name = businessAttributes.name;
    this.description = businessAttributes.description;
    this.category = businessAttributes.category;
    this.website = businessAttributes.website;
    Business.all.push(this);
  }

  // use this to show all businesses in a specific category??
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

}

Business.all = [];
