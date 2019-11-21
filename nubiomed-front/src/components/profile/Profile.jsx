import React, { useEffect, useContext } from 'react';         // Import React and useContext hook
import { useHistory } from 'react-router-dom';                // Import useHistory for "redirection"
import { AppContext } from '~src/AppContext';                 // Import AppContext to use created context
import { editProfile } from '~services/profile-services';     // Import edit API call
import useForm from '../../hooks/useForm';                    // Import useForm custom hook
import UIkit from 'uikit';                                    // Import UIkit for notifications


const Profile = () => {

  // Destructure form state variable, handleInput and handleFileInput functions for form state manipulation
  const { form, handleInput, handleFileInput } = useForm();
  const { user, setUser } = useContext(AppContext); // Destructure user state variable
  const { push } = useHistory();                    // Destructure push method from useHistory to "redirect" user


  useEffect( () => {

    if ( !user._id ) {

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

    event.preventDefault();          // Prevent page reloading after submit action

    const formData = new FormData();
    const { profile_picture } = form;

    for (let key in form) {

      if ( key === 'profile_picture' ) formData.append(key, profile_picture[0]);
      else formData.append(key, form[key]);
      
    }
    
    // Call edit service with form state variable as parameter, which includes form data for e-mail and password
    editProfile(formData)
    .then( res => {

      const { user } = res.data
      console.log(user);
      setUser(user);

    })
    .catch( error => {

      // Send UIkit error notification
      UIkit.notification({
        message: `<span uk-icon='close'></span> ${error}`,
        pos: 'bottom-center',
        status: 'danger'
      });

    });
    
   console.log(form);
  };

  return (
    <div className="uk-container">

      <div className="uk-container uk-margin-top">

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
              <label className="uk-form-label">CURP:</label>
              <div className="uk-inline">
                <input onChange={handleInput} name="curp" defaultValue={user.curp} className="uk-input" type="text" />
              </div>
            </div>

            <div className="uk-margin">
              <label className="uk-form-label">Genero:</label>
              <div className="uk-inline">
                <input onChange={handleInput} name="gender" defaultValue={user.gender} className="uk-input" type="text" />
              </div>
            </div>
            
          </div>

          <div className="uk-width-1-3">

            <div className="uk-width-auto uk-margin-remove">
              <img className="uk-border-circle" width={140} height={140} src={user.profile_picture} alt="User profile" />
            </div>

            <div className="js-upload" uk-form-custom="true">
              <input onChange={handleFileInput} name="profile_picture" type="file" multiple />
              <button className="uk-button uk-button-default uk-button-small" type="button">Cambiar foto de perfil</button>
            </div>
            
            <div className="uk-margin">
              <label className="uk-form-label">Correo Electrónico:</label>
              <div className="uk-inline">
                <span className="uk-form-icon" uk-icon="icon: user"></span>
                <input onChange={handleInput} name="email" defaultValue={user.email} className="uk-input" type="email" />
              </div>
            </div>
{/*
            <div className="uk-margin">
              <label className="uk-form-label">Contraseña:</label>
              <div className="uk-inline">
                <span className="uk-form-icon" uk-icon="icon: lock"></span>
                <input onChange={handleInput} name="password" value={user.password} className="uk-input" type="password"
                />
              </div>
            </div>
*/}

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