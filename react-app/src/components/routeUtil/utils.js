
export const settingMarkers = async (event, markers, setMarkers) => { //define a funciton that doesnt change property even react rerender. change on [].
 await setMarkers([...markers, {
    lat: event.latLng.lat(),
    lng: event.latLng.lng(),
  }])
}

export const calculateChartData = (elevationData, totalDistance) => {
  let data = elevationData.map((each,i) => {
    let distance=(Number(totalDistance.split(" mi")[0])/elevationData.length).toFixed(2)
    return {x:distance * i, y:Number(each.elevation.toFixed(2))}
  })
  return data
}



export const getElevationData = async (distanceData, elevation, setElevationData,setTotalElevation, totalDistance, setChartData) => {
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
      let positiveElevation1 = array.filter(each => {
        if (each > 0) {
          return each
        }
      })
      // let positiveElevation = positiveElevation1.reduce((acc, ele) => {
      //   return acc + ele
      // })
      let positiveElevation = 0
      for (let i = 0; i < positiveElevation1.length; i ++){
        positiveElevation += positiveElevation1[i]
      }

      setTotalElevation(`${positiveElevation.toFixed(2)} ft`)
      setElevationData(data)
      setChartData(calculateChartData(data,totalDistance))
    }
  })
  }catch(e){
    console.log("Error received from getElevationForLocations: ", e)
  }


}


export const staticMapImage = async (distanceData,setStaticImageURL) => {
  const keyOption = `key=${process.env.REACT_APP_GOOGLE_KEY}`;
  const prefix = `http://maps.googleapis.com/maps/api/staticmap?`
  const size = `size=600x300`
  const overViewPoline = distanceData.routes[0].overview_path.map(each=> {
      return `${each.lat()},${each.lng()}`
    })
    const firstPoly = overViewPoline[0]
    const lastPoly = overViewPoline[overViewPoline.length -1]
    const path = "&path=" + overViewPoline.join("|")
    const url = prefix + size +'&zoom=15'+ '&markers=color:green|' + firstPoly+ path + '&sensor=false'+ '&markers=color:red|'+lastPoly+'&' + keyOption

    await setStaticImageURL(url)

  }
