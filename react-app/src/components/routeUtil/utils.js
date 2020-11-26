
export const settingMarkers = async (event, markers, setMarkers) => { //define a funciton that doesnt change property even react rerender. change on [].
 await setMarkers([...markers, {
    lat: event.latLng.lat(),
    lng: event.latLng.lng(),
  }])
}



export const getElevationData = async (distanceData, elevation, setElevationData,setTotalElevation) => {
  const overview_path = distanceData.routes[0].overview_path
  const eachOverViewArray = overview_path.map(each=>{return {lat:each.lat(), lng:each.lng()}})
  try {
  await elevation.getElevationForLocations({locations: eachOverViewArray}, (results, status)=> {
    if (status === "OK") {
      const data = results.map(each => {
        return {elevation:each.elevation}
      })

      let array = []
      for (let i = 0; i < data.length - 1; i ++) {

          array.push(Number(((data[i].elevation *3.28) - (data[i+1].elevation*3.28))))
      }
      let positiveElevation = array.filter(each => {
        if (each > 0) {
          return each
        }
      }).reduce((acc, ele) => {
        return acc + ele
      })
      setTotalElevation(positiveElevation.toFixed(2))
      setElevationData(data)
    }
  })
  }catch(e){
    console.log(e)
  }


}


export const staticMapImage = (distanceData,setStaticImageURL) => {

  const keyOption = `key=${process.env.REACT_APP_GOOGLE_KEY}`;
  const prefix = `http://maps.googleapis.com/maps/api/staticmap?`
  const size = `size=400x400` 
  const overViewPoline = distanceData.routes[0].overview_path.map(each=> {
      return `${each.lat()},${each.lng()}`
    })
    const firstPoly = overViewPoline[0]
    const lastPoly = overViewPoline[overViewPoline.length -1]
    const path = "&path=" + overViewPoline.join("|")
    const url = prefix + size + '&markers=color:green|' + firstPoly+ path + '&sensor=false'+ '&markers=color:red|'+lastPoly+'&' + keyOption
   
    setStaticImageURL(url)
  
  }







export const creatingRoute = () => {

}

