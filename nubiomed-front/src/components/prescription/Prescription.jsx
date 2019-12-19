import React, { useEffect, useState, useContext } from 'react';     // Import React, useEffect, useState and useContext hooks
import { useHistory } from 'react-router-dom';                      // Import useHistory for "redirection"
import { AppContext } from '../../AppContext';                      // Import AppContext to use created context
import useForm from '../../hooks/useForm';                          // Import useForm custom hook
import UIkit from 'uikit';                                          // Import UIkit for notifications
import moment from 'moment';                                        // Import momentjs for date formatting

import { getUserPrescriptions, getPrescriptionInfo, createPrescription } from '../../services/prescription-services'

import MyPrescriptions from './MyPrescriptions';
import PrescriptionForm from './PrescriptionForm';
import PrescriptionInfo from './PrescriptionInfo';

const Prescription = ({ prescriptionID = {} }) => {

  // Destructure form state variable, handleInput and handleFileInput functions for form state manipulation
  const { form, handleInput, handleFileInput } = useForm();

  const { user, route, setRoute } = useContext(AppContext);
  const [prescription, setPrescription] = useState(prescriptionID);
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect( () => {
    
    getUserPrescriptions()
    .then( res => {

      const { prescriptions } = res.data;
      setPrescriptions(prescriptions);

    });

    if ( route === 'showPrescription' ) {

      getPrescriptionInfo(prescription)
      .then( res => {

        const { prescription } = res.data;
        setPrescription(prescription);

      });

    }

  }, [route]);

  // Declare function for form submit event
  const handleSubmit = (event) => {

    event.preventDefault();               // Prevent page reloading after submit action

    console.log(form);
    
    // if ( route === 'preferences' ) {

    // Call edit service with formData as parameter, which includes form data for user profile information
    createPrescription(form)
    .then( res => {

      const { prescription } = res.data    // Destructure updated preferences document from response
      
      setPrescription(prescription._id);

      // Send UIkit success notification
      UIkit.notification({
        message: `<span uk-icon='close'></span> '¡La receta fue creada exitosamente!'`,
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

      { route === 'showPrescription' ? (
          <div className="uk-container">
            <h3>Informacion de Receta {prescription._id}</h3>
            <PrescriptionInfo prescription={prescription} />
          </div>
        ) : (
          route === 'newPrescription' ? (
            <div className="uk-container">
              <h3>Receta para {prescription.patient ? prescription.patient.first_name.length > 1 ? prescription.patient.first_name : prescription.patient.email : "Paciente"}</h3>
              <PrescriptionForm handleSubmit={handleSubmit} handleInput={handleInput} form={form} prescription={prescription} />
            </div>
          ) : 
            <div className="uk-container">
              <MyPrescriptions prescriptions={prescriptions} setPrescriptions={setPrescriptions} />
            </div>
        )
      }

    </div>
  )

};

export default Prescription;