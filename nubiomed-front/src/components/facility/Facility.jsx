import React, { useEffect, useState, useContext } from 'react';     // Import React, useEffect, useState and useContext hooks
import { useHistory } from 'react-router-dom';                      // Import useHistory for "redirection"
import { AppContext } from '../../AppContext';                      // Import AppContext to use created context
import useForm from '../../hooks/useForm';                          // Import useForm custom hook
import UIkit from 'uikit';                                          // Import UIkit for notifications
import moment from 'moment';                                        // Import momentjs for date formatting

// Import API services (CRUD operations) from services file
import { getUserFacilities, getAllFacilities, getFacilityInfo, createFacility, updateFacility, deleteFacility } from '../../services/facility-services';

import FacilityForm from './FacilityForm';                          // Import FacilityForm react component
import FacilityCard from './FacilityCard';                          // Import FacilityCard react component
import FacilityInfo from './FacilityInfo';                          // Import FacilityInfo react component

// Declare Facility functional component
const Facility = () => {

  // Destructure form state variable, handleInput and handleFileInput functions for form state manipulation
  const { form, handleInput, handleFileInput } = useForm();
  
  // Destructure user and route state variables, as well as setRoute to update route state variable
  const { user, route, setRoute } = useContext(AppContext);
  // Declare facilities state variable and setFacilities function to update the facilities state variable
  const [facilities, setFacilities] = useState([]);
  // Declare single facility state variable and setFacility function to update the single facility state variable
  const [facility, setFacility] = useState([]);
  const { push } = useHistory();              // Destructure push method from useHistory to "redirect" user

  // Hook to update component when route state variable is modified (in sidebar or by buttons)
  useEffect( () => {

    if ( route === 'myFacilities' ) {       // Route corresponding to user's facilities

      getUserFacilities()                   // Fetch facilities belonging to user
      .then( res => {

        const { facilities } = res.data;    // Destructure user facilities from response
        setFacilities(facilities);          // Update facilities state variable

      });

    } if ( route === 'showFacility' || route === 'editFacility' ) {

      getFacilityInfo(facility)             // Fetch facility from database
      .then( res => {

        const { facility } = res.data;      // Destructure facility from response
        setFacility(facility);              // Update single facility state variable

      });

    } if ( route === 'delete' ) {

      deleteFacility(facility._id)          // Call delete service with facility id info
      .then( res => {

        const { facility } = res.data;      // Destructure facility from response
        setFacility(null);                  // Update facility to null to avoid bugs
        setRoute('myFacilities');           // Redirect to user facilities

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
  // edit and id paramaters optional for Update operation
  const handleSubmit = (event, edit = false, id = null) => {

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

    if ( !edit ) {                      // If user is not editing, user is creating

      // Call create service with formData as parameter, which includes form data for Facility creation
      createFacility(formData).then(res => {

        const { facility } = res.data;  // Destructure recently created facility object from response
        
        // Send UIkit success notification
        UIkit.notification({
          message: `<span uk-icon='close'></span> '¡Tu consultorio fue guardado exitosamente!'`,
          pos: 'bottom-center',
          status: 'success'
        });

        setRoute('myFacilities');       // Modify route state variable to myFacilities for correct redirection
        push('/facilities');            // "Redirect" user to myFacilities

      });

    } else {

      // Call update service with formData and facility ID as parameter, to Update facility info
      updateFacility(formData, id).then(res => {

        const { facility } = res.data;  // Destructure recently created facility object from response
        
        // Send UIkit success notification
        UIkit.notification({
          message: `<span uk-icon='close'></span> '¡Tu consultorio fue actualizado exitosamente!'`,
          pos: 'bottom-center',
          status: 'success'
        });

        setRoute('myFacilities');       // Modify route state variable to myFacilities for correct redirection
        push('/facilities');            // "Redirect" user to myFacilities

      });

    };

  };

  // Declare function to toggle form display when "Add facility" button is clicked, changes route
  const toggleForm = () => {
    route === 'myFacilities' ? setRoute('createFacility') : setRoute('myFacilities');
  }

  // Declare function to set route to facility edit or facility info
  const showFacility = (event, id, edit) => {
    
    event.preventDefault();
    setFacility(id);

    if (edit) route !== 'editFacility' ? setRoute('editFacility') : setRoute('myFacilities');
    else route !== 'showFacility' ? setRoute('showFacility') : setRoute('search');

  }

  return (
    <div className="uk-section">

      <div className="uk-container">

        { route === 'myFacilities' ? (
            <div className="uk-width-1-1 uk-flex uk-flex-column uk-flex-middle">
              <h3>Mis Consultorios</h3>
              <button onClick={toggleForm} className="uk-button uk-button-danger uk-border-pill">Agregar un nuevo consultorio</button>              
              <div uk-grid="true" className="uk-margin uk-width-4-5 uk-child-width-1-3 uk-grid-match uk-grid-medium">
                { facilities.map( (facility, index) => ( <FacilityCard key={index} preview={false} showFacility={showFacility} edit={true} {...facility} /> ) ) }
              </div>
            </div>
          ) : ( route === 'createFacility' ? (
              <FacilityForm handleChange={handleInput} handleFileInput={handleFileInput} form={form} submit={handleSubmit} />
              ) : ( 
                route === 'favorites' ? (
                  <h3>Your favorite facilities</h3>
                ) : route === 'showFacility' ? (
                  <FacilityInfo facility={facility} edit={false} showMap={false} />
                ) : route === 'editFacility' ? (
                  <FacilityForm handleChange={handleInput} handleFileInput={handleFileInput} form={form} submit={handleSubmit} edit={true} facility={facility} preview={true} />
                  ) : (
                    <div className="uk-width-1-1 uk-flex uk-flex-column uk-flex-middle">
                      <h3>Busca consultorios</h3>
                      <div uk-grid="true" className="uk-width-4-5 uk-child-width-1-3 uk-grid-match uk-grid-medium">
                        { facilities.map( (facility, index) => ( <FacilityCard key={index} preview={false} showFacility={showFacility} edit={false} {...facility} show /> ) ) }
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