import React from 'react';
import PopupWithForm from './PopupWithForm';

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, errorMessage }) {
  const input = React.useRef();
  
  React.useEffect(() => {
    input.current.value = '';
  }, [isOpen])

  function onSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({ avatar: input.current.value });
  }

  return (
    <PopupWithForm
      name='avatar-form'
      title='Обновить аватар'
      buttonText='Сохранить'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmit}
    >
      <label className='popup__form-field'>
        <input
          type='url'
          id='avatar-src'
          name='avatar-src'
          placeholder='Ссылка на аватар'
          minLength={2}
          maxLength={1000}
          required
          autoComplete='off'
          className='popup__form-item'
          ref={input}
        />
        <p className='popup__input-error avatar-src-error' />
        <p className={`popup__response-error ${errorMessage && 'popup__response-error_active'}`}>{errorMessage}</p>
      </label>
    </PopupWithForm>
  );
}
