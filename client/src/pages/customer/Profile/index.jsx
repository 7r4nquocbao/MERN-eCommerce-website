import React from 'react';
import PropTypes from 'prop-types';
import Header from '../../../components/UI/Header';
import TopMenu from '../../../components/UI/TopMenu';
import { isAuth } from '../../../helpers/auth';
import { Col, Container, Row } from 'reactstrap';

Profile.propTypes = {

};

function Profile(props) {
  return (
    <div>
      <Header />
      <TopMenu />
      <Container>
        {
          isAuth() && <Row>
            <Col md="2">
              <p>Name</p>
            </Col>
            <Col md="10">
              <p>{isAuth().name}</p>
            </Col>
            <Col md="2">
              <p>Gender</p>
            </Col>
            <Col md="10">
              <p>{isAuth().gender}</p>
            </Col>
            <Col md="2">
              <p>Email address</p>
            </Col>
            <Col md="10">
              <p>{isAuth().email}</p>
            </Col>
            <Col md="2">
              <p>Phone number</p>
            </Col>
            <Col md="10">
              <p>{isAuth().phone}</p>
            </Col>
            <Col md="2">
              <p>Address</p>
            </Col>
            <Col md="10">
              <p>{isAuth().address}</p>
            </Col>
          </Row>
        }

      </Container>

    </div>
  );
}

export default Profile;