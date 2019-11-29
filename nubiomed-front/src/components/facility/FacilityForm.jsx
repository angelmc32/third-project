import React from 'react';                        // Import React
import { NavLink } from 'react-router-dom';       // Import NavLink for "navigation"
import FacilityCard from './FacilityCard';        // Import FacilityCard react component

// Declare FacilityForm functional component, receives action variable for conditional rendering,
// email, password and confpassword variables from form state variable, and submit and handleChange functions
const FacilityForm = ( { submit, action, usertype, email = '', password = '', confpassword = '', handleChange, handleFileInput } ) => (

  <form className="uk-form-horizontal uk-margin-medium uk-flex uk-flex-center uk-flex-middle" onSubmit={submit}>

    <div className="uk-width-2-5 uk-flex uk-flex-column uk-flex-center uk-flex-middle">

      <h3>Publica un consultorio en renta</h3>

      <div className="uk-margin-small">
        <label className="uk-form-label">Titulo:</label>
        <div className="uk-form-controls">
          <input onChange={handleChange} name="title" defaultValue="" className="uk-input" type="text" />
        </div>
      </div>

      <div className="uk-margin-small">
        <label className="uk-form-label">Descripcion:</label>
        <div className="uk-form-controls">
          <textarea onChange={handleChange} name="description" defaultValue="" className="uk-textarea" rows="5" />
        </div>
      </div>

      <div className="uk-margin-small">
        <label className="uk-form-label">Direccion:</label>
        <div className="uk-form-controls">
          <input onChange={handleChange} name="address" defaultValue="" className="uk-input" type="text" />
        </div>
      </div>

      <div className="uk-margin-small">
        <label className="uk-form-label">Precio:</label>
        <div className="uk-form-controls">
          <input onChange={handleChange} name="price" defaultValue="" className="uk-input" type="number" />
        </div>
      </div>

      <div className="js-upload uk-margin" uk-form-custom="true">
        <input onChange={handleFileInput} name="images" type="file" multiple />
        <button className="uk-button uk-button-default uk-button-small" type="button">Agregar Imagenes</button>
      </div>   
    
    </div>

    <div className="uk-width-2-5 uk-flex uk-flex-column uk-flex-center uk-flex-middle">

      <div className="uk-margin-small">
        <FacilityCard />
      </div>

      <div className="uk-margin-small">
        <label className="uk-form-label">
          <input onChange={handleChange} className="uk-checkbox" type="checkbox" name="is_med_facility" value="true"/>
            Este consultorio cuenta con los requerimientos minimos de un consultorio
        </label>
      </div>

      <button className="uk-button uk-button-danger uk-border-pill" type="submit">
        Publicar
      </button>

    </div>

  </form>
  
);

export default FacilityForm;