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
  description: '',
}

function Banner(props) {
  const { backgroundUrl, title, description } = props;
  const backgroundStyle = backgroundUrl
    ? { backgroundImage: `url(${backgroundUrl})` }
    : {};

  return (
    <div className="banner" style={backgroundStyle}>
      <div className="banner__opacity">
        <div className="banner__info">
          {title && <div className="banner__info__title">
            {title}
          </div>}
          {description && <div className="banner__info__description">
            {description}
          </div>}
          <div className="button">
            <Link to="">Learn more</Link>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Banner;