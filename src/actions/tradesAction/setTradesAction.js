import {SET_TRADES} from "./tradesActions";

export default function clearTradesAction(data) {
    return{
        type: SET_TRADES,
        payload: {
            trades: data
        }
    }
}
