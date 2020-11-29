import React, { setState, useEffect, useState, history } from "react";
import { Tabs, Tab, AppBar, Button, List, ListItem, ListItemText, ListItemAvatar, Grid, Menu, MenuItem } from "@material-ui/core";
import LoginForm from "./auth/LoginForm";
import UsersList from "./UsersList";
import MapRoute from "./route/MapRoute";
import App from "../App";
import { NavLink, useHistory, useLocation, useParams} from "react-router-dom";
import User from "./User";
import Search from "./route/Search";
import MyLocation from "./route/Mylocation";
import UserNav from "./UserNav";
import SignUpForm from "./auth/SignUpForm";
// import CssBaseline from "@material-ui/core/CssBaseline"
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import Menuw from "./Menu";
const Home = () => {
    // const { match, classes, value, history } = props;
    // const { params } = match;
    // const { page } = params;
    const { page } = useParams();
    const { classes, value } = useState();
    const history = useHistory()
    const tabNameToIndex = {
        0: "home",
        1: "workouts",
        2: "routes",
        3: "explore",
        4: "user",
    }

    const indexToTabName = {
        home: 0,
        workouts: 1,
        routes: 2,
        explore: 3,
        user: 4,
    }
    
    const [selectedTab, setSelectedTab] = useState(indexToTabName[page]);
    // const { classes } = props;
    // const { value } = props;

    const [open, setOpen] = useState(true);

    const handleClick = () => {
        setOpen(!open);
    };


    const showUserNav = () => {
        setOpen(!open);
        // return (
        //     <div style={{width: "100px", height: "100px", border: "1px solid orange", position: "absolute", left: "60%"}}>
        //         <List >
        //             <ListItem button onClick={handleClick}>
        //                 <ListItemText primary="PROFILE_PIC" />
        //                 {open ? <ExpandLess /> : <ExpandMore />}
        //             </ListItem>
        //             <Collapse in={open} timeout="auto" unmountOnExit>
        //                 <ListItem button onClick={() => history.push('/login')}>
        //                     <ListItemText primary="Log In" />
        //                 </ListItem>
        //                 <ListItem button onClick={() => history.push('/sign-up')}>
        //                     <ListItemText primary="Sign Up" />
        //                 </ListItem>
        //                 <ListItem button onClick={handleClick}>
        //                     <ListItemText primary="Demo" />
        //                 </ListItem>
        //                 <ListItem button onClick={handleLogout}>
        //                     <ListItemText primary="Log Out" />
        //                 </ListItem>
        //             </Collapse>
        //         </List>
        //     </div>
        // )
    }

    const handleChange = (event, newValue) => {
        setSelectedTab(newValue);
    }

    const handleLogout = () => {
        // handle logout here
        history.push('/');
    }

    return (
        <div style={{ maxWidth: "1000px", margin: "3em auto"}}>
            <div style={{borderBottom: "1px solid grey", display: "grid", position: "static", flexDirection: "row", width: "100%", maxHeight: "100px" }}>
                {/* <AppBar position="static"> */}
                {/* !!!!!!!!!! PUT LOGO HERE !!!!!!! */}
                {/* <div style={{ height: "5px", width: "5px", position: "relative", left: "10%", top: "2.5vh"}}>
                    <NavLink to="/" activeclass="active">
                        <AllInclusiveIcon />
                    </NavLink>
                </div> */}
                <div style={{ position: "relative", left: "-5vw", justifySelf: "center", width: "fit-content", height: "fit-content"}}>
                    <Tabs value={selectedTab} onChange={handleChange}>
                            <Tab onClick={() => history.push('/')}
                                label={<AllInclusiveIcon />}>
                                    {/* <AllInclusiveIcon /> */}
                                </Tab>
                            <Tab onClick={() => history.push('/workouts')}
                                label="Workouts" />
                            <Tab onClick={() => history.push('/routes')}
                            label="Routes" />
                            <Tab onClick={() => history.push('/explore')}
                            label="Explore" />
                            <Tab 
                            
                            onClick={() => history.push('/user-options')}
                            label={<EmojiEmotionsIcon/>}>
                                
                            </Tab>
                            {/* <Tab label="User"/> */}
                        {/* </div> */}
                        {/* <div style={{ width: "200px", border: "1px solid blue", display: "inline-block"}}> */}
                            {/* <Tabs value={3} onChange={handleChange}> */}
                            {/* </Tabs> */}
                    </Tabs>
                {/* <div style={{ alignSelf: "flex-start", borderRadius: "50%", position: "absolute", left: "60%", justifySelf: "flex-end", height: "50px", width: "fit-content", border: "1px solid blue"}}>
                    <List >
                        <ListItem button onClick={handleClick}>
                            <ListItemText primary="PROFILE_PIC" />
                            {open ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <ListItem button onClick={() => history.push('/login')}>
                                <ListItemText primary="Log In" />
                            </ListItem>
                            <ListItem button onClick={() => history.push('/sign-up')}>
                                <ListItemText primary="Sign Up" />
                            </ListItem>
                            <ListItem button onClick={handleClick}>
                                <ListItemText primary="Demo" />
                            </ListItem>
                            <ListItem button onClick={handleLogout}>
                                <ListItemText primary="Log Out" />
                            </ListItem>
                        </Collapse>
                    </List>
                </div> */}
                </div>
                {/* </AppBar> */}
            </div>
             
        </div>
    )
};

// LoginForm
// SignUpForm
// UsersList
// MapRoute
// User
export default Home;