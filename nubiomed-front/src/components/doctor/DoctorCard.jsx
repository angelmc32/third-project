import React from 'react';     // Import React, useEffect, useState and useContext hooks
import currencyFormatter from "currency-formatter";     // Import currency formatter for price display

const DoctorCard = ({ _id, first_name, last_name1, profile_picture, rating, is_verified, preference, showDoctor }) => {

  return (

    <div className="uk-card uk-card-default uk-width-1-2@m">

      <div className="uk-card-header">
        <div className="uk-grid uk-grid-small uk-flex uk-flex-left uk-flex-middle">
          <div className="uk-width-1-5">
            <img className="uk-border-circle" width={64} height={64} src={profile_picture} />
          </div>
          <div className="uk-width-3-5">
            <h3 className="uk-card-title uk-margin-remove-bottom">{first_name} {last_name1}</h3>
          </div>
        </div>
      </div>
      <div className="uk-card-body">
        <p>Especialidad: </p>
        <p>Zonas de consulta: </p>
        <p>{preference.zones.map( zone => (`${zone}, `) )} </p>
      </div>
      <div className="uk-card-footer">
        <div className="uk-flex uk-flex uk-padding-remove uk-flex-around uk-flex-middle">
          <span className="uk-button uk-button-default uk-button-small uk-width-1-3 uk-text-center">
            {currencyFormatter.format(preference.base_price, { code: "MXN" })}
          </span>
          <button className="uk-button uk-button-primary uk-button-small uk-border-pill" onClick={(event) => showDoctor(event, _id)}>
            Ver Mas
          </button>
        </div>
      </div>

    </div>

  );

};

export default DoctorCard;