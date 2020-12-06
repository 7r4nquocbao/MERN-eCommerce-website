import React, { useEffect, useState } from 'react';
import TopMenu from '../../../components/UI/TopMenu';
import Headers from '../../../components/UI/Header';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductData } from '../../../slices/product-slice';
import { unwrapResult } from '@reduxjs/toolkit';

function Cart(props) {

    const productList = useSelector(state => state.products);
    const dispatch = useDispatch();
    const [data, setData] = useState([]);

    useEffect(async () => {
        const result = await dispatch(fetchProductData());
        const filter = filterData(unwrapResult(result));
        console.log('ddddd');
        setData(filter);
    }, [])

    const filterData = (arr) => {
        if(arr) {
            let cartItems = JSON.parse(localStorage.getItem('cart'));
            if(cartItems) {
                let dataFiltered = [];
                for (const item of cartItems) {
                    let target = arr.find(thing => thing._id === item.id);
                    target = {...target, quantity: item.quantity};
                    dataFiltered.push(target);
                }
                return dataFiltered;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    const displayCart = () => {
        const cartItems = JSON.parse(localStorage.getItem('cart'));
        if (cartItems.length > 0) {
            return(
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
                                <td colSpan='2'>
                                    <button class="btn btn-success btn-block"><i class="far fa-credit-card"></i> Checkout</button>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            )
        } else {
            return(
                <div className="container-fluid full-screen d-flex align-items-center justify-content-center">
                    <div className="text-center">
                        <h1><i className="far fa-square" style={{fontSize: '10rem'}}></i></h1>
                        <h1>Nothing here.</h1>
                    </div>
                </div>
            )
        }
    }

    const displayCartItem = (list) => {
        if(list) {
            return (
                list && list.map((item, index) => {
                    return (
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td>
                                <img src={item.thumbnail} style={{width: '40px'}} alt="img"/>
                            </td>
                            <td>{item.name}</td>
                            <td>{new Intl.NumberFormat('en-US', {style: 'currency',currency: 'USD',}).format(item.price)}</td>
                            <td>
                                <div className="btn-group" role="group">
                                    <button onClick={() => decreaseItem(item._id)} className="btn btn-danger"><i class="fas fa-minus"></i></button>
                                    <button className="btn btn-light font-weight-bold" style={{width: '50px'}} disabled>{item.quantity}</button>
                                    <button onClick={() => increaseItem(item._id)} className="btn btn-danger"><i class="fas fa-plus"></i></button>
                                </div>
                            </td>
                            <td>
                                <button onClick={() => removeItem(item._id)} class="btn btn-danger"><i class="fas fa-trash"></i></button>
                            </td>
                        </tr>
                    )
                })
            )
        }
    }

    const calcTotal = () => {
        let total = 0;
        if(data) {
            for (const item of data) {
                total += item.quantity * (item.price - (item.price * item.sale / 100)) 
            }
        }
        return new Intl.NumberFormat('en-US', {style: 'currency',currency: 'USD',}).format(total);
    }

    const increaseItem = (id) => {
        let cartItems = JSON.parse(localStorage.getItem('cart'));
        if(cartItems) {
            let checkIndex = cartItems.findIndex(item => item.id === id);
            let cartUpdated = cartItems;            
            let dataUpdated = data;
            if(dataUpdated[checkIndex].quantity < dataUpdated[checkIndex].stock) {
                cartUpdated[checkIndex].quantity++;
                dataUpdated[checkIndex].quantity++;
            }
            localStorage.setItem('cart' ,JSON.stringify(cartUpdated));
            setData([...dataUpdated]);
        }
    }

    const decreaseItem = (id) => {
        let cartItems = JSON.parse(localStorage.getItem('cart'));
        if(cartItems) {
            let checkIndex = cartItems.findIndex(item => item.id === id);
            let cartUpdated = cartItems;            
            let dataUpdated = data;
            if(dataUpdated[checkIndex].quantity > 1) {
                cartUpdated[checkIndex].quantity--;
                dataUpdated[checkIndex].quantity--;
            }
            localStorage.setItem('cart' ,JSON.stringify(cartUpdated));
            setData([...dataUpdated]);
        }
    }

    const removeItem = (id) => {
        let cartItems = JSON.parse(localStorage.getItem('cart'));
        let cartUpdated = cartItems.filter(item => item.id !== id);
        let dataUpdated = data.filter(item => item._id !== id);
        localStorage.setItem('cart' ,JSON.stringify(cartUpdated));
        setData([...dataUpdated]);
    }

    return (
        <div>
            <Headers/>
            <TopMenu/>
            {displayCart()}
        </div>
    );
}

export default Cart;