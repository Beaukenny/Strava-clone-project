import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { apiUrl } from '../../config';
import RouteCard from './RouteCard'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Tooltip from '@material-ui/core/Tooltip';
import Paper from '@material-ui/core/Paper';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import usePlacesAutocomplete, { getGeocode, getLatLng, } from "use-places-autocomplete"
import { Redirect } from "react-router-dom"
const styles = makeStyles((theme) => ({
    paper: {
        maxWidth: 750,
        margin: 'auto',

    },
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
}));


const MyRoutes = () => {
    const classes = styles()
    const [load, setLoad] = useState(false)
    const [data2, setData] = useState("")

    useEffect(() => {
        async function getAllRoutes() {
            const result = await fetch(`${apiUrl}/routes`)
            let res = await result.json();
            setData(res)
            setLoad(!load)
        }
        // if (!coordinates) {
        //     getAllRoutes();
        // } else {
        //     getCertainRoutes(coordinates, setData, setLoad, load)
        // }
    }, [])



    return (
        <>
            <Typography variant="h3" component="h3" color="primary" align="center">Explore Routes:</Typography>
            <Tooltip title={<h2>My Routes:</h2>}>
                <IconButton className="createRouteButtonInSearch">
                    <AddBoxIcon className="createRouteButtonInSearch" fontSize="large" 
                    onClick={()=>window.location.replace(`/users/${window.localStorage.getItem("currentUser")}/route/create`)}
                    />
                </IconButton>
            </Tooltip>

            <Grid container>
                <Grid item xs={12} align="center" >
                    <DirectionsWalkIcon fontSize="large" style={{ color: "gray", marginBottom: '5pt', marginTop: '15pt', marginRight: '25pt' }}></DirectionsWalkIcon>
                    <DirectionsBikeIcon fontSize="large" style={{ color: "gray", marginBottom: '5pt', marginTop: '15pt', marginRight: '12.5pt', marginLeft: "12.5" }}></DirectionsBikeIcon>
                    <DirectionsRunIcon fontSize="large" style={{ color: "gray", marginBottom: '5pt', marginTop: '15pt', marginLeft: '25pt' }}></DirectionsRunIcon>

                </Grid>
            </Grid>
            <Paper className={classes.paper}>
                {data2.routes.length == 0 ? <h1>There is no Route</h1> : data2.routes.map(each =>
                    <RouteCard data={each}></RouteCard>
                )}

            </Paper>
        </>
    )
}


export default MyRoutes;
