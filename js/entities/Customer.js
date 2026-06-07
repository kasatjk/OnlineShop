import {Cart} from './Cart.js';
import {Cookie} from '../Cookie.js';

export class Customer {
  name;
  address;
  email;
  password;
  phone;
  cart;

  constructor(name = 'user', address = 'Earth', email = 'example@domain.com',
              password = '123456789', phone = '+380000000000', cart = new Cart) {
    this.name = name;
    this.address = address;
    this.email = email;
    this.password = password;
    this.phone = phone;
    this.cart = cart;
  }

  saveData() {
    const dataToSave = {
      name: this.name,
      address: this.address,
      email: this.email,
      phone: this.phone,
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
        user.address = data.address;
        user.email = data.email;
        user.phone = data.phone;
        user.cart = data.cart;
        return user;
      } catch (ex) {
        console.error("Error get customer cookie data", ex);
      }
    }
  }
}
