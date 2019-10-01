import datetime
from flask_login import UserMixin, LoginManager
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from marshmallow import Schema, fields, post_load, ValidationError
from flask_cors import CORS
from flask_marshmallow import Marshmallow
from werkzeug.security import generate_password_hash, check_password_hash


app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "mysql+cymysql://admin:password@localhost/flask_app"
db = SQLAlchemy(app)
CORS(app)
ma = Marshmallow(app)
login_manager = LoginManager()

## MODEL - TABLA USUARIOS ##
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
    orden = db.relationship('Orden', backref='usuarios',cascade = 'all, delete-orphan', lazy = 'dynamic')
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

## MODEL - TABLA ORDENES ##

class Orden(db.Model):

    __tablename__ = 'ordenes'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(300))
    data = db.Column(db.LargeBinary)
    estado = db.Column(db.String(300), default='Pendiente')
    tipo = db.Column(db.String(300))
    user = db.Column(db.String(60), db.ForeignKey('usuarios.username'), nullable = False)
    fecha = db.Column(db.DateTime, default=datetime.datetime.utcnow)

## USER SCHEMA ##
class UserSchema(ma.Schema):
    class Meta:
        fields = ('id', 'email', 'username', 'first_name', 'last_name', 'password_hash', 'nro_afiliado', 'is_admin', 'telefono', 'ciudad', 'estado_civil', 'direccion')

    @post_load
    def make_user(self, data, **kwargs):
        return User(**data)

user_schema = UserSchema()
users_schema = UserSchema(many=True)

## ORDEN SCHEMA ##
class OrdenSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'data', 'estado', 'tipo', 'user', 'fecha')

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

## TEST ROUTE ##
@app.route('/')
def ping():
    return "Pong!"

@app.route("/api/users")
def get_users():
    users = User.query.all()
    # Serialize the queryset
    result = users_schema.dump(users)
    return {"users": result}

@app.route("/api/users/<int:pk>")
def get_user(pk):
    try:
        user = User.query.get(pk)
    except IntegrityError:
        return jsonify({"message": "User could not be found."}), 400
    user_result = user_schema.dump(user)
#    ordenes_result = ordenes_schema.dump(user.ordenes.all())
    return jsonify({"user": user_result})

@app.route('/api/users', methods=['POST'])
def add_user():
    email = request.json['email']
    first_name = request.json['first_name']
    last_name = request.json['last_name']
    username = request.json['username']
    password = request.json['password']
    nro_afiliado = request.json['nro_afiliado']
    telefono = request.json['telefono']
    ciudad = request.json['ciudad']
    estado_civil = request.json['estado_civil']
    direccion = request.json['direccion']


    new_user = User(email=email,
                    first_name=first_name,
                    last_name=last_name, 
                    username=username, 
                    password=password, 
                    nro_afiliado=nro_afiliado,
                    telefono=telefono,
                    ciudad=ciudad,
                    estado_civil=estado_civil,
                    direccion=direccion)

    db.session.add(new_user)
    db.session.commit()

    return user_schema.jsonify(new_user)


if __name__ == "__main__":
    db.create_all()
    app.run(debug=True, port=5002)
