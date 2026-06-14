import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './pages/home.jsx';
import Illustration from './pages/illustration.jsx';
import Concept from './pages/concept.jsx';
//import MiscArt from './pages/miscArt.jsx';
//import About from './pages/about.jsx';
//import reportWebVitals from './reportWebVitals';

// window.React1 = require('react');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path = "/" element = { <Home /> } ></Route>
        <Route path = "/illustrations" element = { <Illustration /> } ></Route>
        <Route path = "/concepts" element = { <Concept /> } ></Route>
        {/*<Route path = "/misc" element = { <MiscArt /> } ></Route>*/}
        {/*<Route path = "/oc" element = { <OC /> } ></Route>*/}
        {/*<Route path = "/about" element = { <About /> } ></Route>*/}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
