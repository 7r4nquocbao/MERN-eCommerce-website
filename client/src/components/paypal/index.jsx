import React, { useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { createOrder } from '../../api';

function PayPal(props) {

    const {total, description} = props;
    const {dataOrder} = props;

    const history = useHistory();

    const paypalRef = React.useRef();
    useEffect(() => {
        window.paypal
          .Buttons({
            createOrder: (data, actions) => {
              return actions.order.create({
                intent: "CAPTURE",
                purchase_units: [
                  {
                    description: description,
                    amount: {
                      currency_code: "USD",
                      value: total,
                    },
                  },
                ],
              });
            },
            onApprove: async (data, actions) => {
              const order = await actions.order.capture();
              createOrder(dataOrder).then(res => {
                console.log(res.data);
                localStorage.setItem('cart', '[]');
                history.push('/cart');
              }).catch(err => {
                console.log(err);
              })
            },
            onError: (err) => {
              console.error(err);
            },
          })
          .render(paypalRef.current);
      }, []);
    return (
        <div>
            <div ref={paypalRef}></div>
        </div>
    );
}

export default PayPal;