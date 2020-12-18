import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Button, Col, Row } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import _ from 'lodash';

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
    const mixedArr = _.sortBy(filter, [(item) => item.name])
    return (
      mixedArr.map(product => (
        <Col lg="3" md="4" sm="6" xs="12">
          <div className="product mb-5">
            <div className="product__image">

              <Button
                title="show details"
                color="link"
                onClick={() => onShowDetail(product)}
              >
                <img alt="product picture" src={product.thumbnail} />
              </Button>
            </div>
            <div className="product__info">
              <div className="product__info__title">{product.name}</div>
              <div className="product__info__addToCart">
                <div className="product__info__addToCart__price">{`${product.price}$`}</div>
                {/* <div
                  title="add to cart"
                  className="product__info__addToCart__button"
                  onClick={() => onAddToCartClick(product)}
                >
                  Add to cart
                      </div> */}
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