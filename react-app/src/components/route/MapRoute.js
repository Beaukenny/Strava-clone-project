/*global google*/
import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, Marker } from "react-google-maps"
import { settingMarkers, getElevationData, staticMapImage } from "../routeUtil/utils"
import DirectionRender from "./DirectionRender"
import MyLocation from './Mylocation'
import Search from "./Search"
import Form from "./Form"
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';
import Chart from "./Chart"
import SideBar from "./SideBar"
const styles = makeStyles((theme) => ({
  paper: {
    maxWidth: 936,
    margin: 'auto',
    overflow: 'hidden',
  },
  searchBar: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
  },
  searchInput: {
    fontSize: theme.typography.fontSize,
  },
  block: {
    display: 'block',
  },
  addUser: {
    marginRight: theme.spacing(1),
  },
  contentWrapper: {
    margin: '40px 16px',
  },
}));


const Map = () => {
  const directionsService = new google.maps.DirectionsService();
  const elevation = new google.maps.ElevationService();
  const [defaultLocation, setDefaultLocation] = useState({ lat: 38.9072, lng: -77.0369 })
  const [markers, setMarkers] = useState([])


  //for form////////////////////////////////
  const [totalDistance, setTotalDistance] = useState('')
  const [totalElevation, setTotalElevation] = useState('')
  const [totalDuration, setTotalDuration] = useState('')
  const [travelingMode, setTravelingMode] = useState("BICYCLING")
  const [distanceData, setDistanceData] = useState('')
  const [elevationData, setElevationData] = useState('')
  const [staticImageURL, setStaticImageURL] = useState("")
  const [requestData, setRequestData] = useState("")
//////chart/////////////////////////////////////////////
  const [chartData , setChartData] = useState([
    {x:0, y:0},{x:5, y:0},{x:10, y:0}])
  //////////////////////////////////////////
  const classes = styles()
  const mapLocation = useCallback(({ lat, lng }) => {//memoize func
    setDefaultLocation({ lat, lng })
  }, [])

  const onMapClick = (event) => settingMarkers(event, markers, setMarkers, directionsService)

  const getElevations = async () => {
   await getElevationData(distanceData, elevation, setElevationData, setTotalElevation,totalDistance, setChartData)
  }

  // const createThisRoute = () => {
  //   staticMapImage(distanceData, setStaticImageURL)
  // }
  const clearData = () => {
    setMarkers([])
    setDistanceData('')
    setElevationData('')
    setTotalDistance('')
    setTotalElevation('')
    // setStaticImageURL('')
    setTotalDuration('')
    setChartData([
      ])
  }


  useEffect(() => {
    if (markers.length > 1) {
      getElevations()

    }
  }, [totalDistance])

  return (
    <>
        <Toolbar className="toolBar" >
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <SearchIcon className={classes.block} color="inherit" />
            </Grid>
            <Grid item xs>
              <Search mapLocation={mapLocation}></Search>
            </Grid>
            <Grid item>
              <MyLocation mapLocation={mapLocation}></MyLocation>
              <Tooltip title="Delete">
                <IconButton

                  onClick={clearData}>
                  <DeleteIcon className={classes.block} color="inherit" />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
        <Toolbar className="toolBar">
          <Grid container spacing={2} alignItems="center" style={{ justifyContent: "left"}}>
            <Typography component="h4" variant="h4" style={{ color: "gray", marginRight:"10%"  }}>Select Mode:</Typography>
            <IconButton
            style={{ marginRight:"10%"  }}
              onClick={() => { setTravelingMode("WALKING") }}>
              {travelingMode=="WALKING" ? <DirectionsWalkIcon
              color="primary"
              fontSize="large"></DirectionsWalkIcon> : <DirectionsWalkIcon
              fontSize="large"></DirectionsWalkIcon>}

            </IconButton>
            <IconButton
              onClick={() => { setTravelingMode("BICYCLING") }}>
                {travelingMode=="BICYCLING" ? <DirectionsBikeIcon
              color="primary"
              fontSize="large"></DirectionsBikeIcon> : <DirectionsBikeIcon
              fontSize="large"></DirectionsBikeIcon>}
            </IconButton>
          </Grid>
        </Toolbar>
    <Grid container className="gridContainer">
        <Grid container>
            <Grid item xs={4}>
              <Typography variant="h6"
                component="h6"
                align="center"
                style={{ color: "gray" }}
              >Distance
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h6"
                component="h6"
                align="center"
                style={{ color: "gray" }}
              >Elevation
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h6"
                component="h6"
                align="center"
                style={{ color: "gray" }}
              >Est. Moving Time
              </Typography>
            </Grid>
            {/* <Grid item xs={3}>
              <Typography variant="h6"
                component="h6"
                align="center"
                style={{ color: "gray" }}
              >
                Surface Type
              </Typography>
            </Grid> */}
            <Grid item xs={4}>
              <Typography variant="h6"
                component="h6"
                align="center"
              >{totalDistance}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h6"
                component="h6"
                align="center"
              >{totalElevation}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h6"
                component="h6"
                align="center"
              >{totalDuration}
              </Typography>
            </Grid>
            {/* <Grid item xs={3}>
              <Typography variant="h6"
                component="h6"
                align="center"
              >
                ???
              </Typography>
            </Grid> */}
        </Grid>

    </Grid>
    <Chart
    chartData={chartData}
    ></Chart>
    <Form
    totalDistance={totalDistance}
    totalElevation={totalElevation}
    totalDuration={totalDuration}
    travelingMode={travelingMode}
    requestData={requestData}
    elevationData={elevationData}
    staticImageURL={staticImageURL}
    ></Form>


{markers.length > 0 ? <SideBar origin={markers[0]}></SideBar> : null}
        <GoogleMap

          mapContainerStyle={{
            border: '5px solid red'
          }}
          defaultZoom={14}
          center={defaultLocation}
          onClick={onMapClick}
        >
          {markers.length == 1 ? <Marker
            position={{ lat: markers[0].lat, lng: markers[0].lng }}
            icon={{
              url: "https://cadenceappacademy.s3.amazonaws.com/purple-dot-1.png",
              scaledSize: new window.google.maps.Size(34, 34),
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(17, 17)
            }}
          ></Marker> : null}

          {markers.length > 0 ?
            <DirectionRender
              markers={markers}
              directionsService={directionsService}
              travelingMode={travelingMode}
              distanceData={distanceData}
              setDistanceData={setDistanceData}
              setTotalDistance={setTotalDistance}
              getElevations={getElevations}
              setTotalDuration={setTotalDuration}
              setStaticImageURL={setStaticImageURL}
              setRequestData={setRequestData}

            ></DirectionRender>
            : null}
        </GoogleMap>
        {/* <img src={staticImageURL}></img> */}

    </>
  )
}


const WrappedMap = withScriptjs(withGoogleMap(Map))
const MapRoute = () => {
  return (
    <>

      <div className="googleMap" style={{ width: '700px', height: '350px', margin: "auto" }}>
        <WrappedMap
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
          loadingElement={<div style={{ height: '100%' }} />}
          containerElement={<div style={{ height: "100%" }} />}
          mapElement={<div style={{ height: "100%" }} />}
        >
        </WrappedMap>
      </div>

    </>
  );
}

export default MapRoute
