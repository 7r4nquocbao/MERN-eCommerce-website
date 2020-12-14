import React, { useEffect, useRef } from 'react';

function PayPal(props) {

    const {total, description} = props;

    const [paid, setPaid] = React.useState(false);
    const [error, setError] = React.useState(null);
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
              setPaid(true);
              console.log(order);
            },
            onError: (err) => {
            //   setError(err),
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