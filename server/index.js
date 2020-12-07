import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import productRoutes from './routes/product-routes.js';
import orderRoutes from './routes/order-routes.js';
import authRoutes from './routes/auth-routes.js';
import userRoutes from './routes/user-routes.js';
import morgan from 'morgan';
import dotenv from 'dotenv';

const app = express();
dotenv.config();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(morgan('dev'));

app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/auth', authRoutes);
app.use('/user', userRoutes);

const CONNECTION_URL = "mongodb://localhost:27017/e-commerce-website"
const PORT = process.env.PORT || 4000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));
    
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
