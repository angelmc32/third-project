import React from 'react';

const Searchbar = ({single}) => {
  if ( single ) {
    return (
      <form className="uk-search uk-search-default uk-width-2-3">
        <a href="#" className="uk-search-icon-flip" uk-search-icon="true"></a>
        <input className="uk-search-input" type="search" placeholder="Search..." />
      </form>
    )
  } else {
    return (
      <div className="uk-width-1-1 uk-flex uk-flex-center">
        <form className="uk-search uk-search-default uk-width-4-5">
          <input className="uk-search-input uk-width-1-3" type="date" placeholder="Fecha de nacimiento" />
          <input className="uk-search-input uk-width-1-3" type="search" placeholder="Apellido" />
          <input className="uk-search-input uk-width-1-3" type="search" placeholder="Nombre" />
        </form>
        <button className="uk-button uk-button-danger uk-button-small">+</button>
      </div>
      
    )
  }
};

export default Searchbar;