import React from 'react';
import PropTypes from 'prop-types';
import '../assets/styles/components/Player.scss';

const Player = ({ location, history }) => {
  const { state } = location;
  return (
    <div className='Player'>
      <video controls autoPlay>
        <source src={state.source} type='video/mp4' />
        Your browser does not support HTML5 video.
      </video>
      <div className='Player-back'>
        <button type='button' onClick={() => history.goBack()}>
          Regresar
        </button>
      </div>
    </div>
  );
};

Player.propTypes = {
  location: PropTypes.object,
};

export default Player;
