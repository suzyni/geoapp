from flask import Flask
from flask_cors import CORS

mygeoapp = Flask(__name__)
cors = CORS(mygeoapp, resources={r"/api/*": {"origins": "*"}})

from app import routes
