import React, { Component } from 'react';
import Routes from './routes';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './components/Header';

const App = () => (
  
    <div className="App">
      <Header />
      <div className="justify-content-around mr-5 ml-5 mt-5">
        <Routes />
      </div>
    </div>
);

export default App;