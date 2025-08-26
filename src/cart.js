import { handleProductClick, initCartPage } from './js/handlers';
import { refs } from './js/refs';

//Логіка сторінки Cart
document.addEventListener('DOMContentLoaded', initCartPage);

refs.productsList.addEventListener('click', handleProductClick);
