import React, { useEffect, useState } from 'react';
import TopMenu from '../../../components/UI/TopMenu';
import Headers from '../../../components/UI/Header';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductData } from '../../../slices/product-slice';
import { unwrapResult } from '@reduxjs/toolkit';
import { Link } from 'react-router-dom';
import PayPal from '../../../components/paypal';
import Banner from '../../../components/UI/Banner/MainBanner';
import Images from '../../../constants/images';
import Footer from '../../../components/UI/Footer';

function Cart(props) {

    const productList = useSelector(state => state.products);
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(1);

    useEffect(async () => {
        document.title = 'SHOPPING CART';
        const result = await dispatch(fetchProductData());
        const filter = filterData(unwrapResult(result));
        let count = 1;
        for (const item of filter) {
            count += item.quantity * (item.price - (item.price * item.sale / 100));
        }
        setTotal(count);
        setData(filter);
    }, []);

    const filterData = (arr) => {
        if (arr) {
            const locCart = localStorage.getItem('cart');
            if (locCart === '') {
                return [];
            } else {
                let cartItems = JSON.parse(localStorage.getItem('cart'));
                if (cartItems) {
                    let dataFiltered = [];
                    for (const item of cartItems) {
                        let target = arr.find(thing => thing._id === item.id);
                        target = { ...target, quantity: item.quantity };
                        dataFiltered.push(target);
                    }
                    return dataFiltered;
                } else {
                    return [];
                }
            }
        } else {
            return [];
        }
    }

    const displayCart = () => {
        const cart = localStorage.getItem('cart');
        let cartItems = [];
        if (cart !== '') {
            cartItems = JSON.parse(cart);
        } else {

        }
        if (cartItems) {
            if (cartItems.length === 0) {
                return (
                    <div className="container-fluid full-screen d-flex align-items-center justify-content-center">
                        <div className="text-center">
                            <h1><i className="far fa-square" style={{ fontSize: '10rem' }}></i></h1>
                            <h1>Nothing here.</h1>
                        </div>
                    </div>
                )
            } else {
                return (
                    <div className="container cart-container">
                        <table class="table table-borderless table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Thubmnail</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Unit price</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {displayCartItem(data)}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colSpan='2'>
                                        <h4>Total</h4>
                                    </td>
                                    <td colSpan='2' className="text-danger">
                                        <h4>{calcTotal()}</h4>
                                    </td>
                                    <td>
                                        <Link to="/checkout/paypal">
                                            <button title="checkout by paypal" class="btn btn-success btn-block"> <i class="fab fa-cc-paypal mr-1"></i>Paypal</button>
                                        </Link>
                                    </td>
                                    <td>
                                        <Link to="/checkout">
                                            <button title="checkout by cash" class="btn btn-success btn-block"><i class="far fa-credit-card mr-1"></i>Checkout</button>
                                        </Link>
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                )

            }
        } else {
            return (
                <div className="container-fluid full-screen d-flex align-items-center justify-content-center">
                    <div className="text-center">
                        <h1><i className="far fa-square" style={{ fontSize: '10rem' }}></i></h1>
                        <h1>Nothing here.</h1>
                    </div>
                </div>
            )
        }
    }

    const displayCartItem = (list) => {
        if (list) {
            return (
                list && list.map((item, index) => {
                    return (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                                <img src={item.thumbnail} style={{ width: '100px' }} alt="img" />
                            </td>
                            <td>{item.name}</td>
                            <td>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', }).format(item.price)}</td>
                            <td>
                                <div className="btn-group" role="group">
                                    <button title="decrease" onClick={() => decreaseItem(item._id)} className="btn btn-danger"><i class="fas fa-minus"></i></button>
                                    <button className="btn btn-light font-weight-bold" style={{ width: '50px' }} disabled>{item.quantity}</button>
                                    <button title="increase" onClick={() => increaseItem(item._id)} className="btn btn-danger"><i class="fas fa-plus"></i></button>
                                </div>
                            </td>
                            <td>
                                <button title="remove" onClick={() => removeItem(item._id)} class="btn btn-danger"><i class="fas fa-trash"></i></button>
                            </td>
                        </tr>
                    )
                })
            )
        }
    }

    const calcTotal = () => {
        let total = 0;
        if (data) {
            for (const item of data) {
                total += item.quantity * (item.price - (item.price * item.sale / 100))
            }
        }
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', }).format(total);
    }

    const increaseItem = (id) => {
        let cartItems = JSON.parse(localStorage.getItem('cart'));
        if (cartItems) {
            let checkIndex = cartItems.findIndex(item => item.id === id);
            let cartUpdated = cartItems;
            let dataUpdated = data;
            if (dataUpdated[checkIndex].quantity < dataUpdated[checkIndex].stock) {
                cartUpdated[checkIndex].quantity++;
                dataUpdated[checkIndex].quantity++;
            }
            localStorage.setItem('cart', JSON.stringify(cartUpdated));
            setData([...dataUpdated]);
        }
    }

    const decreaseItem = (id) => {
        let cartItems = JSON.parse(localStorage.getItem('cart'));
        if (cartItems) {
            let checkIndex = cartItems.findIndex(item => item.id === id);
            let cartUpdated = cartItems;
            let dataUpdated = data;
            if (dataUpdated[checkIndex].quantity > 1) {
                cartUpdated[checkIndex].quantity--;
                dataUpdated[checkIndex].quantity--;
            }
            localStorage.setItem('cart', JSON.stringify(cartUpdated));
            setData([...dataUpdated]);
        }
    }

    const removeItem = (id) => {
        let cartItems = JSON.parse(localStorage.getItem('cart'));
        let cartUpdated = cartItems.filter(item => item.id !== id);
        let dataUpdated = data.filter(item => item._id !== id);
        localStorage.setItem('cart', JSON.stringify(cartUpdated));
        setData([...dataUpdated]);
    }

    return (
        <div>
            <Headers />
            <TopMenu />
            <Banner backgroundUrl={Images.MainBanner} title="Cart" />
            {displayCart()}
            <Footer />
        </div>
    );
}

export default Cart;