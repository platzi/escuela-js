import React from 'react';
import '../styles/components/Carousel.scss';

const Carousel = ({ children }) => (
  <div className="carousel">
    <div className="carousel__container">{children}</div>
  </div>
);

export default Carousel;
