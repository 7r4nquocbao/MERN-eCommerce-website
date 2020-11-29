import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
    name: String,
    price: Number,
    sale: Number,
    thumbnail: String,
    stock: Number,
    images: [String],
    idCategory: String,
    idBrand: String,
    createAt : {
        type: Date,
        default: new Date()
    }
});

const Product = mongoose.model('Product', productSchema, 'products');
export default Product;