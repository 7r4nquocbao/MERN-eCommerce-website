import mongoose from 'mongoose';

const orderDetailSchema = mongoose.Schema({
    idProduct: String,
    quantity: Number,
    price: Number,
    createAt : {
        type: Date,
        default: new Date()
    },
    idOrder : String
});

const OrderDetail = mongoose.model('OrderDetail', orderDetailSchema, 'order-details');
export default OrderDetail;