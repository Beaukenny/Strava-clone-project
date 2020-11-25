import { greenMarker, whiteCircle, redMarker } from "./markers"

export const settingMarkers = async (event, markers, setMarkers, directionsService, setTotalData, totalData) => { //define a funciton that doesnt change property even react rerender. change on [].
  let distance
  if (markers.length === 0) {
    distance = 0
  } else {
    let request = {
      origin: markers[0],
      destination: {
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      },
      optimizeWaypoints: true,
      travelMode: "BICYCLING"
    }


    await directionsService.route(request, (result, status) => {
      if (status === "OK") {
        let distance = result.routes[0].legs[0].distance.text

        let accumulatedDistance = Number(distance.split(" mi").join("")) + markers[markers.length - 1].distance
        setTotalData((current) =>[...current,result])
        setMarkers([...markers, {
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
          distance: accumulatedDistance,
          markerIcon: "/icon57.png",
        }])
      }
    })
  }
  setMarkers([...markers, {
    lat: event.latLng.lat(),
    lng: event.latLng.lng(),
    distance,
    markerIcon: "/purple-dot.png",
  }])

}