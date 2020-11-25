from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Route

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {"users": [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


# ? GET USER'S ROUTES (TESTED BY CLAY)
@user_routes.route('/<int:id>/routes')
@login_required
def users_routes(id):
    # user = User.query.get(id)
    users_routes = []
    routes = Route.query.filter(Route.host_id == id)
    print(routes)
    # return user.to_dict()
    for route in routes:
        users_routes.append({
            "id": route.id,
            "name": route.name,
            "host": {
                "id": route.user.id,
                "username": route.user.username,
            },
            "route_preview": route.route_preview,
            "route_data": route.route_data,
            "distance": "put distance in model",
            "elevation": "put elevation in model",
            "est_time": "put est_time in model",
            "mode": "put mode in model",
            "starting_point": route.starting_point,
            "offroad": route.offroad,
        })
    return jsonify(users_routes)
    # return user_routes.to_dict()


@user_routes.route('/<int:id>/routes')
@login_required
def users_routes(id):
    # user = User.query.get(id)
    users_routes = []
    routes = Route.query.filter(Route.host_id == id)
    print(routes)
    # return user.to_dict()
    for route in routes:
        users_routes.append({
            "id": route.id,
            "name": route.name,
            "host": {
                "id": route.user.id,
                "username": route.user.username,
            },
            "route_preview": route.route_preview,
            "route_data": route.route_data,
            "distance": "put distance in model",
            "elevation": "put elevation in model",
            "est_time": "put est_time in model",
            "mode": "put mode in model",
            "starting_point": route.starting_point,
            "offroad": route.offroad,
        })
    return jsonify(users_routes)
    # return user_routes.to_dict()


@user_routes.route('/<int:id>/delete', methods=['DELETE'])
@login_required
def delete_user(id):
    data = request.json
    user = Workout.query.get(data['id'])
    db.session.delete(user)
    db.session.commit()
    return "Deleted."
