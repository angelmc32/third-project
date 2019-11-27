import React from 'react';

const LandingCard = ({ image, title, text }) => {
  
  return (
      <div className="uk-card uk-card-default uk-width-1-3">
        <div className="uk-card-media-top uk-width-2-5 uk-flex-inline uk-flex-center">
          <img src={image} width={96} height={96} alt="" className="uk-margin-medium-top"/>
        </div>
        <div className="uk-card-body">
          <h3 className="uk-card-title">{title}</h3>
          <p>{text}</p>
        </div>
      </div>
    
  )

};

export default LandingCard;