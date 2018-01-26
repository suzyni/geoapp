from flask import Flask
from flask_cors import CORS

mygeoapp = Flask(__name__, static_folder="client/build/static", template_folder="client/build")
cors = CORS(mygeoapp, resources={r"/api/*": {"origins": "*"}})

from app import routes