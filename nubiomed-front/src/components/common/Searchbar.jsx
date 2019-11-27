import React from 'react';

const Searchbar = () => {
  
  return (
    <div className="uk-container">
      <form className="uk-search uk-search-default">
        <a href="#" className="uk-search-icon-flip" uk-search-icon="true"></a>
        <input className="uk-search-input" type="search" placeholder="Search..." />
      </form>
    </div>
  )

};

export default Searchbar;