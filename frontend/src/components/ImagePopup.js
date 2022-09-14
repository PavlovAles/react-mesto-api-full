import React from "react";

function ImagePopup(props) {
  return (
    <div className={`popup popup_contains_big-img ${props.card && 'popup_opened'}`} onClick={props.onClose}>
      <div className="popup__container">
        <button className="popup__btn-close" type="button" onClick={props.onClose} />
        <figure className="popup__figure">
          <img src={props.card&&props.card.link} alt={props.card&&props.card.name} className="popup__img" />
          <figcaption className="popup__img-caption">{props.card&&props.card.name}</figcaption>
        </figure>
      </div>
    </div>
  );
}

export default ImagePopup;
