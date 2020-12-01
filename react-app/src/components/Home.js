import React, { setState, useEffect, useState, history } from "react";
import { Tabs, Tab, makeStyles, AppBar, Button, List, ListItem, ListItemText, ListItemAvatar, Grid, Menu, MenuItem, ListItemIcon, GridListTile, GridList, GridListTileBar, Avatar } from "@material-ui/core";
// import LoginForm from "./auth/LoginForm";
// import UsersList from "./UsersList";
// import MapRoute from "./route/MapRoute";
// import App from "../App";
import { NavLink, useHistory, useLocation, useParams } from "react-router-dom";
// import User from "./User";
// import Search from "./route/Search";
// import MyLocation from "./route/Mylocation";
// import UserNav from "./UserNav";
// import SignUpForm from "./auth/SignUpForm";
// import CssBaseline from "@material-ui/core/CssBaseline"
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
// import AllInclusiveIcon from '@material-ui/icons/AllInclusive';
// import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
// import Menuw from "./Menu";
// import geolib from 'geolib';
import TabNav from "./Header/TabNav";
import { authenticate, logout } from "../services/auth";
import ShowLoginNav from "./Header/ShowLoginNav";
import ShowLogoutNav from "./Header/ShowLogoutNav";
import LoggedOutTabNav from "./Header/LoggedOutTabNav";

 const useStyles = makeStyles((theme) => ({
        //   h2: {
        //       fontFamily: theme.fontFamily,
        //   },
        //   MuiGrid: {
        //       width: "80%"
        //   },
        //   MuiDialogActions: {
        //       justifyContent: "space-around"
        //   },
        //   img: {
        //       display: "block",
        //       width: "40%",
        //       marginLeft: "auto",
        //       marginRight: "auto"
        //   },
        //   root: {
        //       color: theme.primary,
        //       input: {
        //           textAlign: "center"
        //       },
        //       width: "100%",
        //       justifyContent: 'space-between'
        //   },
          indicator: {
            backgroundColor: theme.primary,
        }
        }));





const Home = () => {
    // const { match, classes, value, history } = props;
//     const useStyles = theme => ({
//         indicator: {
//             backgroundColor: 'primary',
//         },
//     })
//    const classes = useStyles();
    // const { params } = match;
    // const { page } = params;
    const { page } = useParams();
    // const { classes, value } = useState();
    // const history = useHistory()
    // const tabNameToIndex = {
    //     0: "home",
    //     1: "workouts",
    //     2: "routes",
    //     3: "explore",
    //     4: "user",
    // }

    // const indexToTabName = {
    //     home: 0,
    //     workouts: 1,
    //     routes: 2,
    //     explore: 3,
    //     user: 4,
    // }

    // const [isLoggedin, setIsLoggedin] = useState(false);
    // const [selectedTab, setSelectedTab] = useState(indexToTabName[page]);
    const [authenticated, setAuthenticated] = useState(false);
    // const [loaded, setLoaded] = useState(false);

    // useEffect(() => {
    //     (async() => {
    //     const user = await authenticate();
    //     if (!user.errors) {
    //         setAuthenticated(true);
    //     }
    //     setLoaded(true);
    //     })();
    // }, []);

    // if (!loaded) {
    //     return null;
    // }

    // const { classes } = props;
    // const { value } = props;

    // const [open, setOpen] = useState(false);

    // const handleClick = () => {
    //     setOpen(!open);
    // };

    // const changeBackground = (e) => {
    //     // e.preventDefault()
    //     e.target.style.backgroundColor = 'orange'
    //     // setTimeout(() => {e.target.style.backgroundColor = 'blue' }, 500)

    // }

    // const handleChange = (event, newValue) => {
    //     setSelectedTab(newValue);
    //     // event.target.indicatorColor = "primary";
    // }

    // const handleLogout = () => {
    //     // handle logout here
    //     //? TODO *******
    //     history.push('/');
    // }

    // const options = [{"key": 0, "value":"home"}, {"key": 1, "value": "workouts"}, {"key": 2, "value": "routes"}, {"key": 3, "value": "explore"}, {"key": 4, "value": "user"}];
    return (
        <div style={{marginTop: "10vh", marginLeft: "auto", marginRight: "auto", borderBottom: "2px solid lightGrey", display: "grid", position: "fixed block", width: "70vw", height: "100%", maxHeight: "10vh", top: "10vh"}}>
            <Grid style={{ border: "3px solid blue"}} justify={"center"} container xs={12}>
                <Grid item xs={10}  container justify={"center"} style={{ width: "1300px", border: "3px solid blue", minWidth: "600px", minHeight: "4em"}}>
                    <Grid item xs={8}>
                        {!authenticated ? <TabNav /> : <LoggedOutTabNav /> }
                    </Grid>
                </Grid>
                <Grid style={{ border: "2px solid orange"}} item xs={2} justify={'flex-end'} container >
                    <Grid item style={{ border: "0px solid cyan", position: "absolute", top: "8vh", zIndex: 100}} >
                        {!authenticated ? <ShowLoginNav /> : <ShowLogoutNav /> }
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
};

// LoginForm
// SignUpForm
// UsersList
// MapRoute
// User
export default Home;
