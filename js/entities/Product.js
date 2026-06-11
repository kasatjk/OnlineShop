export class Product {
  name;
  price;
  description;
  category;
  image;
  rating;
  discount;
  quantity;

  constructor({name = '', price = 0, description = '', category = '',
              image = `https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fvectorified.com%2Fimages%2Fnone-icon-25.png&f=1&nofb=1&ipt=ff33b7856ce52cec5fcf676750781ea268ec263ecec6810ee52ae2c0656524b8`,
              rating = 0, discount = 0, quantity = 0}) {

    if (typeof rating !== 'number' || rating < 0 || rating > 5) {
      throw new RangeError(`Rating must be a number between 0 and 5, got: ${rating}`);
    }
    if (typeof price !== 'number' || price < 0) {
      throw new RangeError(`Price must be a non-negative number, got: ${price}`);
    }
    if (typeof discount !== 'number' || discount < 0 || discount > 100) {
      throw new RangeError(`Discount must be between 0 and 100, got: ${discount}`);
    }

    this.name = name;
    this.price = price;
    this.description = description;
    this.category = category;
    this.image = image;
    this.rating = rating;
    this.discount = discount;
    this.quantity = quantity;
  }

  makeCard() {
    let productsContainer = document.getElementById("products");

    let card = document.createElement("div");
    card.className = "product";

    let category = document.createElement("span");
    category.textContent = this.category;
    category.className = "category";

    let name = document.createElement("h1");
    name.textContent = this.name;
    name.className = "name";

    let description = document.createElement("p");
    description.textContent = this.description;
    description.className = "description";

    let img = document.createElement("img");
    img.src = this.image;
    img.alt = this.name;

    let price = document.createElement("p");
    price.textContent = this.price + ' USD';
    price.className = "basic-price";

    let discount = document.createElement("p");
    discount.textContent = this.discount + "%";
    discount.className = "discount";

    let discountPrice = document.createElement("p");
    discountPrice.textContent = (this.price - this.price * this.discount / 100).toFixed(2) + ' USD';
    discountPrice.className = "discount-price";

    let rating = document.createElement("p");
    rating.className = "rating";
    rating.textContent = this.rating;

    let quantity = document.createElement("p");
    quantity.textContent = "In stock: " + this.quantity;
    quantity.className = "quantity";

    let buyButton = document.createElement("button");
    buyButton.textContent = "Add to Cart";
    buyButton.className = "buy-btn";
    buyButton.addEventListener("click", () => {
      Cart.add(this);
      CartPopup.open();
    });

    card.appendChild(category);
    card.appendChild(img);
    card.appendChild(name);
    card.appendChild(description);
    card.appendChild(price);
    if (this.discount !== 0) {
      card.appendChild(discount);
      card.appendChild(discountPrice);
      price.style.color = '#999';
      price.style.textDecoration = 'line-through';
    }
    card.appendChild(quantity);
    card.appendChild(buyButton);

    productsContainer.appendChild(card);
  }

  toJSON() {
    return {
      name: this.name,
      price: this.price,
      description: this.description,
      category: this.category,
      image: this.image,
      rating: this.rating,
      discount: this.discount,
      quantity: this.quantity
    };
  }
}
