from __init__ import db


class User(db.Model):
    username = db.Column(db.String(50), primary_key=True, unique=True, nullable=False)
    email = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(50), nullable=False)

    problems = db.relationship('Problem', backref='user', lazy=True)
    submissions = db.relationship('Submission', backref='user', lazy=True)

    def to_json(self):
        return {
            "username": self.username,
            "email": self.email,
            "password": self.password
        }


class Problem(db.Model):
    name = db.Column(db.String(50), nullable=False)
    solved = db.Column(db.Boolean, default=False)
    last_code = db.Column(db.String(500))

    user_id = db.Column(db.String(50), db.ForeignKey('user.username'), nullable=False)
    __table_args__ = (db.PrimaryKeyConstraint('name', 'user_id'),)

    submissions = db.relationship('Submission', backref='problem', lazy=True)


class Submission(db.Model):
    number = db.Column(db.Integer, primary_key=True)
    work = db.Column(db.Boolean)
    code = db.Column(db.String(500))

    problem_name = db.Column(db.String(50), nullable=False)
    user_id = db.Column(db.String(50), nullable=False)
    __table_args__ = (
        db.PrimaryKeyConstraint('number', 'problem_name', 'user_id'),
        db.ForeignKeyConstraint(['problem_name', 'user_id'], ['problem.name', 'problem.user_id']),
    )

    def __init__(self, number, work, code, problem_name, user_id):
        self.number = number
        self.work = work
        self.code = code
        self.problem_name = problem_name
        self.user_id = user_id
