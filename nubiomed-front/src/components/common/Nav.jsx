import React, { useContext } from 'react';              // Import React and useContext hook
import { NavLink } from 'react-router-dom';             // Import NavLink for "navigation"
import { useHistory } from 'react-router-dom';          // Import useHistory for "redirection"
import { AppContext }  from '~src/AppContext.js';       // Import AppContext to use created context
import { logout } from '~services/auth-services.js';    // Import logout service for logout functionality
import Button from '~components/common/Button';         // Import custom Button component

// Declare Nav functional component (Navigation Bar)
const Nav = () => {
  
  // Destructure user state variable and resetUserContext function from context
  const { user, resetUserContext } = useContext(AppContext);
  // Destructure push method from useHistory to "redirect" user
  const { push } = useHistory();

  // Declare function for handling logout button
  const handleLogout = () => {

    logout();                   // Execute logout function (clear localStorage)
    push('/login');             // Redirect user to login
    resetUserContext();         // delete user data from context to an empty object

  };

  return (
    <nav className="uk-navbar-container" uk-navbar="true">
        <div className="uk-navbar-left uk-margin-left">
          <ul className="uk-navbar-nav">
            <li className="uk-active">
              <NavLink to="/">
                Nubiomed
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="uk-navbar-right uk-margin-right">
          <ul className="uk-navbar-nav">
            <li className="uk-active">
              <NavLink to="#how-it-works">
                Como funciona
              </NavLink>
            </li>
            <li className="uk-active uk-margin-right">
              <NavLink to="/services">
                Servicios
              </NavLink>
              <div className="uk-navbar-dropdown uk-margin-remove">
                <ul className="uk-nav uk-navbar-dropdown-nav">
                  <li >Encuentra un Doctor</li>
                  <li>Renta Consultorio</li>
                  <li>Expediente Clinico Electronico</li>
                </ul>
              </div>
            </li>
            
              {!user._id ? (
                <li>
                <NavLink to="/login">
                  <Button type="danger uk-border-pill" text="Entrar" />
                </NavLink>
                </li>
              ) : (
                <li className="uk-active">
                <NavLink to="/profile">
                  <div className="uk-width-auto uk-margin-small-right">
                    <img className="uk-border-circle" width={40} height={40} src={user.profile_picture} alt="User profile" />
                  </div>
                  <p>Mi Cuenta</p>
                </NavLink>
                <div className="uk-navbar-dropdown uk-margin-remove">
                  <ul className="uk-nav uk-navbar-dropdown-nav">
                    <li className="uk-active">
                      <button className="uk-button uk-button-danger uk-border-pill uk-button-small" onClick={handleLogout}>Cerrar sesión</button>
                    </li>
                  </ul>
                </div>
                </li>
              )}
            
          </ul>
        </div>
      </nav>
  );

};

export default Nav;