import { isProductInList } from './helpers.js';
import { refs } from './refs.js';

export function renderCategories(categories) {
  const categoriesWithAll = ['All', ...categories];
  const markup = categoriesWithAll
    .map(
      category => `
      <li class="categories__item">
        <button class="categories__btn" type="button">${category}</button>
      </li>
    `
    )
    .join('');

  refs.categoriesList.innerHTML = markup;
}

export function renderModalProduct({
  thumbnail,
  title,
  tags,
  description,
  shippingInformation,
  returnPolicy,
  price,
  id,
}) {
  const tagsMarkup = tags
    ? `<ul class="modal-product__tags">${tags
        .map(tag => `<li class="modal-product__tag">${tag}</li>`)
        .join('')}</ul>`
    : '';
  const markup = `<img class="modal-product__img" src="${thumbnail}" alt="${title}" />
            <div class="modal-product__content">
            <p class="modal-product__title">${title}</p>
            ${tagsMarkup}
            <p class="modal-product__description">${description}</p>
            <p class="modal-product__shipping-information">Shipping: ${shippingInformation}</p>
            <p class="modal-product__return-policy">Return Policy: ${returnPolicy}</p>
            <p class="modal-product__price">Price: ${price}$</p>
            <button class="modal-product__buy-btn" type="button">Buy</button>
            </div>`;

  refs.modalProduct.innerHTML = markup;
}

export function renderProducts(products) {
  const markup = products
    .map(
      ({ id, title, thumbnail, category, price, brand }) => `
    <li class="products__item" data-id="${id}">
        <img class="products__image" src="${thumbnail}" alt="${title}" />
        <p class="products__title">${title}</p>
        <p class="products__brand"><span class="products__brand--bold">Brand:</span> ${brand}</p>
        <p class="products__category">Category: ${category}</p>
        <p class="products__price">Price: $${price}</p>
    </li>
  `
    )
    .join('');

  refs.productsList.insertAdjacentHTML('beforeend', markup);
}

export function updateNavCount(type, value) {
  const el = document.querySelector(`.nav__count[data-${type}-count]`);

  const key = `${type}Count`;
  el.dataset[key] = value;
  el.textContent = value;
}

export function renderModalBtns(currentID, cartList, wishList) {
  refs.modalCartBtn.textContent = isProductInList(currentID, cartList)
    ? 'Remove from cart'
    : 'Add to Cart';
  refs.modalWishBtn.textContent = isProductInList(currentID, wishList)
    ? 'Remove from Wishlist'
    : 'Add to Wishlist';
}

export function renderCartSummary(cartList, totalSum) {
  const elCount = document.querySelector('.cart-summary__value[data-count]');
  const elPrice = document.querySelector('.cart-summary__value[data-price]');

  elCount.textContent = cartList.length;
  elCount.dataset.count = cartList.length;

  elPrice.textContent = `$${~~totalSum}`;
  elPrice.dataset.price = totalSum;
}
