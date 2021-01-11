import React from "react";
// import {Date} from 'datetime'
import { Grid } from "@material-ui/core";
import TabNav from "./Header/TabNav";
import ShowLoginNav from "./Header/ShowLoginNav";
import ShowLogoutNav from "./Header/ShowLogoutNav";
import LoggedOutTabNav from "./Header/LoggedOutTabNav";


const Home = () => {
    // const [, setForceUpdate] = useState(Date.now());

    // const { page } = useParams();
    // const indexToTabName = {
    //     home: 0,
    //     workouts: 1,
    //     routes: 2,
    //     explore: 3,
    //     user: 4,
    // }

    // const [open, setOpen] = useState(false);

    // const handleClick = () => {
    //     setOpen(!open);
    // };

    // const options = [{"key": 0, "value":"home"}, {"key": 1, "value": "workouts"}, {"key": 2, "value": "routes"}, {"key": 3, "value": "explore"}, {"key": 4, "value": "user"}];

    return (
        <div style={{ marginTop: "10vh", marginLeft: "auto", marginRight: "auto", borderBottom: "2px solid lightGrey", display: "grid", position: "fixed block", width: "70%", height: "100%", maxHeight: "10vh", top: "10vh"}}>
            <Grid style={{ border: "0px solid blue"}} container xs={12}>
                    <Grid item xs={10} container justify={"flex-start"} style={{ minWidth: "600px", minHeight: "4em",}}>
                        {window.localStorage.getItem("currentUser") ? (<TabNav />) : (<LoggedOutTabNav />) }
                        {/* {window.localStorage.getItem("currentUser") ? (<TabNav />) : (<LoggedOutTabNav />) } */}
                    </Grid>
                    <Grid style={{ border: "0px solid orange"}} item xs={2} justify={'flex-end'} container >
                        <Grid item xs={12}style={{ border: "0px solid cyan", position: "absolute", top: "8vh", right: '15%', zIndex: 100}} >
                            {!window.localStorage.getItem("currentUser") ? <ShowLoginNav /> : <ShowLogoutNav /> }
                        </Grid>
                    </Grid>
                </Grid>
            </div>
    )
};
export default Home;
