import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { signup } from '~services/auth-services';
import AuthForm from './AuthForm';
import useForm from '../../hooks/useForm';
import { AppContext } from '~src/AppContext';
import UIkit from 'uikit';

// Declare Signup functional component
const Signup = () => {

  const { form, handleInput } = useForm();      // Destructure form state variable and handleInput function
  const { setUser } = useContext(AppContext);   // Destructure setUser function for user state manipulation
  const { push } = useHistory();                // Destructure push method from useHistory to "redirect" user

  // Declare function for form submit event
  const handleSubmit = (event) => {
    console.log('Submitting')
    console.log(form);
    event.preventDefault();                     // Prevent page reloading after submit action

    // Call signup service with form state as parameter, which includes form data for e-mail and password
    signup(form)
    .then( res => {
      
      const { user, token } = res.data;         // Destructure user and token from response, sent by API
      
      // Store user and token in localStorage
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);

      setUser(user);    // Modify user state variable, setting the user data in the state
      push('/home');    // "Redirect" user to home

      // Send success notification
      UIkit.notification({
        message: `<span uk-icon='check'></span> We sent you an e-mail, please verify it to complete the account creation`,
        pos: 'bottom-center',
        status: 'success'
      });

    })
    .catch( error => {

      // Send error notification
      UIkit.notification({
        message: `<span uk-icon='close'></span> ${error}`,
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
          handleChange={handleInput}
          {...form}
        />
      </div>
    </div>
  );

};

export default Signup;