import React from 'react';
import { BrowserRouter } from "react-router-dom";

import WeatherWidget from './components/WeatherWidget.js';

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <WeatherWidget />    
      </BrowserRouter> 
    </React.Fragment>
  )
}

export default App;
