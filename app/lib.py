from math import sin, cos, sqrt, atan2, radians

def dist_calc(slat, slng, dlat, dlng):

  # Approximate radius of earth in km.
  R = 6373.0

  # Radians for the 
  slat = radians(slat)
  slng = radians(slng)
  dlat = radians(dlat)
  dlng = radians(dlng)

  delta_lat = dlat - slat
  delta_lon = dlng - slng

  a = sin(delta_lat / 2)**2 + cos(slat) * cos(dlat) * sin(delta_lon / 2)**2
  c = 2 * atan2(sqrt(a), sqrt(1 - a))

  return R * c