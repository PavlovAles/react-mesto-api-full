import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoPath from '../images/logo.svg';

function Header({ email, onLogout }) {
  const { pathname } = useLocation();
  let linkPath = '/';
  let linkText = 'Выйти';
  if (pathname === '/login') {
    linkPath = '/register';
    linkText = 'Регистрация';
  } else if (pathname === '/register') {
    linkPath = '/login';
    linkText = 'Войти';
  }

  return (
    <header className='header'>
      <img src={logoPath} alt='Логотип' className='logo' />
      <div className='header__controls'>
        <p className='header__email'>{email}</p>
        <Link to={linkPath} className='header__link' onClick={() => onLogout()}>
          {linkText}
        </Link>
      </div>
    </header>
  );
}

export default Header;
