from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Route, db
import json


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


@route_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_route(id):
    data = request.json
    route = Route.query.get(data['id'])
    db.session.delete(route)
    db.session.commit()
    return "Deleted."


@route_routes.route('/custom', methods=['POST'])
@login_required
def add_custom_route():
    data = request.json
    print(data)
    errors = []
    route_preview = data['route_preview']
    route_data = data['route_data']
    custom_route = Route(
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
