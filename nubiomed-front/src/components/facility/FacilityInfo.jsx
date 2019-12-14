import React, { useContext } from 'react';     // Import React, useEffect, useState and useContext hooks
import { useHistory } from 'react-router-dom';                      // Import useHistory for "redirection"
import { AppContext } from '../../AppContext';                      // Import AppContext to use created context
import currencyFormatter from "currency-formatter";                 // Import currency formatter for price display
import FacilityForm from './FacilityForm';                          // Import FacilityForm react component
import FacilityCard from './FacilityCard';                          // Import FacilityCard react component
import Map from '../common/Mapbox';                                 // Import Map react component

import { getFacilityInfo } from '../../services/facility-services';

const FacilityInfo = ({ facility, edit, showMap, toggleFavorite, favorites = [], isFavorite = false }) => {

  const history = useHistory();              // declare an instance of useHistory hook to redirect user according to needs

  // Destructure form state variable, handleInput and handleFileInput functions for form state manipulation
  // const { form, handleInput, handleFileInput } = useForm();
  // Destructure user state variable
  const { user, setRoute } = useContext(AppContext);

  const goBack = () => {
    edit ? setRoute('myFacilities') : setRoute('search');
  }

  for (let i = 0; i < favorites.length; i++ ) {

    if ( favorites[i] === facility._id ) {
      
      isFavorite = true;
      i = favorites.length;

     } else isFavorite = false;

  }

  return (

      <div className="uk-flex uk-flex-center">

        <div className="uk-width-2-5 uk-flex uk-flex-column uk-flex-center uk-flex-middle">

          <div className="uk-width-1-1 uk-flex uk-flex-center height10 uk-flex-middle">
            <button className="uk-button uk-button-default uk-button-small uk-border-pill uk-margin-small-right" onClick={goBack}>
              Atras
            </button>
            <h3 className="uk-margin-remove">{facility.title}</h3>
          </div>
          
          

          <div className="uk-margin-small">
            <label className="uk-form-label">Descripcion:</label>
            <div className="uk-form-controls">
            <p>{facility.description}</p>
            </div>
          </div>

          <div className="uk-margin-small">
            <label className="uk-form-label">Direccion:</label>
            <div id="geocoder-container" className="uk-form-controls">
              <p>{facility.address}</p>
              <button onClick={() => !showMap} id="toggle-map" className="uk-button uk-button-default uk-button-small" type="button">Mostrar mapa</button>
            </div>
          </div>

          <div className="uk-margin-small">
            <label className="uk-form-label">Precio:</label>
            <div className="uk-form-controls">
              <p>{facility.price}</p>
            </div>
          </div>

        </div>

      

      { showMap ? 
        <div className="uk-width-3-5 uk-flex uk-flex-column uk-flex-center uk-flex-middle">
          <Map form={facility} width={'35%'} height={'60%'}/> 
        </div> : 
        <div className="uk-width-3-5 uk-flex uk-flex-column uk-flex-center uk-flex-middle">
          <div className="uk-margin-small uk-width-2-3 uk-flex uk-flex-center">
            <FacilityCard {...facility} images={facility.images} preview={true} />
          </div>

          <div className="uk-margin-small">
            <label className="uk-form-label">
              { facility.is_med_facility ? 
                <p>Este consultorio cuenta con los requerimientos minimos de un consultorio</p> 
                : 
                <p>Este espacio no cuenta con los requerimientos minimos de un consultorio</p>
              }
            </label>
          </div>

          { isFavorite ? (
              <button onClick={(event) => toggleFavorite(event, facility._id)} className="uk-button uk-button-danger uk-border-pill">
                Eliminar de favoritos
              </button>
            ) : (
              <button onClick={(event) => toggleFavorite(event, facility._id)} className="uk-button uk-button-danger uk-border-pill">
                Agregar a favoritos
              </button>
            )
        }

          
          
        </div>
      }
    </div>
  )

}

export default FacilityInfo;