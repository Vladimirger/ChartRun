from config import db


class User(db.Model):
    username = db.Column(db.String(50), primary_key=True, unique=False, nullable=False)
    email = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(50), nullable=False)

    def __init__(self, username, email, password):
        self.username = username
        self.email = email
        self.password = password

    def to_json(self):
        return {
            "username": self.username,
            "email": self.email,
            "password": self.password
        }
