import React from 'react';
import './Commitment.scss';

Commitment.propTypes = {

};

function Commitment(props) {
  return (
    <div class="container standard">
      <hr />
      <dl class="row">
        <dd class="col-md-4 text-center">
          <i class="far fa-check-circle fa-4x"></i>
          <br />
          <h5>Genuine goods</h5>
          <p>100% genuine goods checked by ABC company</p>
        </dd>
        <dd class="col-md-4 text-center">
          <i class="fas fa-exchange-alt fa-4x"></i>
          <br />
          <h5>Free within 7 days</h5>
          <p>Customers can waive the return of the product if it is damaged within 7 days</p>
        </dd>
        <dd class="col-md-4 text-center">
          <i class="fas fa-truck-monster fa-4x"></i>
          <br />
          <h5>Delivery Free</h5>
          <p>Free delivery within Ho Chi Minh city</p>
        </dd>
      </dl>
    </div>
  );
}

export default Commitment;