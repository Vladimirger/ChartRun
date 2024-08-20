from flask import jsonify, request, session
from config import db, app
from models import User


@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    username = data['username']
    password = data['password']
    email = data['email']

    if not username or not password or not email:
        return jsonify({'message': 'error'})
    new_user = User(username, password, email)
    try:
        db.session.add(new_user)
        db.session.commit()
    except Exception as e:
        return jsonify({'message': str(e)})
    session['username'] = new_user.username
    return jsonify({'message': 'signup successful'})


@app.route('/login', methods=['POST'])
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


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
