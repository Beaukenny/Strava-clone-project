from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Workout, db, Picture
import json
from ..config import Config
import boto3
from datetime import date

picture_routes = Blueprint('pictures', __name__)

@picture_routes.route('/')
@login_required
def pictures_by_workout():
    pictures = Picture.query.join(Workout).order_by(Picture.workout_id.desc()).all()

    return {"pictures": [picture.to_dict() for picture in pictures]}


@picture_routes.route('/all')
@login_required
def pictures_all():
    pictures = Picture.query.all()

    return {"pictures": [picture.to_dict() for picture in pictures]}

#
# new picture
#
#

@picture_routes.route('/<int:id>', methods=['GET'])
def workoutPictures(id):
    returnPictures = []
    Pictures = Picture.query.filter(Picture.workout_id == id)
    for picture in Pictures:
        returnPictures.append({
            "photoUrl": picture.url,
        })
    return jsonify(returnPictures)

@picture_routes.route('/<int:id>', methods=['POST'])
def postPhoto(id):
    #constants needed for AWS request
    credentials = {
        'aws_access_key_id': Config.AWS_ACCESS_KEY_ID,
        'aws_secret_access_key': Config.AWS_SECRET_ACCESS_KEY
    }
    region = Config.AWS_S3_REGION
    client = boto3.client('s3', region, **credentials)
    bucket = Config.S3_BUCKET
    workoutId = id

    #Now iterate through list and create S3 properties
    list = request.files.getlist('image')
    for i in list:
        filename = i.filename.replace(" ", "")
        key = '%s-%s' % (date.today(), filename)
        properties = { 'ACL': 'public-read',
                       'Body': i,
                       'Bucket': bucket,
                       'Key': key,
                       'ContentType': i.mimetype
        }
        retVal = client.put_object(**properties)
        status=retVal['ResponseMetadata']['HTTPStatusCode']

        if (status != 200):
            return status
        else:
            photoUrl = 'https://%s.s3-%s.amazonaws.com/%s' % (bucket, region, key)
            updatePicture(photoUrl, workoutId)
    return {"message": "ok"}




def updatePicture(photoUrl, workoutId):
    newPicture = Picture(
        url=photoUrl,
        workout_id =workoutId
    )

    db.session.add(newPicture)
    db.session.commit()
    return {"message": "ok"}
