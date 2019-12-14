import React, { useContext, useState, useEffect } from 'react';     // Import React, useEffect, useState and useContext hooks
import { useHistory } from 'react-router-dom';                      // Import useHistory for "redirection"
import { AppContext } from '../../AppContext';                      // Import AppContext to use created context
import currencyFormatter from "currency-formatter";                 // Import currency formatter for price display
//import DoctorForm from './DoctorForm';                          // Import FacilityForm react component

import { getCurriculum } from '../../services/profile-services';

//
const DoctorInfo = ({ doctor, preference }) => {

  const history = useHistory();              // declare an instance of useHistory hook to redirect user according to needs

  // Destructure form state variable, handleInput and handleFileInput functions for form state manipulation
  // const { form, handleInput, handleFileInput } = useForm();
  // Destructure user state variable
  const { user, route, setRoute } = useContext(AppContext);
  const [ curriculum, setCurriculum ] = useState({});   // Declare preferences state variable and setPreferences method to update preferences

  useEffect( () => {

    if ( route === 'curriculum' ) {

      getCurriculum(doctor._id)
      .then( res => {

        const { curriculum } = res.data;
        setCurriculum(curriculum);
        console.log(curriculum);

      })
    }

  }, [route]);

  const goBack = () => {
    route === 'showDoctor' ? setRoute('doctors') : setRoute('showDoctor');
  }

  return (
    <div className="uk-flex uk-flex-around uk-flex-wrap">
      <div className="uk-width-1-1 uk-flex uk-flex-between">
        <div className="uk-width-1-5 uk-flex uk-flex-left">
          <button className="uk-button uk-button-default uk-button-small uk-border-pill uk-margin-small-right" onClick={goBack}>
            Atras
          </button>
        </div>
        <div className="uk-width-4-5 uk-flex uk-flex-center">
          <button className="uk-button uk-button-default uk-button-small uk-border-pill uk-margin-small-right" onClick={(event) => setRoute('schedule')}>
            Ver Calendario
          </button>
          <button className="uk-button uk-button-default uk-button-small uk-border-pill uk-margin-small-right" onClick={(event) => setRoute('curriculum')}>
            Ver Curriculum
          </button>
        </div>
      </div>

      <div className="uk-width-1-5 uk-flex uk-flex-column uk-flex-center uk-flex-middle">

        <div className="uk-width-1-1 uk-flex uk-flex-center height30 uk-flex-middle">
          <img src={doctor.profile_picture} height="200px" width="200px" alt="Doctor's profile picture" className="uk-img" />
        </div>

        <div className="uk-width-1-1 uk-flex uk-flex-center height10 uk-flex-middle">
          <h3 className="uk-margin-remove">Dr. {doctor.first_name} {doctor.last_name1} {doctor.last_name2}</h3>
        </div>

        <div className="uk-margin-small">
          <label className="uk-form-label">Especialidad:</label>
          <div className="uk-form-controls">
          <h4>Especialidad</h4>
          </div>
        </div>

        <div className="uk-margin-small">
          <label className="uk-form-label">Zonas de consulta:</label>
          <div id="geocoder-container" className="uk-form-controls">
            <h4>{preference.zones ? preference.zones.map( zone => (`${zone}, `) ) : 'Cargando'} </h4>
          </div>
        </div>

        <div className="uk-margin-small">
          <label className="uk-form-label">Precio por consulta:</label>
          <div className="uk-form-controls">      
            <h4>
              {currencyFormatter.format(preference.base_price, { code: "MXN" })}
            </h4>
          </div>
        </div>

      </div>

      <div className="uk-width-4-5 uk-flex uk-flex-column uk-flex-center uk-flex-middle">

        <div className="uk-margin-small">
          <label className="uk-form-label">Biografia:</label>
          <div className="uk-form-controls">
            <textarea name="bio" defaultValue={curriculum.bio} className="uk-textarea uk-form-width-large" rows="6" />
          </div>
        </div>

        <div className="uk-margin-small">
          <label className="uk-form-label">Cedula Profesional Medicina General:</label>
          <div className="uk-form-controls">
            <input name="med_license" defaultValue={curriculum.med_license} className="uk-input uk-form-width-large" type="text" />
          </div>
        </div>

        <div className="uk-margin-small">
          <label className="uk-form-label">Universidad de Formacion en Medicina General:</label>
          <div className="uk-form-controls">
            <input name="university" defaultValue={curriculum.university} className="uk-input uk-form-width-large" type="text" />
          </div>
        </div>

        <div className="uk-margin-small">
          <label className="uk-form-label">Especialidad:</label>
          <div className="uk-form-controls">
            <input name="specialty" defaultValue={curriculum.specialty} className="uk-input uk-form-width-large" type="text" />
          </div>
        </div>

        <div className="uk-margin-small">
          <label className="uk-form-label">Cedula Profesional Especialidad:</label>
          <div className="uk-form-controls">
            <input name="specialty_license" defaultValue={curriculum.specialty_license} className="uk-input uk-form-width-large" type="text" />
          </div>
        </div>

        <div className="uk-margin-small">
          <label className="uk-form-label">Universidad de Formacion en Especialidad:</label>
          <div className="uk-form-controls">
            <input name="specialty_univ" defaultValue={curriculum.specialty_univ} className="uk-input uk-form-width-large" type="text" />
          </div>
        </div>

        <div className="uk-margin-small">
          <label className="uk-form-label">Subespecialidad:</label>
          <div className="uk-form-controls">
            <input name="subspecialty" defaultValue={curriculum.subspecialty} className="uk-input uk-form-width-large" type="text" />
          </div>
        </div>

        <div className="uk-margin-small">
          <label className="uk-form-label">Cedula Profesional Subespecialidad:</label>
          <div className="uk-form-controls">
            <input name="subspecialty_license" defaultValue={curriculum.subspecialty_license} className="uk-input uk-form-width-large" type="text" />
          </div>
        </div>

        <div className="uk-margin-small">
          <label className="uk-form-label">Universidad de Formacion en Subespecialidad:</label>
          <div className="uk-form-controls">
            <input name="subspecialty_univ" defaultValue={curriculum.subspecialty_univ} className="uk-input uk-form-width-large" type="text" />
          </div>
        </div>

      </div>
      
    </div>
  )

};

export default DoctorInfo;