import React, { useEffect, useState, useContext } from 'react';     // Import React, useEffect, useState and useContext hooks
import { useHistory } from 'react-router-dom';                      // Import useHistory for "redirection"
import { AppContext } from '../../AppContext';                      // Import AppContext to use created context
import useForm from '../../hooks/useForm';                          // Import useForm custom hook
import UIkit from 'uikit';                                          // Import UIkit for notifications
import moment from 'moment';                                        // Import momentjs for date formatting

import { getConsultationInfo, editConsultation } from '../../services/consultation-services'

import MyConsultations from './MyConsultations';
import ConsultationForm from './ConsultationForm';
import ConsultationInfo from './ConsultationInfo';

const Consultation = ({ consultationID = {} }) => {

  // Destructure form state variable, handleInput and handleFileInput functions for form state manipulation
  const { form, handleInput, handleFileInput } = useForm();

  const { user, route, setRoute } = useContext(AppContext);
  const [consultation, setConsultation] = useState(consultationID);

  useEffect( () => {

    if ( route === 'showConsultation' || route === 'finishConsultation' ) {

      getConsultationInfo(consultation)
      .then( res => {

        const { consultation } = res.data;
        setConsultation(consultation);
        console.log(consultation)

      });

    }

  }, [route]);

  // Declare function for form submit event
  const handleSubmit = (event) => {

    event.preventDefault();               // Prevent page reloading after submit action

    console.log(form);
    
    // if ( route === 'preferences' ) {

    // Call edit service with formData as parameter, which includes form data for user profile information
    editConsultation(consultation._id, form)
    .then( res => {

      const { consultation } = res.data    // Destructure updated preferences document from response
      
      setConsultation(consultation._id);
      //setRoute('showConsultation');        // Modify preferences state variable with updated information

      // Send UIkit success notification
      UIkit.notification({
        message: `<span uk-icon='close'></span> '¡La consulta fue concluida exitosamente!'`,
        pos: 'bottom-center',
        status: 'success'
      });

    })
    .catch( error => {

      console.log(error);

      // Send UIkit error notification
      UIkit.notification({
        message: `<span uk-icon='close'></span> ${error}`,
        pos: 'bottom-center',
        status: 'danger'
      });

    });

  };

  return (
    <div className="uk-section">

      { route === 'showConsultation' ? (
          <div className="uk-container">
            <h3>Informacion de Consulta {consultation._id}</h3>
            <ConsultationInfo consultation={consultation} />
          </div>
        ) : (
          route === 'finishConsultation' ? (
            <div className="uk-container">
              <h3>Consulta para {consultation.patient ? consultation.patient.first_name.length > 1 ? consultation.patient.first_name : consultation.patient.email : "Paciente"}</h3>
              <ConsultationForm handleSubmit={handleSubmit} handleInput={handleInput} form={form} consultation={consultation} />
            </div>
          ) : 
            <div className="uk-container">
              <MyConsultations consultation={consultation} setConsultation={setConsultation} />
            </div>
        )
      }

    </div>
  )

}

export default Consultation;