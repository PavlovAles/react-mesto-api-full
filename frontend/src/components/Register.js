import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from './LoginForm';

export default function Register({ onRegistration }) {
  return (
    <LoginForm
    formName='register-form'  
    heading='Регистрация'
      submitText='Зарегистрироваться'
      onSubmit={onRegistration}
      children={
        <p className='signup'>
          Уже зарегистрированы?{' '}
          <Link to='login' className='signup__link'>
            Войти
          </Link>
        </p>
      }
    />
  );
}
