import React from 'react';
import { NavLink } from 'react-router-dom';

import img_doctor from "../../assets/images/landing/doctor.svg"
import img_firstaid from "../../assets/images/landing/first-aid-kit.svg"
import img_hospital from "../../assets/images/landing/hospital.svg"
import img_medical_file from "../../assets/images/landing/medical-file.svg"
import img_prescription from "../../assets/images/landing/prescription.svg"
import img_vademecum from "../../assets/images/landing/vademecum.svg"

const DoctorLanding = () => {

  return (
    <div className="uk-section uk-flex uk-flex-middle uk-flex-center">
      <div className="uk-width-1-3 " uk-slider="autoplay: true; autoplay-interval: 3000">
        <ul className="uk-slider-items uk-child-width-3-5">
          
          <li>
            <img src={img_doctor} width="320px" height="320px" alt="" />
          </li>
          <li>
            <img src={img_firstaid} width="320px" height="320px" alt="" />
          </li>
          <li>
            <img src={img_hospital} width="320px" height="320px" alt="" />
          </li>
          <li>
            <img src={img_medical_file} width="320px" height="320px" alt="" />
          </li>
          <li>
            <img src={img_prescription} width="320px" height="320px" alt="" />
          </li>
          <li>
            <img src={img_vademecum} width="320px" height="320px" alt="" />
          </li>
        </ul>
      </div>
      <div className="uk-margin-bottom uk-width-1-3 uk-height-1-1 uk-flex uk-flex uk-flex-column uk-flex-center">
        <h2>Encuentra doctores, consultorios y pacientes... ¡Fácilmente!</h2>
        <h3>Crea tu perfil, escoge tus consultorios  y empieza a dar consulta</h3>
        <div className="uk-margin">
          <NavLink to="/doctor-login">
            <button className="uk-button uk-button-danger uk-border-pill">Busco doctor</button>
          </NavLink>
        </div>
        <h3>Crea tu perfil, escoge tus consultorios  y empieza a dar consulta</h3>
        <div className="uk-margin">
          <NavLink to="/doctor-login">
            <button className="uk-button uk-button-default uk-border-pill">Soy doctor</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default DoctorLanding;