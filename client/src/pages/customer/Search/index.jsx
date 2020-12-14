import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Container, FormGroup, Input } from 'reactstrap';
import Banner from '../../../components/UI/Banner/MainBanner';
import Header from '../../../components/UI/Header';
import TopMenu from '../../../components/UI/TopMenu';
import Images from '../../../constants/images';
import { fetchProductData } from '../../../slices/product-slice';
import '../HomePage/Product.scss';
import SearchRender from './SearchRender';

Search.propTypes = {

};

function Search(props) {

  const dispatch = useDispatch();
  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(fetchProductData());
  }, [dispatch])

  const history = useHistory();

  const onShowDetail = (product) => {
    history.push(`/detail/${product._id}`);
  }

  return (
    <div className="search-page">
      <Header />
      <TopMenu />
      <Banner backgroundUrl={Images.Search} title="Search" />
      <div className="search">
        <Container>
          <FormGroup className="mb-5">
            <Input
              type="text"
              name="search"
              placeholder="Type something..."

              onChange={(e) => setSearch(e.target.value)}
            />
          </FormGroup>

          <SearchRender search={search} />
        </Container>

      </div>
    </div>
  );
}

export default Search;