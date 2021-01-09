
export const SEARCHED_PLACE_COORD = "SEARCHED_PLACE_COORD";

/////////////////action creators below ///////////////////////////////////////////

export const searchedPlaceCoord = (data) => {
    return {
        type: SEARCHED_PLACE_COORD,
        data
    }
}
//////////////////////////thunks below/////////////////////////////////////////////////////////
export const getAllRouteWithCoords = (data) => async (dispatch) => {
    const response = await fetch(`/api/routes/`)
    if (response.ok) {
            const jsonData = await response.json()
            return jsonData;
        }

}



////////////////////////////reducer//////////////////////////////////////////
export default function reducer (state={}, action) {
    switch(action.type) {
        case SEARCHED_PLACE_COORD :
            return {...state, coordinates:action.data}
        default:
            return state
    }
}
