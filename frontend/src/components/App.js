import { useState, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Header from './Header';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import Footer from './Footer';
import api from '../utils/api';

function App() {

  const [currentUser, setCurrentUser] = useState({});

  const [renderLoading, setRenderLoading] = useState(false);

  const [cards, setCards] = useState([]);
  
  // Попапы редактирования аватара, профиля, добавления и удаления карточки
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);

  // Попап карточки
  const [selectedCard, setSelectedCard] = useState(null);
  const [isImagePopupOpen, setImagePopup] = useState(false);

  useEffect(() => {
    Promise.all([api.getUserData(), api.getInitialCards()])
    .then(([userDataResult, cardsResult]) => {
        setCurrentUser(userDataResult)
        setCards(cardsResult)
    })
    .catch(error => console.log(error))
  }, [])

  const handleCardLike = (card) => {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeStatus(card._id, isLiked)
    .then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
    })
    .catch(error => console.log(error))
  };

  const handleCardDelete = (card) => {
    api.deleteCard(card._id)
    .then(() => {
      setCards((cards) => cards.filter(item => item._id !== card._id))
    })
    .catch(error => console.log(error))
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
  };

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>

        <Header />

        <Main 
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

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}  renderLoading={renderLoading}/>

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} renderLoading={renderLoading}/>

        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onUpdateNewCard={handleAddPlaceSubmit} renderLoading={renderLoading}/>

        <PopupWithForm
          isOpen={isDeletePopupOpen}
          onClose={closeAllPopups}
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
        />

        <Footer />

      </CurrentUserContext.Provider>
           
    </div>
  );
}

export default App;