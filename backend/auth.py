import json
from flask import Blueprint, jsonify, request, session
from __init__ import db
from models import User, Problem
import os
import re
import bcrypt


auth = Blueprint('auth', __name__)

def is_valid_email(email):
    email_regex = re.compile(r"[^@]+@[^@]+\.[^@]+")
    return email_regex.match(email)

@auth.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'message': 'Username and password are required'}), 400

    found_user = User.query.filter_by(username=username).first()

    if not found_user:
        return jsonify({'message': 'Invalid username'}), 400

    # Check the hashed password
    if bcrypt.checkpw(password.encode('utf-8'), found_user.password.encode('utf-8')):
        session['username'] = found_user.username
        return jsonify({'message': 'Login successful'}), 200
    else:
        return jsonify({'message': 'Incorrect password'}), 400


@auth.route('/api/sign-up', methods=['POST'])
def signup():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    confirm_password = data.get('confirmPassword')
    email = data.get('email')

    # Validate input
    if not username or not password or not email or not confirm_password:
        return jsonify({'message': 'All fields are required'}), 400

    if len(username) < 3:
        return jsonify({'message': 'Username must be at least 3 characters long'}), 400

    if len(password) < 6:
        return jsonify({'message': 'Password must be at least 6 characters long'}), 400

    if password != confirm_password:
        return jsonify({'message': 'Passwords do not match'}), 400

    if not is_valid_email(email):
        return jsonify({'message': 'Invalid email format'}), 400

    if User.query.filter_by(username=username).first():
        return jsonify({'message': 'Username already exists'}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({'message': 'Email already in use'}), 400

    # Hash the password before saving it
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    new_user = User(username=username, email=email, password=hashed_password.decode('utf-8'))

    try:
        db.session.add(new_user)
        db.session.commit()

        session['username'] = new_user.username

        # Load problems from file and add them to the database
        problems_file_path = os.path.join(os.path.dirname(__file__), 'problems', 'problems.json')
        
        with open(problems_file_path) as data_file:
            problems_data = json.load(data_file)
            for problem_name, problem_details in problems_data.items():
                problem = Problem(
                    name=problem_name,
                    solved=False,
                    last_code="",
                    user_id=new_user.username
                )
                db.session.add(problem)

        db.session.commit()
        
        return jsonify({'message': 'Signup successful'}), 201
    
    except Exception as e:
        db.session.rollback()
        print("Error:", str(e))
        return jsonify({'message': 'An error occurred during signup'}), 400


@auth.route('/api/logout')
def logout():
    session.pop('username', None)
    return jsonify({'message': 'Logout successful'}), 200