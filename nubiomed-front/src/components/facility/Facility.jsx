import React, { useEffect, useState, useContext } from 'react';     // Import React, useEffect, useState and useContext hooks
import { useHistory } from 'react-router-dom';                      // Import useHistory for "redirection"
import { AppContext } from '../../AppContext';                      // Import AppContext to use created context
import useForm from '../../hooks/useForm';                          // Import useForm custom hook
import UIkit from 'uikit';                                          // Import UIkit for notifications
import moment from 'moment';                                        // Import momentjs for date formatting

// Import API services (CRUD operations) from services file
import { getFacilities, createFacility } from '../../services/facility-services';
import FacilityForm from './FacilityForm';                          // Import FacilityForm react component
import FacilityCard from './FacilityCard';

const Facility = () => {

  // Destructure form state variable, handleInput and handleFileInput functions for form state manipulation
  const { form, handleInput, handleFileInput } = useForm();
  
  // Destructure user state variable
  const { user } = useContext(AppContext);
  // Declare facilities state variable and setFacilities function to update the facilities state variable
  const [facilities, setFacilities] = useState([]);
  const { push } = useHistory();              // Destructure push method from useHistory to "redirect" user

  useEffect( () => {

    getFacilities()
    .then( res => {

      const { facilities } = res.data;
      setFacilities(facilities);

    })


  }, []);

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

    });
  }

  return (
    <div className="uk-section uk-padding-small-top">

      <div className="uk-container">

        <div className="uk-grid uk-child-width-1-3 uk-grid-match uk-grid-small">

          { facilities.map((facility, index) => {
            
            console.log('lol')
            return <FacilityCard key={index} {...facility} />

            })
          }

        </div>

        {/* <FacilityForm handleChange={handleInput} handleFileInput={handleFileInput} form={form} submit={handleSubmit} /> */}

      </div>

    </div>
  )

}

export default Facility;