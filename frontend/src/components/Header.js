import { Link } from 'react-router-dom'

function Header({ email, route, onLogout, title, ...props }) {

   return(
      <header className="header">
         
         <Link to="/" className="header__logo"></Link>

         <nav className="header__auth">
            <p className="header__email">{email}</p>
            <Link to={route} className="header__link" type="button" onClick={onLogout}>{title}</Link>
         </nav>

      </header>
   )
}

export default Header;