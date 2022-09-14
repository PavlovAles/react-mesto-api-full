import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function EditProfilePopup({
  isOpen,
  onClose,
  onUpdateUser,
  errorMessage,
}) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleChange(e) {
    e.target.name === 'name'
      ? setName(e.target.value)
      : setDescription(e.target.value);
  }

  function onSubmit(e) {
    e.preventDefault();
    onUpdateUser({ name, about: description });
  }

  return (
    <PopupWithForm
      name='profile-form'
      title='Редактировать профиль'
      buttonText='Сохранить'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmit}
    >
      <label className='popup__form-field'>
        <input
          type='text'
          id='name'
          name='name'
          placeholder='Имя'
          minLength={2}
          maxLength={40}
          required
          autoComplete='off'
          className='popup__form-item'
          onChange={handleChange}
          value={name || ''}
        />
        <p className='popup__input-error name-error' />
      </label>
      <label className='popup__form-field'>
        <input
          type='text'
          id='avocation'
          name='avocation'
          placeholder='Призвание'
          minLength={2}
          maxLength={200}
          required
          autoComplete='off'
          className='popup__form-item'
          onChange={handleChange}
          value={description || ''}
        />
        <p className='popup__input-error avocation-error' />
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
