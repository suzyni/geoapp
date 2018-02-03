import React, { Component } from "react"

import GeoResults from "../components/GeoResults"
import { SERVER_URL_PREFIX } from "../config"
import { getGeoResults } from "../utils/getGeoResults"


class GeoForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      address: "",
      geocode: "",
      alts: [] // All alternative geocoding results [{address, geocode}].
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleAddrChange = this.handleAddrChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  handleSubmit(event) {
    const url = SERVER_URL_PREFIX + "api/geocode"
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({
        "address": this.state.address
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

  handleAddrChange(event) {
    this.setState({
      address: event.target.value
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
          value={this.state.address}
          onChange={this.handleAddrChange}
          placeholder="input an address"
        />
        <input type="submit" value={"Get Geocode"} />
        <GeoResults
          results={this.state.alts}
          handleClick={this.handleClick}
        />
      </form>
    )
  }
}

export default GeoForm
