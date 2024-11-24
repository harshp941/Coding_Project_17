
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Gallery from './Gallery';
import './App.css'

function App() {
  const [tours, setTours] = useState([]);

  return (
    <Router>
      <div className="app-container">
        <h1>Tour App</h1>
        <Switch>
          <Route path="/" exact>
            <Gallery tours={tours} setTours={setTours} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;