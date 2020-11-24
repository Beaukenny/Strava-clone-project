from app.models import db, Route


# Adds a demo user, you can add other routes here if you want
def seed_routes():
    ocean_route = Route(name='teahupoo',
                        host_id=1,
                        route_preview='https://stabmag.com/' +
                        'assets/post-hero-banners/' +
                        '_resampled/ScaleWidthWyIxMjAwIl0-953-11.jpg',
                        route_data='(x,y) (x1,y1) (x2,y2) (x3,y3)',
                        starting_point='(-17.849853667231837,' +
                        '-149.2628610730593)',
                        offroad=False)
    peak_traverse = Route(name='twin peaks',
                          host_id=2,
                          route_preview='https://cdn-assets.alltrails.com' +
                          '/static-map/production/at-map/18276524/trail-us-' +
                          'utah-broads-fork-twin-peaks-at-map-18276524-' +
                          '1537887906-1200x630-3-6.jpg',
                          route_data='(x,y) (x1,y1) (x2,y2) (x3,y3)',
                          starting_point='(40.59585630965814,' +
                                        '-111.72104022708582)',
                          offroad=False)

    db.session.add(ocean_route)
    db.session.add(peak_traverse)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the routes table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_routes():
    db.session.execute('TRUNCATE routes;')
    db.session.commit()
