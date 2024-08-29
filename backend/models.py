from __init__ import db


class User(db.Model):
    username = db.Column(db.String(50), primary_key=True, unique=True, nullable=False)
    email = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(50), nullable=False)

    problems = db.relationship('Problem', backref='user', lazy=True)

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


class Problem(db.Model):
    name = db.Column(db.String(50), primary_key=True, unique=True, nullable=False)
    solved = db.Column(db.Boolean, default=False)
    last_code = db.Column(db.String(500))

    user_id = db.Column(db.String(50), db.ForeignKey('user.username'), nullable=False)  # ForeignKey to User
    submissions = db.relationship('Submission', backref='problem', lazy=True)  # Relationship with Submission

    def __init__(self, name, solved, last, user_id):
        self.name = name
        self.solved = solved
        self.last_code = last
        self.user_id = user_id  # Set the user_id when creating a problem


class Submission(db.Model):
    number = db.Column(db.Integer, primary_key=True)
    work = db.Column(db.Boolean)
    code = db.Column(db.String(500))

    problem_name = db.Column(db.String(50), db.ForeignKey('problem.name'), nullable=False)  # ForeignKey to Problem

    def __init__(self, number, work, code, problem_name):
        self.number = number
        self.work = work
        self.code = code
        self.problem_name = problem_name
