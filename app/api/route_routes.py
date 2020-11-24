from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Route

route_routes = Blueprint('routes', __name__)


@route_routes.route('/')
@login_required
def routes():
    routes = Route.query.all()
    print(routes)
    return {"routes": [route.to_dict() for route in routes]}


@route_routes.route('/<int:id>')
@login_required
def route(id):
    route = Route.query.get(id)
    return route.to_dict()
