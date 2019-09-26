from flask import request
from sqlalchemy.exc import IntegrityError
from models import User, Orden
from schemas import UserSchema, OrdenSchema

user_schema = UserSchema()
users_schema = UserSchema(many=True)
orden_schema = OrdenSchema()
ordenes_schema = OrdenSchema(many=True) # Se puede usar only=("id", "content") para aclarar que atributos queremos

@app.route("/users")
def get_users():
    users = User.query.all()
    # Serialize the queryset
    result = user_schema.dump(users)
    return {"users": result}


@app.route("/users/<int:pk>")
def get_user(pk):
    try:
        user = User.query.get(pk)
    except IntegrityError:
        return {"message": "User could not be found."}, 400
    user_result = user_schema.dump(user)
    ordenes_result = ordenes_schema.dump(user.ordenes.all())
    return {"user": user_result, "ordenes": ordenes_result}


@app.route("/ordenes/", methods=["GET"])
def get_ordenes():
    ordenes = Orden.query.all()
    result = ordenes_schema.dump(ordenes, many=True)
    return {"ordenes": result}


@app.route("/ordenes/<int:pk>")
def get_orden(pk):
    try:
        orden = Orden.query.get(pk)
    except IntegrityError:
        return {"message": "orden could not be found."}, 400
    result = orden_schema.dump(orden)
    return {"orden": result}


@app.route("/users/", methods=["POST"])
def new_user():
    json_data = request.get_json()
    if not json_data:
        return {"message": "No input data provided"}, 400
    # Validate and deserialize input
    try:
        data = user_schema.load(json_data)
    except ValidationError as err:
        return err.messages, 422
    first_name, last_name = data["user"]["first_name"], data["user"]["last_name"]
    #Aca lo que se hace es una busqueda en la tabla users para ver si existe el usuario que nos llego por POST
    #Usamos el nombre y apellido para buscarlo, pero se podria usar otra cosa mas unica
    user = User.query.filter_by(first_name=first_name, last_name=last_name).first()
    #Si no lo encuentra, lo crea y lo añade a la db
    if user is None:
        user = User(first_name=first_name, last_name=last_name) # -> aca irian todos los datos del usuario, no solo su nu nombre
        db.session.add(user)
        db.session.commit()

    result = user_schema.dump(User.query.get(user.id))
    return {"message": "Nuevo usuario registrado.", "usuario": result}

    # Create new orden
    #orden = Orden(
    #    Contenido de la orden:
    # ej: content=data["content"], author=author, posted_at=datetime.datetime.utcnow()
    #)
    #db.session.add(orden)
    #db.session.commit()