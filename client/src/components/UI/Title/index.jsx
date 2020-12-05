import React from 'react';
import PropTypes from 'prop-types';

import './Title.scss';
import { Container } from 'reactstrap';

Title.propTypes = {
  title: PropTypes.string,
};
Title.defaultProps = {
  title: '',
}

function Title(props) {
  const { title } = props;

  return (
    <Container>
      <div className="title">
        {title}
      </div>
    </Container>
  );
}

export default Title;