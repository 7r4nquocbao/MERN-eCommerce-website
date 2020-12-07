import React from 'react';
import PropTypes from 'prop-types';
import { FastField, Formik } from 'formik';
import { Form } from 'reactstrap';
import Header from '../../../../components/UI/Header';
import CheckOutForm from './CheckoutForm';
import Title from '../../../../components/UI/Title'
import TopMenu from '../../../../components/UI/TopMenu'

Checkout.propTypes = {

};

function Checkout(props) {

  const handleCheckout = (values) => {
    console.log(values)
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