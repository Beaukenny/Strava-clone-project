import React, {useState, history} from 'react';
import { 
    Tabs, 
    Tab,
    Avatar, 
    makeStyles, 
    // AppBar, 
    // Button, 
    // List, 
    // ListItem, 
    // ListItemText, 
    // ListItemAvatar, 
    // Grid, 
    // Menu, 
    // MenuItem, 
    // ListItemIcon 
} from "@material-ui/core";
import {logout} from "../../../services/auth"

import { useHistory, useLocation, useParams } from "react-router-dom";

import AllInclusiveIcon from '@material-ui/icons/AllInclusive';
// import CadenceLogo;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  indicator: {
        backgroundColor: 'primary',
    },
}));


const LoggedOutTabNav = () => {

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
    const history = useHistory()


    // const useStyles = theme => ({
    //     indicator: {
    //         backgroundColor: 'primary',
    //     },
    // })
    const classes = useStyles();



    const handleChange = (event, newValue) => {
        setSelectedTab(newValue);
        // event.target.indicatorColor = "primary";
    }
    

//history.push('/workouts'
  return (
    <>
        <Tabs indicatorColor={'primary'} value={selectedTab} onChange={handleChange}>
            <Tab value={0} onClick={() => history.push('/')}
                // label={ <img className={classes.large} style={{maxHeight: "3em", maxWidth: "3em"}} src='CadenceLogo.png'/>}>
                label={ <img className={classes.large} style={{maxHeight: "3em", maxWidth: "3em"}} src='/CadenceLogo.png'/>}>

                
            </Tab>

        </Tabs>
    </>
  )}

  export default LoggedOutTabNav;