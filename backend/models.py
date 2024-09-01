from __init__ import db

class User(db.Model):
    __tablename__ = 'user'
    
    username = db.Column(db.String(50), primary_key=True, unique=True, nullable=False)
    email = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(50), nullable=False)

    # Define relationships
    problems = db.relationship('Problem', back_populates='user', lazy=True)
    submissions = db.relationship('Submission', back_populates='user', lazy=True)

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
    __tablename__ = 'problem'
    
    name = db.Column(db.String(50), nullable=False)
    solved = db.Column(db.Boolean, default=False)
    last_code = db.Column(db.String(500))

    user_id = db.Column(db.String(50), db.ForeignKey('user.username'), nullable=False)
    __table_args__ = (db.PrimaryKeyConstraint('name', 'user_id'),)

    # Define relationships
    user = db.relationship('User', back_populates='problems')
    submissions = db.relationship('Submission', back_populates='problem', lazy=True)

    def __init__(self, name, user_id, solved=False, last_code=""):
        self.name = name
        self.solved = solved
        self.last_code = last_code
        self.user_id = user_id


class Submission(db.Model):
    __tablename__ = 'submission'
    
    number = db.Column(db.Integer)
    work = db.Column(db.Boolean)
    code = db.Column(db.String(500))

    problem_name = db.Column(db.String(50), db.ForeignKey('problem.name'), nullable=False)
    user_id = db.Column(db.String(50), db.ForeignKey('user.username'), nullable=False)
    
    __table_args__ = (
        db.PrimaryKeyConstraint('number', 'problem_name', 'user_id'),
    )

    # Define relationships
    user = db.relationship('User', back_populates='submissions')
    problem = db.relationship('Problem', back_populates='submissions')

    def __init__(self, number, work, code, problem_name, user_id):
        self.number = number
        self.work = work
        self.code = code
        self.problem_name = problem_name
        self.user_id = user_id
