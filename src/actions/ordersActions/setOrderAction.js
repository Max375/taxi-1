import {SET_ORDER} from "./orderActions";

export default function setOrderAction(order) {

    let action = {
        type: SET_ORDER,
        payload: null
    };


    if (order !== null && order !== undefined)
        action.payload = {
                id: order.id,
                entrance: order.entrance,
                status: order.status,
                comment: order.comment,
                price: order.price,
                startPoint: order.startPoint,
                endPoint: order.endPoint,
                wayPoint: order.wayPoint,
                options: order.options,
                card: order.card,
        };


    return action;
}
