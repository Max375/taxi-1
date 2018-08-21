import {SET_ORDER_END_POINT} from  "./actionList";

export default function setUserEndPoint(newEndPoint) {
    return{
        type: SET_ORDER_END_POINT,
        payload:{
            endPoint: newEndPoint,
        }
    }
}