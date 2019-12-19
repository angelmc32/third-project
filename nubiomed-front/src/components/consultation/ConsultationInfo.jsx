import React, { useEffect, useState, useContext } from 'react';     // Import React, useEffect, useState and useContext hooks
import { useHistory } from 'react-router-dom';                      // Import useHistory for "redirection"
import { AppContext } from '../../AppContext';                      // Import AppContext to use created context
import { NavLink } from 'react-router-dom';                         // Import NavLink for "navigation"
import UIkit from 'uikit';                                          // Import UIkit for notifications
import moment from 'moment';                                        // Import momentjs for date formatting

const ConsultationInfo = ({ consultation ={} }) => {

  // useEffect( () => {

  //   // get vital signs

    
  // },[])

  return (

    <div className="uk-flex uk-flex-center uk-width-1-1">
      <div className="uk-width-2-4 uk-flex uk-flex-center uk-flex-middle">
        <form className="uk-form-horizontal uk-margin-medium uk-flex uk-flex-column uk-flex-center uk-flex-middle" >
          <p className="uk-text-primary">Consulta realizada el {moment(consultation.date).locale('es').format('LL')}</p>
          <div className="uk-margin-small">
            <label className="uk-form-label">Motivo de consulta:</label>
            <div className="uk-form-controls">
              <input defaultValue={consultation.chief_complaint} className="uk-input uk-form-width-medium" type="text" disabled="true" />
            </div>
          </div>

          <div className="uk-margin-small">
            <label className="uk-form-label">Sistema afectado:</label>
            <div className="uk-form-controls">
              <input defaultValue={consultation.systems_chief_complaint} className="uk-input uk-form-width-medium" type="text" disabled="true" />
            </div>
          </div>

          <div className="uk-margin-small">
            <label className="uk-form-label">Observaciones Examen Fisico:</label>
            <div className="uk-form-controls">
              <textarea defaultValue={consultation.phys_exam} className="uk-textarea uk-form-width-medium" rows="3" disabled="true" />
            </div>
          </div>

          <div className="uk-margin-small">
            <label className="uk-form-label">Diagnostico:</label>
            <div className="uk-form-controls">
              <textarea defaultValue={consultation.diagnosis} className="uk-textarea uk-form-width-medium" rows="3" disabled="true" />
            </div>
          </div>

          <div className="uk-margin-small">
            <label className="uk-form-label">Pronostico:</label>
            <div className="uk-form-controls">
              <textarea defaultValue={consultation.prognosis} className="uk-textarea uk-form-width-medium" rows="3" disabled="true" />
            </div>
          </div>
        </form>
      </div>
      <div className="uk-width-2-4 uk-flex uk-flex-column uk-flex-center uk-flex-middle">
        <div className="uk-width-1-1">
          <h5>Aqui van los signos vitales</h5>
        </div>
        <div className="uk-width-1-1">
          <h5>Aqui va la receta</h5>
        </div>
      </div>

    </div>
  )

};

export default ConsultationInfo;