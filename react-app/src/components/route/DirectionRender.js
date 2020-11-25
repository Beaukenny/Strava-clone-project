import React, { useState, useEffect } from 'react';

import { DirectionsRenderer } from "react-google-maps"


const DirectionRender = ({ markers, directionsService }) => {
    const [data, setData] = useState()
    useEffect(() => {


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
                    waypoints: waypts,
                    destination: { lat: markers[markers.length - 1].lat, lng: markers[markers.length - 1].lng },
                    travelMode: "BICYCLING"
                }
            } else {
                request = {
                    origin: { lat: markers[0].lat, lng: markers[0].lng },
                    // waypoints: markers.slice(1, lastPlace),
                    destination: { lat: markers[1].lat, lng: markers[1].lng },
                    optimizeWaypoints: true,
                    travelMode: "BICYCLING"
                }
            }
            directionsService.route(request, (result, status) => {
                if (status === "OK") {
                    console.log("result" , result)
                    setData(result)
                }
            })

        }
        getData()
    }, [markers])


    // DirectionsRenderer.addListener("dragend",()=> {

    // })

    return (

        <>
        <button
        onClick={()=>console.log(data)}
        > console log direction</button>
            <DirectionsRenderer
                directions={data}
                options={{
                    polylineOptions: {
                        strokeColor: 'purple',
                    },
                    draggable: true,
                    markerOptions: { icon: "/purple-dot.png" },
                }}
            />
        </>
    )
}







export default DirectionRender