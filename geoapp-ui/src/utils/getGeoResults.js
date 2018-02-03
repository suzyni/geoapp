export const getGeoResults = (json) => {
  const results = json["results"]
  const alts = results.map((item) => {
    return ({
      "address": item["formatted_address"],
      "geocode": item["geometry"]["location"]["lat"].toString() + ", " +
          item["geometry"]["location"]["lng"].toString()
    })
  })
  return ({
    "address": !!alts ? alts[0]["address"] : "",
    "geocode": !!alts ? alts[0]["geocode"] : "",
    "alts": alts
  })
}