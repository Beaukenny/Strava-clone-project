/*global google*/
import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, Marker } from "react-google-maps"
import { settingMarkers, getElevationData, staticMapImage } from "../routeUtil/utils"
import DirectionRender from "./DirectionRender"
import MyLocation from './Mylocation'
import Search from "./Search"
const Map = () => {
  const directionsService = new google.maps.DirectionsService();
  const elevation = new google.maps.ElevationService();
  const [defaultLocation, setDefaultLocation] = useState({ lat: 38.9072, lng: -77.0369 })
  const [markers, setMarkers] = useState([])
  const [travelingMode, setTravelingMode] = useState("BICYCLING")
  const [distanceData, setDistanceData] = useState('')
  const [elevationData, setElevationData] = useState('')
  const [totalDistance, setTotalDistance] = useState('')
  const [totalElevation, setTotalElevation] = useState('')
  const [statisImageURL, setStaticImageURL] = useState("")
  const [totalDuration, setTotalDuration] = useState('')
  const mapLocation = useCallback(({lat, lng}) => {
    setDefaultLocation({lat,lng})
  },[])

  const onMapClick = (event) => settingMarkers(event, markers, setMarkers, directionsService)
  
  const getElevations = () => {
    getElevationData(distanceData,elevation, setElevationData, setTotalElevation)
  }

  const createThisRoute = () => {
    staticMapImage(distanceData,setStaticImageURL)
  }
  const clearData=()=>{
    setMarkers([])
    setDistanceData('')
setElevationData('')
setTotalDistance('')
setTotalElevation('')
setStaticImageURL('')
setTotalDuration('')
  }


useEffect(()=>{
  if(markers.length > 1) {
    getElevations()
    
  }
},[totalDistance])

  return (
    <> 
    <h1>total distance: {totalDistance}</h1>
    <h1>total elevation gain: {totalElevation} ft </h1>
  <h1>total duration : {totalDuration}</h1>
 <button onClick={createThisRoute}>Create this Route</button>
    <button
    onClick={()=>{setTravelingMode("BICYCLING")}}
    >switch mode to Bicycling</button>
    <button
    onClick={()=>{setTravelingMode("WALKING")}}
    > switch mode to Walking</button>
    
    <button onClick={()=>console.log(markers)}> console log marker</button>
    <button onClick={()=>console.log(distanceData)}> console log distance data</button>
    <button onClick={()=>console.log(elevationData)}>console log Elevation Data</button>
    <button onClick={clearData}>Clear Data</button>
    <Search mapLocation={mapLocation}></Search>
     <MyLocation mapLocation={mapLocation}></MyLocation> 
      <GoogleMap
        defaultZoom={14}
        center={defaultLocation}
        onClick={onMapClick}
      >
     {markers.length == 1? <Marker
      position={{lat:markers[0].lat, lng: markers[0].lng}}
      icon={{
        url: "/purple-dot.png",
        scaledSize: new window.google.maps.Size(34, 34),
        origin: new window.google.maps.Point(0,0),
        anchor: new window.google.maps.Point(17,17)
      }}
      ></Marker>:null}
  
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
        ></DirectionRender>
        :null}
      </GoogleMap>


      <img
      src={statisImageURL}
      ></img>
    </>
  )
}


const WrappedMap = withScriptjs(withGoogleMap(Map))
const MapRoute = () => {
  return (
    <>
      <h1>CREATE YOUR ROUTE</h1>
      <div style={{ width: '800px', height: '500px' }}>
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