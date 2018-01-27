import React, { Component } from 'react'

import { SERVER_URL_PREFIX } from '../config'
// import './GeoForm.css'


class GeoForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      address: "",
      geocode: {},
      alts: [] // All alternative geocoding results [{address, geocode}].
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleAddrChange = this.handleAddrChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
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
    const alts = results.map((item) => {
      return ({
        "address": item["formatted_address"],
        "geocode": item["geometry"]["location"]
      })
    })
    this.setState({
      address: !!alts ? alts[0]["address"] : "",
      geocode: !!alts ? JSON.stringify(alts[0]["geocode"]) : "",
      alts
    })
  }

  handleAddrChange(event) {
    this.setState({
      address: event.target.value
    })
  }

  handleClick(index) {
    this.setState({
      address: this.state.alts[index]["address"],
      geocode: JSON.stringify(this.state.alts[index]["geocode"])
    })
  }

  render() {
    // If address/geocode is set, display them under the form.
    let addrContent = null
    let geoContent = null
    if (this.state.address) {
      addrContent = (
        <div>
          Address: {this.state.address}
        </div>
      )
    }
    if (Object.keys(this.state.geocode).length !== 0) {
      geoContent = (
        <div>
          Geocode: {JSON.stringify(this.state.geocode)}
        </div>
      )
    }

    // If there are alternatives, display them in table.
    const altList = this.state.alts.map((item, index) => {
      return (
        <tr key={index} onClick={() => this.handleClick(index)}>
          <td>{item["address"]}</td>
          <td>{item["geocode"]["lat"]}</td>
          <td>{item["geocode"]["lng"]}</td>
        </tr>
      )
    })
    let altContent = null
    if (altList.length !== 0) {
      altContent = (
        <div>
          <p>Do You Mean...?</p>
          <table>
            <thead>
              <tr>
                <td>address</td>
                <td>lat</td>
                <td>lng</td>
              </tr>
            </thead>
            <tbody>
              {altList}
            </tbody>
          </table>
        </div>
      )
    }

    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Input an address:
          <input type="text" value={this.state.address} onChange={this.handleAddrChange} />
        </label>
        <input type="submit" value="Get Geocode" />
        <div>
          {addrContent}
          {geoContent}
        </div>
        {altContent}
      </form>
    )
  }
}

export default GeoForm
