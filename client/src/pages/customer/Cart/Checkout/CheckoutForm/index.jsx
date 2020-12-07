import { FastField, Form, Formik } from 'formik';
import React from 'react';
import { Button } from 'reactstrap';

import PropTypes from 'prop-types';
import './Checkout.scss';
import InputField from '../../../../../custom-fields/InputField';
import RadioField from '../../../../../custom-fields/RadioField';
import { Link } from 'react-router-dom';
import * as yub from 'yup';

CheckOutForm.propTypes = {
  onSubmit: PropTypes.func,
};
CheckOutForm.defaultProps = {
  onSubmit: null,
}

function CheckOutForm(props) {
  const initialValues = {
    name: '',
    address: '',
    phone: '',
    email: '',
    pay: 'delivery',
  }
  const validateSchema = yub.object().shape({
    name: yub.string()
      .min(2, "Minimum 2 characters")
      .max(50, "Maximum 50 characters")
      .required('This field is required'),

    email: yub.string()
      .email("Invalid email format")
      .required('This field is required'),

    address: yub.string()
      .min(10, "Invalid address")
      .max(200, "Maximum 100 characters")
      .required('This field is required'),

    phone: yub.number()
      .required('This field is required'),

  });
  const { cart } = props;
  console.log('cart: ', { cart });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={props.onSubmit}
      validationSchema={validateSchema}
    >

      {
        formikProps => {

          return (
            <Form className="checkout-form">
              <FastField
                name="name"
                component={InputField}

                label="Name's Receiver"
                placeholder="Press name's receiver..."
              />
              <FastField
                name="address"
                component={InputField}

                label="Address"
                placeholder="Press address..."
              />
              <FastField
                name="phone"
                component={InputField}

                label="Phone number"
                placeholder="Press phone number..."
              />
              <FastField
                name="email"
                component={InputField}

                label="Email"
                placeholder="Press email..."
              />
              <div className="choices">
                <FastField
                  name="pay"
                  component={RadioField}

                  id="delivery"
                  label="Payment on delivery"
                />
                <FastField
                  name="pay"
                  component={RadioField}

                  id="paypal"
                  label="Payment by Paypal"
                />
              </div>
              <Button
                color="danger"
                type="submit"
              >Submit</Button><span><Link to="/cart">| Back to cart</Link></span>
            </Form>
          );
        }
      }

    </Formik>
  );
}

export default CheckOutForm;