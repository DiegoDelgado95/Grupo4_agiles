# app/__init__.py

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_bootstrap import Bootstrap
from config import app_config

# Instancio la base (no es buena practica dejarlo aca, se suele dejar en un directorio "instance" que no se publica)
app.config["SQLALCHEMY_DATABASE_URI"] = "mysql://admin:password@localhost/flask_app"
# Inicio la variable db
db = SQLAlchemy()
login_manager = LoginManager()

def create_app(config_name):
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_object(app_config[config_name])
    app.config.from_pyfile('config.py')
    login_manager.init_app(app)
    login_manager.login_message = "You must be logged in to access this page."

    Bootstrap(app)
    db.init_app(app)

    from app import models

    return app