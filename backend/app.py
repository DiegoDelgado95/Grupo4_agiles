import datetime
from flask_login import UserMixin, LoginManager
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from marshmallow import Schema, fields, post_load, ValidationError
from flask_cors import CORS
from flask_marshmallow import Marshmallow
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "mysql://nahuealb:root@localhost/ordenes"
db = SQLAlchemy(app)
CORS(app)
ma = Marshmallow(app)
login_manager = LoginManager()


## MODEL - TABLA ORDENES ##

class Orden(db.Model):

    __tablename__ = 'ordenes'

    id = db.Column(db.Integer, primary_key=True)
    data = db.Column(db.LargeBinary)
    estado = db.Column(db.String(300), default='Pendiente')
    tipo = db.Column(db.String(300))
    user = db.Column(db.String(60), db.ForeignKey('usuarios.username'), nullable = False)
    fecha = db.Column(db.DateTime, default=datetime.datetime.utcnow)

## ORDEN SCHEMA ##
class OrdenSchema(ma.Schema):
    class Meta:
        fields = ('id','data', 'estado', 'tipo', 'user', 'fecha')

    @post_load
    def make_order(self, data, **kwargs):
        return Orden(**data)

class BytesField(fields.Field):
    def _validate(self, value):
        if type(value) is not bytes:
            raise ValidationError('Invalid input type.')

        if value is None or value == b'':
            raise ValidationError('Invalid value')

orden_schema = OrdenSchema()
ordenes_schema = OrdenSchema(many=True)

## PIDO DATOS DEL FORMULARIO PARA LLENAR LA TABLA ##
@app.route('/api/order', methods=['POST'])
def add_order():
    data = request.json['data']
    estado = request.json['estado']
    tipo = request.json['tipo']
    user = request.json['user']
    fecha = request.json['fecha']

    new_order = Orden(data=data,
                    estado=first_name,
                    tipo=last_name, 
                    user=user, 
                    fecha=fecha, 

    db.session.add(new_order)
    db.session.commit()

    return user_schema.jsonify(new_order)