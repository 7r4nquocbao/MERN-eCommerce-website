import axios from 'axios';

const appUrl = 'http://localhost:4000';
const productUrl = 'http://localhost:4000/products';
const orderUrl = 'http://localhost:4000/orders';
const authUrl = 'http://localhost:4000/auth';
export const FACEBOOK_API = '453789795777618';

// PRODUCT SITE

export const fetchProducts = () => axios.get(productUrl);

export const createProduct = (product) => axios.post(`${productUrl}/create`, product);

export const deleteProduct = (id) => axios.delete(`${productUrl}/delete/${id}`);

// ORDER SITE

export const fetchOrders = () => axios.get(orderUrl);

export const createOrder = (order) => axios.post(`${orderUrl}/create`, order);

export const cancelOrder = (id) => axios.put(`${orderUrl}/cancel/${id}`);

export const changeStatusOrder = (statusPayload) => axios.put(`${orderUrl}/status`, statusPayload);

// AUTHENTICATE SITE
export const registerUser = (userData) => axios.post(`${authUrl}/register`, userData);

export const activeUser = (token) => axios.post(`${authUrl}/activation`, token);

export const loginUser = (userData) => axios.post(`${authUrl}/login`, userData);

export const resetRequest = (email) => axios.put(`${authUrl}/forgotpassword`, email);

export const resetPassword = (passwordData) => axios.put(`${authUrl}/resetpassword`, passwordData);

// FACEBOOK AUTH

export const facebookToken = (data) => axios.post(`${authUrl}/facebook-login`, data);


