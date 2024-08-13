from flask import jsonify, request
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

    return jsonify({'message': 'signup successful'})

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data['username']
    password = data['password']
    if not username or not password:
        return jsonify({'message': 'not enough parameters'})
    found_user = User.query.filter_by(username=username).first()
    if not found_user:
        return jsonify({'message': 'invalid username'})
    if found_user.password == password:
        pass
    else:
        return jsonify({'message': 'wrong password'})

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
