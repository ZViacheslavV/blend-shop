export function toggleActiveClass(elements, activeEl, activeClass) {
  elements.forEach(el => {
    el.classList.remove(activeClass);
  });
  activeEl.classList.add(activeClass);
}

export function clearAllActiveClasses(elements, activeClass) {
  elements.forEach(el => {
    el.classList.remove(activeClass);
  });
}

export function isProductInList(productID, list) {
  return list.some(lisId => lisId === productID);
}

export function totalSum(products, cartList) {
  return products.reduce(
    (acc, { price, id }) =>
      cartList.some(prId => prId === id) ? acc + Math.ceil(price) : acc,
    0
  );
}
