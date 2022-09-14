import React from 'react';
import PopupWithForm from './PopupWithForm';

export default function AddPlacePopup({
  isOpen,
  onClose,
  onAddPlace,
  errorMessage,
}) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  React.useEffect(() => {
    setName('');
    setLink('');
  }, [isOpen]);

  function handleChange(e) {
    e.target.name === 'place-name'
      ? setName(e.target.value)
      : setLink(e.target.value);
  }

  function onSubmit(e) {
    e.preventDefault();
    onAddPlace({ name, link });
  }

  return (
    <PopupWithForm
      name='place-form'
      title='Новое место'
      buttonText='Создать'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmit}
    >
      <label className='popup__form-field'>
        <input
          type='text'
          id='place-name'
          name='place-name'
          placeholder='Название'
          minLength={2}
          maxLength={30}
          required
          autoComplete='off'
          className='popup__form-item'
          onChange={handleChange}
          value={name || ''}
        />
        <p className='popup__input-error place-name-error' />
      </label>
      <label className='popup__form-field'>
        <input
          type='url'
          id='place-src'
          name='place-src'
          placeholder='Ссылка на картинку'
          required
          autoComplete='off'
          className='popup__form-item'
          onChange={handleChange}
          value={link || ''}
        />
        <p className='popup__input-error place-src-error' />
        <p
          className={`popup__response-error ${
            errorMessage && 'popup__response-error_active'
          }`}
        >
          {errorMessage}
        </p>
      </label>
    </PopupWithForm>
  );
}
