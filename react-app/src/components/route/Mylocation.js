import React from 'react';



const MyLocation = ({mapLocation}) => {
    return <button
    onClick={()=>{
      navigator.geolocation.getCurrentPosition((position)=>{
        mapLocation({lat: position.coords.latitude, lng: position.coords.longitude})
      }, ()=>null)
    }}
    >Go To My Location</button>
  }

  export default MyLocation