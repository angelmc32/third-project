import React, { useContext } from 'react';                // Import React and useContext hook
import { NavLink } from 'react-router-dom';         // Import NavLink for "navigation"
//import { useHistory } from 'react-router-dom';            // Import useHistory for "redirection"
import { AppContext }  from '../../AppContext';           // Import AppContext to use created context

// Declare Sidebar functional component
const Sidebar = () => {
  
  // Destructure user state variable from context
  const { user } = useContext(AppContext);
  // Destructure push method from useHistory to "redirect" user
  //const { push } = useHistory();

  return (
     user.usertype === 'doctor' ? (
      <div className="sidebar uk-flex uk-flex-column uk-flex-center uk-flex-top">
          <ul className="uk-nav-default uk-nav-parent-icon uk-height-large uk-width-4-5 uk-text-left uk-margin-left" uk-nav="true">
            <li className="uk-active">
              <NavLink to="/home">Home</NavLink>
            </li>
            <li className="uk-active">
              <NavLink to="/planner">Agenda</NavLink>
            </li>
            <li className="uk-active">
              <NavLink to="/patients">Mis Pacientes</NavLink>
            </li>
            <li className="uk-active">
              <NavLink to="/messages">Mensajes</NavLink>
            </li>
            <li className="uk-parent uk-active">
              <NavLink to="/consultations">Consultas</NavLink>
              <ul className="uk-nav-sub">
                <li>
                  <NavLink to="/consultations/new">Nueva Consulta</NavLink>
                </li>
                <li>
                  <NavLink to="/consultations">Consultas Anteriores</NavLink>
                </li>
              </ul>
            </li>
            <li className="uk-parent uk-active">
              <a href="#">Recetas</a>
              <ul className="uk-nav-sub">
                <li>
                  <NavLink to="/prescriptions/new">Nueva Receta</NavLink>
                </li>
                <li>
                  <NavLink to="/prescriptions">Recetas Anteriores</NavLink>
                </li>
              </ul>
            </li>
            <li className="uk-parent uk-active">
              <a href="#">Consultorios</a>
              <ul className="uk-nav-sub">
                <li>
                  <NavLink to="/facilities">Buscar</NavLink>
                </li>
                <li>
                  <NavLink to="/facilities/favorites">Mis Favoritos</NavLink>
                </li>
                <li>
                  <NavLink to="/facilities/new">Publicar en renta</NavLink>
                </li>
              </ul>
            </li>
            <li className="uk-active">
              <NavLink to="/profile">Mi Perfil</NavLink>
            </li>
          </ul>
        </div>
      ) : (
        <div className="sidebar uk-flex uk-flex-column uk-flex-center uk-flex-top">
        <ul className="uk-nav-default uk-nav-parent-icon uk-height-large uk-width-4-5 uk-text-left uk-margin-left" uk-nav="true">
          <li className="uk-active">
            <NavLink to="/home">Home</NavLink>
          </li>
          <li className="uk-active">
            <NavLink to="/journal">Mi Diario</NavLink>
          </li>
          <li className="uk-active">
            <NavLink to="/reminders">Recordatorios</NavLink>
          </li>
          <li className="uk-active">
            <NavLink to="/messages">Mensajes</NavLink>
          </li>
          <li className="uk-active">
            <NavLink to="/consultations">Mis Consultas</NavLink>
          </li>
          <li className="uk-active">
            <NavLink to="/messages">Mis Recetas</NavLink>
          </li>
          <li className="uk-parent uk-active">
            <a href="#">Consultorios</a>
            <ul className="uk-nav-sub">
              <li>
                <NavLink to="/facilities">Buscar</NavLink>
              </li>
              <li>
                <NavLink to="/facilities/new">Publicar en renta</NavLink>
              </li>
            </ul>
          </li>
          <li className="uk-active">
            <NavLink to="/profile">Mi Perfil</NavLink>
          </li>
        </ul>
      </div>
    )    
  );
};

export default Sidebar;