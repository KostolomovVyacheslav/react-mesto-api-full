import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Card from './Card';

function Main(props) {

   const currentUser = useContext(CurrentUserContext);

   return(
      <main className="content">
         <section className="profile">
            <div className="profile__avatar" style={{ backgroundImage: `url(${currentUser.avatar})` }}>
               <button type="button" className="profile__avatar-button" onClick={props.onEditAvatar}></button>
            </div>
            <div className="profile__info">
               <h1 className="profile__name">{currentUser.name}</h1>
               <p className="profile__description">{currentUser.about}</p>
               <button type="button" className="profile__edit-button" onClick={props.onEditProfile}></button>
            </div>
            <button type="button" className="profile__add-button" onClick={props.onAddPlace}></button>
         </section>
         <section className="elements">
            <ul className="elements__list">
            {props.cards.map(card => {
               return(
                  <Card
                  onCardClick={props.onImage}
                  onCardLike={props.onCardLike}
                  onCardDelete={props.onCardDelete}
                  onDeleteBtnClick={props.onDeleteBtn}
                  card={card}
                  key={card._id}
                  />
               )
            })}
            </ul>
         </section>
      </main>
   )
}

export default Main;