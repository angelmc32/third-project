import React, { useEffect, useContext, useState } from 'react';     // Import React and useContext hook
import { useHistory } from 'react-router-dom';                      // Import useHistory for "redirection"
import { AppContext } from '../../AppContext';                      // Import AppContext to use created context
import useForm from '../../hooks/useForm';                          // Import useForm custom hook


// Import API calls for Read and Update
import { getPreferences, editPreferences } from '../../services/profile-services';
import UIkit from 'uikit';               ;                          // Import UIkit for notifications

// Declare Preferences functional component
const Preferences = () => {

  // Destructure form state variable, handleInput and handleFileInput functions for form state manipulation
  const { form, handleInput } = useForm();
  
  const { user, setUser } = useContext(AppContext);     // Destructure user state variable
  const [ preferences, setPreferences ] = useState();   // Declare preferences state variable and setPreferences method to update preferences
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

  }, [user] );

  // Declare function for form submit event
  const handleSubmit = (event) => {

    event.preventDefault();               // Prevent page reloading after submit action

    console.log(form);
    
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
    
  };

  return (

    <div className="uk-section">

      <div className="uk-container">
        <h3>Here are your preferences</h3>
          <form className="uk-form-horizontal uk-margin-medium uk-flex uk-flex-column uk-flex-center uk-flex-middle" onSubmit={handleSubmit}>
            <label >Zonas para dar consulta:</label>
            <div className="uk-margin uk-grid-small uk-child-width-auto uk-grid">
              <label><input onChange={handleInput} className="uk-checkbox" type="checkbox" name="zones" value="Polanco" /> Polanco</label>
              <label><input onChange={handleInput} className="uk-checkbox" type="checkbox" name="zones" value="Roma" /> Roma</label>
              <label><input onChange={handleInput} className="uk-checkbox" type="checkbox" name="zones" value="Condesa" /> Condesa</label>
              <label><input onChange={handleInput} className="uk-checkbox" type="checkbox" name="zones" value="Reforma" /> Reforma</label>
              <label><input onChange={handleInput} className="uk-checkbox" type="checkbox" name="zones" value="Col. del Valle" /> Col. del Valle</label>
            </div>
            <button className="uk-button uk-button-danger uk-border-pill" type="submit">
                Actualizar
            </button>
          </form>
      </div>

    </div>

  )

};

export default Preferences;