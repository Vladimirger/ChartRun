from flask import Blueprint, request, jsonify, session

flows = Blueprint('flows', __name__)

@flows.route('/api/home', methods=['POST'])
def home():
    return jsonify({'message': 'Welcome!', 'redirectTo': '/home'}), 200

