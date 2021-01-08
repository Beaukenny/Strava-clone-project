import React,{useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';
import Tooltip from '@material-ui/core/Tooltip';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { useParams } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import { red } from '@material-ui/core/colors';
import PhotoArray from '../PhotoArray';

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
    block: {
        display: 'block',
      },
}));

export default function WorkoutDetail() {

    const classes = useStyles();
    const {workoutId,userId} = useParams()
    const [data, setDate] = useState('')
    const [workoutName, setworkoutName] = useState("")
    const [workoutDescription, setworkoutDescription] = useState("")
    const [workoutDuration, setworkoutDuration] = useState(0)
    const [editName, setEditName] = useState(false)
    const [editDescription, setDescription] = useState(false)
    const [editDuration, setEditDuration] = useState(false)
    const [deleteError, setDeleteError] = useState("")
    const [ableToEdit, setAbleToEdit] = useState(false)
    const [updated, setUpdated] = useState(false)
    const [ableToEditDetail, setAbleToEditDetail] = useState('')
    const [showButtons, setShowButtons] = useState(false)

    useEffect(()=> {
        const getData = async () => {
            const response = await fetch(`/api/workouts/${workoutId}`)
            const workoutData = await response.json()

            await setAbleToEdit(workoutData.host.id == userId)
            await setDate(workoutData)

        }

        getData()
    }, [])
    const updateProperty1 = (cb) => (e) => {
        if (ableToEdit) {
          setEditDuration(true)
        cb(e.target.value)
    }



    }
    const updateProperty2 = (cb) => (e) => {
if (ableToEdit) {
                setEditName(true)
        cb(e.target.value)
}


    }

    const handleCancelButton = () => {
        setShowButtons(false)
        setDescription(false)
        setEditName(false)
        setEditDuration(false)
    }


    const updateProperty3 = (cb) => (e) => {
        if (ableToEdit) {
            setDescription(true)
        cb(e.target.value)
    }
    }
    const deleteWorkout = async () => {

        const response = await fetch(`/api/workouts/${Number.parseInt(workoutId)}`,{
            method:"PUT",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify({userId:window.localStorage.getItem("currentUser")})
        })
        const jsonedData = await response.json()
        if (jsonedData.message == "notgood") {
            setDeleteError("You are not the owner of this workout.")
        } else {


        window.location.replace(`/users/${window.localStorage.getItem("currentUser")}/myworkouts`)
    }
  }

  const editWorkoutDetail = async () => {
      if (!workoutName) {

      }
      const payload = {
        workoutName: workoutName !== "" ? workoutName : data.name,
        workoutDescription : workoutDescription !== "" ? workoutDescription : data.description,
        workoutDuration : workoutDuration !== 0 ? Number(workoutDuration) : Number(data.time),
      }
      const tempPayload = {
          dataName:data.name,
          dataDescription:data.description,
          dataTime:data.time,
      }

    try {
      const response = await fetch(`/api/workouts/${Number.parseInt(workoutId)}/${window.localStorage.getItem("currentUser")}`,{
            method:"PUT",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify(payload)
        })
        if (response.ok) {
            const jsoned = await response.json()
            setUpdated(!updated)
            if (jsoned.message == "notgood") {
                setAbleToEditDetail("bad")
            } else {
                setAbleToEditDetail("good")
            }
        }
    } catch(e) {
        console.log("Error received from fetch workouts:  ", e)
    }

  }

  if (!data) {
    return null
  }

  return (
        <>
        <Typography variant="h3" component="h3" color="primary" align="center">Edit Workout Details:</Typography>

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
                action={
                    <>
                        <Tooltip title={deleteError ?<h2>{deleteError}</h2> :<h2>Delete</h2>}>
                        <IconButton
                        style={{top:'25pt'}}
                        onClick={()=>deleteWorkout()}
                        >
                            {deleteError ? <DeleteIcon style={{ color: red[500] }}/>: <DeleteIcon className={classes.block} color="inherit" />}
                        </IconButton></Tooltip>
                    </>


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
                    onClick={()=>{
                        if (ableToEdit) {
                            setEditDuration(true)
                            setShowButtons(true)
                        }}}
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
                        onClick={()=>{
                            if (ableToEdit) {
                                setEditName(true)
                            setShowButtons(true)

                            }

                        }
                        }
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
                        onClick={()=>{
                            if (ableToEdit) {
                                setDescription(true)
                            setShowButtons(true)

                            }}}
                        onChange={updateProperty3(setworkoutDescription)}

                    />


                </Grid>

                <PhotoArray workout_id={workoutId}></PhotoArray>
                {showButtons?<><Button
                variant="contained"
                color="primary"
                style={{left:'79%'}}
                    onClick={() =>{
                        editWorkoutDetail()
                        window.location.href =`/users/${userId}/myworkouts`
                    }}
                >Save</Button>
                                <Button
                variant="contained"
                style={{left:'79%', backgroundColor:"crimson", color:"white"}}

                onClick={handleCancelButton}
                >Cancel</Button></>:null}

        </Paper>

        </>
    );
}
