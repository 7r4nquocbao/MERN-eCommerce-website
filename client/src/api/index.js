import axios from 'axios';

const appUrl = 'http://localhost:4000';
const productUrl = 'http://localhost:4000/products';
const orderUrl = 'http://localhost:4000/orders';
const authUrl = 'http://localhost:4000/auth';
const userUrl = 'http://localhost:4000/user';
const chatUrl = 'http://localhost:4000/messages';
const roomUrl = 'http://localhost:4000/rooms';
const orderDetailUrl = 'http://localhost:4000/orderdetails';
const commentlUrl = 'http://localhost:4000/comments';

// PRODUCT SIDE

export const fetchProducts = () => axios.get(productUrl);

export const createProduct = (product) => axios.post(`${productUrl}/create`, product);

export const deleteProduct = (id) => axios.delete(`${productUrl}/delete/${id}`);

// ORDER SIDE

export const fetchOrders = () => axios.get(orderUrl);

export const createOrder = (data) => axios.post(`${orderUrl}/create`, data);

export const cancelOrder = (id) => axios.put(`${orderUrl}/cancel/${id}`);

export const changeStatusOrder = (order) => axios.put(`${orderUrl}/status`, order);

export const getOrderOfUser = (id) => axios.get(`${orderUrl}/user/${id}`);

// AUTHENTICATE SIDE

export const registerUser = (userData) => axios.post(`${authUrl}/register`, userData);

export const activeUser = (token) => axios.post(`${authUrl}/activation`, token);

export const loginUser = (userData) => axios.post(`${authUrl}/login`, userData);

export const resetRequest = (email) => axios.put(`${authUrl}/forgotpassword`, email);

export const resetPassword = (passwordData) => axios.put(`${authUrl}/resetpassword`, passwordData);

export const readUser = (id, header) => axios.get(`${userUrl}/${id}`, header);

export const listUser = (data, header) => axios.post(`${userUrl}/list`, data, header);

export const updateUser = (data, header) => axios.put(`${userUrl}/update`, data, header);

// CHAT SIDE

export const fetchChat = (roomId) => axios.get(`${chatUrl}/${roomId}`);

export const createMessage = (message) => axios.post(`${chatUrl}/create`, message);

export const createRoom = (data) => axios.post(`${chatUrl}/room`, data);

export const getRooms = () => axios.get(`${roomUrl}`);

// ORDER DETAIL SIDE

export const getOrderDetails = (id) => axios.get(`${orderDetailUrl}/${id}`);

// COMMENT SIDE

export const createComment = (data) => axios.get(`${commentlUrl}/create`, data);


