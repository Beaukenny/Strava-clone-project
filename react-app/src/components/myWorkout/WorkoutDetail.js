import React,{useState, useEffect} from 'react';
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
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { apiUrl } from '../../config';
import { useParams } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
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
    root: {
        maxWidth: 800,
        maxHeight: 600
    },
    media: {
        height: 0,
        paddingTop: '40%', // 16:9
    },
}));

export default function WorkoutDetail() {
    const classes = useStyles();
    const {workoutId} = useParams()
    const [data, setDate] = useState('')
    const [workoutName, setworkoutName] = useState("")
    const [workoutDescription, setworkoutDescription] = useState("")
    const [workoutDuration, setworkoutDuration] = useState(0)
    const [editName, setEditName] = useState(false)
    const [editDescription, setDescription] = useState(false)
    const [editDuration, setEditDuration] = useState(false)



    useEffect(()=> {
        const getData = async () => {
            const response = await fetch(`${apiUrl}/workouts/${workoutId}`)
            const workoutData = await response.json()
            console.log(workoutData)
            await setDate(workoutData)
            // const arrayDate = data.created_at.split("GMT")[0].split(",").join("").split(" ")
            // const date = [arrayDate[2], arrayDate[1], ",", arrayDate[3], "at", arrayDate[4]].join(" ")
            // console.log(date)
        }

        getData()
    }, [])
    const updateProperty1 = (cb) => (e) => {
        setEditName(!editName)
        cb(e.target.value)
    }
    const updateProperty2 = (cb) => (e) => {
        setDescription(!editDescription)
        cb(e.target.value)
    }
    const updateProperty3 = (cb) => (e) => {
        
        cb(e.target.value)
    }


    // [data.created_at.split("GMT")[0].split(",").join("").split(" ")[2], data.created_at.split("GMT")[0].split(",").join("").split(" ")[1], ",", data.created_at.split("GMT")[0].split(",").join("").split(" ")[3], "at",data.created_at.split("GMT")[0].split(",").join("").split(" ")[4]]



    if (!data) {
        return null
    }

    return (
        <>
        <Typography variant="h3" component="h3" color="primary" align="center">Workout Detail:</Typography>

        <Grid container>
            <Grid item xs={12} align="center" >
                <DirectionsWalkIcon fontSize="large" style={{ color: "gray", marginBottom: '5pt', marginTop: '15pt', marginRight: '25pt' }}></DirectionsWalkIcon>
                <DirectionsBikeIcon fontSize="large" style={{ color: "gray", marginBottom: '5pt', marginTop: '15pt', marginRight: '12.5pt', marginLeft: "12.5" }}></DirectionsBikeIcon>
                <DirectionsRunIcon fontSize="large" style={{ color: "gray", marginBottom: '5pt', marginTop: '15pt', marginLeft: '25pt' }}></DirectionsRunIcon>

            </Grid>
        </Grid>
        <Paper className={classes.paper}>



        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar
                    style={{width:'50pt', height:'50pt',}}
                        aria-label="recipe"
                        src={data.host.avatar_url ? data.host.avatar_url : null}
                    >
                    </Avatar>
                }
                title={data.host.username.toUpperCase()}
                subheader={[data.created_at.split("GMT")[0].split(",").join("").split(" ")[2], data.created_at.split("GMT")[0].split(",").join("").split(" ")[1], ",", data.created_at.split("GMT")[0].split(",").join("").split(" ")[3], "at",data.created_at.split("GMT")[0].split(",").join("").split(" ")[4]].join(" ")}
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
                        : <DirectionsWalkIcon fontSize="large"></DirectionsWalkIcon>}
                        </Grid>
            <Grid item xs={3}>
              <Typography variant="h6"
                component="h6"
                align="left"
              > 
              {data.route.totalDistance}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="h6"
                component="h6"
                align="left"
              >
                  {data.route.totalElevation}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="h6"
                component="h6"
                align="left"
              >
                  {/* {data.time} */}
                  <TextField
                    style={{width:'50pt', left:'35pt'}}
                    id="filled-number"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={editDuration ? workoutDuration :data.time}
                    onClick={()=>setEditDuration(true)}
                    onChange={updateProperty1(setworkoutDuration)}
                />
              </Typography>
            </Grid>

            </Grid>
            <CardMedia
                className={classes.media}
                image={data.route.staticImageURL}
            />
            <CardContent>
            </CardContent>
        </Card>
        <Grid item xs={12} >
                    <Typography
                        variant="h6"
                        component="h6"
                        style={{ color: "gray" }}
                    ></Typography>

                    <TextField
                        variant="outlined"
                        validators={['required']}
                        required
                        fullWidth
                        name="name"
                        id="name"
                        value ={editName ? workoutName :data.name}
                        onClick={()=>setEditName(true)}
                        onChange={updateProperty2(setworkoutName)}
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
                        rows={4}
                        name="description"
                        id="description"
                        value ={editDescription ? workoutDescription :data.description}
                        onClick={()=>setDescription(true)}
                        onChange={updateProperty3(setworkoutDescription)}
                    />
                </Grid>
        </Paper>
        </>
    );
}

