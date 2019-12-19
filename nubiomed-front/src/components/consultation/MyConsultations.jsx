import React, { useEffect, useState, useContext } from 'react';     // Import React, useEffect, useState and useContext hooks
import { useHistory, NavLink } from 'react-router-dom';                      // Import useHistory for "redirection"
import { AppContext } from '../../AppContext';                      // Import AppContext to use created context
import useForm from '../../hooks/useForm';                          // Import useForm custom hook
import UIkit from 'uikit';                                          // Import UIkit for notifications
import moment from 'moment';                                        // Import momentjs for date formatting

import 'moment/locale/es'

import { getDoctorConsultations, getPatientConsultations } from '../../services/consultation-services'

const MyConsultations = ({ consultation, setConsultation }) => {

  const { user, setRoute, setSpecial } = useContext(AppContext);
  const [consultations, setConsultations] = useState([]);

  useEffect( () => {

    if ( user.usertype === 'Doctor' ) {
      
      getDoctorConsultations()
      .then( res => {

        const { consultations } = res.data;
        setConsultations(consultations);

      })

    } else if ( user.usertype === 'Patient' ) {

      getPatientConsultations()
      .then( res => {

        const { consultations } = res.data;
        setConsultations(consultations);

      })

    }

  }, [user]);

  const handleButtonClick = (consultationID, newRoute) => {

    consultation = consultationID;
    setConsultation(consultationID);
    setRoute(newRoute);

  }

  const handleSpecialRedirection = (specialID, newRoute, consultation) => {

    console.log(specialID)
    console.log(consultation)
    setSpecial(specialID);
    setRoute(newRoute);

  }

  return (

      <div className="uk-container uk-padding">

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
                        <td>
                          <NavLink to='/facilities'>
                            <button className="uk-button uk-button-default uk-border-pill"  >
                              {consultation.facility ? `Ver consultorio` : "Sin informacion"}
                            </button>
                          </NavLink>
                        </td>
                        <td>{moment(consultation.date).locale('es').format('LL')}</td>
                        <td>
                          { consultation.isDone ? 
                              <button className="uk-button uk-button-default uk-border-pill" onClick={(event) => handleButtonClick(consultation._id, 'showConsultation')} >
                                Ver
                              </button>
                            :
                              <button className="uk-button uk-button-danger uk-border-pill" onClick={(event) => handleButtonClick(consultation._id, 'finishConsultation')} >
                                Realizar
                              </button>
                          }
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
                        <td>{moment(consultation.date).locale('es').format('LL')}</td>
                        <td>
                          { consultation.isDone ? 
                              <button className="uk-button uk-button-default uk-button-small" onClick={(event) => handleButtonClick(consultation._id, 'showConsultation')} >
                                Ver Consulta
                              </button>
                            :
                              "Consulta por realizar"
                          }  
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

  )
};

export default MyConsultations;