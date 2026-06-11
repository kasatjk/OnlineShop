import {Cart} from './Cart.js';
import {Cookie} from '../Cookie.js';

export class Customer {
  name;
  email;
  password;
  cart;

  constructor(name = 'user', email = 'example@domain.com',
              password = '123456789', cart = new Cart) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.cart = cart;
  }

  saveData() {
    const dataToSave = {
      name: this.name,
      email: this.email,
      password: this.password,
      cart: this.cart
    };
    Cookie.save("customer", JSON.stringify(dataToSave), 7);
  }

  static getData() {
    const savedData = Cookie.get("customer");

    if (savedData) {
      try {
        const data = JSON.parse(savedData);
        let user = new Customer();

        user.name = data.name;
        user.email = data.email;
        user.password = data.password;
        user.cart = data.cart;
        return user;
      } catch (ex) {
        console.error("Error get customer cookie data", ex);
      }
    }
  }
}
