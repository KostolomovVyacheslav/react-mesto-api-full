function ImagePopup(props) {

   const stateImgPopupClass = `popup ${props.isOpen && 'popup_opened'}`;
   const imgSrc = `${props.card ? props.card.link : '#'}`;
   const imgName = `${props.card ? props.card.name : ''}`;

   return(
      <div id="#photo-popup" className={stateImgPopupClass}>
         <div className="popup__photo-container">
            <button type="button" className="popup__close-button" onClick={props.onClose}></button>
            <figure className="popup__figure">
               <img src={imgSrc} className="popup__image" alt={imgName} />
               <figcaption className="popup__caption">{imgName}</figcaption>
            </figure>
         </div>
      </div>
   )
}

export default ImagePopup;