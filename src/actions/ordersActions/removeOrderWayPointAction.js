import {REMOVE_ORDER_WAY_POINT} from "./orderActions";

export default function removeOrderStartPointAction() {
    return{
        type: REMOVE_ORDER_WAY_POINT,
        payload: null
    }
}