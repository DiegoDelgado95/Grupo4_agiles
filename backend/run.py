# run.py

import os

from app import create_app

config_name = "development" # lo comun es usar os.getenv('FLASK_CONFIG') y usamos una variable de entorno
                            # por ahora lo hardcodeo porque estamos en dev
app = create_app(config_name)


if __name__ == '__main__':
    app.run()
