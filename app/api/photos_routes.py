from flask import Blueprint, jsonify, request
from flask_login import login_required
# from app.models import Photos
import boto3


from ..config import Config
from datetime import date

# need to import Photos from app.models when it is ready.

photos_routes = Blueprint('photos', __name__)


@photos_routes.route('/<int:id>', methods=['GET'])
def workoutPhotos(id):
    # returnPhotos = []
    # photos = Photos.query.filter(Photo.workout_id == id)
    # # print(routes)
    # # return user.to_dict()
    # for photo in photos:
    #     returnPhotos.append({
    #         "photoUrl": photoUrl,
    #     })
    # return jsonify(returnPhotos)

    photos = [
        'https://wsd-pfb-sparkinfluence.s3.amazonaws.com/uploads/2020/04/jennopedft.jpg',
        'https://d279m997dpfwgl.cloudfront.net/wp/2018/10/1002_cycling-1000x667.jpg',
        'https://cdn1.pegasaas.io/2e46/img/wp-content/uploads/2017/02/couple-bicycling.jpg',
        'https://assets.centralparknyc.org/media/images/_2475x1151_crop_center-center_none/Biking_IMG_0283.jpg?mtime=20200825154648&focal=50.87%25+60.97%25&tmtime=20201007133434',
        'https://brooklyneagle.com/wp-content/uploads/2020/05/PAGE-1-PHOTO-bicycling-1536x1024.jpg',
        'https://florencechamber.com/wp-content/uploads/2018/07/105_379_1505622308328__DSC0416fcc.jpg',
        'https://www.nps.gov/grca/planyourvisit/images/bicycle-photo-courtesy-of-Sarah-Neal.jpg?maxwidth=1200&maxheight=1200&autorotate=false',
        'https://ontariobiketrails.com/wp-content/uploads/2017/08/Thames-bike-trail_F.jpg'
    ]
    print("Returning photos")
    return jsonify(photos)


@photos_routes.route('/<int:id>', methods=['POST'])
def postPhoto(id):
    credentials = {
        'aws_access_key_id': Config.AWS_ACCESS_KEY_ID,
        'aws_secret_access_key': Config.AWS_SECRET_ACCESS_KEY
    }
    workoutId = id
    file = request.files['image']

    filename = file.filename
    newFilename = filename.replace(" ", "")

    print("New filename: ", newFilename)
    client = boto3.client('s3', 'us-east-2', **credentials)
    bucket = Config.S3_BUCKET
    key = '%s-%s' % (date.today(), newFilename)
    properties = {'ACL': 'public-read',
                  'Body': request.files['image'],
                  'Bucket': bucket,
                  'Key': key,
                  'ContentType': request.files['image'].mimetype}
    retVal = client.put_object(**properties)
    status = retVal['ResponseMetadata']['HTTPStatusCode']

    if (status != 200):
        return status
    else:
        photoUrl = 'https://cadence-aagroupproject.s3.us-east-2.amazonaws.com/%s' % (key)
        updatePhoto(photoUrl, workoutId)
        return 'ok'


def updatePhoto(photoUrl, workoutId):
    print("Adding photo " + photoUrl + " with workoutId: " + str(workoutId))

    # newPhoto = Photo(
    #     photoUrl=photoUrl
    #     workoutId=workoutId
    # )

    # db.session.add(newPhoto)
    # db.session.commit()
    # return 'ok'
