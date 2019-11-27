import React, { useContext } from 'react';
import Router from './Router';
import { AppContext } from './AppContext';
import './App.css';
import Nav from './components/common/Nav'
import Sidebar from './components/common/Sidebar';

function App() {

  const { user } = useContext(AppContext); // Destructure user state variable

  return (
    <div className="App">
      <Nav />
      { user._id ? (
        <div className="uk-flex">
          <Sidebar />
          <Router />
        </div>
      ) : (
        <Router />
      )}
      
    </div>
  );
}

export default App;