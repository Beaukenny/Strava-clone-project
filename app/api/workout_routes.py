from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Workout, db

workout_routes = Blueprint('workouts', __name__)


@workout_routes.route('/')
@login_required
def workouts():
    workouts = Workout.query.all()
    return {"workouts": [workout.to_dict() for workout in workouts]}


@workout_routes.route('/<int:id>')
@login_required
def workout(id):
    workout = Workout.query.get(id)
    return workout.to_dict()


@workout_routes.route('/<int:id>/', methods=['DELETE'])
@login_required
def delete_workout(id):
    data = request.json
    workout = Workout.query.get(data['id'])
    db.session.delete(workout)
    db.session.commit()
    return "Deleted."


# @workout_routes.route('/workouts/update', methods=['PUT'])
# def update_workout():
#     data = request.json
#     workout = Workout.query.get(data['id'])
#     time = data['time']
#     db.session.commit()
#     return jsonify({
#         "workout.id": workout.id,
#         "workout.name": workout.name,
#         "workout.photos": workout.time
#     })


@workout_routes.route('/custom', methods=['POST'])
# @login_required
def add_custom_workout():
    data = request.json
    print(data)
    errors = []
    workout_photos = data['workout_photos']
    time = data['time']
    custom_workout = Workout(
        name=data['name'],
        description=data['description'],
        workout_photos=f'{workout_photos}',
        time=f'{time}',
        workout_date=data['workout_date'],
        user_id=data['user_id'],
        route_id=data['route_id'],
    )
    if errors:
        return jsonify(errors)
    db.session.add(custom_workout)
    db.session.commit()
    return jsonify(data)
