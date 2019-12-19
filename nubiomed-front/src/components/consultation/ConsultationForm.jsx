import React, { useEffect, useState, useContext } from 'react';     // Import React, useEffect, useState and useContext hooks
import { useHistory } from 'react-router-dom';                      // Import useHistory for "redirection"
import { AppContext } from '../../AppContext';                      // Import AppContext to use created context
import { NavLink } from 'react-router-dom';                         // Import NavLink for "navigation"
import UIkit from 'uikit';                                          // Import UIkit for notifications

// Declare FacilityForm functional component, receives action variable for conditional rendering,
// email, password and confpassword variables from form state variable, and submit and handleChange functions
const ConsultationForm = ( { handleSubmit, handleInput, form, consultation = {} } ) => {

  const { user, setRoute } = useContext(AppContext);    // Destructure user state variable
  const { push } = useHistory();              // Destructure push method from useHistory to "redirect" user

  return (

    <form className="uk-form-horizontal uk-margin-medium uk-flex uk-flex-column uk-flex-center uk-flex-middle" onSubmit={handleSubmit}>
      <p className="uk-text-primary">Una vez concluida la consulta, no se podran realizar cambios</p>
      <div className="uk-margin-small">
        <label className="uk-form-label">Motivo de consulta:</label>
        <div className="uk-form-controls">
          <input onChange={handleInput} name="chief_complaint" defaultValue={consultation.chief_complaint} className="uk-input uk-form-width-large" type="text" />
        </div>
      </div>

      <div className="uk-margin-small">
        <label className="uk-form-label">Sistema afectado:</label>
        <div className="uk-form-controls" >
          <select className="uk-select uk-form-width-large" name="systems_chief_complaint" >
            <option value="Cardiovascular">Cardiovascular</option>
            <option value="Dermatológico">Dermatológico</option>
            <option value="Dolor">Dolor</option>
            <option value="Endócrino">Endócrino</option>
            <option value="Gastrointestinal">Gastrointestinal</option>
            <option value="Génito-Urinario">Génito-Urinario</option>
            <option value="Músculo-esquelético">Músculo-esquelético</option>
            <option value="Órganos de los Sentidos">Órganos de los Sentidos</option>
            <option value="Otros">Otros</option>
            <option value="Psiquiátrico">Psiquiátrico</option>
            <option value="Respiratorio">Respiratorio</option>
            <option value="Sistema Hemato-Linfático">Sistema Hemato-Linfático</option>
            <option value="Sistema Inmunológico">Sistema Inmunológico</option>
            <option value="Sistema Nervioso">Sistema Nervioso</option>
            <option value="Síntomas Generales">Síntomas Generales</option>
          </select>
        </div>
      </div>

      <div className="uk-margin-small">
        <label className="uk-form-label">Observaciones Examen Fisico:</label>
        <div className="uk-form-controls">
          <textarea onChange={handleInput} name="phys_exam" defaultValue={consultation.phys_exam} className="uk-textarea uk-form-width-large" rows="3" />
        </div>
      </div>

      <div className="uk-margin-small">
        <label className="uk-form-label">Diagnostico:</label>
        <div className="uk-form-controls">
          <textarea onChange={handleInput} name="diagnosis" defaultValue={consultation.diagnosis} className="uk-textarea uk-form-width-large" rows="3" />
        </div>
      </div>

      <div className="uk-margin-small">
        <label className="uk-form-label">Pronostico:</label>
        <div className="uk-form-controls">
          <textarea onChange={handleInput} name="prognosis" defaultValue={consultation.prognosis} className="uk-textarea uk-form-width-large" rows="3" />
        </div>
      </div>
    
      <div className="uk-margin">
        <button className="uk-button uk-button-danger uk-border-pill" type="submit">
          Concluir Consulta
        </button>
      </div>
    </form>
  );
}
export default ConsultationForm;