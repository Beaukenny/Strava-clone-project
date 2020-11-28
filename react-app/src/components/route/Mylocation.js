import React from 'react';
import Button from '@material-ui/core/Button';



const MyLocation = ({mapLocation}) => {
    return <Button
    variant="contained" color="primary"
    onClick={()=>{
      navigator.geolocation.getCurrentPosition((position)=>{
        mapLocation({lat: position.coords.latitude, lng: position.coords.longitude})
      }, ()=>null)
    }}
    >My Location</Button>
  }

  export default MyLocation