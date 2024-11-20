from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
import subprocess
import json
import os

flows = Blueprint('flows', __name__)

@flows.route('/api/data', methods=['POST'])
@cross_origin(origins=["http://127.0.0.1:5500"])
def receive_data():
    data = request.get_json()
    print("Received data:", data)
    data_str = json.dumps(data)

   
    exe_path = os.path.join(os.getcwd(), "flows.exe")
    try:
        result = subprocess.run(
            [exe_path],
            input=data_str,
            text=True,
            capture_output=True
        )
        print("C++ program output:", result.stdout)
        print("C++ program errors:", result.stderr)

        return jsonify({"output": result.stdout}), 200
    except Exception as e:
        print("An error occurred:", str(e))
        return jsonify({"error": str(e)}), 500
