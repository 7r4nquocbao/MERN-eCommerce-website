import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Button, Col, Row } from 'reactstrap';
import { useHistory } from 'react-router-dom';

SearchRender.propTypes = {
  search: PropTypes.string,
};
SearchRender.defaultProps = {
  search: '',
}

function SearchRender(props) {
  const { search } = props;
  const products = useSelector(state => state.products)

  const history = useHistory();

  const onShowDetail = (product) => {
    history.push(`/detail/${product._id}`);
  }

  const filterProduct = products.filter(product => {
    return product.name.toLowerCase().includes(search.toLowerCase());
  })

  const displayProduct = (filter) => {
    return (
      filter.map(product => (
        <Col lg="3" md="4" sm="6" xs="12">
          <div className="product mb-5">
            <div className="product__image">

              <Button
                color="link"
                onClick={() => onShowDetail(product)}
              >
                <img src={product.thumbnail} />
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
    <div>
      <div className="product-list">
        <Row>
          {
            displayProduct(filterProduct)
          }
        </Row>

      </div>

    </div>
  );
}

export default SearchRender;