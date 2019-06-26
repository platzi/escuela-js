import React from 'react';

const CarouselItem = (props) => (
  <div className="carousel-item">
    <img className="carousel-item__img" src={props.image} alt="" />
    <div className="carousel-item__details">
      <img className="carousel-item__details--img" src="play.png" alt="play-icon" />
      <p className="carousel-item__details--title">{props.title}</p>
      <p className="carousel-item__details--subtitle">
        {props.year}
        {' '}
        {props.contetType}
        {' '}
        {props.duration}
      </p>
    </div>
  </div>
);

export default CarouselItem;