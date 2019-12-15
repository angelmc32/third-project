import React from 'react';
import Loader from 'react-loader-spinner';
import centerlogo from '../../assets/images/logo/center-logo'

const AppLoader = () => (
  
  <div className="uk-container">
    <div className="loader">
      <Loader
         type="BallTriangle"
         color="#22197F"
         height={100}
         width={100}
         timeout={0} //infinite
      />
    </div>
  </div>
)

export default AppLoader;