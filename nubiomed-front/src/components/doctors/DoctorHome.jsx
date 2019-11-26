import React from 'react';
import { NavLink } from 'react-router-dom';

const DoctorHome = () => {

  return (
    <div className="uk-section uk-flex uk-flex-middle uk-flex-center">
      <div className="uk-width-1-3">
        Aqui va una imagen o algo asi que este haciendo scroll
      </div>
      <div className="uk-margin-bottom uk-width-1-3 uk-height-1-1 uk-flex uk-flex uk-flex-column uk-flex-center">
        <h2>Tu practica medica, donde tu quieras</h2>
        <h3>Publica tu perfil, escoge tus consultorios y empieza a dar consulta</h3>
        <div className="uk-margin">
          <NavLink to="/doctor-login">
            <button className="uk-button uk-button-danger uk-border-pill">Quiero unirme</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default DoctorHome;