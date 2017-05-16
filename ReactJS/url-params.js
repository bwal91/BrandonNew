import React from 'react';
// import logo from './logo.svg';
// import PropTypes from 'prop-types';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)

const Topic = ({match}) => (
  
  <div>
    <h2>ID: {match.params.topicId}</h2>
  </div>
)


const Accounts = () => (

  <Router>
    <div>
      <h1><Link to="/">Accounts</Link></h1>
      <ul>
        <li><Link to="/netflix">Netflix</Link></li>
        <li><Link to="/zillow-group">Zillow Group</Link></li>
        <li><Link to="/yahoo">Yahoo</Link></li>
        <li><Link to="/modus-create">Modus Create</Link></li>
      </ul>

      <hr />

      <Route exact path="/" component={Home} />
      <Route path="/:topicId" component={Topic} />

    </div>
  </Router>
)

export default Accounts;
