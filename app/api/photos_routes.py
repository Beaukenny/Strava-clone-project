from flask import Blueprint, jsonify, request
from flask_login import login_required
import boto3
from app.models import Workout, db, Picture
from ..config import Config
from datetime import date

photos_routes = Blueprint('photos', __name__)


