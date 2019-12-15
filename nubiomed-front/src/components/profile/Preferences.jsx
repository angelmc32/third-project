import React, { useEffect, useContext, useState } from 'react';     // Import React and useContext hook
import { useHistory } from 'react-router-dom';                      // Import useHistory for "redirection"
import { AppContext } from '../../AppContext';                      // Import AppContext to use created context
import useForm from '../../hooks/useForm';                          // Import useForm custom hook
import AppLoader from '../common/Loader';                           // Import AppLoader for custom loading spinner


// Import API calls for Read and Update
import { getPreferences, editPreferences, editCurriculum, getCurriculum } from '../../services/profile-services';
import UIkit from 'uikit';               ;                          // Import UIkit for notifications

// Declare Preferences functional component
const Preferences = () => {

  // Destructure form state variable, handleInput and handleFileInput functions for form state manipulation
  const { form, setForm, handleInput } = useForm();
  
  const { user, route, setRoute } = useContext(AppContext);     // Destructure user state variable
  const [ preferences, setPreferences ] = useState({});   // Declare preferences state variable and setPreferences method to update preferences
  const [ curriculum, setCurriculum ] = useState({});   // Declare preferences state variable and setPreferences method to update preferences
  const { push } = useHistory();                        // Destructure push method from useHistory to "redirect" user

  // Hook to update component when user or preferences state variable is modified
  useEffect( () => {

    if ( !user._id ) {    // If there is no user logged in, send a notification and "redirect" to login

      // Send UIkit warning notification: User must log in
      UIkit.notification({
        message: `<span uk-icon='close'></span> Por favor inicia sesión.`,
        pos: 'bottom-center',
        status: 'warning'
      });
      
      return push('/login');         // If not logged in, "redirect" user to login

    }

    if ( route === 'preferences') {

      setForm({});

      getPreferences()
      .then( res => {

        const { preferences } = res.data;
        const { zones } = preferences;
        setPreferences(preferences);

      })
      .catch( error => {

        console.log(error);

        // Send UIkit error notification
        UIkit.notification({
          message: `<span uk-icon='close'></span> ${error}`,
          pos: 'bottom-center',
          status: 'danger'
        });

      });

    } else if ( route === 'curriculum') {

      setForm({});

      getCurriculum()
      .then( res => {

        const { curriculum } = res.data;
        console.log(curriculum);
        setCurriculum(curriculum);

      })
      .catch( error => {

        console.log(error);

        // Send UIkit error notification
        UIkit.notification({
          message: `<span uk-icon='close'></span> ${error}`,
          pos: 'bottom-center',
          status: 'danger'
        });

      });

    }

    

  }, [user, route] );

  // Declare function for form submit event
  const handleSubmit = (event) => {

    event.preventDefault();               // Prevent page reloading after submit action

    console.log(form);
    
    if ( route === 'preferences' ) {

      // Call edit service with formData as parameter, which includes form data for user profile information
      editPreferences(form)
      .then( res => {

        const { preferences } = res.data    // Destructure updated preferences document from response
        
        setPreferences(preferences);        // Modify preferences state variable with updated information

        // Send UIkit success notification
        UIkit.notification({
          message: `<span uk-icon='close'></span> '¡Tus preferencias fueron actualizadas exitosamente!'`,
          pos: 'bottom-center',
          status: 'success'
        });

      })
      .catch( error => {

        console.log(error);

        // Send UIkit error notification
        UIkit.notification({
          message: `<span uk-icon='close'></span> ${error}`,
          pos: 'bottom-center',
          status: 'danger'
        });

      });

    } else if ( route === 'curriculum' ) {

      console.log('working on curriculum')
      // Call edit service with formData as parameter, which includes form data for user profile information
      editCurriculum(form)
      .then( res => {

        const { curriculum } = res.data    // Destructure updated preferences document from response
        
        setCurriculum(curriculum);        // Modify preferences state variable with updated information

        // Send UIkit success notification
        UIkit.notification({
          message: `<span uk-icon='close'></span> '¡Tu curriculum fue actualizado exitosamente!'`,
          pos: 'bottom-center',
          status: 'success'
        });

      })
      .catch( error => {

        console.log(error);

        // Send UIkit error notification
        UIkit.notification({
          message: `<span uk-icon='close'></span> ${error}`,
          pos: 'bottom-center',
          status: 'danger'
        });

      });

    };

  };

  return (

    <div className="uk-section">

      <div className="uk-container">

        { route === 'preferences' ? <h3>Actualiza tus preferencias</h3> : <h3>Actualiza tu Curriculum</h3>}

        <div className="uk-width-1-1 uk-flex uk-flex-center uk-margin">
          <div className="uk-width-2-5 uk-flex uk-flex-center">
            <button className="uk-button uk-button-default uk-button-small uk-border-pill uk-margin-small-right" onClick={(event) => setRoute('preferences')}>
              Preferencias de consulta
            </button>
          </div>
          <div className="uk-width-2-5 uk-flex uk-flex-center">  
            <button className="uk-button uk-button-default uk-button-small uk-border-pill uk-margin-small-right" onClick={(event) => setRoute('curriculum')}>
              Curriculum y Trayectoria
            </button>
          </div>
        </div>

        <div className="uk-width-1-1 uk-flex uk-flex-column uk-flex-center uk-flex-middle uk-margin-large">

            { route === 'preferences' ? (

                preferences ? (
                  <form className="uk-form-horizontal uk-margin-medium uk-flex uk-flex-column uk-flex-center uk-flex-middle" onSubmit={handleSubmit}>
                    <div className="uk-margin-small uk-flex uk-flex-column">
                      <label className="uk-form-label">Zonas para dar consulta:</label>
                      <div className="uk-margin uk-grid-small uk-child-width-auto uk-grid uk-flex-column uk-flex-top">
                        <label><input onChange={handleInput} className="uk-checkbox" type="checkbox" name="zones" value="Polanco" /> Polanco</label>
                        <label><input onChange={handleInput} className="uk-checkbox" type="checkbox" name="zones" value="Roma" /> Roma</label>
                        <label><input onChange={handleInput} className="uk-checkbox" type="checkbox" name="zones" value="Condesa" /> Condesa</label>
                        <label><input onChange={handleInput} className="uk-checkbox" type="checkbox" name="zones" value="Reforma" /> Reforma</label>
                        <label><input onChange={handleInput} className="uk-checkbox" type="checkbox" name="zones" value="Col. del Valle" /> Col. del Valle</label>
                      </div>
                    </div>
        
                    <div className="uk-margin-small uk-flex uk-flex-center uk-width-1-1">
                      <div className="uk-width-1-5">
                        <label className="uk-form-label">Precio de consulta:</label>
                      </div>
                      <div className="uk-form-controls uk-width-4-5">
                        <input onChange={handleInput} name="price" defaultValue={preferences.base_price} className="uk-input" type="number" />
                      </div>
                    </div>
                  
                    <div className="uk-margin">
                      <button className="uk-button uk-button-danger uk-border-pill" type="submit">
                        Actualizar Preferencias
                      </button>
                    </div>
                  </form>
                ) : <AppLoader />
              ) : (

                !curriculum ? <AppLoader /> : (
                  <form className="uk-form-horizontal uk-margin-medium uk-flex uk-flex-column uk-flex-center uk-flex-middle" onSubmit={handleSubmit}>
                    <p className="uk-text-primary">Validaremos tu(s) cedula(s) profesional(es), por lo que es necesario cargar las imagenes en la plataforma</p>
                    <div className="uk-margin-small">
                      <label className="uk-form-label">Biografia:</label>
                      <div className="uk-form-controls">
                        <textarea onChange={handleInput} name="bio" defaultValue={curriculum.bio} className="uk-textarea uk-form-width-large" rows="6" />
                      </div>
                    </div>
        
                    <div className="uk-margin-small">
                      <label className="uk-form-label">Cedula Profesional Medicina General:</label>
                      <div className="uk-form-controls">
                        <input onChange={handleInput} name="med_license" defaultValue={curriculum.med_license} className="uk-input uk-form-width-large" type="text" />
                      </div>
                    </div>

                    <div className="uk-margin-small">
                      <label className="uk-form-label">Universidad de Formacion en Medicina General:</label>
                      <div className="uk-form-controls">
                        <input onChange={handleInput} name="university" defaultValue={curriculum.university} className="uk-input uk-form-width-large" type="text" />
                      </div>
                    </div>

                    <div className="uk-margin-small">
                      <label className="uk-form-label">Especialidad:</label>
                      <div className="uk-form-controls">
                        <input onChange={handleInput} name="specialty" defaultValue={curriculum.specialty} className="uk-input uk-form-width-large" type="text" />
                      </div>
                    </div>

                    <div className="uk-margin-small">
                      <label className="uk-form-label">Cedula Profesional Especialidad:</label>
                      <div className="uk-form-controls">
                        <input onChange={handleInput} name="specialty_license" defaultValue={curriculum.specialty_license} className="uk-input uk-form-width-large" type="text" />
                      </div>
                    </div>

                    <div className="uk-margin-small">
                      <label className="uk-form-label">Universidad de Formacion en Especialidad:</label>
                      <div className="uk-form-controls">
                        <input onChange={handleInput} name="specialty_univ" defaultValue={curriculum.specialty_univ} className="uk-input uk-form-width-large" type="text" />
                      </div>
                    </div>

                    <div className="uk-margin-small">
                      <label className="uk-form-label">Subespecialidad:</label>
                      <div className="uk-form-controls">
                        <input onChange={handleInput} name="subspecialty" defaultValue={curriculum.subspecialty} className="uk-input uk-form-width-large" type="text" />
                      </div>
                    </div>

                    <div className="uk-margin-small">
                      <label className="uk-form-label">Cedula Profesional Subespecialidad:</label>
                      <div className="uk-form-controls">
                        <input onChange={handleInput} name="subspecialty_license" defaultValue={curriculum.subspecialty_license} className="uk-input uk-form-width-large" type="text" />
                      </div>
                    </div>

                    <div className="uk-margin-small">
                      <label className="uk-form-label">Universidad de Formacion en Subespecialidad:</label>
                      <div className="uk-form-controls">
                        <input onChange={handleInput} name="subspecialty_univ" defaultValue={curriculum.subspecialty_univ} className="uk-input uk-form-width-large" type="text" />
                      </div>
                    </div>
                  
                    <div className="uk-margin">
                      <button className="uk-button uk-button-danger uk-border-pill" type="submit">
                        Actualizar Curriculum
                      </button>
                    </div>
                  </form>
                )
              )
            }   
        </div>
      </div>

    </div>

  )

};

export default Preferences;