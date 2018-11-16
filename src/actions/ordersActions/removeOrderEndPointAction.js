import {REMOVE_ORDER_END_POINT} from "./orderActions";

export default function removeOrderEndPointAction() {
    return{
        type: REMOVE_ORDER_END_POINT,
        payload: null
    }
}