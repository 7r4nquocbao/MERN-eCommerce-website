import Order from '../models/order-model.js';
import OrderDetail from '../models/order-detail-model.js';
import Product from '../models/product-model.js';
import mongoose from 'mongoose';

export const getOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createOrder = async (req, res) => {
    const {order, orderDetails} = req.body;
    const products = await Product.find();
    let total = 0;
    console.log(orderDetails);
    for (const item of orderDetails) {
        const target = products.find(x => x._id == item.id);
        total += target.price * item.quantity;
    }
    const orderUpdated = {...order, total: total};
    const newOrder = new Order(orderUpdated);
    try {
        await newOrder.save().then(data => {
            for (const item of orderDetails) {
                const target = products.find(x => x._id == item.id);
                const itemUpdated = {...item, idProduct: item.id, price: target.price, idOrder: data._id}
                let newOrderDetail = new OrderDetail(itemUpdated);
                newOrderDetail.save();
            }
        })
        res.status(201).json({...order, ...orderDetails});
    } catch (error) {
        console.log(error.message);
        res.status(409).json({ message: error.message });
    }
}

export const cancelOrder = async (req, res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send(`No order with id: ${id}`);
    }
    const target = await Order.findById(id);
    if(target) {
        await Order.findByIdAndUpdate( id , {...target, isCancel: true }, { new: true} );
    }
    res.json({ message: "Order udpate successfully." });
}

export const changeStatusOrder = async (req, res) => {
    const { id, status } = req.body;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send(`No order with id: ${id}`);
    }
    const target = await Order.findById(id);
    if (target) {
        await Order.findByIdAndUpdate( id , {...target, status: status }, { new: true} );
    }
    res.json({ message: "Order udpate successfully." });
}