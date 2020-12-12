import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Header from '../../../components/UI/Header';
import TopMenu from '../../../components/UI/TopMenu';
import './Details.scss';
import { Button, Container, Table } from 'reactstrap';
import Title from '../../../components/UI/Title';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductData } from '../../../slices/product-slice';
import { unwrapResult } from '@reduxjs/toolkit';
import { useParams } from 'react-router-dom';
import Rating from '@material-ui/lab/Rating';
Detail.propTypes = {

};

function Detail(props) {

  const { productID } = useParams();

  const productList = useSelector(state => state.products);

  const [product, setProduct] = useState({});
  const [specs, setSpecs] = useState([]);
  const [star, setStar] = useState(5);
  const dispatch = useDispatch()

  useEffect(async () => {
    const result = await dispatch(fetchProductData());
    const filter = filterProduct(unwrapResult(result));
    setProduct(filter);
    setSpecs(JSON.parse(filter.description))
    console.log("123", filter)
    console.log("1233", product)
  }, [])

  const filterProduct = (product) => {
    return product.find(item => item._id === productID);
  }

  const handleAddToCart = () => {
    console.log("abc");
  }
  const displaySpecs = () => {
    console.log('asd', specs);
    return (
      specs && specs.map((item, index) => {
        return (
          <tr key={index}>
            <td>{item.type}</td>
            <td>{item.content}</td>
          </tr>
        )
      })
    )
  }
  return (
    <div>
      <Header />
      <TopMenu />

      <Container>
        {console.log("2", product)}
        <div className="product-detail">
          <div className="product-detail__img">
            <img src={product.thumbnail} />
          </div>
          <div className="product-detail__info">
            <div className="detail-title">
              <p>{product.name}</p>
            </div>
            <div className="detail-info">
              <p>{product.descriptionDetail}</p>
            </div>
            <div className="detail-price">
              <p>{`${product.price}$`}</p>
            </div>
            <Button
              className="btn-addToCart"
              onClick={() => handleAddToCart(product)}
            >
              Add to cart
            </Button>
          </div>
        </div>

        <Title title="Related Products" />
        <div className="related-products">
          {
            //JSON.stringify(productRelated())
          }
        </div>

        <Title title="Details" />
        <div className="table-detail">
          <Table striped>
            <tbody>
              {displaySpecs()}
            </tbody>
          </Table>
        </div>

        <Title title="Customer's Evaluate" />
        <div className="form-floating">
            <textarea className="form-control" style={{height: '100px'}} placeholder='Comment'/>
        </div>
        <Rating
          name="simple-controlled"
          value={star}
          onChange={(event, newValue) => {
            setStar(newValue);
          }}
        />

      </Container>
    </div>

  );
}

export default Detail;