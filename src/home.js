/* import './js/modal'
import './js/helpers'
import './js/products-api'
import './js/handlers' */

import {
  handleCategoryClick,
  handleProductClick,
  handleSearchFormClick,
  handleSearchFormSubmit,
  initHomePage,
} from './js/handlers';
import { refs } from './js/refs';

document.addEventListener('DOMContentLoaded', initHomePage);

refs.categoriesList.addEventListener('click', handleCategoryClick);

refs.productsList.addEventListener('click', handleProductClick);

refs.searchFormBtnClear.addEventListener('click', handleSearchFormClick);

refs.searchForm.addEventListener('submit', handleSearchFormSubmit);
