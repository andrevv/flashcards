import os
from flask import Flask
from flask_login import LoginManager
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()
DB_NAME = 'db.sqlite'


def create_app():
    app = Flask(__name__)
    app.url_map.strict_slashes = False

    app.config['SECRET_KEY'] = os.environ['SECRET_KEY']
    app.config['SESSION_COOKIE_HTTPONLY'] = True
    app.config['SESSION_COOKIE_SECURE'] = True
    app.config['SESSION_COOKIE_SAMESITE'] = 'Strict'
    app.config['REMEMBER_COOKIE_HTTPONLY'] = True
    app.config['REMEMBER_COOKIE_SECURE'] = True
    app.config['REMEMBER_COOKIE_SAMESITE'] = 'Strict'
    app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{DB_NAME}'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    db.init_app(app)

    from . import auth
    from . import settings
    app.register_blueprint(auth.bp)
    app.register_blueprint(settings.bp)

    from .models import User
    create_database(app)

    login_manager = LoginManager()
    login_manager.session_protection = 'strong'
    login_manager.init_app(app)

    @login_manager.user_loader
    def load_user(id):
        return User.query.get(int(id))

    return app


def create_database(app):
    if not os.path.exists(DB_NAME):
        db.create_all(app=app)
        print('Database created!')
