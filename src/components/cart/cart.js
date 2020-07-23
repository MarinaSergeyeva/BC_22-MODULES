import './cart.css';

export const createCartListMarkup = (products, getTotalPrice) => {
  return `
  <div class="cartWrapper">
    ${
      products.length === 0
        ? '<p class="cartNotification"> No products in cart </p>'
        : ''
    }
    <ul class="cartList">
      ${products.reduce((acc, product) => {
        acc += createCartListItemMarkup(product);
        return acc;
      }, '')}
    </ul>
   <p class="cartTotal">Total: <span class="cartTotalPrice">${getTotalPrice(
     products,
   )}</span></p>
    <div class="cartButtonsWrapper">
      <button type="button" class="cartButtonBack button">Back to reality</button>
      <button type="button" class="cartButtonConfirm button">Confirm order</button>
    </div>
  </div>
  `;
};

const createCartListItemMarkup = product => {
  return `
  <li class="cartListItem" data-id=${product.id}>
    <img class="cartListItemImage" src=${
      product.productImage
    } alt="image" width="30" height="30"/>
    <p class="cartListItemName">${product.productName}</p>
    <div class="orderCounter">
      <button type="button" data-button="decrement" ${
        product.quantity === 1 ? 'disabled' : ''
      }>-</button>
        <input type="number" data-input="inputNumber" value="${
          product.quantity
        }"/>
      <button type="button" data-button="increment">+</button>
    </div>
    <p class="cartListItemName">${product.productPrice}</p>
    <button class="deleteButton" data-button="delete">Delete</button>
  </li>
  `;
};

// const refs = {
//   cartList: document.querySelector('.cartList'),
// };

// const refs = document.addEventListener('DOMContentLoaded', function (event) {
//   console.log('DOM fully loaded and parsed');

//   const ref = document.querySelector('.cartList');
//   console.log(ref);
// });

// console.log(refs);

export default {
  cartItems: [],
  destination: '',
  totalPrice: 0,
  cartItem: {
    id: '',
    quantity: 0,
  },

  openCart(destination, products) {
    this.destination = destination;
    this.cartItems = [
      ...products.map(
        ({ id, productPrice, productImage, productName, quantity }) => {
          return { productPrice, productImage, productName, quantity, id };
        },
      ),
    ];
    this.getTotalPrice.bind(this);
    this.destination.innerHTML = createCartListMarkup(
      this.cartItems,
      this.getTotalPrice,
    );
    const cartList = document.querySelector('.cartList');
    cartList.addEventListener('click', this.getQuantity.bind(this));
    cartList.addEventListener('click', this.removeCartItem.bind(this));
  },

  getQuantity(e) {
    // const listItem = e.target.closest('[data-id]');
    // const id = listItem.dataset.id;
    const findObj = this.getIdProduct(e);

    const element = this.cartItems.find(product => product.id === findObj.id);
    const buttonDecrement = findObj.element.querySelector(
      '[data-button="decrement"]',
    );
    const cartTotalPrice = this.destination.querySelector('.cartTotalPrice');

    if (e.target.dataset.button === 'decrement') {
      if (element.quantity <= 1) {
        element.quantity = 1;
      } else element.quantity -= 1;

      if (element.quantity === 1) {
        buttonDecrement.disabled = true;
      }
    }
    if (e.target.dataset.button === 'increment') {
      element.quantity += 1;
      buttonDecrement.disabled = false;
    }
    const inputNumber = findObj.element.querySelector(
      '[data-input="inputNumber"]',
    );
    inputNumber.value = element.quantity;
    console.dir(cartTotalPrice);
    cartTotalPrice.textContent = this.getTotalPrice(this.cartItems);
  },

  removeCartItem(e) {
    console.log(e.target);
    if (e.target.dataset.button === 'delete') {
      // const listItem = e.target.closest('[data-id]');
      // const id = listItem.dataset.id;
      const findObj = this.getIdProduct(e);

      this.cartItems = [
        ...this.cartItems.filter(product => product.id !== findObj.id),
      ];
      this.destination.innerHTML = createCartListMarkup(
        this.cartItems,
        this.getTotalPrice,
      );
      const cartList = document.querySelector('.cartList');
      cartList.addEventListener('click', this.getQuantity.bind(this));
      cartList.addEventListener('click', this.removeCartItem.bind(this));
      const cartTotalPrice = this.destination.querySelector('.cartTotalPrice');
      cartTotalPrice.textContent = this.getTotalPrice(this.cartItems);
    } else return;
  },

  getTotalPrice(products) {
    const total = products.reduce((acc, product) => {
      acc += product.productPrice * product.quantity;
      return acc;
    }, 0);
    return total;
  },

  getIdProduct(e) {
    const element = e.target.closest('[data-id]');
    const id = element.dataset.id;
    console.log({ id: id, element: element });
    return { id: id, element: element };
  },
};
