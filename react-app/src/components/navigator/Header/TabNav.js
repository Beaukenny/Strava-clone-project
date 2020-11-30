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


const TabNav = () => {

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
    
  return (
    <>
        <Tabs indicatorColor={'primary'} value={selectedTab} onChange={handleChange}>
            <Tab style={{ marginRight: "4em"}} value={0} onClick={() => history.push('/')}
                label={ <img className={classes.large} style={{maxHeight: "3em", maxWidth: "3em"}} src='favicon-copy.png'/>
                // <Avatar  
                //         src="/CadenceLogo.png"
                //         className={classes.large}
                //         />
                        }>
                    {/* <AllInclusiveIcon /> */}
            </Tab>
            <Tab value={1} onClick={() => history.push('/workouts')}
                label="Workouts" />
            <Tab value={2} onClick={() => history.push('/routes')}
            label="Routes" />
            <Tab value={3} onClick={() => history.push('/')}
            label="explore" />
        </Tabs>
    </>
  )}

  export default TabNav;