import React, { useEffect, useState, useContext } from 'react';     // Import React, useEffect, useState and useContext hooks
import { useHistory } from 'react-router-dom';                      // Import useHistory for "redirection"
import { AppContext } from '../../AppContext';                      // Import AppContext to use created context
import { NavLink } from 'react-router-dom';                         // Import NavLink for "navigation"
import UIkit from 'uikit';                                          // Import UIkit for notifications

// Declare FacilityForm functional component, receives action variable for conditional rendering,
// email, password and confpassword variables from form state variable, and submit and handleChange functions
const PrescriptionForm = ( { handleSubmit, handleInput, form, prescription = {}, consultationID = null } ) => {

  const { user, setRoute } = useContext(AppContext);    // Destructure user state variable
  const { push } = useHistory();              // Destructure push method from useHistory to "redirect" user

  return (

    <form className="uk-form-horizontal uk-margin-medium uk-flex uk-flex-column uk-flex-center uk-flex-middle" onSubmit={handleSubmit}>
      <p className="uk-text-primary">Una vez concluida la consulta, no se podran realizar cambios</p>
      <div className="uk-margin-small">
        <label className="uk-form-label">Nombre de patente:</label>
        <div className="uk-form-controls">
          <input onChange={handleInput} name="brand_name"  defaultValue={prescription.brand_name} className="uk-input uk-form-width-large" type="text" />
        </div>
      </div>

      <div className="uk-margin-small">
        <label className="uk-form-label">Nombre generico:</label>
        <div className="uk-form-controls">
          <input onChange={handleInput} name="generic_name"  defaultValue={prescription.generic_name} className="uk-input uk-form-width-large" type="text" />
        </div>
      </div>

      <div className="uk-margin-small">
        <label className="uk-form-label">Dosis:</label>
        <div className="uk-form-controls">
          <textarea onChange={handleInput} name="dose"  defaultValue={prescription.dose} className="uk-textarea uk-form-width-large" rows="3" />
        </div>
      </div>

      <div className="uk-margin-small">
        <label className="uk-form-label">Presentacion:</label>
        <div className="uk-form-controls">
          <textarea onChange={handleInput} name="dosage_form"  defaultValue={prescription.dosage_form} className="uk-textarea uk-form-width-large" rows="3" />
        </div>
      </div>

      <div className="uk-margin-small">
        <label className="uk-form-label">Indicaciones:</label>
        <div className="uk-form-controls">
          <textarea onChange={handleInput} name="directions"  defaultValue={prescription.directions} className="uk-textarea uk-form-width-large" rows="3" />
        </div>
      </div>
    
      <div className="uk-margin">
        <button className="uk-button uk-button-danger uk-border-pill" type="submit">
          Crear receta
        </button>
      </div>

    </form>
  );
}
export default PrescriptionForm;