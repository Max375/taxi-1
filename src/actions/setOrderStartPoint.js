import {SET_ORDER_START_POINT} from  "./actionList";

export default function setUserStartPoint(newStartPoint) {
    return{
        type: SET_ORDER_START_POINT,
        payload:{
            startPoint: newStartPoint,
        }
    }
}