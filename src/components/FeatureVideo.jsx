import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setFavorite } from "../actions";
import '../assets/styles/components/FeatureVideo.scss'

const FeatureVideo = (props) => {
  const { cover, title, year, contentRating, duration } = props;
  const handleSetFavorite = () => {
    props.setFavorite({
      cover, title, year, contentRating, duration,
    });
  }
  return (
    <section
      className="main"
      style={{ backgroundImage: `url(${cover})` }}
    >
      <div className="main__description">
        <h2 className="main__description--title">{title}</h2>
        <h3>
          {year}
          {' '}
          {contentRating}
          {' '}
          {duration}
        </h3>
        <div>
          <button className="main__description--button" type="button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="26"
              height="26"
              viewBox="0 0 172 172"
            >
              <g
                fill="none"
                fillRule="nonzero"
                stroke="none"
                strokeWidth="1"
                strokeLinecap="butt"
                strokeLinejoin="miter"
                strokeMiterlimit="10"
                strokeDasharray=""
                strokeDashoffset="0"
                fontFamily="none"
                fontWeight="none"
                fontSize="none"
                textAnchor="none"
              >
                <path d="M0,172v-172h172v172z" fill="none" />
                <g fill="#ffffff">
                  <g id="surface1">
                    <path d="M133.67728,78.42849l-88.01562,-43.62019c-2.66166,-1.34375 -5.84015,-1.21454 -8.39844,0.33594c-2.55829,1.52464 -4.08294,4.26382 -4.08294,7.20974v87.31791c0,2.92007 1.52464,5.65925 4.08294,7.18389c1.39543,0.85276 2.94591,1.26622 4.52223,1.26622c1.34375,0 2.66166,-0.3101 3.87621,-0.90444l88.04147,-43.67188c2.89423,-1.42128 4.72896,-4.34135 4.72896,-7.54567c0,-3.20433 -1.86058,-6.1244 -4.75481,-7.57151z" />
                  </g>
                </g>
              </g>
            </svg>
            <span>Reproducir</span>
          </button>
          <button className="main__description--button" type="button" onClick={handleSetFavorite}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="24"
              height="24"
              viewBox="0 0 172 172"
            >
              <g
                fill="none"
                fillRule="nonzero"
                stroke="none"
                strokeWidth="1"
                strokeLinecap="butt"
                strokeLinejoin="miter"
                strokeMiterlimit="10"
                strokeDasharray=""
                strokeDashoffset="0"
                fontFamily="none"
                fontWeight="none"
                fontSize="none"
                textAnchor="none"
              >
                <path d="M0,172v-172h172v172z" fill="none" />
                <g fill="#ffffff">
                  <path d="M78.83333,21.5v57.33333h-57.33333v14.33333h57.33333v57.33333h14.33333v-57.33333h57.33333v-14.33333h-57.33333v-57.33333z" />
                </g>
              </g>
            </svg>
            <span>Mi lista</span>
          </button>
        </div>
      </div>
      <div className="main__background" />
    </section>
  );
}

FeatureVideo.propTypes = {
  title: PropTypes.string,
  year: PropTypes.number,
  contentRating: PropTypes.string,
  duration: PropTypes.number,
  cover: PropTypes.string,
};

const mapDispatchToProps = {
  setFavorite,
};

export default connect(null, mapDispatchToProps)(FeatureVideo);
