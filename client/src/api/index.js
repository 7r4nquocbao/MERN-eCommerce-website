import axios from 'axios';

const appUrl = 'https://e-com-mern-project.herokuapp.com/';
const productUrl = 'https://e-com-mern-project.herokuapp.com/products';
const orderUrl = 'https://e-com-mern-project.herokuapp.com/orders';
const authUrl = 'https://e-com-mern-project.herokuapp.com/auth';
const userUrl = 'https://e-com-mern-project.herokuapp.com/user';
const chatUrl = 'https://e-com-mern-project.herokuapp.com/messages';
const roomUrl = 'https://e-com-mern-project.herokuapp.com/rooms';
const orderDetailUrl = 'https://e-com-mern-project.herokuapp.com/orderdetails';
const commentlUrl = 'https://e-com-mern-project.herokuapp.com/comments';

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

export const viewUser = (id) => axios.get(`${userUrl}/view/${id}`);

export const setAdmin = (id) => axios.post(`${userUrl}/set-admin/${id}`);

// CHAT SIDE

export const fetchChat = (roomId) => axios.get(`${chatUrl}/${roomId}`);

export const createMessage = (message) => axios.post(`${chatUrl}/create`, message);

export const createRoom = (data) => axios.post(`${chatUrl}/room`, data);

export const getRooms = () => axios.get(`${roomUrl}`);

// ORDER DETAIL SIDE

export const getOrderDetails = (id) => axios.get(`${orderDetailUrl}/${id}`);

// COMMENT SIDE

export const createComment = (data) => axios.post(`${commentlUrl}/create`, data);

export const getComments = (id) => axios.get(`${commentlUrl}/${id}`);


