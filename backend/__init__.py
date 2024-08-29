from os import path

from flask import Flask
from flask_cors import CORS
from flask_login import LoginManager
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()
DB_NAME = "database.db"


def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'acibasc3747472njcoaj90cvhqubc392hc29c3298g'
    app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{DB_NAME}'
    CORS(app)
    db.init_app(app)

    from flows import flows
    from auth import auth

    app.register_blueprint(flows, url_prefix='/')
    app.register_blueprint(auth, url_prefix='/')

    from models import User

    with app.app_context():
        db.create_all()

    login_manager = LoginManager()
    login_manager.login_view = 'auth.login'
    login_manager.init_app(app)

    @login_manager.user_loader
    def load_user(id):
        return User.query.get(int(id))

    return app


def create_database(app):
    if not path.exists('backend/' + DB_NAME):
        db.create_all(app=app)
