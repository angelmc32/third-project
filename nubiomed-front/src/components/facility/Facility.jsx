import React, { useEffect, useState, useContext } from 'react';     // Import React, useEffect, useState and useContext hooks
import { useHistory } from 'react-router-dom';                      // Import useHistory for "redirection"
import { AppContext } from '../../AppContext';                      // Import AppContext to use created context
import useForm from '../../hooks/useForm';                          // Import useForm custom hook
import UIkit from 'uikit';                                          // Import UIkit for notifications
import moment from 'moment';                                        // Import momentjs for date formatting

// Import API services (CRUD operations) from services file
import { getUserFacilities, getAllFacilities, createFacility } from '../../services/facility-services';

import FacilityForm from './FacilityForm';                          // Import FacilityForm react component
import FacilityCard from './FacilityCard';                          // Import FacilityCard react component

// Declare Facility functional component
const Facility = () => {

  // Destructure form state variable, handleInput and handleFileInput functions for form state manipulation
  const { form, handleInput, handleFileInput } = useForm();
  
  // Destructure user state variable
  const { user, route, setRoute } = useContext(AppContext);
  // Declare facilities state variable and setFacilities function to update the facilities state variable
  const [facilities, setFacilities] = useState([]);
  const { push } = useHistory();              // Destructure push method from useHistory to "redirect" user

  // Hook to update component when route state variable is modified (in sidebar or by buttons)
  useEffect( () => {

    if ( route === 'myFacilities' ) {       // Route corresponding to user's facilities

      getUserFacilities()                   // Fetch facilities belonging to user
      .then( res => {

        const { facilities } = res.data;    // Destructure user facilities from response
        setFacilities(facilities);          // Update facilities state variable

      });

    } else {                                // Corresponds to route 'search' for all facilities

      getAllFacilities()                    // Fetch all facilities in database (no restrictions)
      .then( res => {

        const { facilities } = res.data;    // Destructure facilities from response
        setFacilities(facilities);          // Update facilities state variable

      });

    }

  }, [route]);

  // Function to handle submit button click, sending form data to back-end for storage
  const handleSubmit = (event) => {

    event.preventDefault();             // Prevent page reloading after submit action
    delete form.showMap;                // Delete showMap key from form object

    const formData = new FormData();    // Declare formData as new instance of FormData class

    // Iterate through every key in form object and append name:value to formData
    for (let key in form) {
      if (key === "images") {           // Obtain images from array, append to FormData instance
        for (let file of Array.from(form[key])) {
          formData.append(key, file);
        }
      } if (key === "coordinates") {    // Obtain coordinates from array, append to FormData instance
        for (let coord of form[key]) {
          formData.append(key, coord);
        }
      } else {                          // Append the other keys:values as is
        formData.append(key, form[key]);
      }
    }

    // Call create service with formData as parameter, which includes form data for Facility creation
    createFacility(formData).then(res => {

      const { facility } = res.data;    // Destructure recently created facility object from response
      
      // Send UIkit success notification
      UIkit.notification({
        message: `<span uk-icon='close'></span> '¡Tu consultorio fue guardado exitosamente!'`,
        pos: 'bottom-center',
        status: 'success'
      });

      setRoute('myFacilities');     // Modify route state variable to myFacilities for correct redirection
      push('/facilities');          // "Redirect" user to myFacilities

    });
  };

  // Declare function to toggle form display when "Add facility" button is clicked, changes route
  const toggleForm = () => {
    route === 'myFacilities' ? setRoute('createFacility') : setRoute('myFacilities');
  }

  return (
    <div className="uk-section">

      <div className="uk-container">

        { route === 'myFacilities' ? (
            <div className="uk-width-1-1 uk-flex uk-flex-column uk-flex-middle">
              <h3>Mis Consultorios</h3>
              <button onClick={toggleForm} className="uk-button uk-button-danger uk-border-pill">Agregar un nuevo consultorio</button>              
              <div uk-grid="true" className="uk-margin uk-width-4-5 uk-child-width-1-3 uk-grid-match uk-grid-medium">
                { facilities.map( (facility, index) => ( <FacilityCard key={index} {...facility} /> ) ) }
              </div>
            </div>
          ) : ( route === 'createFacility' ? (
              <FacilityForm handleChange={handleInput} handleFileInput={handleFileInput} form={form} submit={handleSubmit} />
              ) : ( 
                route === 'favorites' ? (
                  <h3>Your favorite facilities</h3>
                ) : (
                  <div className="uk-width-1-1 uk-flex uk-flex-column uk-flex-middle">
                    <h3>Busca consultorios</h3>
                    <div uk-grid="true" className="uk-width-4-5 uk-child-width-1-3 uk-grid-match uk-grid-medium">
                      { facilities.map( (facility, index) => ( <FacilityCard key={index} {...facility} /> ) ) }
                    </div>
                  </div>
                )
              )
          )
        }

      </div>

    </div>
  )

}

export default Facility;