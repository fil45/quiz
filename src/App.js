import React, { Component } from 'react';
import Header from './components/Header';
import Testing from './components/Testing';
import Manager from './components/Manager';
import Add from './components/Add';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className='App' style={{ padding: '0 20px' }}>
        <Router>
          <Header />
          <Switch>
            <Route exact path='/'>
              <Testing />
            </Route>
            <Route path='/add/'>
              <Add />
            </Route>
            <Route path='/manager/'>
              <Manager />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
