import { formatMs } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRouteWithCoords } from '../../store/actions/routeSearch';
import { apiUrl } from '../../config';
import RouteCard from './RouteCard'
import Search from "./Searchbar"
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
const styles = makeStyles((theme) => ({
    paper: {
        maxWidth: 750,
        margin: 'auto',

    },
}));


const SearchResult = () => {
    // const dispatch = useDispatch();
    const classes = styles()

    const coordinates = useSelector((state) => state.search.coordinates)
    const [load, setLoad] = useState(false)
    const [data, setData] = useState("")
    useEffect(() => {
        async function getAllRoutes() {
            const result = await fetch(`${apiUrl}/routes`)
            let res = await result.json();
            setData(res)
            setLoad(!load)
        }
        if (!coordinates) {
            getAllRoutes();
        }

    }, [])
    if (!load) {
        return null
    }

    return (
        <>
            {/*     
            <button onClick={() => console.log(data.routes[0].staticImageURL)}>RES</button>
            <button onClick={() => console.log(coordinates)}>COORDINATES</button>
            <button onClick={() => console.log(data)}>data</button>
            <button onClick={() => console.log(load)}>load</button> */}
            <Typography variant="h3" component="h3" color="primary" align="center">Explore Routes:</Typography>
            <Tooltip title={<h2>Create a brand new route</h2>}>
                     <IconButton className="createRouteButtonInSearch">
                <AddBoxIcon className="createRouteButtonInSearch" fontSize="large" />
                </IconButton>
            </Tooltip>
       
            <Grid container>
                <Grid item xs={12} align="center" >
                    <DirectionsWalkIcon fontSize="large" style={{ color: "gray", marginBottom: '5pt', marginTop: '15pt', marginRight: '25pt' }}></DirectionsWalkIcon>
                    <DirectionsBikeIcon fontSize="large" style={{ color: "gray", marginBottom: '5pt', marginTop: '15pt', marginRight: '12.5pt', marginLeft: "12.5" }}></DirectionsBikeIcon>
                    <DirectionsRunIcon fontSize="large" style={{ color: "gray", marginBottom: '5pt', marginTop: '15pt', marginLeft: '25pt' }}></DirectionsRunIcon>
                    <Search></Search>
                </Grid>
            </Grid>

            <Paper className={classes.paper}>
                {data.routes.map(each =>

                    <RouteCard data={each}></RouteCard>



                )}


            </Paper>
        </>
    )
}


export default SearchResult;
