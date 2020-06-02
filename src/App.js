import React from 'react';
import 'babel-polyfill';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './componens/Home.js';
import Maps from './componens/Maps.js';

function App() {
  return (
    <Router>
      <div className="App">
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/map' component={Maps}/>
          </Switch>
      </div>
    </Router>
  );
}

export default App;
