import {CLEAR_TRADES} from "./tradesActions";

export default function clearTradesAction() {
    return{
        type: CLEAR_TRADES,
        payload: null
    }
}
