import React, { createContext, useState } from 'react';   // Import React and 2 hooks for context-creation and state-manipulation

// Create context object, and export it so children components can use it through the useContext hook
export const AppContext = createContext();

// Create Provider component 
const AppProvider = ({ children }) => {

  // Obtain user data from the localStorage, or set it as an empty object in case there is no user stored
  const initialUserState = JSON.parse( localStorage.getItem('user') ) || {};

  // Declare user state variable and setUser function to update the user state variable
  const [user, setUser] = useState(initialUserState);
  
  // Declare resetUserContext function that will allow us to reset the user context
  const resetUserContext = () => {

    setUser({});    // Sets user context to an empty object, 

  };

  // Create the userContext object to be passed as prop in the Provider, with our created state and functions
  const userContext = { user, setUser, resetUserContext };

  // Return a context Provider component, sending the userContext as value prop
  return (
    <AppContext.Provider value={ userContext }>
      { children }
    </AppContext.Provider>
  );

};

export default AppProvider;