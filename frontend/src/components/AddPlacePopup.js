import { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
   
   const [cardName, setCardName] = useState('');
   const [cardLink, setCardLink] = useState('');

   const buttonText = `${props.renderLoading ? 'Сохранение...' : 'Сохранить'}`;

   useEffect(() => {
      setCardName('');
      setCardLink('');
   }, [props.isOpen]);

   const handleChangeCardName = (evt) => {
      setCardName(evt.target.value);
   };
   
   const handleChangeCardLink = (evt) => {
      setCardLink(evt.target.value);
   };

   const handleSubmit = (evt) => {
      evt.preventDefault();

      props.onUpdateNewCard({
         name: cardName,
         link: cardLink
      });
   };

   return(
      <PopupWithForm
          isOpen={props.isOpen}
          onClose={props.onClose}
          onSubmit={handleSubmit}
          title={'Новое место'}
          name={'img-form'}
          formId={'#add-img-form'}
          buttonId={'#add-form-save-button'}
          buttonText={buttonText}
        >
          <input className="popup__input popup__input_img-name" name="inputImgName" type="text" value={cardName} onChange={handleChangeCardName} placeholder="Название" minLength="2" maxLength="30" required />
          <span className="popup__input-error"></span>
          <input className="popup__input popup__input_img-link" name="inputImgLink" type="url" value={cardLink} onChange={handleChangeCardLink} placeholder="Ссылка на картинку" required />
          <span className="popup__input-error"></span>
        </PopupWithForm>
   )
}

export default AddPlacePopup;