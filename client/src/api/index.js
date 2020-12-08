import axios from 'axios';

const appUrl = 'http://localhost:4000';
const productUrl = 'http://localhost:4000/products';
const orderUrl = 'http://localhost:4000/orders';
const authUrl = 'http://localhost:4000/auth';
const userUrl = 'http://localhost:4000/user';
const chatUrl = 'http://localhost:4000/messages';
const roomUrl = 'http://localhost:4000/rooms';

// PRODUCT SIDE

export const fetchProducts = () => axios.get(productUrl);

export const createProduct = (product) => axios.post(`${productUrl}/create`, product);

export const deleteProduct = (id) => axios.delete(`${productUrl}/delete/${id}`);

// ORDER SIDE

export const fetchOrders = () => axios.get(orderUrl);

export const createOrder = (order) => axios.post(`${orderUrl}/create`, order);

export const cancelOrder = (id) => axios.put(`${orderUrl}/cancel/${id}`);

export const changeStatusOrder = (statusPayload) => axios.put(`${orderUrl}/status`, statusPayload);

// AUTHENTICATE SIDE

export const registerUser = (userData) => axios.post(`${authUrl}/register`, userData);

export const activeUser = (token) => axios.post(`${authUrl}/activation`, token);

export const loginUser = (userData) => axios.post(`${authUrl}/login`, userData);

export const resetRequest = (email) => axios.put(`${authUrl}/forgotpassword`, email);

export const resetPassword = (passwordData) => axios.put(`${authUrl}/resetpassword`, passwordData);

export const readUser = (id, header) => axios.get(`${userUrl}/${id}`, header);

export const listUser = (data, header) => axios.post(`${userUrl}/list`, data, header);

// CHAT SIDE

export const fetchChat = (roomId) => axios.get(`${chatUrl}/${roomId}`);

export const createMessage = (message) => axios.post(`${chatUrl}/create`, message);

export const createRoom = (data) => axios.post(`${chatUrl}/room`, data);

export const getRooms = () => axios.get(`${roomUrl}`);


