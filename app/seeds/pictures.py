from app.models import db, Picture


# Adds a demo user, you can add other pictures here if you want
def seed_pictures():
    picture_1 = Picture(
                        workout_id=1,
                        url='https://www.pixelstalk.net/wp-content/uploads/2016/12/Central-Park-HD-Wallpaper.jpg',
                   )
    picture_2 = Picture(
                        workout_id=1,
                        url='https://images.adsttc.com/media/images/5bc8/ad1e/f197/cc6b/2200/03c7/large_jpg/04_Alternative-Central-Park-4.jpg?1539878166',
                   )
    picture_3 = Picture(
                        workout_id=1,
                        url='https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Central_Park_-_The_Pond_%2848377220157%29.jpg/1200px-Central_Park_-_The_Pond_%2848377220157%29.jpg',
                   )
    picture_4 = Picture(
                        workout_id=2,
                        url='http://www.parks.ca.gov/pages/417/images/wedding_rock.jpg',
                   )
    picture_5 = Picture(
                        workout_id=2,
                        url='https://www.visitcalifornia.com/sites/default/files/styles/welcome_image/public/VC_CoastalCamping_Module8_PatricksPoint_RM_643659404_1280x640.jpg',
                   )
    picture_6 = Picture(
                        workout_id=2,
                        url='https://i2.wp.com/rvplusyou.com/kb/wp-content/uploads/2017/02/Patricks-Point-6.jpg?ssl=1',
                   )

    db.session.add(picture_1)
    db.session.add(picture_2)
    db.session.add(picture_3)
    db.session.add(picture_4)
    db.session.add(picture_5)
    db.session.add(picture_6)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the pictures table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_pictures():
    db.session.execute('TRUNCATE pictures CASCADE;')
    db.session.commit()
