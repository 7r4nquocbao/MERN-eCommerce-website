import Order from '../models/order-model.js';
import OrderDetail from '../models/order-detail-model.js';
import Product from '../models/product-model.js';
import User from '../models/auth-model.js';
import mongoose from 'mongoose';
import sgMail from '@sendgrid/mail';

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
    let orderListText = '';
    console.log(orderDetails);
    for (const item of orderDetails) {
        const target = products.find(x => x._id == item.id);
        const productUpdated = {...target._doc, stock: target.stock - item.quantity};
        await Product.findByIdAndUpdate(target._id, productUpdated, {new: true});
        total += target.price * item.quantity;
        orderListText += `<h2>${productUpdated.name} x ${item.quantity}</h2>`;
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

        try {
            const user = await User.findById(order.idUser);
            const save = user._doc;
            User.findByIdAndUpdate(order.idUser, {...save, point: save.point + Math.ceil(total/100)}).exec((err, data) => {
                console.log(save);
            })           
        } catch {
        }
        const emailForm = {
            from: "7r4nquocbao@gmail.com",
            to: order.email,
            subject: 'Thank for your purchase',
            html: `
                <h1>Your order code is #${order.orderCode.split("").reverse().join("").slice(0,7)}</h1>
                ${orderListText}
                <h2 style="color:red;">Total: ${Intl.NumberFormat('de-DE', { style: 'currency', currency: 'USD' }).format(total)}</h2>
                <h4>At ${new Date().toLocaleString()}</h4>
            `
        }

        sgMail.send(emailForm).then(sent => {
            console.log(`Email has been sent to ${order.email}`);              
        }).catch (err => {
            console.log(err);
        })
        res.status(201).json({...order, ...orderDetails});
    } catch (error) {
        console.log(error.message);
        res.status(409).json({ message: error.message });
    }
}

export const cancelOrder = async (req, res) => {
    const {id} = req.params;
    console.log(id);
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send(`No order with id: ${id}`);
    }
    const target = await Order.findById(id);
    const newOrder = {...target._doc, isCancel: true, status: 'Canceled' };
    console.log(newOrder);
    Order.findByIdAndUpdate( id , newOrder, { new: true } ).exec((err,data) => {
        if(err || !data) {
            res.status(404).json(err);
        } else {
            res.status(200).json(data);
        }
    })
}

export const changeStatusOrder = async (req, res) => {
    const order = req.body;
    Order.findByIdAndUpdate(order._id, order , { new: true }).exec((err, data) => {
        if(err || !data) {
            res.status(404).json(err);
        } else {
            res.json({ message: "Order udpate successfully." });
        }
    })
}


export const getOrderOfUser = async (req, res) => {
    const {id} = req.params;
    try {
        const orders = await Order.find({ idUser: id });
        res.status(200).json(orders);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}