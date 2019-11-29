import React, { useEffect, useState, useContext } from 'react';     // Import React and useContext hook
import { useHistory } from 'react-router-dom';                      // Import useHistory for "redirection"
import { AppContext } from '../../AppContext';                      // Import AppContext to use created context
import useForm from '../../hooks/useForm';                          // Import useForm custom hook
import UIkit from 'uikit';                                          // Import UIkit for notifications
import moment from 'moment';                                        // Import momentjs for date formatting

import { createFacility } from '../../services/facility-services';  // Import new consultation API service
import FacilityForm from './FacilityForm';                          // Import FacilityForm react component

const Facility = ({ isCreating }) => {

  // Destructure form state variable, handleInput and handleFileInput functions for form state manipulation
  const { form, handleInput, handleFileInput } = useForm();
  // Declare formatted images state variable and set formatted images function to update the images state variable
  const [ formattedImages, setFormattedImages ] = useState([]);

  const { user } = useContext(AppContext);    // Destructure user state variable
  const { push } = useHistory();              // Destructure push method from useHistory to "redirect" user

  // Update component when user state variable is modified
  useEffect( () => {

    const { images } = form;

    getDataUrl(images);

    if ( !user._id ) {    // If there is no user logged in, send a notification and "redirect" to login

      // Send UIkit warning notification: User must log in
      UIkit.notification({
        message: `<span uk-icon='close'></span> Por favor inicia sesión.`,
        pos: 'bottom-center',
        status: 'warning'
      });
      
      return push('/login');         // If not logged in, "redirect" user to login

    };

  }, [form.images] );

  const getDataUrl = files => {

    if (!files) return;
    const dataUrls = Array.from(files).map(file => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setFormattedImages(prevState => [...prevState, reader.result]);
      };
    });

    return dataUrls;

  };

  return (
    <div className="uk-section uk-padding-small-top">

      <div className="uk-container">

        <FacilityForm />

      </div>

    </div>
  )

}

export default Facility;