from app.models import db, Workout
from sqlalchemy import func


# Adds a demo user, you can add other workouts here if you want
def seed_workouts():
    beach_workout = Workout(name='teahupoo',
                            description='sample description for workout',
                            workout_photos='https://stabmag.com/',
                            time=10001,
                            workout_date=db.func.now(),
                            user_id=1,
                            route_id=1)
    peak_workout = Workout(name='twin peaks',
                           description='sample description for workout',
                           workout_photos='https://cdn-assets.alltrails.com' +
                           '/static-map/production/at-map/18276524/' +
                           'trail-us-utah-broads-fork-twin-' +
                           'peaks-at-map-18276524-1537887906' +
                           '-1200x630-3-6.jpg',
                           time=20002,
                           workout_date=db.func.now(),
                           user_id=1,
                           route_id=2)

    db.session.add(beach_workout)
    db.session.add(peak_workout)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the workouts table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_workouts():
    db.session.execute('TRUNCATE workouts CASCADE;')
    db.session.commit()
