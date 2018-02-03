const geocodes = (state = {}, action) => {
  let new_state = {}
  switch (action.type) {
    case "REQ_UPDATE_START_GEO":
    case "REQ_UPDATE_END_GEO":
      if (state.isSubmitting === true) {
        return state
      } else {
        new_state = Object.assign({}, state, {
          isSubmitting: true
        })
        return new_state
      }
    case "UPDATE_START_GEO":
      if (state.isSubmitting === false) {
        return state
      }
      new_state = Object.assign({}, state, {
        isSubmitting: false,
        startGeocode: action.startGeocode
      })
      return new_state
    case "UPDATE_END_GEO":
      if (state.isSubmitting === false) {
        return state
      }
      new_state = Object.assign({}, state, {
        isSubmitting: false,
        endGeocode: action.endGeocode
      })
      return new_state
    default:
      return state
  }
}

export default geocodes
