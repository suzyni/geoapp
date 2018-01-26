import React, { Component } from 'react'

import GeoForm from '../components/Geoform'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to Geocoding App from Suzy</h2>
        </div>
        <GeoForm />
      </div>
    )
  }
}

export default App
