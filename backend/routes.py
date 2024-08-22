from flask import Blueprint,request, flash, jsonify
from __init__ import db
import json

routes = Blueprint('routes', __name__)


@routes.route('/api/home', methods=['GET', 'POST'])
def home():
    pass