import os
from flask import Flask, render_template, request, session, redirect
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_login import LoginManager

from .models import db, User
from .api.user_routes import user_routes
from .api.auth_routes import auth_routes
from .api.route_routes import route_routes
from .api.workout_routes import workout_routes
from .api.picture_routes import picture_routes
from .seeds import seed_commands

from .config import Config

app = Flask(__name__)

# Setup login manager
login = LoginManager(app)
login.login_view = 'auth.unauthorized'


@login.user_loader
def load_user(id):
    return User.query.get(int(id))


# Tell flask about our seed commands
app.cli.add_command(seed_commands)
# app.config['CORS_HEADERS'] = 'Content-Type'
app.config.from_object(Config)
app.register_blueprint(user_routes, url_prefix='/api/users')
app.register_blueprint(auth_routes, url_prefix='/api/auth')
app.register_blueprint(route_routes, url_prefix='/api/routes')
app.register_blueprint(workout_routes, url_prefix='/api/workouts')
app.register_blueprint(picture_routes, url_prefix='/api/pictures')
db.init_app(app)
Migrate(app, db)

# Application Security
CORS(app)
# CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})


@app.before_request
def redirect_https():
    if os.environ.get('FLASK_ENV') == 'production':
        print(request.url)
        if request.headers.get("X-Forwarded-Proto") == "http":
            url = request.url.replace('http://', 'https://', 1)
            code = 301
            return redirect(url, code=code)


@app.after_request
def inject_csrf_token(response):
    response.set_cookie('csrf_token',
                        generate_csrf(),
                        secure=True if os.environ.get(
                            'FLASK_ENV') == 'production' else False,
                        samesite='Strict' if os.environ.get(
                            'FLASK_ENV') == 'production' else None,
                        httponly=True)
    return response


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    print("path", path)
    if path == 'favicon.ico':
        return app.send_static_file('favicon.ico')
    if path == 'CadenceLogo.png':
        return app.send_static_file('CadenceLogo.png')
    if path == 'purple-dot.png':
        return app.send_static_file('purple-dot.png')
    return app.send_static_file('index.html')
