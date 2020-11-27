/*global google*/
import React, { useState } from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow, Polyline } from "react-google-maps"
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption, } from "@reach/combobox";
import { settingMarkers } from "../routeUtil/utils"
import DirectionRender from "./DirectionRender"

const Map = () => {
  const directionsService = new google.maps.DirectionsService();
  const [defaultLocation, setDefaultLocation] = useState({ lat: 38.9072, lng: -77.0369 })
  const [markers, setMarkers] = useState([])
  const [selected, setSelected] = useState(null)
  const [totalData, setTotalData] = useState("")
  const [renderRoute, setRenderRoute] = useState(false)
  const [renderMarkAndLine, setRenderMarkAndLine] = useState(true)
  const [polyLines, setPolyLines] = useState([])

  const onMapClick = (event) => settingMarkers(event, markers, setMarkers, directionsService, setTotalData, totalData)

  const createRoute = () => {
    setRenderMarkAndLine(!renderMarkAndLine)
    setRenderRoute(!renderRoute)
  }


  return (
    <>
      <button onClick={() => console.log(totalData)}>totalData</button>
      <button onClick={() => console.log(markers)}>markers</button>
      <button onClick={createRoute}>Create Route!</button>
      <GoogleMap
        defaultZoom={14}
        center={defaultLocation}
        onClick={onMapClick}
      >
        {renderMarkAndLine ?
        markers.map((marker, i) => <Marker
          key={i}
          position={{ lat: marker.lat, lng: marker.lng }}
          icon={{
            url: marker.markerIcon,
            scaledSize: new window.google.maps.Size(34, 34),
            origin: new window.google.maps.Point(0,0),
            anchor: new window.google.maps.Point(17,17)
          }}
          onClick={(e) => {
            setSelected(marker);
          }}
        />
        )
        :null}
        {selected ? (<InfoWindow
          position={{ lat: selected.lat, lng: selected.lng }}
          onCloseClick={() => setSelected(null)}
        >
          <div>
            <h2>{selected.distance} miles</h2>
          </div>
        </InfoWindow>) : null}
        {renderMarkAndLine ?
          <Polyline
            path={markers}
            key={'0'}
            geodesic={true}
            options={{ strokeColor: "purple", strokeOpacity: 0.75, strokeWeight: 2, }}
          >
          </Polyline>
          : null}
        {renderRoute ?
          <DirectionRender markers={markers} directionsService={directionsService} />
          : null}
      </GoogleMap>
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
