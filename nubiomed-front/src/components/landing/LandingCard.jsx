import React from 'react';

const LandingCard = ({ image, image_width, image_height, title, text }) => {
  
  return (
      <div className="uk-card uk-card-default uk-width-1-3">
        <div className="uk-card-media-top uk-width-2-5 uk-flex-inline uk-flex-center">
          <img src={image} width={image_width} height={image_height} alt="" className="uk-margin-medium-top"/>
        </div>
        <div className="uk-card-body uk-padding-remove-top">
          <h5 className="uk-card-title">{title}</h5>
          <p>{text}</p>
        </div>
      </div>
    
  )

};

export default LandingCard;