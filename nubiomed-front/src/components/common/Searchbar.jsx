import React from 'react';

const Searchbar = () => {
  
  return (
    <form className="uk-search uk-search-default uk-width-2-3">
      <a href="#" className="uk-search-icon-flip" uk-search-icon="true"></a>
      <input className="uk-search-input" type="search" placeholder="Search..." />
    </form>
  )

};

export default Searchbar;