
import React, { useState } from 'react';
import Gallery from './components/Gallery';
import './App.css'

function App() {
  const [tours, setTours] = useState([]);

  return (
    <div className="app-container">
      <h1>Tour App</h1>
      <Gallery tours={tours} setTours={setTours} />
    </div>
  );
}

export default App;