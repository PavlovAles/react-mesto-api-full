import { useEffect, useState } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import ConfirmDeletePopup from './ConfirmDeletePopup';
import { api } from '../utils/Api.js';
import * as auth from '../utils/auth.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] =
    useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cardToDelete, setCardToDelete] = useState(null);
  const [cards, setCards] = useState([]);
  const [avatarErrorMessage, setAvatarErrorMessage] = useState('');
  const [profileErrorMessage, setProfileErrorMessage] = useState('');
  const [cardErrorMessage, setCardErrorMessage] = useState('');
  const [currentUser, setCurrentUser] = useState({
    name: '',
    about: '',
    avatar: '',
  });
  const [userEmail, setUserEmail] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [successfulRegister, setSuccessfulRegister] = useState(false);

  const history = useHistory();

  useEffect(() => {
    handleTokenCheck();

    Promise.all([api.getProfileData(), api.getInitialCards()])
      .then((res) => {
        setCurrentUser(res[0]);
        setCards(res[1]);
      })
      .catch((err) => console.log(err));
  }, []);

  //login
  function handleLogin(password, email) {
    auth
      .authorize(password, email)
      .then((data) => {
        if (data?.token) {
          localStorage.setItem('jwt', data.token);
          setLoggedIn(true);
          handleTokenCheck();
          history.push('/main');
        }
      })
      .catch((errJson) => {
        errJson.then((err) => {
          console.log(`Error: ${err.message}`);
        });
      });
  }

  function handleLogout() {
    setUserEmail('');
    setLoggedIn(false);
    localStorage.removeItem('jwt');
  }

  function handleTokenCheck() {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      auth
        .checkToken(jwt)
        .then((res) => {
          if (res) {
            setUserEmail(res.data.email);
            setLoggedIn(true);
            history.push('/main');
          }
        })
        .catch((errJson) => {
          errJson.then((err) => {
            console.log(`Error: ${err.message}`);
          });
        });
    }
  }

  function handleRegistration(password, email) {
    auth
      .register(password, email)
      .then((res) => {
        setSuccessfulRegister(true);
        setIsInfoTooltipPopupOpen(true);
        history.push('/login');
      })
      .catch((errJson) => {
        errJson.then((err) => {
          setIsInfoTooltipPopupOpen(true);
          setSuccessfulRegister(false);
          console.log(`Error: ${err.message}`);
        });
      });
  }

  //card
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete() {
    api
      .deleteCard(cardToDelete._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== cardToDelete._id));
        setIsConfirmDeletePopupOpen(false);
      })
      .catch((err) => console.log(err));
  }

  //popup
  function closeAllPopups(evt) {
    if (
      evt.target.classList.contains('popup') ||
      evt.target.classList.contains('popup__btn-close')
    ) {
      setIsEditAvatarPopupOpen(false);
      setAvatarErrorMessage('');

      setIsEditProfilePopupOpen(false);
      setProfileErrorMessage('');

      setIsAddPlacePopupOpen(false);
      setCardErrorMessage('');

      setIsConfirmDeletePopupOpen(false);
      setSelectedCard(null);

      setIsInfoTooltipPopupOpen(false);
    }
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardDeleteClick(card) {
    setCardToDelete(card);
    setIsConfirmDeletePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  //forms
  function handleUpdateUser(userInfo) {
    api
      .setProfile(userInfo)
      .then((userInfo) => {
        setCurrentUser(userInfo);
        setIsEditProfilePopupOpen(false);
      })
      .catch((errJson) => {
        errJson.then((err) => {
          setProfileErrorMessage(err.message);
          console.log(err.message);
        });
      });
  }

  function handleUpdateAvatar(avatar) {
    api
      .setAvatar(avatar)
      .then((userInfo) => {
        setCurrentUser(userInfo);
        setIsEditAvatarPopupOpen(false);
      })
      .catch((errJson) => {
        errJson.then((err) => {
          setAvatarErrorMessage(err.message);
          console.log(err.message);
        });
      });
  }

  function handleAddPlaceSubmit(cardInfo) {
    api
      .postCard(cardInfo)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        setIsAddPlacePopupOpen(false);
      })
      .catch((errJson) => {
        errJson.then((err) => {
          setCardErrorMessage(err.message);
          console.log(err.message);
        });
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='root'>
        <div className='page'>
          <Header email={userEmail} onLogout={handleLogout} />
          <Switch>
            <ProtectedRoute
              path='/main'
              component={Main}
              loggedIn={loggedIn}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDeleteClick={handleCardDeleteClick}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCard={handleCardClick}
            />
            <Route path='/login'>
              <Login onLogin={handleLogin} />
            </Route>
            <Route path='/register'>
              <Register onRegistration={handleRegistration} />
            </Route>
            <Route exact path='/'>
              {loggedIn ? <Redirect to='/main' /> : <Redirect to='/login' />}
            </Route>
          </Switch>
          <Footer />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            errorMessage={profileErrorMessage}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            errorMessage={avatarErrorMessage}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            errorMessage={cardErrorMessage}
          />
          <ConfirmDeletePopup
            isOpen={isConfirmDeletePopupOpen}
            onClose={closeAllPopups}
            onConfirmDelete={handleCardDelete}
          />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          <InfoTooltip
            isOpen={isInfoTooltipPopupOpen}
            onClose={closeAllPopups}
            succeed={successfulRegister}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
