import {SET_ORDER} from  "./actionList";

export default function setOrderAction(order) {
    return{
        type: SET_ORDER,
        payload: order
    }
}
