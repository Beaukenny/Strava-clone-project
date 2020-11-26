import React, { useState, useEffect } from 'react';

import { DirectionsRenderer } from "react-google-maps"


const DirectionRender = ({ markers, directionsService, travelingMode, setDistanceData, distanceData, setTotalDistance,setTotalDuration }) => {
    const getData = () => {
        if (markers.length === 1) {
            return
        }
        let request
        if (markers.length > 2) {
            let waypts = []
            let newMarkers = markers.slice(1, markers.length - 1)
            newMarkers.map(each => {
                waypts.push({ location: each, stopover: false })
            })
            request = {
                origin: { lat: markers[0].lat, lng: markers[0].lng },
                optimizeWaypoints: true,
                waypoints: waypts,
                destination: { lat: markers[markers.length - 1].lat, lng: markers[markers.length - 1].lng },
                travelMode: travelingMode
            }
        } else {
            request = {
                origin: { lat: markers[0].lat, lng: markers[0].lng },
                // waypoints: markers.slice(1, lastPlace),
                destination: { lat: markers[1].lat, lng: markers[1].lng },
                optimizeWaypoints: true,
                travelMode: travelingMode
            }
        }
        directionsService.route(request, (result, status) => {
            if (status === "OK") {

                setDistanceData(result)
                setTotalDistance(result.routes[0].legs[0].distance.text)
                setTotalDuration(result.routes[0].legs[0].duration.text)
            }
        })
    }
    useEffect(() => {



        getData()
    }, [markers,travelingMode])

    return (

        <>
            <DirectionsRenderer
                directions={distanceData}
                options={{
                    polylineOptions: {
                        strokeColor: 'purple',
                    },
                    markerOptions: { icon: "/purple-dot.png" },
                    // draggable:true
                }}
            />
        </>
    )
}







export default DirectionRender