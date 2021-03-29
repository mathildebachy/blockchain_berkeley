import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "./components/Home.js";
import Student_request from "./components/Student_request.js";
import registrar from "./components/registrar.js";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <BrowserRouter>
       <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/Student_request" component={Student_request} />
        <Route exact path="/registrar" component={registrar} />
        <Route exact path="/Home" component={Home} />
      </Switch>
  </BrowserRouter>,
  rootElement
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
