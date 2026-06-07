export class Cart {
  items = [];

  constructor(items = []) {
    this.items = items;
  }

  addProduct(product, index) {
    this.items.push(product, index);
  }

  deleteProduct(productName) {
    for (let i in this.items) {
      if (i.name === productName) {
        this.items.splice(this.items.indexOf(i), 1);
      }
    }
  }
}

export class CartPopup {}
