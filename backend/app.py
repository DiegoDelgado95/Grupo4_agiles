import datetime, os, uuid
from flask_login import UserMixin, LoginManager
from flask import Flask, request, jsonify, redirect, url_for, flash
from flask_sqlalchemy import SQLAlchemy
from marshmallow import Schema, fields, post_load, ValidationError
from flask_cors import CORS
from flask_marshmallow import Marshmallow
from werkzeug.security import generate_password_hash, check_password_hash
from flask_migrate import Migrate
from sqlalchemy.exc import IntegrityError

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "mysql+cymysql://admin:password@localhost/flask_app"
app.config["IMAGE_UPLOADS"] = "/var/www/img/"
db = SQLAlchemy(app)
CORS(app)
ma = Marshmallow(app)
login_manager = LoginManager()
migrate = Migrate(app, db)

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
#    orden = db.relationship('Orden', backref='usuarios',cascade = 'all, delete-orphan', lazy = 'dynamic')
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

    #Datos de la Orden
    id = db.Column(db.Integer, primary_key=True)
    data = db.Column(db.String(300))
    estado = db.Column(db.String(300), default='Pendiente')
    tipo = db.Column(db.String(300))
    fecha = db.Column(db.DateTime, default=datetime.datetime.now())
    #Paciente
    user_id = db.Column(db.Integer, db.ForeignKey('usuarios.id'))
    #Medico
    medico = db.Column(db.String(60), db.ForeignKey('medicos.nombre'), nullable=True)
    observacion = db.Column(db.String(300))
    descuento = db.Column(db.String(60))

## MODEL - TABLA CARTILLA ##
class Cartilla(db.Model):
    __tablename__ = 'cartilla'

    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(60), index=True, unique=True)
    direccion = db.Column(db.String(60), index=True, unique=True)
    telefono = db.Column(db.String(60), index=True, unique=True)
    ## 1 - medicamento / 2 - Hospital / 3 - Farmacia / el medico lo cargamos del otro formulario de registro ##
    is_element = db.Column(db.Integer, index=True) 

    global switch_element
    def switch_element(argument):
        switcher = {
            'Medicamento': 1,
            'Hospital': 2,
            'Farmacia': 3
        }
        return switcher.get(argument)

## MODEL - TABLA MEDICOS ##
class Medico(db.Model):
    __tablename__ = 'medicos'

    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(60), index=True)
    cuit = db.Column(db.String(60), index=True)
    matricula = db.Column(db.String(60), index=True, unique=True)
    especialidad = db.Column(db.String(60), index=True)
    hospital = db.Column(db.String(60), db.ForeignKey('cartilla.nombre'), nullable=True)
    correo = db.Column(db.String(60), index=True, unique=True)
    password = db.Column(db.String(128))
    is_admin = db.Column(db.Boolean, default=True)



## MEDICO SCHEMA ##
class MedicoSchema(ma.Schema):
    class Meta:
        fields = ('id', 'nombre', 'cuit', 'matricula', 'especialidad', 'hospital', 'is_admin')

    @post_load
    def make_medico(self, data, **kwargs):
        return medico(**data)

medico_schema = MedicoSchema()
medicos_schema = MedicoSchema(many=True)

    

## CARTILLA SCHEMA ##
class CarSchema(ma.Schema):
    class Meta:
        fields = ('id', 'nombre', 'direccion', 'telefono', 'is_element')

    @post_load
    def make_cartilla(self, data, **kwargs):
        return cartilla(**data)

cartilla_schema = CarSchema()
cartillas_schema = CarSchema(many=True)

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
        fields = ('id', 'data', 'estado', 'tipo', 'fecha', 'user_id', 'medico', 'observacion', 'descuento')

    @post_load
    def make_order(self, data, **kwargs):
        return Orden(**data)

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
    return jsonify(user_result)

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


#Obtener todas la ordenes
@app.route("/api/order")
def get_ordenes():
    ordenes = Orden.query.all()
    # Serialize the queryset
    result = ordenes_schema.dump(ordenes)
    return jsonify(result)


#Obtener todas las ordenes de un usuario
@app.route("/api/orders/<int:pk>", methods=['GET'])
def get_ordenes_user(pk):
    ordenes = Orden.query.filter_by(user_id=pk)
    result = ordenes_schema.dump(ordenes)
    return jsonify(result)      


#Crear una nueva Orden, del user
@app.route('/api/order', methods=['POST'])
def add_order():
    unique_filename = str(uuid.uuid4())
    if request.method == 'POST':
        if request.files:
            image = request.files["image"]
            image.save(os.path.join(app.config["IMAGE_UPLOADS"], unique_filename))
    #Datos del form order user
    tipo = request.form['tipo']
    user_id = int(request.form['user_id'])
    data = "http://localhost/images/"+unique_filename
    new_orden = Orden(tipo=tipo,data=data,user_id=user_id)
    db.session.add(new_orden)
    db.session.commit()

    return orden_schema.jsonify(new_orden)


#Edit de orden departe del medico
@app.route('/api/order', methods=['PUT'])
def update_order():

    #Datos de la orden
    id = request.json['id']
    estado = request.json['estado']

    #Datos del medico que realizo el cambio
    medico_id = request.json['medico_id']
    observacion = request.json['observacion']
    descuento = request.json['descuento']

    #Update
    update_order = Orden.query.filter_by(id=id).first()
    update_order.estado = estado
    update_order.medico_id = medico_id
    update_order.observacion = observacion
    update_order.descuento = descuento

    db.session.commit()

    return orden_schema.jsonify(update_order)


#Obtener una orden por ID
@app.route('/api/order/<int:pk>', methods=['GET'])
def get_order(pk):
    order = Orden.query.get(pk)
    order_result = orden_schema.dump(order)
    return jsonify(order_result)


#Login del usuario
@app.route('/api/user/login', methods=['POST'])
def login():
    email = request.json['email']
    password = request.json['password']
    login = User.query.filter_by(email=email)
    login_medico = Medico.query.filter_by(correo=email)
    medico = db.session.query(db.exists().where(Medico.correo == email)).scalar()
    if medico:
        return medicos_schema.jsonify(login_medico)
    else:
        return users_schema.jsonify(login)

# Obtener todos los  Medicos
@app.route("/api/medicos")
def get_medicos():
    medicos = Medico.query.all()
    # Serialize the queryset
    result = medicos_schema.dump(medicos)
    return jsonify(result)

# Obtener todos los  Hospitales
@app.route("/api/hospitales")
def get_hospitales():
    hospitales = Cartilla.query.filter_by(is_element="2").all()
    # Serialize the queryset
    result = cartillas_schema.dump(hospitales)
    return jsonify(result)

# Obtener todos las Farmacias
@app.route("/api/farmacias")
def get_farmacias():
    farmacias = Cartilla.query.filter_by(is_element="3").all()
    # Serialize the queryset
    result = cartillas_schema.dump(farmacias)
    return jsonify(result)

# Obtener todos los Medicamentos
@app.route("/api/medicamentos")
def get_medicamentos():
    medicamentos = Cartilla.query.filter_by(is_element="1").all()
    # Serialize the queryset
    result = cartillas_schema.dump(medicamentos)
    return jsonify(result)
    

# Crear un nuevo Medico
@app.route("/api/medicos", methods=['POST'])
def add_medico():
    nombre = request.json['nombre']
    cuit = request.json['cuit']
    matricula = request.json['matricula']
    especialidad = request.json['especialidad']
    hospital = request.json['hospital']
    correo = request.json['correo']
    password = request.json['password']

    new_med = Medico(nombre=nombre, 
                    cuit=cuit,
                    matricula=matricula,
                    especialidad=especialidad,
                    hospital=hospital,
                    correo=correo,
                    password=password)
    db.session.add(new_med)
    db.session.commit()

    return medico_schema.jsonify(new_med)


# Obtener todos los items de la cartilla
@app.route("/api/cartilla")
def get_cartilla():
    cartilla = Cartilla.query.all()
    # Serialize the queryset
    result = cartillas_schema.dump(cartilla)
    return jsonify(result)

# Cargar un item a la cartilla
@app.route('/api/cartilla', methods=['POST'])
def add_elem():
    nombre = request.json['nombre']
    direccion = request.json['direccion']
    tipo = request.json['tipo']
    telefono = request.json['telefono']

    is_element = switch_element(tipo)

    new_elem = Cartilla(nombre=nombre,
                    direccion=direccion,
                    is_element=is_element,
                    telefono=telefono)

    db.session.add(new_elem)
    db.session.commit()

    return cartilla_schema.jsonify(new_elem)


if __name__ == "__main__":
    db.create_all()
    app.run(debug=True, port=5000)
