import React from 'react';
import Router from './Router';
import './App.css';
import Nav from './components/common/Nav'

function App() {
  return (
    <div className="App">
      <Nav />
      <Router />
    </div>
  );
}

export default App;