/*global google*/

import React, {useState, useCallback, useEffect, useRef} from 'react';
import {GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow, Polyline} from "react-google-maps"
import mapStyles from "./mapStyle"
import usePlacesAutocomplete, {getGeocode, getLatLng,} from "use-places-autocomplete"
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";

const options = {
  styles: mapStyles, // use style from https://snazzymaps.com/style/93/lost-in-the-desert
  disableDefaultUI: true, // disaple all the us
  zoomControl: true,
}

/* NOTE=================================== 11/23 12:19am
DONT FORGET TO NAME YOUR COMPONENT STARTING WITH CAPITAL LETTER!!!!!!!!!!!!!!!!!!!!!!!!!!!!

What this App can do:
1. draw a route for clients
2. get total distance/ expected duration / each segment / each elevation / elevation difference / distance difference/ clear data / (all using state)
using DirectionsService and ElevationService
3. can get any client's curren location using navigator geolocation and re map our map to their client.
4. can move our map to certain area that was searched using search bar using getGeocode. Search's functionalities are from use-places-autocomplete
5. can make infowindow on the marker so we can give some information about that place.


what to do :
-change the icon of the marker?
-is everyone cool with this style? or check out the https://snazzymaps.com/style/93/lost-in-the-desert to see more style.
-how to save all these information ? like how the object should be structured so we can simply save it in postgres through backend server and use it later
-how to apply the graph that Beau and Clay was talking about.
https://developers.google.com/maps/documentation/javascript/examples/elevation-paths#maps_elevation_paths-javascript

*/







function Map() {

  const [markers, setMarkers] = useState([])
  const [selected, setSelected] = useState(null)
  const [cyclingData, setCyclingData] = useState({distance:null, duration:null})
  const [cyclingElevationData, setCyclingElevationData] = useState({elevation:null})
  const [elevationDifference, setElevationDifference] = useState({elevation:null})
  const [segmentData, setSegmentData] = useState({distance:null, duration:null})
  const [currentLocation, setCurrentLocation] = useState({lat:null, lng:null})
  const directionsService = new google.maps.DirectionsService();

  // const visual = google.load("visualization", "1", { packages: ["columnchart"] });
  // new google.maps.DirectionsRenderer()

// let currentLocation = {lat:null, lng:null}
// useEffect(async () => {
// //   console.log(1)
// //  await navigator.geolocation.getCurrentPosition((position)=>{
// //   currentLocation.lat = position.coords.latitude
// //   currentLocation.lng = position.coords.longitude
// // }, ()=>null)

//   const pos = await new Promise((resolve, reject) => {
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });

//     currentLocation.lat=pos.coords.longitude
//     currentLocation.lng= pos.coords.latitude
//     // setLoad(!load)
// console.log("currentLocation",currentLocation)
// },[])



  const onMapClick = useCallback((event) => { //define a funciton that doesnt change property even react rerender. change on [].
    setMarkers((current) => {
      console.log(current)
      console.log(event)
      return [...current, {
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      }]}
    )},[])

    // const checking = () => {
    //     console.log("loaded")
    // }

  const seeData=() => {
    elevationData()
  }

  const elevationData = async () => {
    const elevation = new google.maps.ElevationService();
    // console.log(markers[0])
    await elevation.getElevationForLocations({locations: markers}, (results, status)=> {
      if (status === "OK") {
        const data = results.map(each => {
          return {elevation:each.elevation}
        })
        setCyclingElevationData(data)
        getElevationDifference(data)
      }
    })
  }





const getElevationDifference = (arr) => {
  let array = []
  for (let i = 0; i < arr.length - 1; i ++) {
      array.push(Math.round(arr[i].elevation *3.28) - Math.round(arr[i+1].elevation*3.28))
  }
  setElevationDifference(array)
}


  const getData=() => {
    if(markers.length === 1) {
      console.log("Provide more than 1 place")
      return
    }

    let request
    if (markers.length > 2) {
      let waypts = []
      let newMarkers = markers.slice(1, markers.length -1)
      newMarkers.map(each => {
        waypts.push({location: each, stopover: false})
      })
      request = {
        origin : markers[0],
        waypoints: waypts,
        destination : markers[markers.length-1],
        travelMode: "BICYCLING"
      }
    } else {
      request = {
      origin : markers[0],
      // waypoints: markers.slice(1, lastPlace),
      destination : markers[1],
      optimizeWaypoints: true,
      travelMode: "BICYCLING"
    }
    }

    directionsService.route(request, (result, status)=> {

      if (status === "OK"){
        // console.log(result.routes[0].legs[0].steps)
        setSegmentData(result.routes[0].legs[0].steps)
        setCyclingData({distance: result.routes[0].legs[0].distance.text, duration: result.routes[0].legs[0].duration.text})
      }
        })

  }

  //if currentlocation doesnt exist, maybe give an alert or give loading...
//if currentlocation exists, return
// const mapRef = useRef({lat: 38.9072, lng: -77.0369})
const [mapRef, setMapRef]=useState({lat: 38.9072, lng: -77.0369})
// const moveMap = useCallback(({lat, lng}) => {
//   console.log(mapRef.current)
//   console.log(lat, lng)
//   mapRef.current.lat = lat
//   mapRef.current.lng = lng
//   console.log(mapRef.current)
// },[])
const moveMap = useCallback(({lat, lng}) => {
  console.log(mapRef)
  console.log(lat, lng)
  setMapRef({lat,lng})
  console.log(mapRef)

},[])

const undo = () => {
  let newMarker = markers.slice(0, markers.length-1)
  setMarkers(newMarker)
}

  return (
    <>
      {/* <button
      onClick={()=>setDefaultZooming(14)}
      > Change zoom</button> */}
        <button onClick={seeData}> Save Elevation Data To State</button>

        <button onClick={getData}> Save lat+lng Data To State</button>
        <button onClick={()=>{
          console.log("cyclingElevationData", cyclingElevationData)
          console.log("cyclingData", cyclingData)
          console.log("elevationDifference", elevationDifference)
          console.log("segment", segmentData)
        }
          }> Log Get State</button>
          <MyLocation moveMap={moveMap}></MyLocation>
        <button
        onClick={()=>{
          setMarkers([])
          setSelected(null)
          setCyclingData({distance:null, duration:null})
          setCyclingElevationData({elevation:null})
          setElevationDifference({elevation:null})
          setSegmentData({distance:null, duration:null})
        }}> Clear Data</button>
    <button
    onClick={undo}
    >
      undo
    </button>

    <h1>total miles = {cyclingData.distance}</h1>
    <h1>estimated cycling = {cyclingData.duration}</h1>
    <h1>all the locations</h1>
  <ul>{markers.map((each, i) => {
    return (
      <>
      <li key={i}>
    location {i}'s location = lat: {each.lat} lng: {each.lng}
      </li>
      </>
    )
  })}</ul>
  <h1>all the elevations</h1>
{cyclingElevationData[0] ?
  <ul>
   {cyclingElevationData.map((each, i)=> {
    return (
      <>
    <li key={i}>
       location {i} 's elevation = {each.elevation} in meter
     </li>
     </>
    )
   })}
  </ul>
  : null}
  <h1>each Distance between Segments</h1>

  {segmentData.length > 0 ?
  <ul>{segmentData.map((each, i) => {
    return (
      <>
      <li key={i}>
    distance= {each.distance.text} duration= {each.duration.text}
      </li>
      </>
    )
  })}</ul>
: null}


  <h1>each elevations between locations</h1>
  {elevationDifference.length > 0 ?
  <ul>{elevationDifference.map((each, i) => {
    return (
      <>
      <li key={i}>
    location {i} to location {i+1} = {each}ft in difference
      </li>
      </>
    )
  })}</ul>
: null}
    <GoogleMap
    defaultZoom={14}
    // defaultCenter={{lat: 38.9072, lng: -77.0369}} //usa lat : long
    center={mapRef} //use useRef
    options={options}
    onClick={onMapClick}
    >
     {markers.map((marker, i) => <Marker
      key={i}
      position={{lat:marker.lat, lng: marker.lng}}
      // can change icon with icon property.
      onClick={(e)=> {
        console.log(e)
        setSelected(marker);
      }}
      ></Marker>)}
      {selected ? (<InfoWindow
      position={{lat: selected.lat, lng: selected.lng}}
      onCloseClick={()=>setSelected(null)}
      >
        <div>
          <h2>{selected.lat} : {selected.lng}</h2>
        </div>
      </InfoWindow>): null }

    <Polyline
    path={markers}
    key={'0'}
    geodesic={true}
    options={{strokeColor: "whitesmoke", strokeOpacity: 0.75, strokeWeight: 2,}}

    >
    </Polyline>
    <Search moveMap={moveMap}></Search>
    </GoogleMap>

    </>
  )
}

/////////////components//////////////////////////////////////////////////////////////

const WrappedMap = withScriptjs(withGoogleMap(Map))

export default function App() {


  return (
    <>
    <h1 className="title">Stravaaaa</h1>

    <div style={{width: '500px', height: '500px'}}>
          <WrappedMap
    googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
    loadingElement={<div style={{height: '100%'}}/> }
    containerElement={<div style={{height:"100%"}}/>}
    mapElement={<div style={{height: "100%"}}/>}
    >
    </WrappedMap>
    </div>

    </>
  );
}

//////////////////////////////////////////////////////////

const Search =({moveMap}) => {
  const {ready, value, suggestions: {status, data}, setValue, clearSuggestions} = usePlacesAutocomplete({
    location: {lat: ()=> 41.4993, lng: ()=> -81.6944},
    radius: 200 * 1000,
  })

  return (
    <div className="search">
    <Combobox
    onSelect={async (address) => {
      setValue(address, false)
      clearSuggestions()
      try{
        const response = await getGeocode({address});
        const {lat, lng} = await getLatLng(response[0]);
        moveMap({lat, lng})
        // console.log(lat, lng);

      }catch(e) {
        console.log(e)
      }
    }}>

      <ComboboxInput
      value={value}
      onChange={(e)=> setValue(e.target.value)}
      disabled={!ready}
      placeholder="Where To Start?">
      </ComboboxInput>
  <ComboboxPopover>
    <ComboboxList>
     {status === "OK" && data.map(({id, description})=> <ComboboxOption key={id} value={description}/>)}
    </ComboboxList>
    </ComboboxPopover>
    </Combobox>
    </div>
  )
}
//////////////////////////////////////////////////////
const MyLocation = ({moveMap}) => {
  return <button
  onClick={()=>{
    navigator.geolocation.getCurrentPosition((position)=>{
      // console.log(position.coords.latitude)
      moveMap({lat: position.coords.latitude, lng: position.coords.longitude})
    }, ()=>null)
  }}
  >Go To My Location</button>
}
