from app.models import db, User
from werkzeug.security import generate_password_hash


# Adds a demo user, you can add other users here if you want
def seed_users():

    demo = User(username='demo', email='demo@demo.com',
                hashed_password=generate_password_hash('appacademy'),
                avatar_url='https://robohash.org/f88b191fb5fba9f4336152df19333ac6?set=set4&bgset=&size=60x60',
                biography='As a demo user I enjoy both running and bicycling.')
    peter = User(username='peter', email='peter@peter.com',
                 hashed_password=generate_password_hash('appacademy'),
                 avatar_url='https://gravatar.com/avatar/940f83b834d4465ee760472db766b989?s=200&d=robohash&r=x',
                 biography='If it is outside then I love to do it!')
    beau = User(username='beau', email='beau@beau.com',
                hashed_password=generate_password_hash('appacademy'),
                avatar_url='https://robohash.org/98b2a37ef783928652213d9d68dcd04c?set=set4&bgset=&size=60x60',
                biography='Find a big hill to challenge me and I am all in!')
    mary = User(username='mary', email='mary@mary.com',
                hashed_password=generate_password_hash('appacademy'),
                avatar_url='https://gravatar.com/avatar/7c5ed25886d2a6e06abe481b66350ed9?s=200&d=robohash&r=x',
                biography='Bicycling long distance is my thing.')
    clay = User(username='clay', email='clay@clay.com',
                hashed_password=generate_password_hash('appacademy'),
                avatar_url='https://gravatar.com/avatar/856fa1d2918845001f4c5be613ac3f68?s=200&d=robohash&r=x',
                biography='Anything bold and daring.  The faster the better!')

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
