import refs from './components/refs';
import navigation from './components/navigation/navigation';
import api from './api';
import productsCard from './components/productsCard/productsCard';
import cart, { createCartListMarkup } from './components/cart/cart';
import './styles.css';

export const MyData = {
  products: [],
  myFavorites: [
    '-MCSPrDcNr8ZqA5HrGd_',
    '-MCSeIvv3xD3ecQc13y9',
    '-MCSiwOfFnBG5dTukQ96',
    '-MCSunpAuTod5JykM1C_',
  ],
  myCart: [
    // {
    //   id: "-MCRDcLiYq6oFh_bMRoX",
    //   author: "qqjAlz3mRtPZSkrWdMB43rgA8pn1",
    //   category: "tools",
    //   productDescription: "Good wrench",
    //   productImage: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEBMAEwAAD",
    //   productName: "Wrench",
    //   productPrice: "250",
    // },
    // {
    //   id: "-MCSPrDcNr8ZqA5HrGd_",
    //   author: "qqjAlz3mRtPZSkrWdMB43rgA8pn1",
    //   category: "food",
    //   productDescription: "Fresh Organic Bananas Bundle",
    //   productImage: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD",
    //   productName: "Bananas",
    //   productPrice: "25",
    // },
  ],
};

const elements = ['Home', 'About', 'Contacts', 'Products', 'Cart'];
const sidebar = ['All', 'Food', 'Toys', 'Weapon', 'Tools'];

// (async function () {
//   MyData.products = [... await api.getProducts()]
// })();

const setVisibleContent = e => {
  const link = navigation.getActiveLink(e);
};

const getPage = e => {
  const link = navigation.getActiveLink(e);

  if (link === 'Cart') {
    refs.productsPage.innerHTML = '';
    cart.openCart(refs.cartPage, MyData.myCart);
  }

  if (link === 'Products') {
    refs.cartPage.innerHTML = '';
    // const sidebarNavigation = document.createElement('div');
    const products = document.createElement('div');
    // sidebarNavigation.classList.add('sidebarNavigation');
    // products.classList.add('products');
    // productsPage.classList.add('main')
    // productsPage.append(sidebarNavigation);
    refs.productsPage.append(products);
    // navigation.createLinks(sidebarNavigation, sidebar);
    productsCard.renderCards(products, MyData.products);
    products.addEventListener('click', e => productsCard.setFavorite(e));
    products.addEventListener('click', e => productsCard.addToCart(e));
    // sidebarNavigation.addEventListener('click', getPage);
  }

  if (e.currentTarget.classList.contains('sidebarNavigation')) {
    if (link === 'All') {
      productsCard.renderCards(refs.productsPage, MyData.products);
      return;
    }
    productsCard.renderCards(
      refs.productsPage,
      MyData.products.filter(
        product => product.category.toLowerCase() === link.toLowerCase(),
      ),
    );
  }
};

navigation.createLinks(refs.headerNavigation, elements);
refs.headerNavigation.addEventListener('click', getPage);

// Description: productsCard.settings(Object, "first", "second")
// Object - typeObject with keys:
// first: how called your favorites || null,  your favorites key name
// second: how called your cart || null,  your cart key name

productsCard.settings(MyData, 'myFavorites', 'myCart');

productsCard
  .renderCards(refs.productsPage, api.getProducts)
  .then(data => console.log(data));

refs.productsPage.addEventListener('click', e => productsCard.setFavorite(e));
refs.productsPage.addEventListener('click', e => productsCard.addToCart(e));

// const product = {

// }

// const getInfo = (e) => {
//   console.log('product before', product)
//   product[e.target.name] = e.target.value;
//   console.log('product after', product)

// }

// const form = document.forms.productListForm;
// form.addEventListener('input', getInfo)
