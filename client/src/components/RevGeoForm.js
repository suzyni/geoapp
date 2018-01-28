import React, { Component } from 'react'

import { SERVER_URL_PREFIX } from '../config'
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
        this.handleResponseData(json)
      })
      .catch((error) => {
        console.error(error)
      })
    
    event.preventDefault()
    event.stopPropagation()
  }

  handleResponseData(json) {
    const results = json["results"]
    const alts = results.map((item) => {
      return ({
        "address": item["formatted_address"],
        "geocode": item["geometry"]["location"]["lat"].toString() + ", " +
            item["geometry"]["location"]["lng"].toString()
      })
    })
    this.setState({
      address: !!alts ? alts[0]["address"] : "",
      geocode: !!alts ? alts[0]["geocode"] : "",
      alts
    })
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
