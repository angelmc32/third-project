import React, { useEffect, useState, useContext } from 'react';     // Import React, useEffect, useState and useContext hooks
import { useHistory } from 'react-router-dom';                      // Import useHistory for "redirection"
import { AppContext } from '../../AppContext';                      // Import AppContext to use created context
import useForm from '../../hooks/useForm';                          // Import useForm custom hook
import UIkit from 'uikit';                                          // Import UIkit for notifications
import moment from 'moment';                                        // Import momentjs for date formatting

// Import API services (CRUD operations) from services file
import { getDoctors } from '../../services/doctor-services';

import DoctorCard from './DoctorCard';
import DoctorInfo from './DoctorInfo';

const Doctors = () => {

  // Destructure user and route state variables, as well as setRoute to update route state variable
  const { user, route, setRoute } = useContext(AppContext);
  // Declare doctors state variable and setDoctors function to update the doctors state variable
  const [doctors, setDoctors] = useState([]);
  const [doctor, setDoctor] = useState({});
  const [preference, setPreference] = useState({});

  useEffect( () => {

    if ( route === 'doctors' ) {
      
      getDoctors()
      .then( res => {

        const { doctors } = res.data;

        console.log(doctors);
        setDoctors(doctors);

      });

    } else if ( route === 'showDoctor') {

      getDoctors(doctor)
      .then( res => {

        const { doctor } = res.data;

        setDoctor(doctor);
        setPreference(doctor.preference);

      })

    }

  }, [route]);

  // Declare function to set route to facility edit or facility info
  const showDoctor = (event, id) => {
    
    event.preventDefault();
    setDoctor(id);

    if ( route === 'doctors' ) setRoute('showDoctor');

  }

  return (

    <div className="uk-section">

      <div className="uk-container">

        { route === 'doctors' ? (
            <div className="uk-width-1-1 uk-flex uk-flex-column uk-flex-middle">
              <h3>Busca doctores</h3>
              <div uk-grid="true" className="uk-width-4-5 uk-child-width-1-3 uk-grid-match uk-grid-medium">
                { doctors.map( (doctor, index) => ( <DoctorCard key={index} {...doctor} showDoctor={showDoctor} /> ) ) }
              </div>
            </div>
          ) : (
            <DoctorInfo doctor={doctor} preference={preference} />
          ) }

        
      </div>

    </div>

  );

};

export default Doctors;