import React from 'react';

function PopupWithForm(props) {
  return (
    <div
      className={`popup popup_contains_${props.name} ${props.isOpen && 'popup_opened'}`}
      onClick={props.onClose}
    >
      <div className='popup__container'>
        <button className='popup__btn-close' type='button' />
        <form
          className='popup__form'
          name={props.name}
          noValidate
          onSubmit={props.onSubmit}
        >
          <h2 className='popup__heading'>{props.title}</h2>
          <fieldset className='popup__input-container'>
            {props.children}
            <button
              className='popup__btn-save'
              type='submit'
              onClick={props.onClose}
            >
              {props.buttonText}
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
