import React, {useState,useEffect, history} from 'react';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { Tabs, Tab, makeStyles, AppBar, Button, List, ListItem, ListItemText, ListItemAvatar, Grid, Menu, MenuItem, ListItemIcon, GridListTile, GridList, GridListTileBar, Avatar } from "@material-ui/core";
import { NavLink, useHistory, useLocation, useParams } from "react-router-dom";
import {logout} from "../../../services/auth"
import {apiUrl} from "../../../config"
const ShowLogoutNav = () => {
        // setOpen(!open);
    const { page } = useParams();
    // const { classes, value } = useState();
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
    
    const [isLoggedin, setIsLoggedin] = useState(false);
    const [selectedTab, setSelectedTab] = useState(indexToTabName[page]);
    const [authenticated, setAuthenticated] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [open, setOpen] = useState(false);
    const [avatarUrl, setAvatorUrl] = useState('')

    useEffect(()=> {

        const getAvatarUrl = async () => {
            const responce = await fetch(`/api/users/${window.localStorage.getItem("currentUser")}`)
            const parsedData = await responce.json()
            setAvatorUrl(parsedData.avatar_url)
        }
        getAvatarUrl()
    },[])


    const handleClick = () => {
        setOpen(!open);
    };

    const handleLogout = async () => {
        // handle logout here
        //? TODO *******
        await logout()
        window.localStorage.removeItem("currentUser")
        history.push('/');
    }

        return (
            <List >
                <ListItem button onClick={handleClick}>
                    <ListItemText primary={<Avatar  
                        src={!avatarUrl ? null : avatarUrl}
                        // className={classes.large}
                        />} />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    {/* <ListItem value={0} button onClick={() => history.push('/login')}>
                        <ListItemText primary="Log In" />
                    </ListItem>
                    <ListItem value={1} button onClick={() => history.push('/sign-up')}>
                        <ListItemText primary="Sign Up" />
                    </ListItem>
                    <ListItem value={2} button onClick={handleClick}>
                        <ListItemText primary="Demo" />
                    </ListItem> */}
                    <ListItem value={3} button onClick={handleLogout}>
                        <ListItemText primary="Log Out" />
                    </ListItem>
                </Collapse>
            </List>
        )
}

export default ShowLogoutNav;