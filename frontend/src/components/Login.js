import React from 'react';
import LoginForm from './LoginForm';

export default function Login({ onLogin }) {
  return (
    <LoginForm formName='login-form' heading='Вход' submitText='Войти' onSubmit={onLogin} />
  );
}
