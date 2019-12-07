import React, { useEffect, useState, useContext } from 'react';     // Import React, useEffect, useState and useContext hooks
import { useHistory } from 'react-router-dom';                      // Import useHistory for "redirection"
import { AppContext } from '../../../AppContext';                   // Import AppContext to use created context
import useForm from '../../../hooks/useForm';                       // Import useForm custom hook
import UIkit from 'uikit';                                          // Import UIkit for notifications
import moment from 'moment';                                        // Import momentjs for date formatting

// Import API services (CRUD operations) from services file
//import { getUserFacilities, getAllFacilities, createFacility } from '../../services/facility-services';

import Searchbar from '../../common/Searchbar';
//import FacilityForm from './FacilityForm';                          // Import FacilityForm react component
//import FacilityCard from './FacilityCard';                          // Import FacilityCard react component

import avatar from '../../../assets/images/avatars/user-avatar.png'

// Declare Facility functional component
const Patients = () => {

  // Destructure user state variable
  const { user, route, setRoute } = useContext(AppContext);
  // Declare facilities state variable and setFacilities function to update the facilities state variable
  const [facilities, setFacilities] = useState([]);

  const { push } = useHistory();              // Destructure push method from useHistory to "redirect" user

  return (

    <div className="uk-section uk-padding-remove-top">

      <div className="uk-container uk-flex uk-flex-column uk-flex-middle">

        <div id="height35" className="uk-width-1-1 uk-flex uk-flex-middle">
          <div uk-grid="true" className="uk-margin uk-width-1-1 uk-child-width-1-6 uk-grid-match uk-grid-small uk-flex uk-flex-around">
            <div className="uk-card uk-card-default">
              <div className="uk-card-header uk-width-1-1">
                <div className="uk-grid-small uk-flex-middle" uk-grid="true">
                    <div className="uk-width-expand">
                      <h3 className="uk-card-title uk-margin-remove-bottom">Name</h3>
                      <p className="uk-text-meta uk-margin-remove-top"><time dateTime="2016-04-01T19:00">April 01, 2016</time></p>
                    </div>
                </div>
              </div>
              <div className="uk-card-footer uk-padding-small">
                <button className="uk-button uk-button-small uk-button-primary uk-border-pill">Ver</button>
              </div>
            </div>
            <div className="uk-card uk-card-default">
              <div className="uk-card-header">
                <div className="uk-grid-small uk-flex-middle" uk-grid="true">
                  <div className="uk-width-expand">
										<h3 className="uk-card-title uk-margin-remove-bottom">Name</h3>
										<p className="uk-text-meta uk-margin-remove-top"><time dateTime="2016-04-01T19:00">April 01, 2016</time></p>
                  </div>
                </div>
              </div>
              <div className="uk-card-footer uk-padding-small">
                <button className="uk-button uk-button-small uk-button-primary uk-border-pill">Ver</button>
              </div>
            </div>
            <div className="uk-card uk-card-default">
              <div className="uk-card-header">
								<div className="uk-grid-small uk-flex-middle" uk-grid="true">
									<div className="uk-width-expand">
										<h3 className="uk-card-title uk-margin-remove-bottom">Name</h3>
										<p className="uk-text-meta uk-margin-remove-top"><time dateTime="2016-04-01T19:00">April 01, 2016</time></p>
									</div>
								</div>
              </div>
              <div className="uk-card-footer uk-padding-small">
                  <button className="uk-button uk-button-small uk-button-primary uk-border-pill">Ver</button>
              </div>
            </div>
            <div className="uk-card uk-card-default">
              <div className="uk-card-header">
                  <div className="uk-grid-small uk-flex-middle" uk-grid="true">
                      <div className="uk-width-expand">
                          <h3 className="uk-card-title uk-margin-remove-bottom">Name</h3>
                          <p className="uk-text-meta uk-margin-remove-top"><time dateTime="2016-04-01T19:00">April 01, 2016</time></p>
                      </div>
                  </div>
              </div>
              <div className="uk-card-footer uk-padding-small">
                  <button className="uk-button uk-button-small uk-button-primary uk-border-pill">Ver</button>
              </div>
            </div>
            <div className="uk-card uk-card-default">
              <div className="uk-card-header">
                  <div className="uk-grid-small uk-flex-middle" uk-grid="true">
                      <div className="uk-width-expand">
                          <h3 className="uk-card-title uk-margin-remove-bottom">Name</h3>
                          <p className="uk-text-meta uk-margin-remove-top"><time dateTime="2016-04-01T19:00">April 01, 2016</time></p>
                      </div>
                  </div>
              </div>
              <div className="uk-card-footer uk-padding-small">
                  <button className="uk-button uk-button-small uk-button-primary uk-border-pill">Ver</button>
              </div>
            </div>
          </div>
        </div>

        <div id="height10" className="uk-width-1-1 uk-flex uk-flex-middle">
            <Searchbar />
        </div>

        <div id="height30" className="uk-width-1-1 uk-flex uk-margin">
					<div className="uk-width-1-2">
						<h4>Mis Pacientes</h4>
						<div id="height30ovfw" className="uk-container">
							<ul>
								<li>Paciente</li>
								<li>Paciente</li>
								<li>Paciente</li>
								<li>Paciente</li>
								<li>Paciente</li>
								<li>Paciente</li>
								<li>Paciente</li>
								<li>Paciente</li>
								<li>Paciente</li>
								<li>Paciente</li>
								<li>Paciente</li>
								<li>Paciente</li>
								<li>Paciente</li>
								<li>Paciente</li>
								<li>Paciente</li>
								<li>Paciente</li>
							</ul>
						</div>
					</div>
					<div id="height30"	 className="uk-width-1-2">
						<h4>Aqui va la ficha de paciente</h4>
					</div>
        </div>
      </div>

    </div>

  );

}

export default Patients;