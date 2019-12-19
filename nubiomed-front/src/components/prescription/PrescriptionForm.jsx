import React, { useEffect, useState, useContext } from 'react';     // Import React, useEffect, useState and useContext hooks
import { useHistory } from 'react-router-dom';                      // Import useHistory for "redirection"
import { AppContext } from '../../AppContext';                      // Import AppContext to use created context
import { NavLink } from 'react-router-dom';                         // Import NavLink for "navigation"
import UIkit from 'uikit';                                          // Import UIkit for notifications

import { getAllPatients } from '../../services/patient-services';

// Declare FacilityForm functional component, receives action variable for conditional rendering,
// email, password and confpassword variables from form state variable, and submit and handleChange functions
const PrescriptionForm = ( { handleSubmit, handleInput, form, prescription = {}, consultationID = null } ) => {

  const { user, setRoute } = useContext(AppContext);    // Destructure user state variable
  const { push } = useHistory();              // Destructure push method from useHistory to "redirect" user

  const [patients, setPatients] = useState([]);

  useEffect( () => {

    getAllPatients()
    .then( res => {

      const { patients } = res.data;
      setPatients(patients);

    })

  }, []);

  return (

    <form className="uk-form-horizontal uk-margin-medium uk-flex uk-flex-wrap uk-flex-center uk-flex-middle" onSubmit={handleSubmit}>
      <div className="uk-width-1-1">
        <p className="uk-text-primary">Una vez creada la receta, no se podran realizar cambios</p>
      </div>
      
      
      <div className="uk-width-3-5 uk-margin">
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
      </div>

      <div className="uk-width-2-5 uk-margin">
        <p>Todos los pacientes</p>
          <div id="height30ovfw" className="uk-container uk-width-5-6">
            <ul className="uk-list uk-list-striped">
                  <li key={null}>
                    <label className="uk-flex uk-flex-around uk-flex-middle">
                      <input onChange={handleInput} className="uk-radio" type="radio" name="patient" value="5df837b4b1579b1646f36db2" />
                        Paciente no registrado
                    </label>
                  </li>
              { patients ? (
                  patients.map( (patient, index) => 
                  <li key={patient._id}>
                    <label className="uk-flex uk-flex-around uk-flex-middle">
                      <input onChange={handleInput} className="uk-radio" type="radio" name="patient" value={patient._id} />
                        {patient.first_name ? patient.first_name : patient.email}
                    </label>
                    <input onChange={handleInput} type="hidden" name="patient" value={patient._id} />
                  </li> )
                ) : (
                  <li>Cargando pacientes</li>
                ) }
            </ul>
          </div>
      </div>
    
      <div className="uk-margin uk-width-1-1">
        <button className="uk-button uk-button-danger uk-border-pill" type="submit">
          Crear receta
        </button>
      </div>

    </form>
  );
}
export default PrescriptionForm;