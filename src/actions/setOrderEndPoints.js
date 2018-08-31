import {SET_ORDER_END_POINTS} from  "./actionList";

export default function setUserEndPoint(newEndPoint) {
    return{
        type: SET_ORDER_END_POINTS,
        payload:{
            endPoints: newEndPoint,
        }
    }
}