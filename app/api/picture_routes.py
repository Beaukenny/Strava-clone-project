from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Workout, db, Picture
import json
from ..config import Config
import boto3
from datetime import date

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

    # photos = [
    #     'https://wsd-pfb-sparkinfluence.s3.amazonaws.com/uploads/2020/04/jennopedft.jpg',
    #     'https://d279m997dpfwgl.cloudfront.net/wp/2018/10/1002_cycling-1000x667.jpg',
    #     'https://cdn1.pegasaas.io/2e46/img/wp-content/uploads/2017/02/couple-bicycling.jpg',
    #     'https://assets.centralparknyc.org/media/images/_2475x1151_crop_center-center_none/Biking_IMG_0283.jpg?mtime=20200825154648&focal=50.87%25+60.97%25&tmtime=20201007133434',
    #     'https://brooklyneagle.com/wp-content/uploads/2020/05/PAGE-1-PHOTO-bicycling-1536x1024.jpg',
    #     'https://florencechamber.com/wp-content/uploads/2018/07/105_379_1505622308328__DSC0416fcc.jpg',
    #     'https://www.nps.gov/grca/planyourvisit/images/bicycle-photo-courtesy-of-Sarah-Neal.jpg?maxwidth=1200&maxheight=1200&autorotate=false',
    #     'https://ontariobiketrails.com/wp-content/uploads/2017/08/Thames-bike-trail_F.jpg'
    # ]
    # print("Returning photos")
    # return jsonify(photos)


@picture_routes.route('/<int:id>', methods=['POST'])
def postPhoto(id):
    print("***************************Credentials*****************************")
    print("  Request files looks like: ", request.files)

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
        print("i looks like:  ", i)
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
        print("Returned status is:  ", status)
        if (status != 200):
            return status
        else:
            photoUrl = 'https://%s.s3-%s.amazonaws.com/%s' % (bucket, region, key)
            print('New workout ', id,  ': photoUrl: ', photoUrl)
            updatePicture(photoUrl, workoutId)
    return {"message": "ok"}




def updatePicture(photoUrl, workoutId):
    print("Adding photo " + photoUrl + " with workoutId: " + str(workoutId))

    newPicture = Picture(
        url=photoUrl,
        workout_id =workoutId
    )

    db.session.add(newPicture)
    db.session.commit()
    return 'ok'
