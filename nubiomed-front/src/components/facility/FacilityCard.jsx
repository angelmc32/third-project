import React from 'react';     // Import React, useEffect, useState and useContext hooks
import currencyFormatter from "currency-formatter";     // Import currency formatter for price display

const FacilityCard = ({ _id, title, images = [], description, price, owner, preview, showFacility, edit }) => {

  if ( !preview ) {
  
    return (
      
      <div className="uk-card uk-card-default uk-padding-remove">
        
        <div className="uk-card-media-top uk-padding-remove">
          <div
            className="uk-position-relative uk-visible-toggle uk-light"
            tabIndex="-1"
            uk-slideshow="true"
          >
            <ul className="uk-slideshow-items">
              {images.map((image, index) => (
                <li key={index}>
                  <img src={image} alt="" uk-cover="true" />
                </li>
              ))}
            </ul>

            <a
              className="uk-position-center-left uk-position-small uk-hidden-hover"
              href="#"
              uk-slidenav-previous="true"
              uk-slideshow-item="previous"
            ></a>
            <a
              className="uk-position-center-right uk-position-small uk-hidden-hover"
              href="#"
              uk-slidenav-next="true"
              uk-slideshow-item="next"
            ></a>
          </div>
        </div>
        <div className="uk-card-body uk-padding-small">
          <p>{title}</p>
          <hr />
          <div className="uk-flex uk-flex uk-padding-remove uk-flex-around uk-flex-middle">
            <span className="uk-button uk-button-default uk-button-small uk-width-1-3 uk-text-center">
              {currencyFormatter.format(price, { code: "MXN" })}
            </span>
            {edit ? 
              <button className="uk-button uk-button-primary uk-button-small uk-border-pill" onClick={(event) => showFacility(event, _id, edit)}>
                Editar
              </button>
              :
              <button className="uk-button uk-button-primary uk-button-small uk-border-pill" onClick={(event) => showFacility(event, _id, edit)}>
                Ver Mas
              </button>
            }
            
          </div>
        </div>
      </div>
    );

  } else {
    
    return (
      <div className="uk-card uk-card-default uk-padding-remove uk-width-2-3">
        <div className="uk-card-media-top uk-padding-remove">
          <div
            className="uk-position-relative uk-visible-toggle uk-light"
            tabIndex="-1"
            uk-slideshow="true"
          >
            <ul className="uk-slideshow-items">
              {images.map((image, index) => (
                <li key={index}>
                  <img src={image} alt="" uk-cover="true" />
                </li>
              ))}
            </ul>

            <a
              className="uk-position-center-left uk-position-small uk-hidden-hover"
              href="#"
              uk-slidenav-previous="true"
              uk-slideshow-item="previous"
            ></a>
            <a
              className="uk-position-center-right uk-position-small uk-hidden-hover"
              href="#"
              uk-slidenav-next="true"
              uk-slideshow-item="next"
            ></a>
          </div>
        </div>
        <div className="uk-card-body uk-padding-small">
          <p>{title}</p>
          <hr />
          <div className="uk-flex uk-flex-column uk-padding-remove uk-flex-middle">
            <span className="uk-badge uk-width-1-2 uk-text-center">
              {currencyFormatter.format(price, { code: "MXN" })}
            </span>
          </div>
        </div>
      </div>
    );

  }

};

export default FacilityCard;