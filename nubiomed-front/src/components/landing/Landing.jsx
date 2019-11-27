import React, { useEffect, useContext } from 'react';     // Import React and useContext hook
import { Link, NavLink } from 'react-router-dom';         // Import NavLink for "navigation"
import { useHistory } from 'react-router-dom';            // Import useHistory for "redirection"
import { AppContext }  from '../../AppContext';           // Import AppContext to use created context
import Searchbar from '../common/Searchbar';

// Declare Landing functional component
const Landing = () => {

  return (
    <div className="uk-section uk-height-1-1">
      <Searchbar />
    </div>
  )

}

export default Landing;