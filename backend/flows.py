from flask import Blueprint, request, jsonify, session
from flask_login import login_required


flows = Blueprint('flows', __name__)


@flows.route('/api/home', methods=['POST'])
@login_required
def home():

    return jsonify({'message': 'Welcome!', 'redirectTo': '/home'}), 200

