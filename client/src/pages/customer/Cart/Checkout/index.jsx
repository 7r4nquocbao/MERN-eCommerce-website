import React from 'react';
import PropTypes from 'prop-types';
import { FastField, Formik } from 'formik';
import { Form } from 'reactstrap';
import Header from '../../../../components/UI/Header';
import CheckOutForm from './CheckoutForm';
import Title from '../../../../components/UI/Title'
import TopMenu from '../../../../components/UI/TopMenu'
import { createOrder } from '../../../../api';

Checkout.propTypes = {

};

function Checkout(props) {

  const handleCheckout = (values) => {

    const order = values;
    const orderDetails = JSON.parse(localStorage.getItem('cart')); 
    const data = {
      order: order,
      orderDetails: orderDetails
    }
    
    createOrder(data).then(res => {
      console.log(res.data);
    }).catch(err => {
      console.log(err);
    })
  }

  return (
    <div className="checkout">
      <Header />
      <TopMenu />
      <Title title="Checkout Information" />
      <CheckOutForm onSubmit={handleCheckout} />
    </div>
  )
}

export default Checkout;