import React, { useContext } from 'react';                // Import React and useContext hook
import { useHistory } from 'react-router-dom';            // Import useHistory for "redirection"
import { AppContext } from '../../AppContext';            // Import AppContext to use created context
import { signup } from '../../services/auth-services';    // Import signup service for API call
import AuthForm from './AuthForm';                        // Import AuthForm react component
import useForm from '../../hooks/useForm';                // Import useForm custom hook
import UIkit from 'uikit';                                // Import UIkit for notifications

// Declare Signup functional component
const Signup = ( { usertype } ) => {

  const { form, handleInput } = useForm();      // Destructure form state variable and handleInput function
  const { setUser } = useContext(AppContext);   // Destructure setUser function for user state manipulation
  const { push } = useHistory();                // Destructure push method from useHistory to "redirect" user

  // Declare function for form submit event
  const handleSubmit = (event) => {

    event.preventDefault();                     // Prevent page reloading after submit action
    
    // Call signup service with form state variable as parameter, which includes form data for e-mail and password
    signup(form)
    .then( res => {
      
      const { user, token } = res.data;         // Destructure user and token from response, sent by API
      
      // Store user and token in localStorage
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);

      setUser(user);    // Modify user state variable, setting the user data in the state
      push('/profile');    // "Redirect" user to home

      // Send UIkit success notification
      UIkit.notification({
        message: `<span uk-icon='check'></span> We sent you an e-mail, please verify it to complete the account creation`,
        pos: 'bottom-center',
        status: 'success'
      });

    })
    .catch( res => {

      const { msg } = res.response.data;
      
      // Send UIkit error notification
      UIkit.notification({
        message: `<span uk-icon='close'></span> ${msg}`,
        pos: 'bottom-center',
        status: 'danger'
      });

    });
    
  };

  return (
    <div className="uk-section">
      <div className="uk-container uk-flex uk-flex-center">
        <AuthForm
          submit={handleSubmit}
          action="signup"
          usertype={usertype}
          handleChange={handleInput}
          {...form}
        />
      </div>
    </div>
  );

};

export default Signup;