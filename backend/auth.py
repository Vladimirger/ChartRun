import json
from flask import Blueprint
from flask import jsonify, request, session
from __init__ import db
from models import User, Problem

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
    print(data)
    username = data['username']
    password = data['password']
    confirm_password = data['confirmPassword']
    email = data['email']
    if not username or not password or not email or not confirm_password or not confirm_password == password:
        return jsonify({'message': 'error'}), 400
    new_user = User(username, email, password)
    try:
        db.session.add(new_user)
        db.session.commit()
    except Exception as e:
        return jsonify({'message': str(e)}), 400
    session['username'] = new_user.username
    print("successful")
    # with open('backend/problems/problems.json') as data_file:
    #     data = json.load(data_file)
    #     for _ in data.values():
    #         problem = Problem(name=_, solved=False, last="", user_id=new_user.username)
    #         db.session.add(problem)
    #         db.session.commit()

    return jsonify({'message': 'signup successful'}), 200

@auth.route('/api/logout')
def logout():
    session.pop('username', None)

