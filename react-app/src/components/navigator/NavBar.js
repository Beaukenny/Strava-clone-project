import React, { useEffect, useState} from "react";
import { Grid } from "@material-ui/core";
import TabNav from "./Header/TabNav";
import ShowLoginNav from "./Header/ShowLoginNav";
import ShowLogoutNav from "./Header/ShowLogoutNav";
import LoggedOutTabNav from "./Header/LoggedOutTabNav";

const Home = () => {

    return (
        <div style={{ border: "0px dotted teal", marginTop: "10vh", marginLeft: "auto", marginRight: "auto", borderBottom: "2px solid lightGrey", display: "grid", position: "fixed block", width: "55vw", minWidth: "900px", height: "100%", maxHeight: "10vh", top: "10vh"}}>
            <Grid style={{ border: "0px solid blue"}} container xs={12}>
                    <Grid item xs={10} l={10} container justify={"flex-start"} style={{ border: "0px solid yellow", minWidth: "500px", minHeight: "4em",}}>
                        {window.localStorage.getItem("currentUser") ? <TabNav /> : <LoggedOutTabNav /> }
                    </Grid>
                    <Grid style={{ border: "0px solid orange"}} item xs={2} justify={'flex-end'} container >
                        <Grid item xs={1}style={{ border: "0px solid cyan", position: "absolute", top: "8vh", zIndex: 100}} >
                            {!window.localStorage.getItem("currentUser") ? <ShowLoginNav /> : <ShowLogoutNav /> }
                        </Grid>
                    </Grid>
                </Grid>
            </div>
    )
};
export default Home;