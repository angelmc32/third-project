import React, { useEffect, useContext } from 'react';           // Import React and useContext hook
import { useHistory } from 'react-router-dom';                  // Import useHistory for "redirection"
import { AppContext } from '../../AppContext';                  // Import AppContext to use created context
import { editProfile } from '../../services/profile-services';  // Import edit API call
import useForm from '../../hooks/useForm';                      // Import useForm custom hook
import UIkit from 'uikit';                                      // Import UIkit for notifications
import moment from 'moment';                                    // Import momentjs for date formatting

// Declare Profile functional component
const Profile = () => {

  // Destructure form state variable, handleInput and handleFileInput functions for form state manipulation
  const { form, handleInput, handleFileInput } = useForm();
  
  const { user, setUser } = useContext(AppContext); // Destructure user state variable
  const { push } = useHistory();                    // Destructure push method from useHistory to "redirect" user

  // Hook to update component when user state variable is modified
  useEffect( () => {

    if ( !user._id ) {    // If there is no user logged in, send a notification and "redirect" to login

      // Send UIkit warning notification: User must log in
      UIkit.notification({
        message: `<span uk-icon='close'></span> Por favor inicia sesión.`,
        pos: 'bottom-center',
        status: 'warning'
      });
      
      return push('/login');         // If not logged in, "redirect" user to login

    };

  }, [user] );

  // Declare function for form submit event
  const handleSubmit = (event) => {

    event.preventDefault();               // Prevent page reloading after submit action

    const formData = new FormData();      // Declare formData as new instance of FormData class
    const { profile_picture } = form;     // Destructure profile_picture from form

    // Iterate through every key in form object and append name:value to formData
    for (let key in form) {

      // If profile_picture, append as first item in array (currently 1 file allowed, index 0)
      if ( key === 'profile_picture' ) formData.append(key, profile_picture[0]);

      else formData.append(key, form[key]);
      
    }
    
    // Call edit service with formData as parameter, which includes form data for user profile information
    editProfile(formData)
    .then( res => {

      const { user } = res.data   // Destructure updated user document from response
      
      setUser(user);              // Modify user state variable with updated information

      // Send UIkit success notification
      UIkit.notification({
        message: `<span uk-icon='close'></span> '¡Tu perfil fue actualizado exitosamente!'`,
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

        <h2>Actualiza tu perfil</h2>

        <form className="uk-form-stacked uk-margin uk-flex uk-flex-center uk-flex-middle" onSubmit={handleSubmit}>

          <div className="uk-width-1-3">
          
            <div className="uk-margin">
              <label className="uk-form-label">Nombres:</label>
              <div className="uk-inline">
                <input onChange={handleInput} name="first_name" defaultValue={user.first_name} className="uk-input" type="text" />
              </div>
            </div>

            <div className="uk-margin">
              <label className="uk-form-label">Apellido paterno:</label>
              <div className="uk-inline">
                <input onChange={handleInput} name="last_name1" defaultValue={user.last_name1} className="uk-input" type="text" />
              </div>
            </div>

            <div className="uk-margin">
              <label className="uk-form-label">Apellido materno:</label>
              <div className="uk-inline">
                <input onChange={handleInput} name="last_name2" defaultValue={user.last_name2} className="uk-input" type="text" />
              </div>
            </div>

            <div className="uk-margin">
              <label className="uk-form-label">Fecha de nacimiento: {moment.utc(user.date_of_birth).format('LL')}</label>
              <div className="uk-inline">
                <input onChange={handleInput} name="date_of_birth" className="uk-input" type="date" />
              </div>
            </div>

            <div className="uk-margin">
              <label className="uk-form-label">Genero: {user.gender === 'F' ? "Mujer" : user.gender === 'M' ? "Hombre" : "No binario"}</label>
              <div className="uk-margin uk-flex uk-flex-around">
                <label><input onChange={handleInput} className="uk-radio" type="radio" name="gender" value="F" />Mujer</label>
                <label><input onChange={handleInput} className="uk-radio" type="radio" name="gender" value="M" />Hombre</label>
                <label><input onChange={handleInput} className="uk-radio" type="radio" name="gender" value="U" />No binario</label>
              </div>
            </div>
            
          </div>

          <div className="uk-width-1-3">

            <div className="uk-width-auto">
              <img className="uk-border-circle" width={160} height={160} src={user.profile_picture} alt="User profile" />
            </div>

            <div className="js-upload uk-margin" uk-form-custom="true">
              <input onChange={handleFileInput} name="profile_picture" type="file" multiple />
              <button className="uk-button uk-button-default uk-button-small" type="button">Cambiar foto de perfil</button>
            </div>

            <div>
              <label className="uk-form-label">CURP:</label>
              <div className="uk-inline">
                <input onChange={handleInput} name="curp" defaultValue={user.curp} className="uk-input" type="text" />
              </div>
            </div>
            
            <div className="uk-margin">
              <label className="uk-form-label">Correo Electrónico:</label>
              <div className="uk-inline">
                <span className="uk-form-icon" uk-icon="icon: user"></span>
                <input onChange={handleInput} name="email" defaultValue={user.email} className="uk-input" type="email" />
              </div>
            </div>

            <button className="uk-button uk-button-primary uk-border-pill" type="submit">
              Actualizar
            </button>
          
          </div>

        </form>

      </div>
    </div>
  );

};

export default Profile;