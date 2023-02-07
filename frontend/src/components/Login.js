import { useState } from 'react';

function Login({onAuthorization}) {

   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');

   const handleChangeEmail = (e) => {
      setEmail(e.target.value);
   };

   const handleChangePassword = (e) => {
      setPassword(e.target.value); 
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      onAuthorization({
         password: password,
         email: email
      })
   }

   return(
      <div className='authorization'>
         <form className='authorization__form' onSubmit={handleSubmit} autoComplete="off">
            <h2 className="authorization__title">Вход</h2>
            <input className="authorization__input" value={email} type="email" onChange={handleChangeEmail}  placeholder="Email"/>
            <input className="authorization__input" value={password} type="password" onChange={handleChangePassword} placeholder="Пароль"/>
            <button className="authorization__submit-button">Войти</button>
         </form>
      </div>
   )
}

export default Login;