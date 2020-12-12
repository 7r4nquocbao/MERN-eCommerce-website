import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Header from '../../../components/UI/Header';
import TopMenu from '../../../components/UI/TopMenu';
import { FormGroup } from 'reactstrap';
import { Container } from 'reactstrap';
import { Input } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductData } from '../../../slices/product-slice';
import { Row } from 'reactstrap';
import { Col } from 'reactstrap';
import { Button } from 'reactstrap';
import { useHistory, useParams } from 'react-router-dom';

Search.propTypes = {

};

function Search(props) {
  const productList = useSelector(state => state.products);
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(fetchProductData);
  }, [])

  const filterProduct = productList.filter(product => {
    return product.name.toLowerCase().includes(search.toLowerCase());
  })

  const history = useHistory();

  const onShowDetail = (product) => {
    history.push(`/detail/${product._id}`);
  }

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
    <div className="search-page">
      <Header />
      <TopMenu />
      <div className="search">
        <Container>
          <FormGroup>
            <Input
              type="text"
              name="search"
              placeholder="Type something..."

              onChange={(e) => setSearch(e.target.value)}
            />
          </FormGroup>

          <div className="product-list">
            <Row>
              {
                displayProduct(filterProduct)
              }
            </Row>

          </div>
        </Container>

      </div>
    </div>
  );
}

export default Search;