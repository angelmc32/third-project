import React, { useEffect, useState, useContext } from 'react';     // Import React, useEffect, useState and useContext hooks
import { useHistory } from 'react-router-dom';                      // Import useHistory for "redirection"
import { AppContext } from '../../AppContext';                      // Import AppContext to use created context
import useForm from '../../hooks/useForm';                          // Import useForm custom hook
import UIkit from 'uikit';                                          // Import UIkit for notifications
import moment from 'moment';                                        // Import momentjs for date formatting

import { getPatientConsultations } from '../../services/consultation-services'

const PatientConsultations = () => {

  const { user } = AppContext;
  const [consultations, setConsultations] = useState([]);

  useEffect( () => {

    getPatientConsultations()
    .then( res => {

      const { consultations } = res.data;
      console.log(consultations)
      setConsultations(consultations);

    })

  }, []);

  return (
    <div className="uk-section">

      <div className="uk-container">

        <ul className="uk-list uk-list-striped">

          { consultations ? 
            consultations.map( (consultation, index) => 
            <li key={consultation._id}>
              <label className="uk-flex uk-flex-around uk-flex-middle">
                <input className="uk-radio" type="radio" name="patient" value={consultation._id} />
                  {consultation.title}
              </label>
              
            </li> 
            ) : (
              <h4>Cargando consultas</h4>
            )
          }
          </ul>

      </div>

    </div>
  )
};

export default PatientConsultations;