import React from "react";

function PopupWithForm({name, title, buttonText, ...props}) {
   
   const stateFormPopupClass = `${props.isOpen && 'popup_opened'}`;
   
   return(
      <div className={`popup ${stateFormPopupClass}`}>
         <div className="popup__container">
         <button type="button" className="popup__close-button" onClick={props.onClose}></button>
         <form id={props.formId} name={name} onSubmit={props.onSubmit} className="popup__form" noValidate autoComplete="off">
            <h2 className="popup__title">{title}</h2>
            {props.children}
            <button type="submit" id={props.buttonId} className="popup__save-button">{buttonText}</button>
         </form>
         </div>
      </div>
   )
}

export default PopupWithForm;