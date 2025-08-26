import { handleProductClick, initWishlistPage } from './js/handlers';
import { refs } from './js/refs';

//Логіка сторінки Wishlist
document.addEventListener('DOMContentLoaded', initWishlistPage);

refs.productsList.addEventListener('click', handleProductClick);
