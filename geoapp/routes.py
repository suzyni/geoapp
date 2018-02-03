import googlemaps
from flask import Flask
from flask import jsonify, render_template, request
from flask_cors import CORS
from geoapp import config
from geoapp.utils import dist_calc

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})


@app.route("/api/geocode", methods=["POST"])
def geocode():

    request_json = request.get_json()
    address = request_json.get("address")

    gmaps = googlemaps.Client(key=config.GOOGLE_API_KEY)

    geocode_list = gmaps.geocode(address)
    return jsonify({"results": geocode_list})


@app.route("/api/rev-geocode", methods=["POST"])
def revGeocode():

    request_json = request.get_json()
    geocode = request_json.get("geocode")
    lat, lng = geocode.split(",")
    print "lat ", lat, "lng ", lng

    gmaps = googlemaps.Client(key=config.GOOGLE_API_KEY)

    rev_geocode_list = gmaps.reverse_geocode((lat.strip(), lng.strip()))
    return jsonify({"results": rev_geocode_list})


@app.route("/api/dist-calc", methods=["POST"])
def distCalc():

    request_json = request.get_json()
    if not request_json.get("start", "") or not request_json.get("dest", ""):
        print "Missing request param(s)!"
        return
    slat, slng = request_json.get("start").split(",")
    dlat, dlng = request_json.get("dest").split(",")

    dist = dist_calc(
        float(slat.strip()), float(slng.strip()), float(dlat.strip()),
        float(dlng.strip()))
    print "dist=", dist

    return jsonify({"dist": dist})
