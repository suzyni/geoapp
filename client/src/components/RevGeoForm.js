import React, { Component } from 'react'

import { SERVER_URL_PREFIX } from '../config'
import { getGeoResults } from '../lib/getGeoResults'
import GeoResults from './GeoResults'


class RevGeoForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      address: "",
      geocode: "",
      alts: [] // All alternative geocoding results [{address, geocode}].
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleGeoChange = this.handleGeoChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  handleSubmit(event) {
    const url = SERVER_URL_PREFIX + "api/rev-geocode"
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({
        "geocode": this.state.geocode
      })
    }

    fetch(url, options)
      .then((response) => response.json())
      .then((json) => {
        const results = getGeoResults(json)
        this.setState({
          address: results["address"],
          geocode: results["geocode"],
          alts: results["alts"]
        })
      })
      .catch((error) => {
        console.error(error)
      })
    
    event.preventDefault()
    event.stopPropagation()
  }

  handleGeoChange(event) {
    this.setState({
      geocode: event.target.value
    })
  }

  handleClick(index) {
    this.setState({
      address: this.state.alts[index]["address"],
      geocode: this.state.alts[index]["geocode"]
    })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="geoform">
        <input
          className="text-input"
          type="text"
          value={this.state.geocode}
          onChange={this.handleGeoChange}
          placeholder="input lat, lng"
        />
        <input type="submit" value={"Get Address"} />
        <GeoResults
          results={this.state.alts}
          handleClick={this.handleClick}
        />
      </form>
    )
  }
}

export default RevGeoForm
