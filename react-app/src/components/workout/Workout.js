import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import Paper from '@material-ui/core/Paper';
import { useParams } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import PhotoArray from "../PhotoArray";


const useStyles = makeStyles((theme) => ({
    paper: {
        maxWidth: 750,
        margin: 'auto',

    },
    root: {
        maxWidth: 800,
        maxHeight: 600
    },
    media: {
        height: 0,
        paddingTop: '40%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

export default function Workout() {

    const classes = useStyles();
    const {userId, routeId } = useParams()
    const [userData, setuserData] = useState("")
    const [routeData, setrouteData] = useState("")
    const [workoutName, setworkoutName] = useState("")
    const [workoutDescription, setworkoutDescription] = useState("")
    const [workoutDuration, setworkoutDuration] = useState(0)

    useEffect(() => {
        async function getData() {
            const getUser = await fetch(`/api/users/${Number.parseInt(userId)}`)
            const getRoute = await fetch(`/api/routes/${Number.parseInt(routeId)}`)
            const user = await getUser.json()
            const route = await getRoute.json()
            setuserData(user)
            setrouteData(route)
        }
        getData();
    }, [])
    const updateProperty = (cb) => (e) => {
        cb(e.target.value)
    }
    const payloadPost = async() => {
        const payload = {
            user_id: userId,
            route_id: routeId,
            name: workoutName,
            workout_photos: null,
            description: workoutDescription,
            time: workoutDuration
        }
        const response = await fetch(`/api/workouts/custom`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        } )
        if (response.ok) {
            const result = await response.json();

            const userId = window.localStorage.getItem("currentUser")
            window.location.href=`/users/${userId}/myworkouts`

        }
    }


    return (
        <>
            <Typography variant="h3" component="h3" color="primary" align="center">Add Workout</Typography>
            <Paper className={classes.paper}>
                <Card className={classes.root}>
                    <CardHeader
                        avatar={
                            <Avatar
                                aria-label="recipe"
                            // src
                            >
                            </Avatar>
                        }

                        title={userData.username}

                    />
                    <Typography style={{ marginLeft: "1em" }} variant="h5" component="h5">{routeData.name}</Typography>

                    <Grid container>
                        <Grid item xs={3}
                            align="center">
                        </Grid>
                        <Grid item xs={3}>
                            <Typography variant="h6"
                                component="h6"
                                align="left"
                                style={{ color: "gray" }}
                            >Distance
              </Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography variant="h6"
                                component="h6"
                                align="left"
                                style={{ color: "gray" }}
                            >Elevation Gain
              </Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography variant="h6"
                                component="h6"
                                align="left"
                                style={{ color: "gray" }}
                            >EST_Time
              </Typography>

                        </Grid>
                        <Grid item xs={3} align="center">
                            {routeData.travelingMode == "BICYCLING" ?
                                <DirectionsBikeIcon fontSize="large"></DirectionsBikeIcon>
                                : <DirectionsWalkIcon fontSize="large"></DirectionsWalkIcon>}</Grid>
                        <Grid item xs={3}>
                            <Typography variant="h6"
                                component="h6"
                                align="left"
                            >{routeData.totalDistance}
                            </Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography variant="h6"
                                component="h6"
                                align="left"
                            >{routeData.totalElevation}
                            </Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography variant="h6"
                                component="h6"
                                align="left"
                            >{routeData.totalDuration}
                            </Typography>
                        </Grid>

                    </Grid>
                    <CardMedia
                        className={classes.media}
                        image={routeData.staticImageURL}
                    />
                    <CardContent>
                        <Typography variant="h6" color="textSecondary" component="h6">
                            About this Route: {routeData.description}
                        </Typography>
                    </CardContent>
                </Card>
                <Grid item xs={12} >
                    <Typography
                        variant="h6"
                        component="h6"
                        style={{ color: "gray" }}
                    ></Typography>

                    <TextField
                    className="textFieldWorkout"
                        variant="outlined"
                        validators={['required']}
                        required
                        // fullWidth
                        name="name"
                        label="Workout Name"
                        id="name"
                        value ={workoutName}
                        onChange={updateProperty(setworkoutName)}
                    />                <TextField
                    className="timeWorkout"
                    id="filled-number"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    label="Total Time in Minutes"
                    // variant="filled"
                    value={workoutDuration}
                    onChange={updateProperty(setworkoutDuration)}
                />
                </Grid>

                <Grid item xs={12}>
                    <Typography
                        variant="h6"
                        component="h6"
                        style={{ color: "gray" }}
                    ></Typography>
                    <TextField
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={8}
                        name="description"
                        label="Workout Description"
                        id="description"
                    value={workoutDescription}
                    onChange={updateProperty(setworkoutDescription)}
                    />
                </Grid>
                <PhotoArray></PhotoArray>
                <Button
                    style={{left:'85%'}}
                    variant="contained"
                    color="primary"
                    onClick={payloadPost}
                >Complete</Button>
            </Paper>
        </>
    );
}
