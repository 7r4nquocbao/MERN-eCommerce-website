import OrderDetail from '../models/order-detail-model.js';
import Order from '../models/order-model.js';
import Product from '../models/product-model.js';
import mongoose from 'mongoose';

export const getOrderDetails = async (req, res) => {
    const { id } = req.params;
    try {
        const order = await Order.findOne({ _id: id });
        const orderDetails = await OrderDetail.find({ idOrder: id });
        const products = await Product.find();
        const orderDetailsUpdated = orderDetails.map(item => {
            return ({...item._doc, productName: products.find(x => x._id == item.idProduct).name});
        })
        const orderData = {order, orderDetailsUpdated};
        res.status(200).json(orderData);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createOrderDetail = async (req, res) => {
    const orderDetailList = req.body;
    console.log(orderDetailList);
    //const newOrderDetails = new OrderDetail(orderDetailList);
    try {
        for (const item of orderDetailList) {
            let newOrderDetail = new OrderDetail(item);
            await newOrderDetail.save();
        }
        res.status(201).json(orderDetailList);
    } catch (error) {
        console.log(error.message);
        res.status(409).json({ message: error.message });
    }
}