
export async function getCertainRoutes(startingPoint, setData, setLoad,load) {
    const result = await fetch(`/api/routes/`)
    let res = await result.json();
    const arr = res.routes
    const dataWithin25miles = arr.filter((each)=> {
        let origin = each.starting_point
        let jsonedOrigin = stringToData(origin)
        let originLat = jsonedOrigin.lat;
        let originLng = jsonedOrigin.lng;
        let startingLat = startingPoint.lat;
        let startingLng = startingPoint.lng;
        if (measure(startingLat, startingLng, originLat, originLng) < 25) {
            return each
        }
    })
    setData({routes:dataWithin25miles})
        setLoad(!load)
}

export async function getCertainRoutes2(startingPoint, setData) {
    const result = await fetch(`/api/routes/`)
    let res = await result.json();
    const arr = res.routes
    const dataWithin25miles = arr.filter((each)=> {
        let origin = each.starting_point
        let jsonedOrigin = stringToData(origin)
        let originLat = jsonedOrigin.lat;
        let originLng = jsonedOrigin.lng;
        let startingLat = startingPoint.lat;
        let startingLng = startingPoint.lng;
        if (measure(startingLat, startingLng, originLat, originLng) < 25) {
            return each
        }
    })
    setData({routes:dataWithin25miles})
}

const stringToData = (data)=> {
    let a = data.split("'").join("\"")
    return JSON.parse(a)
}



function measure(lat1, lon1, lat2, lon2){
    let R = 6378.137;
    let dLat = lat2 * Math.PI / 180 - lat1 * Math.PI / 180;
    let dLon = lon2 * Math.PI / 180 - lon1 * Math.PI / 180;
    let a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    let d = R * c;
    return d * 0.62
}
