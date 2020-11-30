from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Route, db, User
import json


route_routes = Blueprint('routes', __name__)


@route_routes.route('/')
# @login_required
def routes():
    routes = Route.query.join(User).order_by(Route.totalDistance.desc()).all()
    # print([route.to_dict() for route in routes])
    # print(jsonify(routes))
    # return jsonify(routes=routes)
    # print(type({"routes": [route.to_dict() for route in routes]}))
    return {"routes": [route.to_dict() for route in routes]}


@route_routes.route('/myroutes', methods=["PUT"])
# @login_required
def myRoutes():
    userId = request.json["userId"]
    myRoutes = Route.query.join(User).filter(User.id == userId).all()
    # print([route.to_dict() for route in routes])
    # print(jsonify(routes))
    # return jsonify(routes=routes)
    # print(type({"routes": [route.to_dict() for route in routes]}))
    return {"myRoutes": [route.to_dict() for route in myRoutes]}
    # print(myRoutes)
    # return {"myroutes":"asdf"}


@route_routes.route('/<int:id>')
# @login_required
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
# @login_required
def add_custom_route():
    data = request.json
    print("hi")
    # errors = []
    route_data = data['name']
    custom_route = Route(
        name=data['name'],
        description=data['description'],
        userId=data['userId'],
        staticImageURL=str(data['staticImageURL']),
        requestData=str(data['requestData']),
        starting_point=str(data['starting_point']),
        streetBike=data['streetBike'],
        routeVisibility=data['routeVisibility'],
        totalDistance=data['totalDistance'],
        totalElevation=data['totalElevation'],
        totalDuration=data['totalDuration'],
        travelingMode=data['travelingMode']
    )

    # print(data)
    # print(str(data["staticImageURL"]))
    # print(custom_route.to_dict())

    # if errors:
    #     return jsonify(errors)
    db.session.add(custom_route)
    db.session.commit()
    # return jsonify(data)
    return {"message": "ok"}
