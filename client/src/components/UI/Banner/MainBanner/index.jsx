import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import './Banner.scss';

Banner.propTypes = {
  backgroundUrl: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
};
Banner.defaultProps = {
  backgroundUrl: '',
  title: '',
}

function Banner(props) {
  const { backgroundUrl, title } = props;
  const backgroundStyle = backgroundUrl
    ? { backgroundImage: `url(${backgroundUrl})` }
    : {};

  return (
    <div className="banner" style={backgroundStyle}>
      <div className="banner__opacity">
        {title && <div className="banner__title">
          {title}
        </div>}
      </div>
    </div>
  );
}

export default Banner;