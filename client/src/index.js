//This is the entry file for react and webpack

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import AppAPI from './js/utils/appAPI'
// import App from "./js/components/App";
import {BrowserRouter} from 'react-router-dom';


import Dashboard from "./js/components/Dashboard/Dashboard";

// Display State
AppAPI.getContacts();
AppAPI.getGroups();
AppAPI.getMessages()



ReactDOM.render(
  <BrowserRouter>
  <Dashboard/>
</BrowserRouter>, document.getElementById('root'));