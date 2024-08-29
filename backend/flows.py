from flask import Blueprint,request, flash, jsonify
from __init__ import db
import json

flows = Blueprint('flows', __name__)


@flows.route('/api/home', methods=['GET', 'POST'])
def home():
    pass