import { useState } from 'react';
import { Link } from 'react-router-dom';

function Register({onRegister}) {

   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');

   const handleChangeEmail = (e) => {
      setEmail(e.target.value);
   }

   const handleChangePassword = (e) => {
      setPassword(e.target.value);
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      onRegister({
         password: password,
         email: email
      });
   };

   return(
      <div className='authorization'>
         <form className='authorization__form' onSubmit={handleSubmit} autoComplete="off">
            <h2 className="authorization__title">Регистрация</h2>
            <input className="authorization__input" value={email} type="email" onChange={handleChangeEmail} placeholder="Email" required/>
            <input className="authorization__input" value={password} type="password" onChange={handleChangePassword} placeholder="Пароль" required/>
            <button className="authorization__submit-button" type="submit">Зарегестрироваться</button>
            <p className="authorization__notification">Уже зарегестрированы? <Link to="/sign-in" className="authorization__link">Войти</Link></p>
         </form>
      </div>
   )
}

export default Register;