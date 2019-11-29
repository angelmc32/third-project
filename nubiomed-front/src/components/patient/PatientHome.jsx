import React, { useEffect, useContext } from 'react';           // Import React and useContext hook
import { useHistory } from 'react-router-dom';                  // Import useHistory for "redirection"
import { AppContext } from '../../AppContext';                  // Import AppContext to use created context
import UIkit from 'uikit';                                      // Import UIkit for notifications

const PatientHome = () => {

  const { user, setUser } = useContext(AppContext); // Destructure user state variable
  const { push } = useHistory();                    // Destructure push method from useHistory to "redirect" user

  // Update component when user state variable is modified
  useEffect( () => {

    // If user is not a patient and not logged in, send a notification and "redirect" to login
    if ( user.usertype !== 'Patient' ) {

      // Send UIkit warning notification: User must log in
      UIkit.notification({
        message: `<span uk-icon='close'></span> Por favor inicia sesión.`,
        pos: 'bottom-center',
        status: 'warning'
      });
      
      return push('/login');         // If not logged in, "redirect" user to doctor-login

    };

  }, [user] );

  return (
    <div className="uk-section">
      <h1>This is the patient home page</h1>
    </div>
  )
};

export default PatientHome;