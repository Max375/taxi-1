import {SET_ORDER_START_POINT} from "./orderActions";

export default function setOrderStartPointAction(newStartPoint) {
    return{
        type: SET_ORDER_START_POINT,
        payload:{
            startPoint: {
                address: newStartPoint.address,
                location: {
                    lat: newStartPoint.location.lat,
                    lon:  newStartPoint.location.lon
                }
            }
        }
    }
}