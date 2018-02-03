import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { createStore } from "redux"

import geoappState from "./reducers"
import App from "./containers/App"
import "./index.css"

let store = createStore(geoappState)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
