import {SET_ORDER_WAY_POINT} from "./orderActions";

export default function setOrderStartPointAction(newWayPoint) {
    return{
        type: SET_ORDER_WAY_POINT,
        payload:{
            wayPoint: {
                address: newWayPoint.address,
                location: {
                    lat: newWayPoint.location.lat,
                    lon:  newWayPoint.location.lon
                }
            }
        }
    }
}