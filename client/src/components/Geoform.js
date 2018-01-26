import React, { Component } from 'react'

import { SERVER_URL_PREFIX } from '../config'
// import './GeoForm.css'


class GeoForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      address: "",
      geocode: ""
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    console.log("change addr event: ", event.target.value)
    this.setState({
      address: event.target.value
    })
  }

  handleSubmit(event) {
    alert("Getting the geocode of address " + this.state.address)
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
        console.log("response: ", json)
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
    // const geoCodeList = []
    // for (const obj of results) {
    //   const addr = obj["address_components"]["formatted_address"]
    //   const geom = obj["geometry"]["location"]
    //   geoCodeList.push((addr, geom))
    // }
    const address = results[0]["formatted_address"]
    const geocode = JSON.stringify(results[0]["geometry"]["location"])
    console.log(address)
    this.setState({
      address,
      geocode
    })
  }

  render() {
    // let geocodeContent = []
    // let i = 0
    // for (const item of this.state.geocode) {
    //   geocodeContent.push(<div key={i}>{item}</div>)
    //   i += 1
    // }

    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Address:
          <input type="text" value={this.state.address} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Get Geocode" />
        <div>
          <p>Current State:</p>
          <p>address: {this.state.address}</p>
          <p>geocode: {this.state.geocode}</p>
        </div>
      </form>
    )
  }
}

export default GeoForm
