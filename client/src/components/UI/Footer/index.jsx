import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import Logo from '../../../assets/Images/main-logo.png'

import './Footer.scss';

Footer.propTypes = {

};

function Footer(props) {
  return (
    <div className="footer">
      <div className="footer__logo">
        <img src={Logo} width={170} height={150} />
      </div>
      <div className="footer__menu">
        <Col >
          <h4>Products</h4>
          <a href="/category/Monitor">Monitor</a>
          <a href="/category/Keyboard">Keyboard</a>
          <a href="/category/PC Case">PC case</a>
          <a href="/category/VGA">VGA</a>
        </Col>
        <Col>
          <h4>FOLLOW US</h4>
          <i class="fab fa-instagram-square"><a>facebook.com/techshield</a></i>
          <i class="fab fa-facebook-square"><a>instagram.com/techshield</a></i>
          <i class="fab fa-twitter-square"><a>twitter.com/techshield</a></i>
        </Col>
        <Col>
          <h4>CONTACT US</h4>
          <a>About Us</a>
          <a>Orders History</a>
          <a>My Account</a>
        </Col>

      </div>
      <hr />
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