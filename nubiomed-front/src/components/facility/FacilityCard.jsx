import React from "react";
import currencyFormatter from "currency-formatter";

const Card = ({ title, images = [], description, price, owner }) => {
  return (
    <div className="uk-card uk-card-default uk-padding-remove uk-width-medium">
      <div className="uk-card-media-top uk-padding-remove">
        <img src="http://getuikit.com/docs/images/light.jpg" alt="" width={320} />
      </div>
      <div className="uk-card-body uk-padding-small">
        <p>Excelente consultorio en el Hospital Angeles Pedregal</p>
        <hr />
        <div className="uk-flex uk-flex-column uk-padding-remove uk-flex-middle">
          <span className="uk-badge uk-width-1-2 uk-text-center">
            {currencyFormatter.format(price, { code: "MXN" })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;