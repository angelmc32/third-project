import React from "react";
import currencyFormatter from "currency-formatter";

const FacilityCard = ({ title, images = [], description, price, owner }) => {
  return (
    <div className="uk-card uk-card-default uk-padding-remove uk-width-medium">
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
};

export default FacilityCard;