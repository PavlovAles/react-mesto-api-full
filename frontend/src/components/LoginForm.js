import { useState } from 'react';

export default function LoginForm({ formName, heading, submitText, onSubmit, children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleChange(e) {
    e.target.name === 'email'
      ? setEmail(e.target.value)
      : setPassword(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(password, email);
    setEmail('');
    setPassword('');
  }

  return (
    <form className='login-form' name={formName} onSubmit={handleSubmit}>
      <h2 className='login-form__heading'>{heading}</h2>
      <fieldset className='login-form__input-container'>
        <input
          type='email'
          id='email'
          name='email'
          placeholder='Email'
          minLength={6}
          maxLength={200}
          required
          autoComplete='off'
          className='login-form__form-item'
          onChange={handleChange}
          value={email}
        />
        <input
          type='password'
          id='password'
          name='password'
          placeholder='Пароль'
          minLength={4}
          maxLength={200}
          required
          autoComplete='off'
          className='login-form__form-item'
          onChange={handleChange}
          value={password}
        />
        <button
          className='login-form__btn-confirm'
          type='submit'
          onSubmit={handleSubmit}
        >
          {submitText}
        </button>
      </fieldset>
      {children}
    </form>
  );
}
