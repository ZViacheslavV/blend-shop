import axios from 'axios';
import { API_ENDPOINTS, BASE_URL, ITEMS_PER_PAGE } from './constants';

axios.defaults.baseURL = BASE_URL;
export async function getProducts(page) {
  const skip = (page - 1) * ITEMS_PER_PAGE;
  const { data } = await axios.get(
    `${API_ENDPOINTS.PRODUCTS}?limit=${ITEMS_PER_PAGE}&skip=${skip}`
  );
  return data;
}
export async function getCategories() {
  const {data} =  await axios.get(`${API_ENDPOINTS.CATEGORIES}`);
  return data;
}
export async function getProductById(id) {
  const {data} =await axios.get(`${API_ENDPOINTS.PRODUCT_BY_ID}${id}`);
  return data;
}
export async function searchProducts(value) {
  const { data } = await axios.get(
    `${API_ENDPOINTS.SEARCH_PRODUCTS}?q=${value}`
  );
  return data;
}
export async function getProductsByCategories(category) {
  const { data } = await axios.get(
    `${API_ENDPOINTS.PRODUCTS_BY_CATEGORY}${category}`
  );
  return data;
}
export function getProductsByIds(ids) {
  return Promise.all(ids.map(id => getProductById(id)));
}