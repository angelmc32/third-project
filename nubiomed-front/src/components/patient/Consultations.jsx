import React, { useEffect, useState, useContext } from 'react';     // Import React, useEffect, useState and useContext hooks
import { useHistory } from 'react-router-dom';                      // Import useHistory for "redirection"
import { AppContext } from '../../AppContext';                      // Import AppContext to use created context
import useForm from '../../hooks/useForm';                          // Import useForm custom hook
import UIkit from 'uikit';                                          // Import UIkit for notifications
import moment from 'moment';                                        // Import momentjs for date formatting

import { getDoctorConsultations, getPatientConsultations } from '../../services/consultation-services'

const PatientConsultations = () => {

  const { user } = useContext(AppContext);
  const [consultations, setConsultations] = useState([]);

  useEffect( () => {

    console.log(user)

    if ( user.usertype === 'Doctor' ) {
      
      getDoctorConsultations()
      .then( res => {

        const { consultations } = res.data;
        console.log(consultations[0]);
        setConsultations(consultations);

      })

    } else if ( user.usertype === 'Patient' ) {

      getPatientConsultations()
      .then( res => {

        const { consultations } = res.data;
        console.log(consultations[0]);
        setConsultations(consultations);

      })

    }

  }, [user]);

  return (
    <div className="uk-section uk-padding-small">

      <div className="uk-container uk-width-5-6">

        <h3>{user.usertype === 'Doctor' ? "Consultas Anteriores" : "Mis Consultas"}</h3>

        { user.usertype === 'Doctor' ? 
            <table className="uk-table uk-table-striped uk-table-hover">
              <thead>
                <tr>
                  <th className="uk-text-center">Paciente</th>
                  <th className="uk-text-center">Motivo de consulta</th>
                  <th className="uk-text-center">Diagnostico</th>
                  <th className="uk-text-center">Receta</th>
                  <th className="uk-text-center">Fecha</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                { consultations ? 
                    consultations.map( (consultation, index) => 
                      <tr key={index}>
                        <td>{`${consultation.patient.first_name} ${consultation.patient.last_name1}`}</td>
                        <td>{consultation.chief_complaint}</td>
                        <td>{consultation.diagnosis}</td>
                        <td>{consultation.prescription ? consultation.prescription : "Sin receta"}</td>
                        <td>{consultation.date}</td>
                        <td>
                          <button className="uk-button uk-button-default uk-button-small">
                            Ver Consulta
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
          : <table className="uk-table uk-table-striped uk-table-hover">
              <thead>
                <tr>
                  <th className="uk-text-center">Motivo de consulta</th>
                  <th className="uk-text-center">Diagnostico</th>
                  <th className="uk-text-center">Receta</th>
                  <th className="uk-text-center">Doctor</th>
                  <th className="uk-text-center">Fecha</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                { consultations ? 
                    consultations.map( (consultation, index) => 
                      <tr key={index}>
                        <td>{consultation.chief_complaint}</td>
                        <td>{consultation.diagnosis}</td>
                        <td>{consultation.prescription ? consultation.prescription : "Sin receta"}</td>
                        <td>{`Dr. ${consultation.doctor.first_name} ${consultation.doctor.last_name1}`}</td>
                        <td>{consultation.date}</td>
                        <td>
                          <button className="uk-button uk-button-default uk-button-small">
                            Ver Consulta
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
        }
      </div>

    </div>
  )
};

export default PatientConsultations;