// import React, {useState, history} from 'react';
// import { 
//     Tabs, 
//     Tab,
//     Avatar, 
//     makeStyles, 
//     // AppBar, 
//     // Button, 
//     // List, 
//     // ListItem, 
//     // ListItemText, 
//     // ListItemAvatar, 
//     // Grid, 
//     // Menu, 
//     // MenuItem, 
//     // ListItemIcon 
// } from "@material-ui/core";

// import { Grid } from "@material-ui/core";

// import { useHistory, useLocation, useParams } from "react-router-dom";
// import Logo from "./Logo"
// import AllInclusiveIcon from '@material-ui/icons/AllInclusive';
// // import CadenceLogo;
// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: 'flex',
//     '& > *': {
//       margin: theme.spacing(1),
//     },
//   },
//   small: {
//     width: theme.spacing(3),
//     height: theme.spacing(3),
//   },
//   large: {
//     width: theme.spacing(7),
//     height: theme.spacing(7),
//   },
//   indicator: {
//         backgroundColor: 'primary',
//     },
// }));


// const MobilNav = () => {

//     const tabNameToIndex = {
//         0: "Feeds",
//         1: "workouts",
//         2: "routes",
//         3: "explore",
//         4: "user",
//     }

//     const indexToTabName = {
//         feeds: 0,
//         workouts: 1,
//         routes: 2,
//         explore: 3,
//         user: 4,
//     }
//     const { page } = useParams();

//     const [selectedTab, setSelectedTab] = useState(indexToTabName[page]);
//     const history = useHistory()
//     const [image , setImage] = useState(`https://cadenceappacademy.s3.amazonaws.com/CadenceLogo.png`)

//     // const useStyles = theme => ({
//     //     indicator: {
//     //         backgroundColor: 'primary',
//     //     },
//     // })
//     const classes = useStyles();



//     const handleChange = (event, newValue) => {
//         setSelectedTab(newValue);
//         // event.target.indicatorColor = "primary";
//     }
//     // if ((window.location.href).endsWith("create")){

    
//   return (
//         <Grid container style={{marginLeft:"5%"}} indicatorColor={'primary'} value={selectedTab} onChange={handleChange}>
//             <Grid style={{ marginRight: "4em"}} value={0} onClick={() => history.push('/workouts')}
//                 label={ <img className={classes.large} style={{maxHeight: "3em", maxWidth: "3em"}} src={image}/>
//                         }>
//             </Grid>
//             <Grid item value={0} onClick={() => history.push(`/workouts`)}
//                 label="Home" />
//             <Grid item value={1} onClick={() => history.push(`/users/${window.localStorage.getItem("currentUser")}/myworkouts`)}
//                 label="Workouts" />
//             <Grid item value={2} onClick={() => history.push(`/users/${window.localStorage.getItem("currentUser")}/myroutes`)}
//             label="Routes" />
//             <Grid item value={3} onClick={() => history.push('/search-result')}
//             label="explore" />
//         </Grid>
//   )}
// //   else {
// //     return(
// //     <Grid container>
// //         <Tabs indicatorColor={'primary'} value={selectedTab} onChange={handleChange}>
// //             <Tab style={{ marginRight: "4em"}} value={0} onClick={() => history.push('/workouts')}
// //                 label={ <img className={classes.large} style={{maxHeight: "3em", maxWidth: "3em"}} src={image}/>
// //                         }>
// //             </Tab>
// //             {/* <Tab value={0} onClick={() => history.push(`/workouts`)}
// //                 label="Home" /> */}
// //             <Tab value={1} onClick={() => history.push(`/users/${window.localStorage.getItem("currentUser")}/myworkouts`)}
// //                 label="Workouts" />
// //             <Tab value={2} onClick={() => history.push(`/users/${window.localStorage.getItem("currentUser")}/myroutes`)}
// //             label="Routes" />
// //             <Tab value={3} onClick={() => history.push('/search-result')}
// //             label="explore" />
// //         </Tabs>
// //     </Grid>)
// //   }
// // }
//   export default MobilNav;