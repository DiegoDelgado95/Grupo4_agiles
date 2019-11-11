# Grupo4_agiles
Repositorio del grupo 4 para la cátedra de Metodologías Ágiles 2019 UTN FRLP.

Instalar ambiente backend
- Instalar ubuntu (Windows Linux Subsystem) desde el Store de Windows 10.
- Dentro de Ubuntu, chequeamos que versión de python tenemos. Tendria que ser 3.6 o mayor. Sino instalarlo.

python3 –V
- Creamos un entorno virtual de Python

python3 –m venv nombredelentorno
- Eso nos va a crear una carpeta con el nombre que pusimos antes, para activar el entorno hacemos:

source nombredelentorno/bin/activate
- Ya dentro del entorno, clonamos el entorno (o vamos a la carpeta en donde lo teníamos si es que queremos seguir usando el anterior clonado)

git clone https://github.com/NAHUEALB/Grupo4_agiles.git
- Ya clonado el repo, vamos al directorio backend

cd Grupo4_agiles/backend
- Verificamos que la versión de pip sea la ultima

pip install --upgrade pip
- Instalamos las dependencias desde el archivo requirements.txt

pip install –r requirements.txt
- Chequear que haya instalado todo 
- Es posible que falte algún modulo porque el requirements.txt del master no esta 100% actualizado. Si llega a faltar algo lo vamos instalando a medida que nos diga que no encuentra un modulo. Por ejemplo el flask-cors.
- Instalamos flask-cors module

pip install flask-cors
- Declaramos unas variables de entorno

export FLASK_APP=app.py
export FLASK_ENV=development
- Ademas de esto, tenemos que instalar mysql, apache2 y phpmyadmin. (Se puede usar instalando xampp en Windows aunque apache2 va a ser necesario instalarlo sobre Ubuntu para hacer la configuración de apache para ver las imágenes de las ordenes).
- Si instalamos xampp es solo correr mysql, apache2 y abrir phpmyadmin.
- Dentro de phpmyadmin creamos un usuario ‘admin’ con contraseña ‘password’
- Vamos a agregar cuenta de usuario, y creamos el usuario. Cuando nos pregunte los privilegios, le otorgamos todos.
- Luego creamos la base de datos, en Base de datos -> nueva -> flask_app
- Ahora pasamos a crear las tablas, esto lo hacemos corriendo:

flask db init

flask db migrate

flask db upgrade
- Y corremos el backend

flask run

