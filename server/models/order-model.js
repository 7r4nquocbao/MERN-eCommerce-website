import mongoose from 'mongoose';

const orderSchema = mongoose.Schema({
    status: String,
    total: Number,
    phone: Number,
    customerName: String,
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