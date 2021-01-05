import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
// import { deepPurple } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Grid from '@material-ui/core/Grid';
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Tooltip from '@material-ui/core/Tooltip';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 800,
        maxHeight: 600
    },
    media: {
        height: 0,
        paddingTop: '40%', // 16:9
    },
}));

export default function RouteCard({ data }) {
    const classes = useStyles();

    const arrayDate = data.created_at.split("GMT")[0].split(",").join("").split(" ")
    const date = [arrayDate[2], arrayDate[1], ",", arrayDate[3], "at", arrayDate[4]].join(" ")



    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar
                        aria-label="recipe"
                        src={data.host.avatar_url ? data.host.avatar_url : null}
                    >
                    </Avatar>
                }
                action={ <Tooltip title={<h2>Edit Detail</h2>}>
                    <Button
                    variant="contained"
                    color="primary"
                    style={{top:"2.5em"}}
                        onClick={() => window.location.replace(`/users/${window.localStorage.getItem("currentUser")}/workout/${data.id}`)}
                    >Edit Detail </Button></Tooltip>
                }
                title={data.host.username.toUpperCase()}
                subheader={date}
            />
            <Typography style={{marginLeft:"1em"}}variant="h5" component="h5">{data.name}</Typography>

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
              >Workout Minutes
              </Typography>
            </Grid>
            <Grid item xs={3} align="center">
                    {data.travelingMode == "BICYCLING" ?
                        <DirectionsBikeIcon fontSize="large"></DirectionsBikeIcon>
                        : <DirectionsWalkIcon fontSize="large"></DirectionsWalkIcon>}</Grid>
            <Grid item xs={3}>
              <Typography variant="h6"
                component="h6"
                align="left"
              >{data.route.totalDistance}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="h6"
                component="h6"
                align="left"
              >{data.route.totalElevation}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="h6"
                component="h6"
                align="left"
              >{data.time}
              </Typography>
            </Grid>

            </Grid>
            <CardMedia
                className={classes.media}
                image={data.route.staticImageURL}
            />
            <CardContent>
                {/* <Typography variant="h6" color="textSecondary" component="h6">
                    About this Route: {data.route.description}
        </Typography> */}
        <Typography variant="h6" color="textSecondary" component="h6">
                    Description: {data.description}
        </Typography>
            </CardContent>
        </Card>
    );
}
