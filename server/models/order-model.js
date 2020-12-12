import mongoose from 'mongoose';

const orderSchema = mongoose.Schema({
    status: {
        type: String,
        default: 'Order Processed'
    },
    total: Number,
    phone: Number,
    name: String,
    email: String,
    address: String,
    payment: String,
    orderCode: String,
    date : {
        type: Date,
        default: new Date()
    },
    idUser: String,
    isCancel: {
        type: Boolean,
        default: false
    }
});

const Order = mongoose.model('Order', orderSchema, 'orders');
export default Order;