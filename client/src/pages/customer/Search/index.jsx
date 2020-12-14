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
import SearchItem from './Search-item';

Search.propTypes = {

};

function Search(props) {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    dispatch(fetchProductData());
  }, [dispatch])

  return (
    <div className="search-page">
      <Header />
      <TopMenu />
      <FormGroup>
        <Input
          type="text"
          name="search"
          placeholder="Type something..."
          onChange={(e) => setSearchText(e.target.value)}
        />
      </FormGroup>
      <SearchItem search={searchText}/>
    </div>
  );
}

export default Search;