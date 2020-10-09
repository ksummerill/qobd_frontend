class Business {
  constructor(business, businessAttributes) {
    // debugger
    this.id = business.id;
    // debugger
    this.name = businessAttributes.name;
    this.description = businessAttributes.description;
    this.category = businessAttributes.category;
    this.website = businessAttributes.website;
    Business.all.push(this);
  }

  renderBusinessCard() {
    return `
      <div data-id=${this.id}>
        <h3>${this.name}</h3>
        <p>${this.description}</p>
        <p>${this.category.name}</p>
        <p>${this.website}</p>
      </div>
      <br><br>`;
  }

}

Business.all = [];
