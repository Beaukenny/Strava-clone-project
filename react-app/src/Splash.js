import React from 'react';
import Button from '@material-ui/core/Button';
import { Grid, Typography } from '@material-ui/core';
import Searchbar from './components/routeSearch/Searchbar';
import Tooltip from '@material-ui/core/Tooltip';
import Toolbar from '@material-ui/core/Toolbar';
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';

const Splash = () => {

    return (
        <>
        <Grid
        container
        padding="20px"
        spacing={10}
        direction="column"
        justify="center"
        alignItems="center">
            <Grid item>
                <Typography component="h3" variant="h3" align="center" color="primary" style={{marginTop: "20px", fontWeight:"bold"}}>Welcome to Cadence</Typography>
                <Typography component="h5" variant="h5" align="center" color="primary" style={{marginTop: "20px", fontWeight:"bold"}}>...where you can set your own pace</Typography>
            </Grid>
            <Grid
            container
            spacing={10}
            direction="row"
            justify="center"
            alignItems="space-around"
            >
                <Grid item>
                    <Button variant='contained' color='primary' onClick={e => window.location.href='/sign-up'}>Signup</Button>
                </Grid>
                <Grid item>
                    <Button variant='contained' color='primary' onClick={e => window.location.href='/login'}>Login</Button>
                </Grid>
            </Grid>
            <Grid item>
            <Typography component="h6" variant="h6" align="center" style={{fontWeight:"bold"}}>Search for workout routes nearby, or enter a location to search for more routes:</Typography>

            </Grid>

        </Grid>       
        <Grid container>
        <Grid item xs={12} align="center" >
            <DirectionsWalkIcon fontSize="large" style={{marginBottom:'5pt' ,marginTop: '15pt', marginRight:'25pt'}}></DirectionsWalkIcon>
            <DirectionsBikeIcon fontSize="large" style={{marginBottom:'5pt' ,marginTop: '15pt',marginRight:'12.5pt', marginLeft:"12.5"}}></DirectionsBikeIcon>
            <DirectionsRunIcon fontSize="large" style={{marginBottom:'5pt' ,marginTop: '15pt',marginLeft:'25pt'}}></DirectionsRunIcon>

        </Grid>
        </Grid>

        <Toolbar className="splashToolBar">
            
          <Grid container spacing={2} alignItems="center">
            
            <Grid item xs align="center">
              <Searchbar className="splashSearchBar"></Searchbar>
            </Grid>
          </Grid>
        </Toolbar>
        </>
    )


}



export default Splash
