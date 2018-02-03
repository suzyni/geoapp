
export const requireUpdateStartGeocode = () => {
  return {
    type: "REQ_UPDATE_START_GEO",
  }
}

export const updateStartGeocode = (startGeocode) => {
  return {
    type: "UPDATE_START_GEO",
    startGeocode
  }
}

export const requireUpdateEndGeocode = () => {
  return {
    type: "REQ_UPDATE_END_GEO",
  }
}

export const updateEndGeocode = (endGeocode) => {
  return {
    type: "UPDATE_END_GEO",
    endGeocode
  }
}
