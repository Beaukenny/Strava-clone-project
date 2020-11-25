# Cadence Project

The Cadence Project is a limited feature clone of the Strava app.  This clone will provide the user with the ability to create workout routes using google maps, save these routes to their own private feed or make these workout routes available to the general public.  These routes will provide the user with data such as elevation changes, distances, estimated time to complete (either by walking or biking).

Additionally, the app will allow the user to upload the photos of the user's workout, as well as provide a description of the individual workouts along with the workout time.

## Technical Stack

The project runs a React/Redux front end, with a Python backend, utilising a postgres database and an S3 instance to store user photographs.

The project will be deployed on Heroku.

## Website MVP

The MVP for this website encompasses the following:

1. Workout Routes
   1. Ability to search google maps for a location.
   2. Mark the beginning of the route.
   3. Mark subsequent turns in the route
   4. Mark the ending of the route.
   5. Capture elevation changes for the route.
   6. Capture total distance for the route.
   7. Capture estimated time to either walk or bike the route, depending upon mode specified.
   8. Capture screenshots of the route.
   9. Ability to modify the route from any given point, then finish the route with new segments.
   10. Mark the route available to all users, or private.
   11. Indicate whether the route is road-bike safe.
2. Create a workout from a pre-existing route
   1. Choose a route from the pre-existing public routes available for that geo-code area (within 25 miles)
   2. Save the route as a workout.
   3. Update the workout with the user's workout time, workout photos, workout type (bicycling, running, mtn. biking, hiking).
   4. Upload photos taken during the workout.
3. View the logged in user's collection of all workouts, completed or pending.
4. Allow users with no login account to view publicly posted routes.

## User Interaction Flow Chart

The following is a flow-chart with the flow of user interaction with the web pages:

![User Interaction Flow Chart](/doc/images/WebPage-Flow.png)

## Wireframes

The entry page for the website will allow the user to either signup, login, or search for a route for their workout.  The user may further refine their route search by selecting one of the icons: runner, bicyclist, mountain biker.

![Splash Page](/doc/images/1-SplashPage.png)

Once a search has been initiated the user will be taken to the search results page, showing a condensed synopsis of the routes that match the search.  The routes will be indicated as bicycling, mountain biking, or running based upon the icons to the left of the route information, along with the route poster's avatar.  Additional route summary information is included with distance, elevation, and time, a small image of the route.

![Explore Routes](/doc/images/2-ExploreRoutes.png)

This concludes the limited functionality for users without accounts.  The following details require the user to have signed up and be logged in to access.

On the Explore routes page, the user has the option to create a brand new route, or add any of the routes shown to their workouts.  When added to the user's workouts, the status will show "Workout Pending" until the user completes the details of their workout, like adding a workout time, date, photos and description.  Once saved, that workout will be available for the user to view details in their workouts collection.

![Edit Workout Details](/doc/images/4b-EditWorkoutDetails.png)

Once route details have been edited and saved, this route is updated on the user's workout page to show that the route has been completed.  (The pending flag is removed, and the "view details" button is enabled).

![View Workouts](/doc/images/4a-WorkoutDetails.png)

Refering the reader back to the Explore Routes page, if the user does not find any routes to their liking, there is an option to create a new route.  This option refers the user over to the Create Route page as shown below.  On this page, the user is able to either enter a location to start their route, and begin mapping out a new route from scratch ... or, by entering that location, all routes available to the public within 25 miles of that starting location will be shown with the user's avatar and a brief summary of the route on the right-hand pane of the page.

At this time, the user may either create a brand new route, or load a pre-existing route into the route-editor window.

Note:  IF the user choses to edit a route, the user will have to "undo" the route to the point where the route will deviate from the original route.  Then the user will need to complete the route by laying additional turn points on the map and indicating when the point completes the route.

The following is a screen shot of this Create Route page:

![Create Route](/doc/images/5-CreateRoute.png)

Not to forget about the user login page, a Demo user has been provided for those who wish a sandbox to play with existing functionality.  Simply click on the Demo user button and you will be logged in.  Otherwise, enter your user email address and password if you have an account:

![Login Page](/doc/images/6-Login.png)

However, if the user does not have an account, there is a link on the Login Page to take the user to the Sign Up page where the user will be able to create a login account, indicate their avatar URL, and log in:

![Sign-Up.png](/doc/images/7-Sign-Up.png)

## Database Model

In order to facilitate the large amount of map related data, we chose to store a JSON object within the database for each route.  Turn-by-turn information are stored by segment tuples of {lat, lng} in an array.  This information is sufficient to load up a map, showing the route and route markers.

However, to be able to search efficiently for locations within a certain geo-location, we also included a row in the Routes table with the starting longitude and latitude.  A calculation is made of starting long/lat +- 25 miles to determine whether this route fits the search parameters.  Additional rows in the Route table provide more specific search information such as whether the route is suitable for road bikes.

Each user will have many Routes, but one route will belong to only one user.  When a user modifies a route, a new entry in the Route table will be made associating that user to the new route.

When a user creates a workout, the routeId is maintained in the workout,  A user may have many workouts - but workouts belong to only one user.

The following is a graphic representation of the database models.

![Database ERD](/doc/images/db-ERD.png)

## Google Maps API

The following API's were utilised from Google:

1. Google Map's DirectionsService -

   1. provides origin{lat, lng},
   2. destination{lat, lng},
   3. waypoints{lat, lng},
   4. travelMode used to fetch estimated timing information from the Google Map API.
2. Google Map's ElevationService
3. Uses an array of locations to fetch the elevation data of those locations.

## React/MDN API's Associated with Google Maps

1. use-places-autocomplete:  Provides autocompletion for search bar to enter location names to fetch in conjunction with their getGeocode method which provides a {lat,lng} when given a location's name to fetch (Such as {37.7749N, 122.4194W} in response to "San Francisco")
2. MDN's navigator.geolocation to get currentPosition from the browser in {lat, lng},
3. google map's DirectionsService - provide origin{lat, lng}, destination{lat, lng}, waypoints{lat, lng}, travleMode to fetch direction information from google map api. 2. google map's ElevationService - provide an array locations to fetch elevation data of those locations. 3. use-places-autocomplete's getGeocode - provide location's name to fetch {lat, lng}  4. use navigator.geolocation to get currentPosition in {lat, lng},

## Components Created for React

Components are broken into feature components with particular emphasis on reusing components either repeatedly across the same page, or with slight modifications (such as differing data) on alternate pages.

The signup page, and the login page are specific use components which will not include any aggregate components:

![Signup Page](/doc/images/Component-SignUp.png).

The Login Page Component:

![Login Page](/doc/images/Component-Login.png)

The splash screen utilises the search component, and NavBar component, so this component is very simplistic in nature:

![Splash screen component](/doc/images/Component-SplashScreen.png)

However, most of the pages contain additional components, such as the navbar component used across all pages:

![NavBar component](/doc/images/Component-NavBar.png)

And the search bar component used as a common component on multiple pages:

![SearchBar Component](/doc/images/Component-SearchBar.png)

The photo array will be used for many different workouts, and as such in itself will be a component:

![PhotoArray Component](/doc/images/Component-PhotoArray.png)

The Map component will be used multiple times on a page, and across multiple pages, which in itself begged to be componentized.  Notice only a couple of areas deviate on this component depending upon whether this component is being utilised on the Explore Routes page, or the Workouts Collection Page:

![Map Component](/doc/images/Component-Map.png)

The Create Route component is perhaps the most complex of the components, made up of both the sidebar component:

![Nearby Routes Sidebar](/doc/images/Component-NearbyRoutesSideBar.png)

The main component, our Google Maps component is wrapped in our customized Map component:

![Map Wrapper Component](/doc/images/Component-MapComponent.png)

And finally, the form included at the bottom of the form, our CreateRoute component:

![Create Route Component](/doc/images/Component-CreateRoute.png)

## API Endpoints

The API endpoints required to service the frontend requests are as follows:

[... tbd ...]
