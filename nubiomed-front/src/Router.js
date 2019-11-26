import React, { useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import { AppContext } from './AppContext';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import Profile from './components/profile/Profile';
import DoctorLanding from './components/doctors/DoctorLanding';
import DoctorHome from './components/doctors/DoctorHome';
import PatientHome from './components/patients/PatientHome';
// Import Components for navigation

const Router = () => {

  const { user } = useContext(AppContext); // Destructure user state variable

  return (
    <Switch>
      <Route exact path="/">
        <h1>Landing</h1>
      </Route>
      <Route exact path="/home">
        { user.usertype === 'doctor' ? 
          <DoctorHome /> :
          <PatientHome />
        }
      </Route>
      <Route exact path="/doctors">
        <DoctorLanding />
      </Route>
      <Route path="/signup">
        <Signup usertype="patient"/>
      </Route>
      <Route path="/doctor-signup">
        <Signup usertype="doctor"/>
      </Route>
      <Route path="/login">
        <Login usertype="patient"/>
      </Route>
      <Route path="/doctor-login">
        <Login usertype="doctor"/>
      </Route>
      <Route path="/profile">
        <Profile />
      </Route>
    </Switch>
  )
};

export default Router;