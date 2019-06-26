import React from 'react';

const Carousel = ({ children }) => (
  <div className="carousel">
    <div className="carousel__container">
      {children}
    </div>
  </div>
);

export default Carousel;