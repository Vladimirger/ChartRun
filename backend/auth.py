import json
from flask import Blueprint
from flask import jsonify, request, session
from __init__ import db
from models import User, Problem
import os


auth = Blueprint('auth', __name__)


@auth.route('/api/login', methods=['POST'])
def login():
    # user = User(username="johndoe", email="john@example.com", password="secure password")
    # db.session.add(user)
    # db.session.commit()
    # problem = Problem(name="Two Sum", solved=False, last="", user_id="johndoe")
    # db.session.add(problem)
    # db.session.commit()
    # submission = Submission(number=1, work=True, code="print('Hello World')", problem_name="Two Sum", user_id="johndoe")
    # db.session.add(submission)
    # db.session.commit()

    data = request.get_json()
    username = data['username']
    password = data['password']
    if not username or not password:
        return jsonify({'message': 'not enough parameters'}), 400
    found_user = User.query.filter_by(username=username).first()
    if not found_user:
        return jsonify({'message': 'invalid username'}), 400
    if found_user.password == password:
        session['username'] = found_user.username
        return jsonify({'message': 'login successful'}), 200
    else:
        return jsonify({'message': 'wrong password'}), 400


@auth.route('/api/sign-up', methods=['POST'])
def signup():
    data = request.get_json()
    print("Received data:", data)
    
    username = data.get('username')
    password = data.get('password')
    confirm_password = data.get('confirmPassword')
    email = data.get('email')
    
    
    if not username or not password or not email or not confirm_password or confirm_password != password:
        return jsonify({'message': 'Invalid input or passwords do not match'}), 400

    
    new_user = User(username=username, email=email, password=password)
    
    try:
        # Add and commit new user
        db.session.add(new_user)
        db.session.commit()
        
        # Load problems from file and add them to the database
        problems_file_path = os.path.join(os.path.dirname(__file__), 'problems', 'problems.json')
        print("Problems file path:", problems_file_path)

        with open(problems_file_path) as data_file:
            problems_data = json.load(data_file)
            for problem_name, problem_details in problems_data.items():
                print("Adding problem:", problem_name)
                # Extract details from problem_details
                problem = Problem(
                    name=problem_name,  # Use the problem name from JSON
                    solved=False,       # Default value; adjust as needed
                    last_code="",       # Default value; adjust as needed
                    user_id=new_user.username
                )
                db.session.add(problem)

        # Commit all problems
        db.session.commit()
        
        # Set session for the new user
        session['username'] = new_user.username
        
        return jsonify({'message': 'Signup successful'}), 201
    
    except Exception as e:
        # Rollback in case of error
        db.session.rollback()
        print("Error:", str(e))
        return jsonify({'message': str(e)}), 400

@auth.route('/api/logout')
def logout():
    session.pop('username', None)

