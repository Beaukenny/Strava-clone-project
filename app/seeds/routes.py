from app.models import db, Route


# Adds a demo user, you can add other routes here if you want
def seed_routes():
    route1 = Route(name='teahupoo',
                        userId=1,
                        description='Great route for a ride',
                        staticImageURL='http://maps.googleapis.com/maps/api/staticmap?size=600x300&zoom=15&markers=color:green|38.91113,-77.04122000000001&path=38.91113,-77.04122000000001|38.911120000000004,-77.03849000000001|38.91113,-77.03689|38.911120000000004,-77.03454|38.91004,-77.03455000000001|38.90793,-77.03456000000001|38.90766,-77.03531000000001|38.907740000000004,-77.03536000000001|38.90778,-77.03538|38.907790000000006,-77.03543&sensor=false&markers=color:red|38.907790000000006,-77.03543&key=AIzaSyDvvUchLC5a-dAif0IQmZu7yP7pvDSZI9c',
                        requestData="{'origin': {'lat': 38.911274095754415, 'lng': -77.04122014552644}, 'destination': {'lat': 38.908001479935045, 'lng': -77.03546948939851}, 'optimizeWaypoints': True, 'travelMode': 'BICYCLING'}",
                        starting_point="{'lat': 38.911274095754415, 'lng': -77.04122014552644}",
                        streetBike=False,
                        routeVisibility=True,
                        totalDistance="0.6 mi",
                        totalElevation="18.87ft",
                        totalDuration="4 mins",
                        travelingMode="BICYCLING"
                        )
    route2 = Route(name='hello my route',
                        userId=1,
                        description='Great route for a ride!',
                        staticImageURL="http://maps.googleapis.com/maps/api/staticmap?size=600x300&zoom=15&markers=color:green|38.91113,-77.04122000000001&path=38.91113,-77.04122000000001|38.911120000000004,-77.03849000000001|38.91113,-77.03689|38.911120000000004,-77.03454|38.91004,-77.03455000000001|38.90793,-77.03456000000001|38.90766,-77.03531000000001|38.907740000000004,-77.03536000000001|38.90778,-77.03538|38.907790000000006,-77.03543&sensor=false&markers=color:red|38.907790000000006,-77.03543&key=AIzaSyDvvUchLC5a-dAif0IQmZu7yP7pvDSZI9c",
                        requestData="{'origin': {'lat': 38.911274095754415, 'lng': -77.04122014552644}, 'destination': {'lat': 38.908001479935045, 'lng': -77.03546948939851}, 'optimizeWaypoints': True, 'travelMode': 'BICYCLING'}",
                        starting_point="{'lat': 38.911274095754415, 'lng': -77.04122014552644}",
                        streetBike=False,
                        routeVisibility=True,
                        totalDistance="0.6 mi",
                        totalElevation="18.87ft",
                        totalDuration="4 mins",
                        travelingMode="BICYCLING"
                        )
    route3 = Route(name='awesome route',
                        userId=2,
                        description='Great awesome Route!',
                        staticImageURL="http://maps.googleapis.com/maps/api/staticmap?size=600x300&zoom=15&markers=color:green|38.906200000000005,-77.04914000000001&path=38.906200000000005,-77.04914000000001|38.906200000000005,-77.0488|38.9063,-77.0488|38.90644,-77.0488|38.90643,-77.04803000000001|38.90643,-77.048|38.906130000000005,-77.04748000000001|38.905840000000005,-77.04699000000001|38.906220000000005,-77.04664000000001|38.90563,-77.04665|38.904610000000005,-77.04665|38.90375,-77.04664000000001|38.902640000000005,-77.04664000000001|38.902240000000006,-77.04664000000001|38.90155,-77.04665|38.90133,-77.04666|38.901210000000006,-77.04631|38.901030000000006,-77.0458|38.90072,-77.04491|38.900240000000004,-77.04358|38.90019,-77.04339|38.900110000000005,-77.04317&sensor=false&markers=color:red|38.900110000000005,-77.04317&key=AIzaSyDvvUchLC5a-dAif0IQmZu7yP7pvDSZI9c",
                        requestData="{'origin': {'lat': 38.90617587366615, 'lng': -77.04914517865922}, 'destination': {'lat': 38.90003080489828, 'lng': -77.04322286115433}, 'optimizeWaypoints': True, 'travelMode': 'BICYCLING'}",
                        starting_point="{'lat': 38.90617587366615, 'lng': -77.04914517865922}",
                        streetBike=True,
                        routeVisibility=True,
                        totalDistance="0.7 mi",
                        totalElevation="29.17 ft",
                        totalDuration="6 mins",
                        travelingMode="BICYCLING"
                        )
    route4 = Route(name='Central park walk',
                        userId=2,
                        description='Great route for a walk!',
                        staticImageURL="http://maps.googleapis.com/maps/api/staticmap?size=600x300&zoom=15&markers=color:green|40.765710000000006,-73.97615&path=40.765710000000006,-73.97615|40.7659,-73.97613000000001|40.76601,-73.97616000000001|40.76606,-73.97621000000001|40.76614,-73.97629|40.76619,-73.97641|40.7663,-73.97661000000001|40.766380000000005,-73.97673|40.76653,-73.97688000000001|40.766670000000005,-73.97696|40.76679,-73.97698000000001|40.76693,-73.97694|40.767120000000006,-73.97676000000001|40.76728000000001,-73.97645|40.767450000000004,-73.97626000000001|40.76756,-73.97616000000001|40.76769,-73.97609|40.767720000000004,-73.97618|40.76766000000001,-73.97622000000001|40.76753,-73.97631000000001|40.76746,-73.97638|40.767300000000006,-73.97658000000001|40.767250000000004,-73.97674|40.767230000000005,-73.97713|40.76728000000001,-73.97748|40.767500000000005,-73.97805000000001|40.76773,-73.97853|40.76765,-73.9786&sensor=false&markers=color:red|40.76765,-73.9786&key=AIzaSyDvvUchLC5a-dAif0IQmZu7yP7pvDSZI9c",
                        requestData="{'origin': {'lat': 40.76567614080248, 'lng': -73.97620371299149}, 'optimizeWaypoints': True, 'waypoints': [{'location': {'lat': 40.76723629031617, 'lng': -73.97641828971268}, 'stopover': False}], 'destination': {'lat': 40.767729749720814, 'lng': -73.97884119931172}, 'travelMode': 'WALKING'}",
                        starting_point="{'lat': 40.76567614080248, 'lng': -73.97620371299149}",
                        streetBike=False,
                        routeVisibility=True,
                        totalDistance="0.3 mi",
                        totalElevation="13.92ft",
                        totalDuration="7 mins",
                        travelingMode="WALKING"
                        )

    db.session.add(route1)
    db.session.add(route2)
    db.session.add(route3)
    db.session.add(route4)


    db.session.commit()


# Uses a raw SQL query to TRUNCATE the routes table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_routes():
    db.session.execute('TRUNCATE routes CASCADE;')
    db.session.commit()
