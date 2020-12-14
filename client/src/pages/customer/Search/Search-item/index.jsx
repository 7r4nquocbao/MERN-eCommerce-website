import React from 'react';
import { useSelector } from 'react-redux';
import { Button, Col, Container, Row } from 'reactstrap';

function SearchItem(props) {

    const {search} = props;

  const productList = useSelector(state => state.products);

  const filterProduct = productList.filter(product => {
    return product.name.toLowerCase().includes(search.toLowerCase());
  })

  const displayProduct = (filter) => {
    return (
      filter.map(product => (
        <Col lg="3" md="4" sm="6" xs="12">
          <div className="product">
            <div className="product__image">

              <Button
                color="link"
              //onClick={() => onShowDetail(product)}
              >
                <img src={product.thumbnail} style={{width: '50%'}}/>
              </Button>
            </div>
            <div className="product__info">
              <div className="product__info__title">{product.name}</div>
              <div className="product__info__price">{product.price}</div>
              <div
                className="product__info__button"
              //onClick={() => AddToCartClick(product)}
              >
                Add to cart
              </div>
            </div>
          </div>
        </Col>
      ))
    )
  }

  return (
      <div className="search">
        <Container>
          <div className="product-list">
            <Row>
              {
                displayProduct(filterProduct)
              }
            </Row>
          </div>
        </Container>
      </div>
  );
}

export default SearchItem;