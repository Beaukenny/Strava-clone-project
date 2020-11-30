import React, {useState, history } from 'react';
import { 
    Tabs, 
    Tab, 
    // makeStyles, 
    // AppBar, 
    // Button, 
    List, 
    ListItem, 
    ListItemText, 
    // ListItemAvatar, 
    // Grid, 
    // Menu, 
    // MenuItem, 
    // ListItemIcon 
} from "@material-ui/core";

import { useHistory } from "react-router-dom";

import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import AllInclusiveIcon from '@material-ui/icons/AllInclusive';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';


const UserNav = () => {
    const history = useHistory()
    const useStyles = theme => ({
        indicator: {
            backgroundColor: 'primary',
        },
    })

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
    
    const { page } = useParams();
    
    const [selectedTab, setSelectedTab] = useState(indexToTabName[page]);
    const [open, setOpen] = useState(false);
    
    const classes = useStyles();

    const handleChange = (event, newValue) => {
        setSelectedTab(newValue);
        // event.target.indicatorColor = "primary";
    }

    const handleClick = () => {
        setOpen(!open);
    };
    
    return (
        <div>
            <List>
                <ListItem button onClick={handleClick}>
                    {/* <ListItemAvatar /> */}
                    {/* <ListItemIcon /> */}
                    <ListItemText primary={<EmojiEmotionsIcon/>} />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit >
                    <ListItem button onClick={handleClick}>
                        <ListItemText primary="Profile" />
                    </ListItem>
                    <ListItem button onClick={() => history.push('/login')}>
                        <ListItemText primary="Create Route" />
                    </ListItem>
                    <ListItem button onClick={() => history.push('/sign-up')}>
                        <ListItemText primary="Create Workout" />
                    </ListItem>
                    <ListItem button onClick={handleLogout}>
                        <ListItemText primary="Log Out" />
                    </ListItem>
                </Collapse>
            </List>
        </div>
    )
}

  export default UserNav;




