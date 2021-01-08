import React, { useEffect } from 'react';
import { staticMapImage } from "../routeUtil/utils"
import { DirectionsRenderer } from "react-google-maps"


const DirectionRender = ({ markers, directionsService, travelingMode, setDistanceData, distanceData, setTotalDistance,setTotalDuration,setStaticImageURL,setRequestData }) => {
    const getData =  () => {
        if (markers.length === 1) {
            return
        }
        let request
        let waypts = []
        if (markers.length > 2) {

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
        directionsService.route(request, async(result, status) => {
            if (status === "OK") {

               await setRequestData(request)
               await setDistanceData(result)
               await setTotalDistance(result.routes[0].legs[0].distance.text)
               await setTotalDuration(result.routes[0].legs[0].duration.text)
               await staticMapImage(result, setStaticImageURL)
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
                    markerOptions: { icon: "https://cadenceappacademy.s3.amazonaws.com/purple-dot-1.png" },
                    // draggable:true
                }}
            />
        </>
    )
}







export default DirectionRender
