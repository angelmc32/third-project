import React, { useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import { AppContext } from './AppContext';

// Import Components for navigation
import Landing from './components/landing/Landing';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import Profile from './components/profile/Profile';
import DoctorLanding from './components/doctor/DoctorLanding';
import DoctorHome from './components/doctor/DoctorHome';
import PatientHome from './components/patient/PatientHome';
import Facility from './components/facility/Facility';

const Router = () => {

  const { user } = useContext(AppContext); // Destructure user state variable

  return (
    <Switch>
      <Route exact path="/">
        <Landing />
      </Route>
      <Route exact path="/home">
        { user.usertype === 'Doctor' ? 
          <DoctorHome /> :
          <PatientHome />
        }
      </Route>
      <Route exact path="/doctors">
        <DoctorLanding />
      </Route>
      <Route path="/signup">
        <Signup usertype="Patient"/>
      </Route>
      <Route path="/doctor-signup">
        <Signup usertype="Doctor"/>
      </Route>
      <Route path="/login">
        <Login usertype="Patient"/>
      </Route>
      <Route path="/doctor-login">
        <Login usertype="Doctor"/>
      </Route>
      <Route path="/profile">
        <Profile />
      </Route>
      <Route path="/facility">
        <Facility />
      </Route>
    </Switch>
  )
};

export default Router;