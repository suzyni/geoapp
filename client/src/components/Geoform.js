import React, { Component } from 'react'

import { SERVER_URL_PREFIX } from '../config'

import './Geoform.css'


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
    console.log(alts)
    this.setState({
      address: !!alts ? alts[0]["address"] : "",
      geocode: !!alts ? alts[0]["geocode"] : "",
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
      geocode: this.state.alts[index]["geocode"]
    })
  }

  render() {
    // If address/geocode is set, display them under the form.
    let addrContent = null
    if (this.state.address) {
      addrContent = (
        <div>
          Address: {this.state.address}
        </div>
      )
    }

    // If there are alternatives, display them in table.
    const altList = this.state.alts.map((item, index) => {
      return (
        <tr key={index} onClick={() => this.handleClick(index)}>
          <td>{item["address"]}</td>
          <td>{item["geocode"]}</td>
        </tr>
      )
    })
    let altContent = null
    if (altList.length !== 0) {
      altContent = (
        <div className="table-section">
          <h2>Do You Mean...?</h2>
          <table>
            <thead>
              <tr>
                <th>address</th>
                <th>geocode</th>
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
      <form onSubmit={this.handleSubmit} className="geoform">
        <input
          className="text-input"
          type="text"
          value={this.state.address}
          onChange={this.handleAddrChange}
          placeholder="input an address"
        />
        <input type="submit" value={"Get Geocode"} />
        <div className="state-section">
          {addrContent}
        </div>
        {altContent}
      </form>
    )
  }
}

export default GeoForm
