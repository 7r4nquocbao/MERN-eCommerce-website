import OrderDetail from '../models/order-detail-model.js';
import mongoose from 'mongoose';

export const getOrderDetails = async (req, res) => {
    const { id } = req.params;
    try {
        const orderDetails = await OrderDetail.find({ idOrder: id });
        res.status(200).json(orderDetails);
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