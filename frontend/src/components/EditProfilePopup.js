import { useContext, useState, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup(props) {
   
   const currentUser = useContext(CurrentUserContext);
   const [userName, setUserName] = useState(currentUser.name);
   const [userDescription, setUserDescription] = useState(currentUser.about);

   const buttonText = `${props.renderLoading ? 'Сохранение...' : 'Сохранить'}`;

   useEffect(() => {
      setUserName(currentUser.name);
      setUserDescription(currentUser.about);
   }, [props.isOpen]);

   const handleChangeName = (evt) => {
      setUserName(evt.target.value);
   };

   const handleChangeDescription = (evt) => {
      setUserDescription(evt.target.value);
   };

   const handleSubmit = (evt) => {
      evt.preventDefault();

      props.onUpdateUser({
         name: userName,
         about: userDescription,
       });
   };

   return(
      <PopupWithForm
        isOpen={props.isOpen}
        onClose={props.onClose}
        onSubmit={handleSubmit}
        title={'Редактировать профиль'}
        name={'edit-form'}
        formId={'#edit-form'}
        buttonId={'#profile-form-save-button'}
        buttonText={buttonText}
      >
         <input className="popup__input popup__input_name" name="inputUserName" type="text" value={userName} onChange={handleChangeName} placeholder="Как Вас зовут?" minLength="2" maxLength="40" required />
         <span className="popup__input-error"></span>
         <input className="popup__input popup__input_job" name="inputUserJob" type="text" value={userDescription} onChange={handleChangeDescription} placeholder="Расскажите о себе..." minLength="2" maxLength="200" required />
         <span className="popup__input-error"></span>
      </PopupWithForm>
   )
}

export default EditProfilePopup;