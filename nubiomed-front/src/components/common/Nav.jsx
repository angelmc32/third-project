import React, { useContext } from 'react';                // Import React and useContext hook
import { Link, NavLink } from 'react-router-dom';         // Import NavLink for "navigation"
import { useHistory } from 'react-router-dom';            // Import useHistory for "redirection"
import { AppContext }  from '../../AppContext';           // Import AppContext to use created context
import { logout } from '../../services/auth-services';    // Import logout service for logout functionality

// Declare Nav functional component (Navigation Bar)
const Nav = () => {
  
  // Destructure user state variable and resetUserContext function from context
  const { user, route, setRoute, resetUserContext } = useContext(AppContext);
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
                <div className="uk-flex uk-flex-middle">
                  <div className="uk-width-auto uk-margin-small-right">
                    <img className="uk-border-circle" width={64} height={64} src="https://res.cloudinary.com/angelmc32/image/upload/v1574445487/nubiomed-api/nubiomed-logo.png" alt="logo" />
                  </div>
                  Nubiomed
                </div>
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="uk-navbar-right uk-margin-right">
          <ul className="uk-navbar-nav">
            <li className="uk-active uk-margin-right">
              <NavLink to="#services">
                Servicios
              </NavLink>
              <div className="uk-navbar-dropdown uk-margin-remove">
                <ul className="uk-nav uk-navbar-dropdown-nav">
                  <li onClick={(event) => setRoute('doctors')} >
                    <NavLink to="/doctors">Encuentra un Doctor
                    </NavLink>
                  </li>
                  <li onClick={(event) => setRoute('doctors')} >
                    <NavLink to="/facilities">Renta Consultorio
                    </NavLink>
                  </li>
                  <li >
                    <NavLink to="/map">Consultorios cerca de mi
                    </NavLink>
                  </li>
                </ul>
              </div>
            </li>

            { !user._id ? (
                <li className="uk-active">
                  <NavLink to="/doctor-login">
                    <button className="uk-button uk-button-default uk-button-small">¿Es usted doctor?</button>
                  </NavLink>
                </li>
              ) : (
                user.usertype === 'Doctor' ? (
                  <li>
                    <Link to="/schedule">
                      <button className="uk-button uk-button-primary uk-border-pill" onClick={event => setRoute("schedule")} >Nueva Consulta</button>
                    </Link>
                  </li>
                ) : (
                  <li>
                    <Link to="/doctors">
                      <button className="uk-button uk-button-primary uk-border-pill" onClick={event => setRoute("doctors")} >Buscar doctor</button>
                    </Link>
                  </li>
                )
              )
            }
            
            { !user._id ? (
                <li>
                  <Link to="/login">
                    <button className="uk-button uk-button-primary uk-border-pill" >Entrar</button>
                  </Link>
                </li>
              ) : (
                <li className="uk-active">
                <NavLink to="/profile">
                  <div className="uk-width-auto uk-margin-small-right">
                    <img className="uk-border-circle" width={40} height={40} src={user.profile_picture} alt="User profile" />
                  </div>
                  <p>Mi Perfil</p>
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