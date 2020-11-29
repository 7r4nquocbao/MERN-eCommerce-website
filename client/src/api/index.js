import axios from 'axios';

const url = 'http://localhost:4000/products';

export const fetchProducts = () => axios.get(url);

export const createProduct = (product) => axios.post(`${url}/create`, product);

export const deleteProduct = (id) => axios.delete(`${url}/delete/${id}`);