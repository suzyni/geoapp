from flask import jsonify, render_template, request
import googlemaps

import config
from index import mygeoapp


@mygeoapp.route("/", methods=["GET"])
@mygeoapp.route("/index", methods=["GET"])
def index():

  return render_template("index.html")


@mygeoapp.route("/api/geocode", methods=["POST"])
def geocode():

  request_json = request.get_json()
  address = request_json.get("address")

  gmaps = googlemaps.Client(key=config.GOOGLE_API_KEY)

  geocode_list = gmaps.geocode(address)
  return jsonify({"results": geocode_list})


@mygeoapp.route("/api/rev-geocode", methods=["POST"])
def revGeocode():

  request_json = request.get_json()
  lat, lng = request_json.get("geocode")

  print "lat ", lat, "lng ", lng

  gmaps = googlemaps.Client(key=config.GOOGLE_API_KEY)

  rev_geocode_list = gmaps.reverse_geocode((lat, lng))
  return jsonify({"results": rev_geocode_list})