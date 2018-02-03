import React, { Component } from "react"


class GeoResults extends Component {
  render() {
    const resultList = this.props.results.map((item, index) => {
      return (
        <tr key={index} onClick={() => this.props.handleClick(index)}>
          <td>{item["address"]}</td>
          <td>{item["geocode"]}</td>
        </tr>
      )
    })
    let content = null
    if (resultList.length !== 0) {
      content = (
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
              {resultList}
            </tbody>
          </table>
        </div>
      )
    }
    return <div>{content}</div>
  }
}

export default GeoResults
