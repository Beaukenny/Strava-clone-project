from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Workout, db

workout_routes = Blueprint('workouts', __name__)


@workout_routes.route('/')
def workouts():
    workouts = Workout.query.all()
    return {"workouts": [workout.to_dict() for workout in workouts]}


@workout_routes.route('/myworkout/<int:id>')
def myWorkout(id):
    workouts = Workout.query.filter(Workout.user_id == id).all()
    print(id)
    return {"workouts": [workout.to_dict() for workout in workouts]}
    # return {"message": "ok"}


@workout_routes.route('/<int:id>')
# @login_required
def workout(id):
    workout = Workout.query.get(id)
    return workout.to_dict()


@workout_routes.route('/<int:id>/<int:uId>', methods=['PUT'])
def edit_workout(id, uId):
    data = request.json
    # user_id = data["userId"]
    workout = Workout.query.filter(Workout.id == id).first()
    dictionary = workout.to_dict()
    if int(dictionary["user_id"]) == int(uId):
        workout.time = data["workoutDuration"]
        workout.description = data["workoutDescription"]
        workout.name = data["workoutName"]
        db.session.commit()
        return {"message":"ok"}
    else:
        return {"message":"notgood"}

@workout_routes.route('/<int:id>', methods=['PUT'])
def delete_workout(id):
    data = request.json
    print(id)
    userId = data["userId"]
    workout = Workout.query.filter(Workout.id == id).first()
    dictionary = workout.to_dict()
    if int(dictionary["user_id"]) == int(userId):
        db.session.delete(workout)
        db.session.commit()
        return {"message":"ok"}
    else:
        return {"message":"notgood"}



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
        # workout_date=data['workout_date'],
        user_id=data['user_id'],
        route_id=data['route_id'],
    )
    if errors:
        return jsonify(errors)
    db.session.add(custom_workout)
    db.session.commit()
    return jsonify(data)
