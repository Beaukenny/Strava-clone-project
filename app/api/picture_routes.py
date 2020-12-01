from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Workout, db, Picture
import json


picture_routes = Blueprint('pictures', __name__)


@picture_routes.route('/')
# @login_required
def pictures_by_workout():
    pictures = Picture.query.join(Workout).order_by(Picture.workout_id.desc()).all()

    return {"pictures": [picture.to_dict() for picture in pictures]}


@picture_routes.route('/all')
# @login_required
def pictures_all():
    pictures = Picture.query.all()

    return {"pictures": [picture.to_dict() for picture in pictures]}
