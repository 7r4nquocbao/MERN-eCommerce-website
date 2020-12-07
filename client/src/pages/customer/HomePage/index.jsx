import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './Product.scss';

import Headers from '../../../components/UI/Header';
import TopMenu from '../../../components/UI/TopMenu';
import Banner from '../../../components/UI/Banner/MainBanner';
import Footer from '../../../components/UI/Footer';

import Images from '../../../constants/images';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductData } from '../../../slices/product-slice';
import { Col, Container } from 'reactstrap';
import { Button } from 'reactstrap';
import { Row } from 'reactstrap';

HomePage.propTypes = {

};

function HomePage(props) {

  const productList = useSelector(state => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductData());
  }, [])

  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')));

  const onAddToCartClick = (item) => {

    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    if(cartItems === []) {
      let newItem = { id: item._id, quantity: 1 };
      cartItems.push(newItem);
    } else {
      let checkExists = cartItems.findIndex(cartItem => cartItem.id === item._id);
      if (checkExists !== -1) {
        cartItems[checkExists].quantity += 1;
      } else {
        let newItem = { id: item._id, quantity: 1 };
        cartItems.push(newItem);
      }
    }

    localStorage.setItem('cart', JSON.stringify(cartItems));
    setCart([...cartItems]);
  }

  return (
    <div className="HomePage">
      <Headers />
      <TopMenu />
      <Banner
        backgroundUrl={Images.MainBanner}
        title="CORSAIR"
        description="Corsair is a leader in gaming gear ranging from cases to peripherals and components to streaming equipment. Visit now to shop or learn more."
      />
      <div className="product-list">
        <Container>
          <Row>
            {
              productList.map(product => (
                <Col lg="3" md="4" sm="6" xs="12">
                  <div className="product mb-5">
                    <div className="product__image">

                      <Button
                        color="link"
                      //onClick={() => onShowDetail(product)}
                      >
                        <img src={product.thumbnail} />
                      </Button>

                    </div>
                    <div className="product__info">
                      <div className="product__info__title">{product.name}</div>
                      <div className="product__info__price">{product.price}</div>
                      <div
                        className="product__info__button"
                        onClick={() => onAddToCartClick(product)}
                      >
                        Add to cart
                      </div>
                    </div>
                  </div>
                </Col>
              ))
            }
          </Row>
        </Container>
        <Footer />
      </div>
    </div>
  );
}

export default HomePage;