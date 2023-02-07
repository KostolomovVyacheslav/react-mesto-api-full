import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card: { name, link, likes }, card, ...props }) {
   
   const currentUser = useContext(CurrentUserContext);

   const isLiked = card.likes.some(i => i._id === currentUser._id);
   const cardLikeButtonClassName = `element__like-button ${isLiked ? 'element__like-button_active' : ''}`;

   const isOwn = card.owner._id === currentUser._id;
   const cardDeleteButtonClassName = `element__delete-button ${isOwn ? 'element__delete-button_active' : ''}`;

   const handleClick = () => {
      props.onCardClick(card);
   };

   const handleLikeClick = () => {
      props.onCardLike(card);
   };

   const handleDeleteClick = () => {
      props.onCardDelete(card);
   };

   return(
      <li className="element">
         <button type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
         <img src={link} className="element__image" alt={name} onClick={handleClick}/>
         <div className="element__description">
            <h2 className="element__title">{name}</h2>
            <div className="element__like">
               <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
               <span className="element__like-counter">{likes.length}</span>
            </div>
         </div>
      </li>
   )
}

export default Card;