import React, { useEffect, useState, useContext } from 'react';     // Import React, useEffect, useState and useContext hooks
import { useHistory } from 'react-router-dom';                      // Import useHistory for "redirection"
import { AppContext } from '../../AppContext';                      // Import AppContext to use created context
import { NavLink } from 'react-router-dom';                         // Import NavLink for "navigation"
import UIkit from 'uikit';                                          // Import UIkit for notifications
import moment from 'moment';                                        // Import momentjs for date formatting

const PrescriptionInfo = ({ prescription ={} }) => {

  return (

    <div className="uk-flex uk-flex-center uk-width-1-1">
      <form className="uk-form-horizontal uk-margin-medium uk-flex uk-flex-center" >
        <p className="uk-text-primary">Receta realizada el {moment(prescription.date).locale('es').format('LL')}</p>
        <div className="uk-margin-small">
          <label className="uk-form-label">Nombre de patente:</label>
          <div className="uk-form-controls">
            <input defaultValue={prescription.brand_name} className="uk-input uk-form-width-large" type="text" disabled="true" />
          </div>
        </div>

        <div className="uk-margin-small">
          <label className="uk-form-label">Nombre generico:</label>
          <div className="uk-form-controls">
            <input defaultValue={prescription.generic_name} className="uk-input uk-form-width-large" type="text" disabled="true" />
          </div>
        </div>

        <div className="uk-margin-small">
          <label className="uk-form-label">Dosis:</label>
          <div className="uk-form-controls">
            <textarea defaultValue={prescription.dose} className="uk-textarea uk-form-width-large" rows="3" disabled="true" />
          </div>
        </div>

        <div className="uk-margin-small">
          <label className="uk-form-label">Presentacion:</label>
          <div className="uk-form-controls">
            <textarea defaultValue={prescription.dosage_form} className="uk-textarea uk-form-width-large" rows="3" disabled="true" />
          </div>
        </div>

        <div className="uk-margin-small">
          <label className="uk-form-label">Indicaciones:</label>
          <div className="uk-form-controls">
            <textarea defaultValue={prescription.directions} className="uk-textarea uk-form-width-large" rows="3" disabled="true" />
          </div>
        </div>
      </form>
    </div>
  )

};

export default PrescriptionInfo;