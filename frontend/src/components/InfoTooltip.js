import React from 'react';
import succeedPath from '../images/success.svg';
import errorPath from '../images/error.svg';

export default function InfoTooltip({ isOpen, succeed, onClose }) {
  return (
    <div className={`popup ${isOpen && 'popup_opened'}`} onClick={onClose}>
      <div className='popup__container'>
        <button className='popup__btn-close' type='button' />
        <div className='info-tooltip'>
          <img className='info-tooltip__img'
            src={succeed ? succeedPath : errorPath}
            alt={succeed ? 'галочка' : 'крестик'}
          />
          <p className='info-tooltip__text'>
            {succeed
              ? 'Вы успешно зарегистрировались'
              : 'Что-то пошло не так!\nПопробуйте еще раз'}
          </p>
        </div>
      </div>
    </div>
  );
}
