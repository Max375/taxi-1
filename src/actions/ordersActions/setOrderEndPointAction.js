import {SET_ORDER_END_POINT} from "./orderActions";

export default function setOrderEndPoint(newEndPoint) {
    return{
        type: SET_ORDER_END_POINT,
        payload:{
            endPoint: {
                address: newEndPoint.address,
                location: {
                    lat: newEndPoint.location.lat,
                    lon:  newEndPoint.location.lon
                }
            }
        }
    }
}