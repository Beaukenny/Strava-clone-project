from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Route
import json
import requests

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


@route_routes.route('/custom', methods=['POST'])
@login_required
def add_custom_route():
    data = request.json
    errors = []
    route_preview = data['route_preview']
    route_data = json.dumps(data['route_data'])
    custom_route = Event(
        name=data['name'],
        host_id=data['host_id'],
        route_preview=f'{route_preview}',
        route_data=f'{route_data}',
        starting_point=data['starting_point'],
        offroad=data['offroad'],
    )
    if errors:
        return jsonify(errors)
    db.session.add(custom_route)
    db.session.commit()
    return jsonify(data)
