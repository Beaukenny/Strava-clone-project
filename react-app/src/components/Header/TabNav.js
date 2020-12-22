import React, {useState, history} from 'react';
import { 
    Tabs, 
    Tab,
    makeStyles,
} from "@material-ui/core";

import { useHistory, useParams } from "react-router-dom";

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
    const classes = useStyles();


    const handleChange = (event, newValue) => {
        setSelectedTab(newValue);
    }
    
  return (
    <>
        <Tabs style={{backgroundColor: "yellow", border: "0px dotted red", minWidth: "600px"}} indicatorColor={'primary'} value={selectedTab} onChange={handleChange}>
            <Tab style={{ marginRight: "4em"}}value={0} onClick={() => history.push('/')}
                label={ <img className={classes.large} style={{maxHeight: "3em", maxWidth: "3em"}} src='favicon-copy.png'/> }
            >
            </Tab>
            <Tab value={1} onClick={() => history.push('/workouts')}
                label="workouts" />
            <Tab value={2} onClick={() => history.push('/routes')}
            label="routes" />
            <Tab value={3} onClick={() => history.push('/')}
            label="explore" />
        </Tabs>
    </>
  )}

  export default TabNav;