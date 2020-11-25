# Cadence Project

The Cadence Project is a limited feature clone of the Strava app.  This clone will provide the user with the ability to create workout routes using google maps, save these routes to their own private feed or make these workout routes available to the general public.  These routes will provide the user with data such as elevation changes, distances, estimated time to complete (either by walking or biking), as well as route segment information (such as 1 mile from road marker 92 to Hwy 13), and route sheets with turn-by-turn information for the reference to use during their workouts.

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
4. Allow users with no login account to view publicly posted routes, as well as their corresponding route details, segment information and route sheets.

## User Interaction Flow Chart

The following is a flow-chart with the flow of user interaction with the web pages:

![Flowchart Image](/docs/images/WebPage-Flow.png)
Format: ![Flowchart Image](url)

## Wireframes

The entry page for the website will allow the user to either signup, login, or search for a route for their workout.  The user may further refine their route search by selecting one of the icons: runner, bicyclist, mountain biker.

![Splash Page](/doc/images/1-SplashPage.png)


Once a search has been initiated the user will be taken to the search results page, showing a condensed synopsis of the routes that match the search.  The routes will be indicated as bicycling, mountain biking, or running based upon the icons to the left of the route information, along with the route poster's avatar.  Additional route summary information is included with distance, elevation, and time, a small image of the route and any photos the route poster may have included.

![Explore Routes](/doc/images/2-ExploreRoutes.png)


If a user wishes to view more details about the route, the user may select the details button for the route.  Details such as the route description, additional photos, segments and route sheet will be provided on this screen.


![Route Details](/doc/images/3-RouteDetails.png)


This concludes the limited functionality for users without accounts.  The following details require the user to have signed up and be logged in to access.

On the Route Details page, the user can add the route to their workouts.  This places the route information and map thumbnail on their workouts page, with a status of pending.  This status remains in place until the user has completed their workout, refers back to the workout page and completes the workout by editing the pending workout with their workout time, any workout description and any photos they may have.  This update is performed on the following "Edit Route Details" page.

![Edit Route Details](/doc/images/5-EditRouteDetails.png)

Once route details have been edited and saved, this route is updated on the user's workout page to show that the route has been completed.  (The pending flag is removed, and the "view details" button is enabled).

Refering the reader back to the Explore Routes page, there is an option to create a new route.  This option refers the user over to the Create Route page as shown below.  On this page, the user is able to either enter a location to start their route, and begin mapping out a new route from scratch ... or, by entering that location, all routes available to the public within 25 miles of that starting location will be shown with the user's avatar and a brief summary of the route on the right-hand pane of the page.

At this time, the user may either create a brand new route, or load a pre-existing route into the route-editor window.

Note:  IF the user choses to edit a route, the user will have to "undo" the route to the point where the route will deviate from the original route.  Then the user will need to complete the route by laying additional turn points on the map and indicating when the point completes the route.

The following is a screen shot of this Create Route page:

![Create Route](/doc/images/6-CreateRoute.png)

Not to forget about the user login page, a Demo user has been provided for those who wish a sandbox to play with existing functionality.  Simply click on the Demo user button and you will be logged in.  Otherwise, enter your user email address and password if you have an account:

![Login Page](/doc/images/7-Login.png)

However, if the user does not have an account, there is a link on the Login Page to take the user to the Sign Up page where the user will be able to create a login account, indicate their avatar URL, and log in:

![Sign-Up.png](/doc/images/8-Sign-Up.png)
