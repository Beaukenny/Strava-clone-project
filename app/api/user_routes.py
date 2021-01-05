from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Route, Workout

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {"users": [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
# @login_required
def user(id):
    user = User.query.get(id)
    # print("userrrrrrrrrrrrrr")
    # print(user.to_dict()["avatar_url"])
    return user.to_dict()


# ? GET USER'S ROUTES (TESTED BY CLAY)
@user_routes.route('/<int:id>/routes')
@login_required
def users_routes(id):
    # user = User.query.get(id)
    users_routes = []
    routes = Route.query.filter(Route.host_id == id)
    # print(routes)
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


@user_routes.route('/<int:id>/workouts')
@login_required
def users_workouts(id):
    # user = User.query.get(id)
    users_workouts = []
    workouts = Workout.query.filter(Workout.user_id == id)
    if workouts:
        print("worked")
    # return users_workouts.to_dict()
    for workout in workouts:
        users_workouts.append({
            "id": workout.id,
            "name": workout.name,
            "host": {
                "id": workout.user.id,
                "username": workout.user.username,
                "email": workout.user.email,
                "biography": workout.user.biography,
                "avatar_url": workout.user.avatar_url,
            },
            "description": workout.description,
            "route": {
              "host_id": workout.route.host_id,
              "id": workout.route.id,
              "name": workout.route.name,
              "route_preview": workout.route.route_preview,
              "route_data": workout.route.route_data,
              "starting_point": workout.route.starting_point,
              "offroad": workout.route.offroad,
            },
            "route_data": workout.route.route_data,
            "distance": "put distance in model",
            "elevation": "put elevation in model",
            "est_time": "put est_time in model",
            "mode": "put mode in model",
            "starting_point": workout.route.starting_point,
            "offroad": workout.route.offroad,
        })
    return jsonify(users_workouts)
    # return user_workouts.to_dict()


@user_routes.route('/<int:id>/delete', methods=['DELETE'])
@login_required
def delete_user(id):
    data = request.json
    user = Workout.query.get(data['id'])
    db.session.delete(user)
    db.session.commit()
    return "Deleted."
