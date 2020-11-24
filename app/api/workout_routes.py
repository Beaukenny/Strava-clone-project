from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Workout

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
