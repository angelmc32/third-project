import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import Profile from './components/profile/Profile';
import DoctorHome from './components/doctors/DoctorHome';
// Import Components for navigation

const Router = () => (
  <Switch>
    <Route exact path="/">
      <h1>Home</h1>
    </Route>
    <Route exact path="/doctors">
      <DoctorHome />
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
);

export default Router;