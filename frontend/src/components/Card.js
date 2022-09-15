import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCard, onCardLike, onCardDeleteClick }) {
  function handleClick() {
    onCard(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDeleteClick(card);
  }

  const currentUser = React.useContext(CurrentUserContext);
  const ownerId = card.owner._id ? card.owner._id : card.owner;
  const isOwn = ownerId === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  return (
    <li className='elements__item'>
      <button
        className={`elements__btn-delete ${!isOwn && 'elements__btn-delete_hidden'}`}
        type='button'
        onClick={handleDeleteClick}
      />
      <img
        src={card.link}
        alt={card.name}
        className='elements__img'
        onClick={handleClick}
      />
      <div className='elements__caption'>
        <h2 className='elements__title'>{card.name}</h2>
        <div className='elements__likes-container'>
          <button
            className={`elements__btn-like ${isLiked && 'elements__btn-like_active'}`}
            type='button'
            onClick={handleLikeClick}
          />
          <p className='elements__likes-number'>{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
