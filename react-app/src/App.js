import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import MapRoute from "./components/route/MapRoute";
import { authenticate } from "./services/auth";
import { CssBaseline } from "@material-ui/core";
import Theme from './Theme';
import Workout from './components/workout/Workout'
import Home from "./components/Home";
import Menuw from "./components/Menu";
import MyRoutes from "./components/myRoute/MyRoutes"
import Splash from './Splash';
import SearchResult from './components/routeSearch/SearchResult';
import MyWorkouts from "./components/myWorkout/MyWorkouts"
import WorkoutFeed from "./components/workout/WorkoutFeed"

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async() => {
      const user = await authenticate();
      if (!user.errors) {
        setAuthenticated(true);
        window.localStorage.setItem("currentUser",user.id)

      }
      
      setLoaded(true);
    })();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <CssBaseline>
    <Theme>
      
      <BrowserRouter>
      
        <NavBar setAuthenticated={setAuthenticated} />
        <Switch>
        <Route exact path="/sign-up" component={SignUpForm} />
        <Route exact path="/login" component={LoginForm} />

        <Route path='/' exact={true}>
          <Splash />
        </Route>

        <Route path="/login" exact={true}>
          <LoginForm authenticated={authenticated} setAuthenticated={setAuthenticated} />
        </Route>

        <Route path="/sign-up" exact={true}>
          <SignUpForm authenticated={authenticated} setAuthenticated={setAuthenticated} />
        </Route>

        <ProtectedRoute path="/users" exact={true} authenticated={authenticated}>
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId/route/create" exact={true}>
          <MapRoute />
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId/myroutes" exact={true}>
          <MyRoutes />
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId/myworkouts" exact={true}>
          <MyWorkouts />
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId/route/:routeId/workout/create" exact={true}>
          <Workout />
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true} authenticated={authenticated}>
          <User />
        </ProtectedRoute>
        <ProtectedRoute path="/workouts" exact={true} authenticated={authenticated}>
          <WorkoutFeed />
        </ProtectedRoute>

    {/* <ProtectedRoute path="/" exact={true} authenticated={authenticated}>
          <h1>My Home Page</h1>
        </ProtectedRoute> */}
        <ProtectedRoute path="/user-options" exact={true} authenticated={authenticated}>
          <div style={{ height: "fit-content", width: "fit-content", marginLeft: "60vw"}}>
            <Menuw />
          </div>
        </ProtectedRoute>

        <Route path="/search-result" exact={true}>
          <SearchResult/>
        </Route>
        </Switch>
      </BrowserRouter>
    </Theme>
    </CssBaseline>
  );
}

export default App;
