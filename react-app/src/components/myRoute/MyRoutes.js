import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import {useParams } from "react-router-dom"
import RouteCard from "./RouteCard"

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
    const [data, setData] = useState([])
    const {userId} = useParams()
    useEffect(() => {
        async function getAllRoutes() {
            const result = await fetch(`/api/routes/myroutes`, {
                method: "put",
                headers:{"Content-Type":"application/json"},
                body: JSON.stringify({userId:userId})
            })
            const data = await result.json()
            setData(data.myRoutes)
        }
        getAllRoutes();
    }, [])

    return (
        <>
            <Typography variant="h3" component="h3" color="primary" align="center">My Routes:</Typography>
                    <Button style={{left:'70%'}} fontSize="large" color="primary" variant="contained"
                    onClick={()=>window.location.replace(`/users/${window.localStorage.getItem("currentUser")}/route/create`)}
                    >Create Route</Button>

            <Grid container>
                <Grid item xs={12} align="center" >
                    <DirectionsWalkIcon fontSize="large" style={{ color: "gray", marginBottom: '5pt', marginTop: '15pt', marginRight: '25pt' }}></DirectionsWalkIcon>
                    <DirectionsBikeIcon fontSize="large" style={{ color: "gray", marginBottom: '5pt', marginTop: '15pt', marginRight: '12.5pt', marginLeft: "12.5" }}></DirectionsBikeIcon>
                    <DirectionsRunIcon fontSize="large" style={{ color: "gray", marginBottom: '5pt', marginTop: '15pt', marginLeft: '25pt' }}></DirectionsRunIcon>

                </Grid>
            </Grid>
            <Paper className={classes.paper}>
                {data.length == 0 ? <h1>There is no Route</h1> : data.map(each =>
                    <RouteCard data={each}></RouteCard>
                )}
            </Paper>
        </>
    )
}


export default MyRoutes;
