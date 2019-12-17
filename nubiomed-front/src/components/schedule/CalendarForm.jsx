import React, { useEffect, useState, useContext } from 'react';     // Import React, useEffect, useState and useContext hooks
import { useHistory } from 'react-router-dom';                      // Import useHistory for "redirection"
import { AppContext } from '../../AppContext';                      // Import AppContext to use created context

import { getAllPatients } from '../../services/patient-services';

const CalendarForm = ( { submit, handleChange, form, consultation = {} } ) => {

  const { user, route, setRoute } = useContext(AppContext);    // Destructure user state variable
  const [patients, setPatients] = useState([]);

  useEffect( () => {

    getAllPatients()
    .then( res => {

      const { patients } = res.data;
      setPatients(patients);
      console.log(patients);

    })

  }, [consultation]);

  return (

    user.usertype === 'Doctor' ? (
      
      <div className="uk-flex uk-flex-around uk-flex-wrap">

        <div className="uk-width-1-1 uk-flex uk-flex-between uk-margin-bottom">

          <div className="uk-width-1-5 uk-flex uk-flex-left">
            <button className="uk-button uk-button-default uk-button-small uk-border-pill uk-margin-small-right" onClick={(event) => setRoute('schedule')}>
              Atras
            </button>
          </div>

          <div className="uk-width-1-5 uk-flex uk-flex-left">
            <button className="uk-button uk-button-default uk-button-small uk-border-pill uk-margin-small-right" onClick={(event) => console.log(consultation)}>
              state
            </button>
          </div>

        </div>

        <div className="uk-width-4-5 uk-flex uk-flex-wrap uk-flex-center uk-flex-middle">

          <div className="uk-width-1-1">
          <h3>Crea una consulta en tu agenda</h3>
          </div>
          
        <div className="uk-width-1-1 uk-flex">

          <form className="uk-form-horizontal uk-width-1-1 uk-flex uk-flex-wrap" onSubmit={submit}>
          
            <div className="uk-width-3-5 uk-margin uk-flex uk-flex-column uk-flex-start uk-flex-around">

              <div className="uk-margin">
                <label className="uk-form-label">Hora seleccionada:</label>
                <div className="uk-form-controls">
                  <input onChange={handleChange} name="time" value={consultation.dateStr ? consultation.dateStr.slice(11,16) : "23:00"} className="uk-input" type="time" />
                </div>
              </div>

              <div className="uk-margin">
                <label className="uk-form-label">Fecha seleccionada:</label>
                <div className="uk-form-controls">
                  <input onChange={handleChange} name="date2" value={consultation.dateStr ? consultation.dateStr.slice(0,10) : "2018-07-22"} className="uk-input" type="date" />
                  <input type="hidden" onChange={handleChange} name="date" value={consultation.dateStr ? consultation.dateStr.slice(0,10) : "2018-07-22"} />
                </div>
              </div>

              <div className="uk-margin">
                <label className="uk-form-label">Paciente:</label>
                <div className="uk-form-controls">
                  <textarea onChange={handleChange} name="none" defaultValue="" className="uk-select" />
                </div>
              </div>

            </div>

            <div className="uk-width-2-5 uk-margin">
              <p>Todos los pacientes</p>
                <div id="height30ovfw" className="uk-container uk-width-5-6">
                  <ul className="uk-list uk-list-striped">
                        <li key={null}>
                          <label className="uk-flex uk-flex-around uk-flex-middle">
                            <input onChange={handleChange} className="uk-radio" type="radio" name="patient" value="5df837b4b1579b1646f36db2" />
                              Paciente no registrado
                          </label>
                        </li>
                    { patients ? (
                        patients.map( (patient, index) => 
                        <li key={patient._id}>
                          <label className="uk-flex uk-flex-around uk-flex-middle">
                            <input onChange={handleChange} className="uk-radio" type="radio" name="patient" value={patient._id} />
                              {patient.first_name ? patient.first_name : patient.email}
                          </label>
                          <input onChange={handleChange} type="hidden" name="patient" value={patient._id} />
                        </li> )
                      ) : (
                        <li>Cargando pacientes</li>
                      ) }
                  </ul>
                </div>
            </div>

            <div className="uk-width-1-1">
              <button className="uk-button uk-button-danger uk-border-pill" type="submit">
                Crear consulta
              </button>
            </div>

          </form>

          </div>

        </div>

      </div>
    ) : (
      <div className="uk-width-4-5 uk-flex uk-flex-wrap uk-flex-center">

          <div className="uk-width-1-1">
          <h3>Solicita consulta al doctor</h3>
          </div>
          
        <div className="uk-width-1-1 uk-flex">

          <form className="uk-form-horizontal uk-width-1-1 uk-flex uk-flex-wrap" onSubmit={submit}>

              <div className="uk-margin">
                <label className="uk-form-label">Hora seleccionada:</label>
                <div className="uk-form-controls">
                  <input onChange={handleChange} name="time" value={consultation.dateStr ? consultation.dateStr.slice(11,16) : "23:00"} className="uk-input" type="time" />
                </div>
              </div>

              <div className="uk-margin">
                <label className="uk-form-label">Fecha seleccionada:</label>
                <div className="uk-form-controls">
                  <input onChange={handleChange} name="date2" value={consultation.dateStr ? consultation.dateStr.slice(0,10) : "2018-07-22"} className="uk-input" type="date" />
                  <input type="hidden" onChange={handleChange} name="date" value={consultation.dateStr ? consultation.dateStr.slice(0,10) : "2018-07-22"} />
                </div>
              </div>

              <div className="uk-margin">
                <label className="uk-form-label">Doctor:</label>
                <div className="uk-form-controls">
                  <textarea onChange={handleChange} name="none" defaultValue="" className="uk-select" />
                </div>
              </div>

            <div className="uk-width-1-1">
              <button className="uk-button uk-button-danger uk-border-pill" type="submit">
                Crear consulta
              </button>
            </div>

          </form>

        </div>
      </div>
    )
  )

};

export default CalendarForm;