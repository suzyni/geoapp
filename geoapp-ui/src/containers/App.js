import React, { Component } from "react"
import { connect } from "react-redux"

import {
  requireUpdateEndGeocode, requireUpdateStartGeocode, updateEndGeocode,
  updateEndGeocodeFailed, updateStartGeocode, updateStartGeocodeFailed
} from "../actions"
import { SERVER_URL_PREFIX } from "../config"
import {
  getEndGeocode, getIsGeocodeSubmitting, getStartGeocode
} from "../selectors"
import GeoForm from "./GeoForm"

import "./App.css"


class AppComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dist: 0
    }
    this.handleDistCalc = this.handleDistCalc.bind(this)
  }

  handleDistCalc(event) {
    const url = SERVER_URL_PREFIX + "api/dist-calc"
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({
        "start": this.props.startGeocode,
        "dest": this.props.endGeocode
      })
    }

    fetch(url, options)
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          dist: json["dist"]
        })
      })
      .catch((error) => {
        console.error(error)
      })
    
    event.preventDefault()
    event.stopPropagation()
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to Geocoding App from Suzy</h2>
        </div>
        <div>
          <GeoForm
            isSubmitting={this.props.isSubmitting}
            setGeocode={this.props.setStartGeocode}
            setGeocodeFailed={this.props.setStartGeocodeFailed}
            requireSetGeocode={this.props.requireSetStartGeocode}
          />
          <GeoForm
            isSubmitting={this.props.isSubmitting}
            setGeocode={this.props.setEndGeocode}
            setGeocodeFailed={this.props.setEndGeocodeFailed}
            requireSetGeocode={this.props.requireSetEndGeocode}
          />
        </div>
        <div>
          <h2>In Redux</h2>
          <p>Start: {this.props.startGeocode}</p>
          <p>End: {this.props.endGeocode}</p>
        </div>
        <button onClick={this.handleDistCalc}>Distance Calculation</button>
        <p>distance: {this.state.dist}</p>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    startGeocode: getStartGeocode(state.geocodes),
    endGeocode: getEndGeocode(state.geocodes),
    isSubmitting: getIsGeocodeSubmitting(state.geocodes)
  }
}

// In order to reuse GeoForm component, pass in actions for start/end points.
const mapDispatchToProps = (dispatch) => {
  return {
    requireSetStartGeocode: () => {dispatch(requireUpdateStartGeocode())},
    setStartGeocode: (geocode) => {dispatch(updateStartGeocode(geocode))},
    setStartGeocodeFailed: (error) => {dispatch(updateStartGeocodeFailed())},
    requireSetEndGeocode: () => {dispatch(requireUpdateEndGeocode())},
    setEndGeocode: (geocode) => {dispatch(updateEndGeocode(geocode))},
    setEndGeocodeFailed: (error) => {dispatch(updateEndGeocodeFailed())}
  }
}

const App = connect (
  mapStateToProps,
  mapDispatchToProps
)(AppComponent)

export default App
