import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import Card from './Card.js';

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className='main'>
      <section className='profile'>
        <div
          className='profile__avatar-container'
          style={{
            backgroundImage: `url(${currentUser.avatar})`,
          }}
          onClick={props.onEditAvatar}
        ></div>
        <div className='profile__info'>
          <h1 className='profile__name'>{currentUser.name}</h1>
          <button
            className='profile__btn-edit'
            type='button'
            onClick={props.onEditProfile}
          />
          <p className='profile__avocation'>{currentUser.about}</p>
        </div>
        <button
          className='profile__btn-add'
          type='button'
          onClick={props.onAddPlace}
        />
      </section>
      <section className='elements'>
        <ul className='elements__list'>
          {props.cards.length > 0 && [...props.cards].reverse().map((cardInfo) => (
            <Card
              key={cardInfo._id}
              card={cardInfo}
              onCard={props.onCard}
              onCardLike={props.onCardLike}
              onCardDeleteClick={props.onCardDeleteClick}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
