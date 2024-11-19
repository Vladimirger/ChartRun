from flask import Blueprint, request, jsonify, session
from flask_login import login_required
from flask_cors import cross_origin
import subprocess
import json



flows = Blueprint('flows', __name__)


@flows.route('/api/data', methods=['POST'])
@cross_origin(origins=["http://127.0.0.1:5500"])
def receive_data():

    data = request.get_json()
    print(data)
    data = json.dumps(data)

    result = subprocess.run(
        ["./flows.cpp"],  # Replace with your C++ executable
        input=data,    # Pass JSON as input
        text=True,          # Treat input and output as text (not binary)
        capture_output=True # Capture output for inspection
    )
    print("C++ program output", result.stdout)


