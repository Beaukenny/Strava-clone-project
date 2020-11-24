from app.models import db, User
from werkzeug.security import generate_password_hash


# Adds a demo user, you can add other users here if you want
def seed_users():

    demo = User(username='demo', email='demo@demo.com',
                hashed_password=generate_password_hash('appacademy'),
                avatar_url='www.google.com',
                biography='test bio')
    peter = User(username='peter', email='peter@peter.com',
                 hashed_password=generate_password_hash('appacademy'),
                 avatar_url='www.google.com',
                 biography='test bio')
    beau = User(username='beau', email='beau@beau.com',
                hashed_password=generate_password_hash('appacademy'),
                avatar_url='www.google.com',
                biography='test bio')
    mary = User(username='mary', email='mary@mary.com',
                hashed_password=generate_password_hash('appacademy'),
                avatar_url='www.google.com',
                biography='test bio')
    clay = User(username='clay', email='clay@clay.com',
                hashed_password=generate_password_hash('appacademy'),
                avatar_url='www.google.com',
                biography='test bio')

    db.session.add(demo)
    db.session.add(peter)
    db.session.add(beau)
    db.session.add(mary)
    db.session.add(clay)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_users():
    db.session.execute('TRUNCATE users;')
    # db.session.execute('TRUNCATE routes;')
    db.session.commit()
