import React, {useState} from 'react';
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

    // const tabNameToIndex = {
    //     0: "Feeds",
    //     1: "workouts",
    //     2: "routes",
    //     3: "explore",
    //     4: "user",
    // }

    const indexToTabName = {
        feeds: 0,
        workouts: 1,
        routes: 2,
        explore: 3,
        user: 4,
    }
    const { page } = useParams();

    const [selectedTab, setSelectedTab] = useState(indexToTabName[page]);
    const history = useHistory()
    const [image , setImage] = useState(`https://cadenceappacademy.s3.amazonaws.com/CadenceLogo.png`)

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
    if ((window.location.href).endsWith("create")){


  return (
    <>
        <Tabs style={{marginLeft:"5%"}} indicatorColor={'primary'} value={selectedTab} onChange={handleChange}>
            {/* <Tab style={{ marginRight: "4em"}} value={0} onClick={() => history.push('/workouts')}
                label={ <img className={classes.large} style={{maxHeight: "3em", maxWidth: "3em"}} src={image}/>
                        }>
            </Tab> */}
            <Tab value={0} onClick={() => history.push(`/workouts`)}
                label="Home" />
            <Tab value={1} onClick={() => history.push(`/users/${window.localStorage.getItem("currentUser")}/myworkouts`)}
                label="Workouts" />
            <Tab value={2} onClick={() => history.push(`/users/${window.localStorage.getItem("currentUser")}/myroutes`)}
            label="Routes" />
            <Tab value={3} onClick={() => history.push('/search-result')}
            label="explore" />
        </Tabs>
    </>
  )}else {
    return(
    <>
    <Tabs style={{ display: 'grid', position: 'relative', width: '80vw'}} indicatorColor={'primary'} value={selectedTab} onChange={handleChange}>
        <Tab style={{ position: 'absolute', left: '5vw' }} value={0} onClick={() => history.push('/workouts')}
            label={ <img className={classes.large} style={{maxHeight: "3em", maxWidth: "3em"}} src={image}/>
                    }>
        </Tab>
        {/* <Tab value={0} onClick={() => history.push(`/workouts`)}
            label="Home" /> */}
        <Tab style={{ left: '20vw', position: 'absolute'}}  value={1} onClick={() => history.push(`/users/${window.localStorage.getItem("currentUser")}/myworkouts`)}
            label="Workouts" />
        <Tab style={{ left: '30vw' , position: 'absolute'}}  value={2} onClick={() => history.push(`/users/${window.localStorage.getItem("currentUser")}/myroutes`)}
        label="Routes" />
        <Tab style={{ left: '40vw', position: 'absolute'}} value={3} onClick={() => history.push('/search-result')}
        label="explore" />
    </Tabs>
</>)
  }
}
  export default TabNav;
