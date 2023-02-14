import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate} from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';

import ProtectedRoute from './ProtectedRoute';
import Register from './Register';
import Login from './Login';

import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import InfoTooltip from './InfoTooltip';

import api from '../utils/api';
import authorization from '../utils/authorization.js'

function App() {

  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState({});
  const [renderLoading, setRenderLoading] = useState(false);
  const [cards, setCards] = useState([]);

  const [isAuthSuccess, setIsAuthSuccess] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState(null);
  
  // Попапы редактирования аватара, профиля, добавления и удаления карточки
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);

  // Попап карточки
  const [selectedCard, setSelectedCard] = useState(null);
  const [isImagePopupOpen, setImagePopup] = useState(false);

  // Попап авторизации
  const [infoTooltip, setInfoTooltip] = useState(false);
  const [popupTitle, setPopupTitle] = useState('');


  const getContent = () => {
    return Promise.all([api.getUserData(), api.getInitialCards()])
    .then(([userDataResult, cardsResult]) => {
      setCurrentUser(userDataResult.user);
      setEmail(userDataResult.user.email);
      setCards(cardsResult);
      return true;
    })
    .catch(error => console.log(error));
  }


  React.useEffect(() => {
    getContent()
    .then((res) => {
      if (res) {
        setLoggedIn(true);
        navigate('/');
      } else {
        setLoggedIn(false);
        navigate('/signin');
      }
    })
    .catch((err) => {
      console.log(err);
    })
  }, [])


  const handleRegister = (data) => {
    authorization.register(data)
    .then(() => {
      setPopupTitle('Вы успешно зарегистрировались!');
      navigate('/signin');
      setIsAuthSuccess(true);
    })
    .catch(() => {
      setPopupTitle('Что-то пошло не так! Попробуйте ещё раз.');
      setIsAuthSuccess(false);
    })
    .finally(() => {
      handleInfoTooltip();
    })
  };


  const handleAuthorization = (data) => {
    authorization.authorize(data)
    .then(res => {
      setEmail(data.email);
      getContent();
      setLoggedIn(true);
      navigate('/');
    })
    .catch((err) => {
      setPopupTitle('Что-то пошло не так! Попробуйте ещё раз.');
      setIsAuthSuccess(false);
      handleInfoTooltip();
      console.log(err)
    })
  };


  const handleInfoTooltip = () => {
    setInfoTooltip(true);
  };

  const handleLogout = () => {
    authorization.logout()
    .then((res) => {
      navigate('/sigout');
      setEmail(null);
      setLoggedIn(false);
    })
    .catch((err) => {
      setPopupTitle('Что-то пошло не так! Попробуйте ещё раз.');
      handleInfoTooltip();
      setIsAuthSuccess(false);
      console.log(err);
    })
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some(i => i === currentUser._id);

    api.changeLikeStatus(card._id, isLiked)
    .then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch(error => console.log(error));
  };

  const handleCardDelete = (card) => {
    api.deleteCard(card._id)
    .then(() => {
      setCards((cards) => cards.filter(item => item._id !== card._id));
    })
    .catch(error => console.log(error));
  };

  const handleEditAvatarClick = () => {
    setEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setAddPlacePopupOpen(true);
  };

  const handleCardClick = (target) => {
    setImagePopup(true);
    setSelectedCard(target);
  };

  const handleUpdateUser = ({name, about}) => {
    const userData = {
      name: name,
      about: about
    };

    setRenderLoading(true);
    api.editProfile(userData)
    .then(res => {
      setCurrentUser(res);
      setEmail(res.email);
      closeAllPopups();
    })
    .catch(error => {
      console.log(error);
    })
    .finally(() => {
      setRenderLoading(false);
    })
  };

  const handleUpdateAvatar = ({avatar}) => {
    const avatarData = {
      avatarLink: avatar
    };

    setRenderLoading(true);
    api.changeProfileAvatar(avatarData)
    .then(res => {
      setCurrentUser(res);
      closeAllPopups();
    })
    .catch(error => {
      console.log(error);
    })
    .finally(() => {
      setRenderLoading(false);
    })
  };

  const handleAddPlaceSubmit = (item) => {
    setRenderLoading(true);
    api.addNewCard(item)
    .then(res => {
      setCards([res, ...cards]);
      closeAllPopups();
    })
    .catch(error => {
      console.log(error);
    })
    .finally(() => {
      setRenderLoading(false);
    })
  };

  // Закрытие всех попапов
  const closeAllPopups = () => {
    setEditProfilePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setAddPlacePopupOpen(false);
    setDeletePopupOpen(false);
    setImagePopup(false);
    setInfoTooltip(false);
  };

  const handlePopupCloseByClick = (evt) => {
    if (evt.target.classList.contains('popup')) {
      closeAllPopups();
    }
  };

  useEffect(() => {
    if (isEditProfilePopupOpen || isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard) {
      function handleEsc(evt) {
        if (evt.key === 'Escape') {
          closeAllPopups();
        }
      }

      document.addEventListener('keydown', handleEsc);

      return () => {
        document.removeEventListener('keydown', handleEsc);
      }
    }
  }, [isEditProfilePopupOpen, isEditAvatarPopupOpen, isEditProfilePopupOpen, isAddPlacePopupOpen, selectedCard]);

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>

        <Routes>

          <Route path="*" element={<Navigate to={loggedIn ? "/" : "signin"}></Navigate>} />
          
          <Route path="/signup" element={
            <>
              <Header title="Войти" route="/signin" />
              <Register onRegister={handleRegister} />
            </>
          }/>

          <Route path="/signin" element={
            <>
              <Header title="Регистрация" route="/signup" />
              <Login onAuthorization={handleAuthorization} />
            </>
          } />

          <Route exact path="/" element={

            <ProtectedRoute loggedIn={loggedIn} cards={cards} element={
              <>
                <Header email={email} title="Выйти" onLogout={handleLogout} route="" />
                <Main
                loggedIn={loggedIn}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardDelete={handleCardDelete}
                onCardLike={handleCardLike}
                onImage={handleCardClick}
                card={selectedCard}
                cards={cards}
                >
                </Main>
                <Footer />
              </>
            }>
            </ProtectedRoute>}
          >

          </Route>

        </Routes>

        <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onCloseClick={handlePopupCloseByClick}
        onUpdateAvatar={handleUpdateAvatar}
        renderLoading={renderLoading}
        />

        <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onCloseClick={handlePopupCloseByClick}
        onUpdateUser={handleUpdateUser}
        renderLoading={renderLoading}
        />

        <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onCloseClick={handlePopupCloseByClick}
        onUpdateNewCard={handleAddPlaceSubmit}
        renderLoading={renderLoading}
        />

        <PopupWithForm
          isOpen={isDeletePopupOpen}
          onClose={closeAllPopups}
          onCloseClick={handlePopupCloseByClick}
          title={'Вы уверены?'}
          name={'delete-form'}
          formId={'#delete-img-form'}
          buttonnId={'#delete-form-confirm-button'}
          buttonText={'Да'}
        >
        </PopupWithForm>

        <ImagePopup
          isOpen={isImagePopupOpen}
          card={selectedCard}
          onClose={closeAllPopups}
          onCloseClick={handlePopupCloseByClick}
        />

        <InfoTooltip
          isAuthSuccess={isAuthSuccess}
          isOpen={infoTooltip}
          title={popupTitle}
          onClose={closeAllPopups}
        />

      </CurrentUserContext.Provider>
           
    </div>
  );
}

export default App;