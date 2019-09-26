from marshmallow import Schema, fields, ValidationError, pre_load

class UserSchema(Schema):
    id = fields.Int(dump_only=True)
    email = fields.Str()
    username = fields.Str()
    first_name = fields.Str()
    last_name = fields.Str()
    formatted_name = fields.Method("format_name", dump_only=True)
    password_hash = fields.Str()
    nro_afiliado = fields.Int()
    is_admin = fields.Boolean()
    telefono = fields.Str()
    ciudad = fields.Str()
    estado_civil = fields.Str()
    direccion = fields.Str()

    def format_name(self, user):
        return "{}, {}".format(user.last_name, iser.first_name)


# Custom validator
def must_not_be_blank(data):
    if not data:
        raise ValidationError("Data not provided.")

class BytesField(fields.Field):
    def _validate(self, value):
        if type(value) is not bytes:
            raise ValidationError('Invalid input type.')

        if value is None or value == b'':
            raise ValidationError('Invalid value')

class OrdenSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str()
    data = BytesField(required=True)
    estado = fields.Str()
    tipo = fields.Str()
    afiliado = fields.Nested(UserSchema, validate=must_not_be_blank)
    fecha = fields.DateTime(dump_only=True)

    #Permite al cliente pasar el nombre completo del usuario en el body
    # e.g. {"user': 'Pepe Pepin"} antes que {"first_name": "Pepe", "last_name": "Pepin"}
    @pre_load
    def process_user(self, data, **kwargs):
        user_name = data.get("user")
        if user_name:
            first_name, last_name = user_name.split(" ")
            user_dict = dict(first_name=first_name, last_name=last_name)
        else:
            user_dict = {}
        data["user"] = user_dict
        return data
