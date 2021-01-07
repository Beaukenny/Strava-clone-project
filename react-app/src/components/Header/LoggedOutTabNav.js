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

const LoggedOutTabNav = () => {

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
        <Tabs style={{border: '4px solid cyan', display: 'grid', position: 'relative', width: '70vw'}} indicatorColor={'primary'} value={selectedTab} onChange={handleChange}>
            <Tab justifySelf='flex-start' value={0} onClick={() => history.push('/')}
                style={{border: '4px solid orange'}}
                label={ <img className={classes.large} style={{maxHeight: "3em", maxWidth: "3em"}} src='favicon-copy.png'/>}
            >
            </Tab>
            {/* <Tab value={1} onClick={() => history.push('/workouts')}
                label="Workouts" />
            <Tab value={2} onClick={() => history.push('/routes')}
            label="Routes" />
            <Tab value={3} onClick={() => history.push('/')}
            label="explore" /> */}
        </Tabs>
    </>
  )}

  export default LoggedOutTabNav;