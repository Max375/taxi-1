import {SET_TRADE_LIST} from  "./actionList";

export default function setTradeList(orders) {
    return{
        type: SET_TRADE_LIST,
        payload:{
            orders: orders,
        }
    }
}