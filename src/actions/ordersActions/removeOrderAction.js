import {REMOVE_ORDER} from "./orderActions";

export default function removeOrderAction(index) {
    return{
        type: REMOVE_ORDER,
        payload: {
            index: index,
        }
    }
}