import {Product} from './entities/Product.js';
import {Customer} from "./entities/Customer.js";
import {Cart} from "./entities/Cart.js";

async function loadProducts() {
  const response = await fetch('https://fakestoreapi.com/products');
  if (!response.ok) throw new Error(`Fetch failed: ${response.status}`);
  const items = await response.json();

  await Promise.all(
    items.map(item => {
      const product = new Product({
        name: item.title,
        price: item.price,
        description: item.description,
        category: item.category,
        image: item.image,
        rating: item.rating.rate,
        discount: Number((Math.random() * 60).toFixed(0)),
        quantity: item.rating.count
      });

      return product.makeCard();
    })
  );
}

loadProducts();
