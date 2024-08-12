from flask import jsonify, request
from config import db, app
from models import User


@app.route('/signUp', methods=['POST'])
def signup():
    data = request.get_json()
    username = data['username']
    password = data['password']
    email = data['email']

    if not username or not password or not email:
        return jsonify({'message': 'error'})

    num_of_users = User.query.count()
    new_user = User(num_of_users, username, password, email)

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
