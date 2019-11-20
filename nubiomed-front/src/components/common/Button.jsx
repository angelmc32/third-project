import React from 'react';

const Button = ( {type, text} ) => {
  
  return (
    <button className={`uk-button uk-button-${type}`}>
      {text}
    </button>
  )

};

export default Button;