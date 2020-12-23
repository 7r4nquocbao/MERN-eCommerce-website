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
        <img alt="logo" src={Logo} width={170} height={150} />
      </div>
      {/* <div className="footer__menu">
        <Col >
          <h4>Products</h4>
          <a title="monitor" href="/category/Monitor">Monitor</a>
          <a title="keyboard" href="/category/Keyboard">Keyboard</a>
          <a title="pc case" href="/category/PC Case">PC case</a>
          <a title="vga" href="/category/VGA">VGA</a>
        </Col>
        <Col>
          <h4>FOLLOW US</h4>
          <i class="fab fa-instagram-square"><a title="facebook" href="https://www.facebook.com/" target="_blank">facebook.com/techshield</a></i>
          <i class="fab fa-facebook-square"><a title="instagram" href="https://www.instagram.com/" target="_blank">instagram.com/techshield</a></i>
          <i class="fab fa-twitter-square"><a title="twitter" href="https://twitter.com/?lang=vi" target="_blank">twitter.com/techshield</a></i>
        </Col>
        <Col>
          <h4>CONTACT US</h4>
          <a>About Us</a>
          <a>Orders History</a>
          <a>My Account</a>
        </Col>

        
      </div> */}
      <Container>
        <Row>
          <Col className="col" lg="4" md="6" sm="12" xs="12">
            <h4>PRODUCTS</h4>
            <a title="monitor" href="/category/Monitor">Monitor</a>
            <a title="keyboard" href="/category/Keyboard">Keyboard</a>
            <a title="pc case" href="/category/PC Case">PC case</a>
            <a title="vga" href="/category/VGA">VGA</a>
          </Col>
          <Col className="col" lg="4" md="6" sm="12" xs="12">
            <h4>FOLLOW US</h4>
            <i class="fab fa-instagram-square"><a title="facebook" href="https://www.facebook.com/" target="_blank">facebook.com/techshield</a></i>
            <i class="fab fa-facebook-square"><a title="instagram" href="https://www.instagram.com/" target="_blank">instagram.com/techshield</a></i>
            <i class="fab fa-twitter-square"><a title="twitter" href="https://twitter.com/?lang=vi" target="_blank">twitter.com/techshield</a></i>
          </Col>
          <Col className="col" lg="4" md="6" sm="12" xs="12">
            <h4>FEATURES</h4>
            <a>About Us</a>
            <a>Orders History</a>
            <a>My Account</a>
          </Col>

        </Row>
      </Container>

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