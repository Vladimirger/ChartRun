from flask import Blueprint
from flask import jsonify, request, session
from flask_login import login_required

from __init__ import db
from models import User

auth = Blueprint('auth', __name__)


@auth.route('/api/login', methods=['GET', 'POST'])
def login():
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


@auth.route('/api/logout')
@login_required
def logout():
    pass


@auth.route('/api/sign-up', methods=['GET', 'POST'])
def signup():
    data = request.get_json()
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
    print("sucessfull")
    return jsonify({'message': 'signup successful'}), 200
