import React from 'react';
import PropTypes from 'prop-types';
import '../assets/styles/components/CarouselItem.scss';
import playIcon from '../assets/static/play.png';

const CarouselItem = ({ cover, title, year, contentRating, duration }) => (
  <div className="carousel-item">
    <img className="carousel-item__img" src={cover} alt={title} />
    <div className="carousel-item__details">
      <img
        className="carousel-item__details--img"
        src={playIcon}
        alt="play-icon"
      />
      <p className="carousel-item__details--title">{title}</p>
      <p className="carousel-item__details--subtitle">
        {year}
        {' '}
        {contentRating}
        {' '}
        {duration}
      </p>
    </div>
  </div>
);

CarouselItem.propTypes = {
  title: PropTypes.string,
  year: PropTypes.number,
  contentRating: PropTypes.string,
  duration: PropTypes.number,
  cover: PropTypes.string,
};

export default CarouselItem;
