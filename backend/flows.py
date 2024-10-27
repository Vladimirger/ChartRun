from flask import Blueprint, request, jsonify, session
from flask_login import login_required
from flask_cors import cross_origin


flows = Blueprint('flows', __name__)


@flows.route('/api/data', methods=['POST'])
#@login_required
@cross_origin(origins=["http://localhost:63342"])
def receive_data():

    data = request.get_json()

    response = {
        'received_data': data,
        'status': 'success'
    }
    print("OBICHAM");
    return jsonify(response), 200

