function InfoTooltip({ isAuthSuccess, isOpen, onCloseClick, onClose, title,  ...props }) {
   
   const popupTypeClassName = `popup__response ${isAuthSuccess ? 'popup__response_type_success' : 'popup__response_type_reject'}`;

   return(
      <div className={`popup ${isOpen ? 'popup_opened' : ''}`} onClick={onCloseClick}>
         <div className="popup__container">
            <div className={popupTypeClassName}></div>
            <h2 className="popup__title popup__title_type_info">{title}</h2>
            <button className="popup__close-button" type="button" title="Закрыть" onClick={onClose}/>
         </div>
    </div>
   )
}

export default InfoTooltip;