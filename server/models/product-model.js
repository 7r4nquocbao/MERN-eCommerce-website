import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
    name: String,
    price: Number,
    sale: Number,
    thumbnail: String,
    stock: Number,
    images: [String],
    category: String,
    brand: String,
    description: String,
    descriptionDetail: String,
    isEnable: {
        type: Boolean,
        default: true
    },
    createAt : {
        type: Date,
        default: new Date()
    }
});

const Product = mongoose.model('Product', productSchema, 'products');
export default Product;