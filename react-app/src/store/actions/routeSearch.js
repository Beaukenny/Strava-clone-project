import { AccordionActions } from "@material-ui/core";
import {apiUrl} from "../../config"


export const SEARCHED_PLACE_COORD = "SEARCHED_PLACE_COORD";

/////////////////action creators below ///////////////////////////////////////////

export const searchedPlaceCoord = (data) => {
    return {
        type: SEARCHED_PLACE_COORD,
        data
    }
}
//////////////////////////thunks below/////////////////////////////////////////////////////////
export const addSearchCoord = (data) => async (dispatch) => {
    const response = await fetch(`${apiUrl}/routes`,{
        method:"get",
        headers:{'Content-Type':"application/json"},
        // body: JSON.stringify(data)
    })
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