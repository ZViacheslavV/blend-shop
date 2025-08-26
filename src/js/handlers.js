import iziToast from 'izitoast';
import {
  getCategories,
  getProductById,
  getProducts,
  getProductsByCategories,
  getProductsByIds,
  searchProducts,
} from './products-api';
import {
  renderCartSummary,
  renderCategories,
  renderModalBtns,
  renderModalProduct,
  renderProducts,
  updateNavCount,
} from './render-function';
import {
  clearAllActiveClasses,
  isProductInList,
  toggleActiveClass,
  totalSum,
} from './helpers';
import { refs } from './refs';
import { openModal } from './modal';
import { getFromLS, saveToLS } from './storage';

let currentPage = 1;
let currentID;
let cartList;
let wishList;

//===== Home:
export async function initHomePage() {
  cartList = getFromLS('cart') ?? [];
  wishList = getFromLS('wishlist') ?? [];

  updateNavCount('cart', cartList.length);
  updateNavCount('wishlist', wishList.length);

  try {
    const categories = await getCategories();
    renderCategories(categories);
    toggleActiveClass(
      document.querySelectorAll('.categories__btn'),
      document.querySelector('.categories__btn'),
      'categories__btn--active'
    );

    const { products, total } = await getProducts(currentPage);

    if (!products?.length) {
      //Notification no products
      document.querySelector('.not-found').classList.add('not-found--visible'); //div show 'not found'
      clearAllActiveClasses(
        document.querySelectorAll('.categories__btn'),
        'categories__btn--active'
      );
      return;
    }

    renderProducts(products);
  } catch (err) {
    console.error(`Error init page, ${err}`);
  }
}

export async function handleCategoryClick(e) {
  if (e.target.nodeName !== 'BUTTON') return;

  refs.productsList.innerHTML = '';

  const category = e.target.textContent.toLowerCase();
  const allButtons = document.querySelectorAll('.categories__btn');

  toggleActiveClass(allButtons, e.target, 'categories__btn--active');

  /* let productsData;
  if (category === 'all') {
    productsData = await getProducts(currentPage);
  } else {
    productsData = await getProductsByCategories(category);
  } */
  try {
    const { products } = await (category === 'all'
      ? getProducts(currentPage)
      : getProductsByCategories(category));
    renderProducts(products);
  } catch (err) {
    console.error(
      'Something went wrong during choosing products category:',
      err
    );
  }

  refs.searchForm.reset();
}

export async function handleProductClick(e) {
  const productItem = e.target.closest('.products__item');

  if (!productItem) return;
  //   console.log(productItem);
  try {
    // console.log(e.target.dataset.id);

    const productID = +productItem.dataset.id;
    currentID = productID;
    const product = await getProductById(productID);
    renderModalProduct(product);

    openModal();
    renderModalBtns(currentID, cartList, wishList);
  } catch (err) {
    console.error('Error during loading product: ', err);
  }
}

export async function handleSearchFormSubmit(e) {
  e.preventDefault();

  const queue = e.target.elements.searchValue.value.trim();
  if (!queue) {
    /*     iziToast.error({
      message: 'Please, fill the input',
      position: 'topRight',
    }); */
    console.error('Please, fill the input');
    e.target.reset();
    return;
  }
  try {
    refs.productsList.innerHTML = '';
    const { products } = await searchProducts(queue);
    if (!products?.length) {
      //Notification no products
      refs.notFoundMes.classList.add('not-found--visible'); //div show 'not found'
      clearAllActiveClasses(
        document.querySelectorAll('.categories__btn'),
        'categories__btn--active'
      );
      return;
    }
    renderProducts(products);
    toggleActiveClass(
      document.querySelectorAll('.categories__btn'),
      document.querySelector('.categories__btn'),
      'categories__btn--active'
    );
  } catch (err) {
    console.error('Problems witch searching products:', err);
  }

  /* e.target.reset(); */
  refs.notFoundMes.classList.remove('not-found--visible');
}

export async function handleSearchFormClick(e) {
  refs.searchForm.reset();
  refs.notFoundMes.classList.remove('not-found--visible');

  toggleActiveClass(
    document.querySelectorAll('.categories__btn'),
    document.querySelector('.categories__btn'),
    'categories__btn--active'
  );

  try {
    refs.productsList.innerHTML = '';
    const { products } = await getProducts(currentPage);
    renderProducts(products);
  } catch (err) {
    console.error('Problems during searching products:', err);
  }
}

//===== Modal:
export async function onCartBtnModalClick() {
  isProductInList(currentID, cartList)
    ? cartList.splice(
        cartList.findIndex(v => v === currentID),
        1
      )
    : cartList.push(currentID);

  renderModalBtns(currentID, cartList, wishList);
  saveToLS('cart', cartList);

  updateNavCount('cart', cartList.length);

  if (document.title === 'Cart')
    try {
      const products = await getProductsByIds(cartList);
      const sum = totalSum(products, cartList);

      refs.productsList.innerHTML = '';
      renderProducts(products);
      renderCartSummary(cartList, sum);
    } catch (err) {
      console.error(`Error with wishlist page, ${err}`);
    }
}

export async function onWishBtnModalClick() {
  isProductInList(currentID, wishList)
    ? wishList.splice(
        wishList.findIndex(v => v === currentID),
        1
      )
    : wishList.push(currentID);

  renderModalBtns(currentID, cartList, wishList);
  saveToLS('wishlist', wishList);

  updateNavCount('wishlist', wishList.length);

  if (document.title === 'Wishlist')
    try {
      const products = await getProductsByIds(wishList);
      refs.productsList.innerHTML = '';
      renderProducts(products);
    } catch (err) {
      console.error(`Error with wishlist page, ${err}`);
    }
}

//===== Wishlist page:
export async function initWishlistPage() {
  cartList = getFromLS('cart') ?? [];
  wishList = getFromLS('wishlist') ?? [];

  updateNavCount('cart', cartList.length);
  updateNavCount('wishlist', wishList.length);

  try {
    const products = await getProductsByIds(wishList);
    refs.productsList.innerHTML = '';
    renderProducts(products);
  } catch (err) {
    console.error(`Error init wishlist page, ${err}`);
  }
}

//===== Cart page:
export async function initCartPage() {
  cartList = getFromLS('cart') ?? [];
  wishList = getFromLS('wishlist') ?? [];

  updateNavCount('cart', cartList.length);
  updateNavCount('wishlist', wishList.length);
  renderCartSummary(cartList);

  try {
    const products = await getProductsByIds(cartList);

    const sum = totalSum(products, cartList);

    refs.productsList.innerHTML = '';
    renderProducts(products);
    renderCartSummary(products, sum);
  } catch (err) {
    console.error(`Error init cart page, ${err}`);
  }
}
