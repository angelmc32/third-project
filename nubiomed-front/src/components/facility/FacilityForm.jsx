import React, { useEffect, useState, useContext } from 'react';     // Import React, useEffect, useState and useContext hooks
import { useHistory } from 'react-router-dom';                      // Import useHistory for "redirection"
import { AppContext } from '../../AppContext';                      // Import AppContext to use created context
import { NavLink } from 'react-router-dom';                         // Import NavLink for "navigation"
import FacilityCard from './FacilityCard';                          // Import FacilityCard react component
import Map from '../common/Mapbox';                                 // Import Map react component
import UIkit from 'uikit';                                          // Import UIkit for notifications

// Declare FacilityForm functional component, receives action variable for conditional rendering,
// email, password and confpassword variables from form state variable, and submit and handleChange functions
const FacilityForm = ( { submit, handleChange, handleFileInput, form, facility = {}, edit = false, preview = false } ) => {

  
  // Declare formatted images state variable and set formatted images function to update the images state variable
  const [ formattedImages, setFormattedImages ] = useState([]);

  const { user, setRoute } = useContext(AppContext);    // Destructure user state variable
  const { push } = useHistory();              // Destructure push method from useHistory to "redirect" user

  // Update component when form state variable is modified
  useEffect( () => {

    const { images } = form;  // Destructure images from form state variable

    getDataUrl(images);       // Call function to obtain url to display images in Facility "card preview"

    if ( !user._id ) {        // If there is no user logged in, send a notification and "redirect" to login

      // Send UIkit warning notification: User must log in
      UIkit.notification({
        message: `<span uk-icon='close'></span> Por favor inicia sesión.`,
        pos: 'bottom-center',
        status: 'warning'
      });
      
      return push('/login');  // If not logged in, "redirect" user to login

    };

  }, [form.images, form.address] );
  
  // Declare function to obtain url to display images in Facility "card preview", from files parameter
  const getDataUrl = files => {

    if (!files) return;                 // In case that no files are present, return

    // Obtain image url using FileReader and using formatted images state variable to update card preview
    const dataUrls = Array.from(files).map(file => {

      const reader = new FileReader();  // Declare reader as new instance of FileReader class
      reader.readAsDataURL(file);       // Read "blob"/file contents and set a URL after reading the file
      reader.onload = () => {           // Trigger each time the reading operation is successfully completed
        setFormattedImages(prevState => [...prevState, reader.result]); // Obtain URL from reader.result
      };

    });

    return dataUrls;                    // Return URLs from files sent as parameters

  };

  const deleteFacility = () => setRoute('delete');

  return (

    <form className="uk-form-horizontal uk-margin-medium uk-flex uk-flex-center uk-flex-middle" onSubmit={ !edit ? submit : (event) => submit(event, edit, facility._id )}>

      <div className="uk-width-2-5 uk-flex uk-flex-column uk-flex-center uk-flex-middle">

        { edit ? <h3>Edita tu consultorio</h3> : <h3>Publica un consultorio en renta</h3> }

        <div className="uk-margin-small">
          <label className="uk-form-label">Titulo:</label>
          <div className="uk-form-controls">
            <input onChange={handleChange} name="title" defaultValue={facility.title} className="uk-input" type="text" />
          </div>
        </div>

        <div className="uk-margin-small">
          <label className="uk-form-label">Descripcion:</label>
          <div className="uk-form-controls">
            <textarea onChange={handleChange} name="description" defaultValue={facility.description} className="uk-textarea" rows="5" />
          </div>
        </div>

        <div className="uk-margin-small">
          <label className="uk-form-label">Direccion:</label>
          <div id="geocoder-container" className="uk-form-controls">
            <input onChange={handleChange} name="address" defaultValue={facility.address} value={form.address ? form.address : ''} className="uk-input" type="text" />
            <button onClick={handleChange} id="toggle-map" className="uk-button uk-button-default uk-button-small" type="button">
              { !form.showMap ? "Mostrar mapa" : "Guardar direccion" }
            </button>
          </div>
        </div>

        <div className="uk-margin-small">
          <label className="uk-form-label">Precio:</label>
          <div className="uk-form-controls">
            <input onChange={handleChange} name="price" defaultValue={facility.price} className="uk-input" type="number" />
          </div>
        </div>

        <div className="js-upload uk-margin" uk-form-custom="true">
          <input onChange={handleFileInput} name="images" type="file" multiple />
          <button className="uk-button uk-button-default uk-button-small" type="button">Agregar Imagenes</button>
        </div>   
      
      </div>

      { form.showMap ? 
        <div className="uk-width-3-5 uk-flex uk-flex-column uk-flex-center uk-flex-middle">
          <Map form={form} width={'35%'} height={'60%'}/> 
        </div> : 
        <div className="uk-width-3-5 uk-flex uk-flex-column uk-flex-center uk-flex-middle">
          <div className={ preview ? "uk-margin-small uk-width-2-3 uk-flex uk-flex-center" : "uk-margin-small"}>
            <FacilityCard {...form} {...facility} images={formattedImages.length > 0 ? formattedImages : facility.images} preview={preview} />
          </div>

          <div className="uk-margin-small">
            <label className="uk-form-label">
              <input onChange={handleChange} className="uk-checkbox" type="checkbox" name="is_med_facility" value="true"/>
                Este consultorio cuenta con los requerimientos minimos de un consultorio
            </label>
          </div>

          { edit ? (
            <div className="uk-margin-small uk-flex uk-flex-column uk-flex-middle uk-flex-center">
              <button className="uk-button uk-button-danger uk-border-pill" type="submit">
                Actualizar <span className="uk-margin-small-left" uk-icon="refresh"></span>
              </button>
              <button onClick={(event) => deleteFacility(event, facility._id)} className="uk-button uk-button-default uk-button-small uk-margin-small">
                Eliminar <span className="uk-margin-small-left" uk-icon="trash"></span>
              </button>
            </div>
            ) : (
              <button className="uk-button uk-button-danger uk-border-pill" type="submit">
                Publicar
              </button>
            )}
          
        </div>
      }
    
    </form>
  );
}
export default FacilityForm;