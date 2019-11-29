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
    <div className="uk-section uk-padding-remove-top">
      <div className="uk-container uk-height-medium uk-flex uk-flex-middle uk-flex-center">
        <Searchbar />
      </div>
      <div className="uk-container uk-flex uk-flex-middle uk-width-2-3 uk-height-small" uk-height-match="target: > .uk-card">
        <LandingCard 
          image={img_doctor} 
          image_width={96}
          image_height={96}
          text="Busca por especialista"
        />
        <LandingCard 
          image={img_home}
          image_width={96}
          image_height={96}
          text="Busca por zona o a domicilio"
        />
        <LandingCard 
          image={img_hospital}
          image_width={88}
          image_height={88}
          text="Busca por consultorio"
        />
      </div>
    </div>
  )

}

export default Landing;