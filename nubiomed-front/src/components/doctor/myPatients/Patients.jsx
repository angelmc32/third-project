import React, { useEffect, useState, useContext } from 'react';     // Import React, useEffect, useState and useContext hooks
import { useHistory } from 'react-router-dom';                      // Import useHistory for "redirection"
import { AppContext } from '../../../AppContext';                   // Import AppContext to use created context
import useForm from '../../../hooks/useForm';                       // Import useForm custom hook
import UIkit from 'uikit';                                          // Import UIkit for notifications
import moment from 'moment';                                        // Import momentjs for date formatting

// Import API services (CRUD operations) from services file
//import { getUserFacilities, getAllFacilities, createFacility } from '../../services/facility-services';

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
        <div className="uk-width-1-1">
          <div uk-grid="true" className="uk-margin uk-width-1-1 uk-child-width-1-5 uk-grid-match uk-grid-medium">
            <div className="uk-card uk-card-default">
              <div className="uk-card-header">
                  <div className="uk-grid-small uk-flex-middle" uk-grid="true">
                      <div className="uk-width-auto">
                          <img className="uk-border-circle" width="40" height="40" src={avatar} />
                      </div>
                      <div className="uk-width-expand">
                          <h3 className="uk-card-title uk-margin-remove-bottom">Title</h3>
                          <p className="uk-text-meta uk-margin-remove-top"><time datetime="2016-04-01T19:00">April 01, 2016</time></p>
                      </div>
                  </div>
              </div>
              <div className="uk-card-footer">
                  <a href="#" className="uk-button uk-button-text">Read more</a>
              </div>
            </div>
            <div className="uk-card uk-card-default">
              <div className="uk-card-header">
                  <div className="uk-grid-small uk-flex-middle" uk-grid="true">
                      <div className="uk-width-auto">
                          <img className="uk-border-circle" width="40" height="40" src={avatar} />
                      </div>
                      <div className="uk-width-expand">
                          <h3 className="uk-card-title uk-margin-remove-bottom">Title</h3>
                          <p className="uk-text-meta uk-margin-remove-top"><time datetime="2016-04-01T19:00">April 01, 2016</time></p>
                      </div>
                  </div>
              </div>
              <div className="uk-card-footer">
                  <a href="#" className="uk-button uk-button-text">Read more</a>
              </div>
            </div>
            <div className="uk-card uk-card-default">
              <div className="uk-card-header">
                  <div className="uk-grid-small uk-flex-middle" uk-grid="true">
                      <div className="uk-width-auto">
                          <img className="uk-border-circle" width="40" height="40" src={avatar} />
                      </div>
                      <div className="uk-width-expand">
                          <h3 className="uk-card-title uk-margin-remove-bottom">Title</h3>
                          <p className="uk-text-meta uk-margin-remove-top"><time datetime="2016-04-01T19:00">April 01, 2016</time></p>
                      </div>
                  </div>
              </div>
              <div className="uk-card-footer">
                  <a href="#" className="uk-button uk-button-text">Read more</a>
              </div>
            </div>
            <div className="uk-card uk-card-default">
              <div className="uk-card-header">
                  <div className="uk-grid-small uk-flex-middle" uk-grid="true">
                      <div className="uk-width-auto">
                          <img className="uk-border-circle" width="40" height="40" src={avatar} />
                      </div>
                      <div className="uk-width-expand">
                          <h3 className="uk-card-title uk-margin-remove-bottom">Title</h3>
                          <p className="uk-text-meta uk-margin-remove-top"><time datetime="2016-04-01T19:00">April 01, 2016</time></p>
                      </div>
                  </div>
              </div>
              <div className="uk-card-footer">
                  <a href="#" className="uk-button uk-button-text">Read more</a>
              </div>
            </div>
            <div className="uk-card uk-card-default">
              <div className="uk-card-header">
                  <div className="uk-grid-small uk-flex-middle" uk-grid="true">
                      <div className="uk-width-auto">
                          <img className="uk-border-circle" width="40" height="40" src={avatar} />
                      </div>
                      <div className="uk-width-expand">
                          <h3 className="uk-card-title uk-margin-remove-bottom">Title</h3>
                          <p className="uk-text-meta uk-margin-remove-top"><time datetime="2016-04-01T19:00">April 01, 2016</time></p>
                      </div>
                  </div>
              </div>
              <div className="uk-card-footer">
                  <a href="#" className="uk-button uk-button-text">Read more</a>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

  );

}

export default Patients;