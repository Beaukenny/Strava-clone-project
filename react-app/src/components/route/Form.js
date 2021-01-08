import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { Button } from '@material-ui/core';
import { useParams, Redirect, useHistory } from 'react-router-dom';


const Form = (
    { totalDistance,
        totalElevation,
        totalDuration,
        travelingMode,
        requestData,
        elevationData,
        staticImageURL
         }
) => {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [streetBike, setStreetBike] = useState(false)
    const [routeVisibility, setRouteVisibility] = useState(true)
    const history = useHistory()

let {userId} = useParams()
userId =  Number.parseInt(userId);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const payload ={
            name,
            userId,
            description,
            streetBike,
            routeVisibility,
            totalDistance,
            totalElevation,
            totalDuration,
            travelingMode,
            requestData,
            staticImageURL,
            starting_point: {lat:requestData.origin.lat, lng:requestData.origin.lng}

        }

        const response = await fetch(`/api/routes/custom`, {
            method: "POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(payload)
        })
        if (response.ok) {
            const data = await response.json()
            const userId = window.localStorage.getItem("currentUser")
            history.push(`/workouts`)

        }

    }

    const updateProperty = (callback) => (e) => {
        callback(e.target.value);
    };

    const handleRedirect = () => {
        return <Redirect to='/' />
    }

    return (
        <>
            <form onSubmit={handleFormSubmit}
             className="formContainer">
                <Grid container spacing={2} justify="center">
                    <Grid item xs={12} sm={8}>
                        <Typography
                            variant="h6"
                            component="h6"
                            style={{ color: "gray" }}
                        >Route name (required) </Typography>

                        <TextField
                            variant="outlined"
                            validators={['required']}
                            required
                            fullWidth
                            name="name"
                            label=""
                            id="name"
                            value={name}
                            onChange={updateProperty(setName)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <Typography
                            variant="h6"
                            component="h6"
                            style={{ color: "gray" }}
                        >Description </Typography>
                        <TextField
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={8}
                            name="description"
                            label="Add some notes about route"
                            id="description"
                            value={description}
                            onChange={updateProperty(setDescription)}
                        />
                    </Grid>

                    <Grid item xs={12} sm={8}>
                        <Typography
                            variant="h6"
                            component="h6"
                            style={{ color: "gray" }}
                        >Street bike friendly? </Typography>
                        <FormControlLabel
                            control={<Checkbox
                                name="streetBike"
                                value={streetBike}
                                color="primary"
                                onChange={() => setStreetBike(!streetBike)}
                            />}
                            label="Yes"
                        />
                    </Grid>
                    <FormControlLabel
                        control={<Switch
                            name="routeVisibility"
                            value={routeVisibility}
                            color="primary"
                            onChange={() => (setRouteVisibility(!routeVisibility))}
                        />}
                        label={!routeVisibility ? "Private" : "Public"}
                    />
                    <Grid item xs={12} sm={8} align="center">
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                        >Save to My Routes</Button></Grid>
                </Grid>

            </form>
        </>
    )
}


export default Form
