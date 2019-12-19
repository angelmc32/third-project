import React, { useEffect, useState, useContext } from 'react';     // Import React, useEffect, useState and useContext hooks
import { useHistory } from 'react-router-dom';                      // Import useHistory for "redirection"
import { AppContext } from '../../AppContext';                      // Import AppContext to use created context
import useForm from '../../hooks/useForm';                          // Import useForm custom hook
import UIkit from 'uikit';                                          // Import UIkit for notifications
import moment from 'moment';                                        // Import momentjs for date formatting

import 'moment/locale/es'

import { getDoctorConsultations, getPatientConsultations } from '../../services/consultation-services'

const MyPrescriptions = ({ prescriptions = [], setPrescription }) => {

  const { user, setRoute } = useContext(AppContext);
  // const [consultations, setConsultations] = useState([]);

  // useEffect( () => {

  //   if ( user.usertype === 'Doctor' ) {
      
  //     getDoctorConsultations()
  //     .then( res => {

  //       const { consultations } = res.data;
  //       setConsultations(consultations);

  //     })

  //   } else if ( user.usertype === 'Patient' ) {

  //     getPatientConsultations()
  //     .then( res => {

  //       const { consultations } = res.data;
  //       setConsultations(consultations);

  //     })

  //   }

  // }, [user]);

  const handleButtonClick = (prescriptionID, newRoute) => {

    setPrescription(prescriptionID);
    setRoute(newRoute);

  }

  return (

      <div className="uk-container uk-padding">

        <h3>{user.usertype === 'Doctor' ? "Recetas Anteriores" : "Mis Recetas"}</h3>


          <table className="uk-table uk-table-striped uk-table-hover">
            <thead>
              <tr>
                <th className="uk-text-center">Paciente</th>
                <th className="uk-text-center">Medicamento</th>
                <th className="uk-text-center">Diagnostico</th>
                <th className="uk-text-center">Consulta</th>
                <th className="uk-text-center">Fecha</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              { prescriptions ? 
                  prescriptions.map( (prescription, index) => 
                    <tr key={index}>
                      <td>{`${prescription.patient.first_name} ${prescription.patient.last_name1}`}</td>
                      <td>{prescription.generic_name}</td>
                      <td>{prescription.consultation.diagnosis}</td>
                      <td>{prescription.consultation ? prescription.consultation : "Sin receta"}</td>
                      <td>{moment(prescription.date).locale('es').format('LL')}</td>
                      <td>
                        <button className="uk-button uk-button-default uk-button-small" onClick={(event) => handleButtonClick(prescription._id, 'showPrescription')} >
                          Ver Receta
                        </button>
                      </td>
                    </tr>
                  )
                : <tr>
                    <td>Cargando</td>
                    <td>Cargando</td>
                    <td>Cargando</td>
                    <td>Cargando</td>
                    <td>Cargando</td>
                  </tr>
              }
            </tbody>
          </table>
        
      </div>

  )
};

export default MyPrescriptions;