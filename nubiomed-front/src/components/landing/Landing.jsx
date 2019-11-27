import React, { useEffect, useContext } from 'react';     // Import React and useContext hook
import { Link, NavLink } from 'react-router-dom';         // Import NavLink for "navigation"
import { useHistory } from 'react-router-dom';            // Import useHistory for "redirection"
import { AppContext }  from '../../AppContext';           // Import AppContext to use created context
import Searchbar from '../common/Searchbar';
import LandingCard from './LandingCard';
import img_doctor from '../../assets/images/stethoscope.svg'
import img_home from '../../assets/images/homemarker.svg'
import img_hospital from '../../assets/images/hospital.svg'

// Declare Landing functional component
const Landing = () => {

  return (
    <div className="uk-section">
      <div className="uk-container uk-height-small uk-flex uk-flex-middle uk-flex-center">
        <Searchbar />
      </div>
      <div className="uk-container uk-flex uk-flex-middle uk-width-2-3">
        <LandingCard 
          image={img_doctor} 
          title="Busca por especialista"
          text="" 
        />
        <LandingCard 
          image={img_home}
          title="Busca por zona o a domicilio"
          text="" 
        />
        <LandingCard 
          image={img_hospital}
          title="Busca por consultorio"
          text="" 
        />
      </div>
    </div>
  )

}

export default Landing;