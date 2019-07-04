import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import gravatar from '../utils/gravatar';
import '../assets/styles/components/Header.scss';
import logo from '../assets/static/logo-platzi-video-BW2.png';
import userIcon from '../assets/static/user-icon.png';

const Header = ({ user }) => (
  <header className="header">
    <Link to="/">
      <img className="header__img" src={logo} alt="Platzi Video" />
    </Link>
    {Object.keys(user).length > 0 && (
      <div className="header__menu">
        <div className="header__menu--profile">
          <img src={gravatar(user.email) || userIcon} alt={user.email} />
          <p>Perfil</p>
        </div>
        <ul>
          <li><a href="/">{user.name}</a></li>
          <li><a href="/">Cerrar Sesión</a></li>
        </ul>
      </div>
    )}
  </header>
);

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, null)(Header);