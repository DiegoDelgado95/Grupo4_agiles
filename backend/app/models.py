# app/models.py

from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
import datetime
from app import db, login_manager


from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.exc import IntegrityError
from marshmallow import Schema, fields, ValidationError, pre_load


class User(UserMixin, db.Model):
    """
    Users table
    """

    __tablename__ = 'usuarios'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(60), index=True, unique=True)
    username = db.Column(db.String(60), index=True, unique=True)
    first_name = db.Column(db.String(60), index=True)
    last_name = db.Column(db.String(60), index=True)
    password_hash = db.Column(db.String(128))
    ordenes = db.relationship('Orden', backref='usuarios',cascade = 'all, delete-orphan', lazy = 'dynamic')
    nro_afiliado = db.Column(db.Integer, index=True, unique=True)
    is_admin = db.Column(db.Boolean, default=False)
    telefono = db.Column(db.String(60), index=True)
    ciudad = db.Column(db.String(60), index=True)
    estado_civil = db.Column(db.String(60), index=True)
    direccion = db.Column(db.String(60), index=True)
    

    @property
    def password(self):
        """
        Previene que la contraseña sea accesible
        """
        raise AttributeError('password no es un atributo leible')

    @password.setter
    def password(self, password):
        """
        Setea password a una contraseña hasheada
        """
        self.password_hash = generate_password_hash(password)

    def verify_password(self, password):
        """
        Chequea si la contraseña hasheada coincide con password
        """
        return check_password_hash(self.password_hash, password)

    def __repr__(self):
        return '<User: {}>'.format(self.username)


# Set up user_loader
@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

class Orden(db.Model):

    __tablename__ = 'ordenes'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(300))
    data = db.Column(db.LargeBinary)
    estado = db.Column(db.String(300), default='Pendiente')
    tipo = db.Column(db.String(300))
    afiliado = db.Column(db.String(60), db.ForeignKey('usuarios.username'), nullable = False)
    fecha = db.Column(db.DateTime, default=datetime.datetime.utcnow)