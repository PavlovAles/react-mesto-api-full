import React from 'react';
import PopupWithForm from './PopupWithForm';

export default function ConfirmDeletePopup({ isOpen, onClose, onConfirmDelete }) {
  
  function onSubmit(e) {
    e.preventDefault();
    onConfirmDelete();
  }

  return (
    <PopupWithForm
      name='confirm-form'
      title='Вы уверены'
      buttonText='Да'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmit}
    />
  );
}
