import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';
import Images from '../../../constants/images';

import './Carousel.scss';


SlideShow.propTypes = {

};

function SlideShow(props) {
  const items = [
    {
      src: Images.Slide2,
      altText: 'Slide 2',
      caption: 'Corsair PC',
      subCaption: 'Corsair is a leader in gaming gear ranging from cases to peripherals and components to streaming equipment. Visit now to shop or learn more.',
    },
    {
      src: Images.Slide1,
      altText: 'PC CASE',
      caption: 'PC CASE',
      subCaption: 'Case DEEPCOOL Matrexx 55$ Temp. - 6%. Case Cooler Master Masterbox MB500',
    },
    {
      src: Images.Slide3,
      altText: 'Slide 3',
      caption: 'VGA RTX2080',
      subCaption: 'Gigabyte GeForce RTX 2080 Gaming OC (GV-N2080GAMING OC-8GC)',
    }
  ];
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  }

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  }

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  }

  const slides = items.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <img src={item.src} alt={item.altText} />
        <CarouselCaption captionText={item.subCaption} captionHeader={item.caption} />
      </CarouselItem>
    );
  });

  return (
    <Carousel
      activeIndex={activeIndex}
      next={next}
      previous={previous}

    >
      <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
      {slides}
      <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
      <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
    </Carousel>
  );
}

export default SlideShow;