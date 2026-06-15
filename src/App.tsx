import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './styles/App.css';
    import Home from "./Home";

function App() {
  return (
      <div className="App">
          <style>
              @import url('https://fonts.googleapis.com/css2?family=Monomakh&display=swap');
              @import url('https://fonts.googleapis.com/css2?family=Aleo:ital,wght@0,100..900;1,100..900&display=swap');
          </style>
          <Routes>
              <Route path="/" element={<Home/>}/>
          </Routes>
      </div>
  );
}

export default App;
