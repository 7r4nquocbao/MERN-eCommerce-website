import React from 'react';
import { Col, Row } from 'reactstrap';

import './Footer.scss';

Footer.propTypes = {

};

function Footer(props) {
  return (
    <div className="footer">
      <div className="footer__logo">
        LOGO
      </div>
      <div className="footer__menu">
        <Col>
          <h4>MENU</h4>
          <a>About Us</a>
          <a>Orders History</a>
          <a>My Account</a>
        </Col>
        <Col>
          <h4>FEATURE</h4>
          <a>About Us</a>
          <a>Orders History</a>
          <a>My Account</a>
        </Col>
        <Col>
          <h4>FOLLOW US</h4>
          <a>About Us</a>
          <a>Orders History</a>
          <a>My Account</a>
        </Col>
        <Col>
          <h4>CONTACT US</h4>
          <a>About Us</a>
          <a>Orders History</a>
          <a>My Account</a>
        </Col>
      </div>
      <Row className="footer__paypal">
        <Col sm="auto">
          <i class="fab fa-cc-visa fa-3x"></i>
        </Col>
        <Col sm="auto">
          <i class="fab fa-cc-paypal fa-3x"></i>
        </Col>
        <Col sm="auto">
          <i class="fab fa-cc-mastercard fa-3x"></i>
        </Col>
      </Row>

    </div>
  );
}

export default Footer;